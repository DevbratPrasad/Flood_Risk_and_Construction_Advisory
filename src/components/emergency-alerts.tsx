
"use client";

import * as React from 'react';
import { AlertTriangle, RefreshCw, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "./ui/badge";
import { Button } from './ui/button';
import { Skeleton } from './ui/skeleton';

const allAlerts = [
  {
    id: 1,
    title: "Heavy Rainfall Warning",
    area: "Mumbai, Maharashtra",
    severity: "High",
    time: "3 hours ago",
    details: "Intense rainfall expected in the next 24 hours. Avoid coastal areas and low-lying regions.",
  },
  {
    id: 2,
    title: "River Swelling Advisory",
    area: "Brahmaputra, Assam",
    severity: "Medium",
    time: "1 day ago",
    details: "River levels are rising steadily. Stay updated with local news and be prepared for possible evacuation.",
  },
  {
    id: 3,
    title: "Urban Flood Alert",
    area: "Chennai, Tamil Nadu",
    severity: "High",
    time: "6 hours ago",
    details: "Widespread waterlogging reported. Commuters are advised to stay indoors. Emergency services are active.",
  },
  {
    id: 4,
    title: "Coastal Flood Watch",
    area: "Kolkata, West Bengal",
    severity: "Medium",
    time: "8 hours ago",
    details: "High tides and strong winds may lead to coastal flooding. Secure property and stay informed.",
  },
  {
    id: 5,
    title: "Flash Flood Warning",
    area: "Uttarakhand",
    severity: "High",
    time: "2 hours ago",
    details: "Flash floods are imminent or occurring. Move to higher ground immediately.",
  },
  {
    id: 6,
    title: "Low-Lying Area Alert",
    area: "Patna, Bihar",
    severity: "Low",
    time: "12 hours ago",
    details: "Minor waterlogging possible in low-lying areas. Monitor the situation.",
  },
  {
    id: 7,
    title: "Dam Water Release",
    area: "Mettur, Tamil Nadu",
    severity: "Medium",
    time: "5 hours ago",
    details: "Water will be released from the Mettur Dam. People in downstream areas are advised to be cautious.",
  },
  {
    id: 8,
    title: "Cyclone Alert",
    area: "Odisha Coast",
    severity: "High",
    time: "1 hour ago",
    details: "A cyclone is approaching the coast. Evacuation orders are in effect for coastal districts.",
  }
];

const getRandomAlerts = () => {
    const shuffled = [...allAlerts].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
};


export function EmergencyAlerts() {
  const [alerts, setAlerts] = React.useState<typeof allAlerts>([]);
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
    setAlerts(getRandomAlerts());
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate fetching new alerts
    setTimeout(() => {
      setAlerts(getRandomAlerts());
      setIsRefreshing(false);
    }, 1000);
  };

  return (
    <Card className="border-destructive/50 bg-destructive/5 transition-transform duration-200 hover:scale-105 hover:shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-destructive">
          <AlertTriangle />
          Emergency Alerts
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {!isClient ? (
             <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="p-4 rounded-lg bg-card border">
                  <div className="flex justify-between items-start">
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-5 w-1/6" />
                  </div>
                  <Skeleton className="h-4 w-1/2 mt-2" />
                  <Skeleton className="h-3 w-1/4 mt-1" />
                  <Skeleton className="h-8 w-full mt-2" />
                </div>
              ))}
            </div>
          ) : (
            alerts.map((alert) => (
              <div key={alert.id} className="p-4 rounded-lg bg-card border transition-transform duration-200 hover:scale-105 hover:shadow-lg">
                <div className="flex justify-between items-start">
                  <h4 className="font-semibold text-base">{alert.title}</h4>
                  <Badge variant={alert.severity === 'High' ? 'destructive' : 'secondary'} className="capitalize">
                    {alert.severity}
                  </Badge>
                </div>
                <p className="text-sm font-medium text-muted-foreground">{alert.area}</p>
                <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
                <p className="text-sm mt-2">{alert.details}</p>
              </div>
            ))
          )}
        </div>
        <div className="mt-6 flex justify-center">
            <Button variant="outline" onClick={handleRefresh} disabled={isRefreshing} className="transition-transform duration-200 hover:scale-105">
                {isRefreshing ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                    <RefreshCw className="mr-2 h-4 w-4" />
                )}
                Refresh Alerts
            </Button>
        </div>
      </CardContent>
    </Card>
  );
}
