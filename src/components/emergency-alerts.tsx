"use client";

import * as React from 'react';
import { AlertTriangle, RefreshCw, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "./ui/badge";
import { Button } from './ui/button';

const initialAlerts = [
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
];

export function EmergencyAlerts() {
  const [alerts, setAlerts] = React.useState(initialAlerts);
  const [isRefreshing, setIsRefreshing] = React.useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate fetching new alerts
    setTimeout(() => {
      // Here you would fetch new data. For now, we'll just reset the state.
      // To show a change, we can shuffle the alerts.
      setAlerts([...alerts].sort(() => Math.random() - 0.5));
      setIsRefreshing(false);
    }, 1000);
  };

  return (
    <Card className="border-accent/50 bg-accent/5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-accent">
          <AlertTriangle />
          Emergency Alerts
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {alerts.map((alert) => (
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
          ))}
        </div>
        <div className="mt-6 flex justify-center">
            <Button variant="outline" onClick={handleRefresh} disabled={isRefreshing}>
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
