"use client";

import { AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "./ui/badge";

const alerts = [
  {
    id: 1,
    title: "Heavy Rainfall Warning",
    area: "Mumbai, Maharashtra",
    severity: "High",
    time: "3 hours ago",
  },
  {
    id: 2,
    title: "River Swelling Advisory",
    area: "Brahmaputra, Assam",
    severity: "Medium",
    time: "1 day ago",
  },
  {
    id: 3,
    title: "Urban Flood Alert",
    area: "Chennai, Tamil Nadu",
    severity: "High",
    time: "6 hours ago",
  },
];

export function EmergencyAlerts() {
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
            <div key={alert.id} className="p-3 rounded-lg bg-card border">
              <div className="flex justify-between items-start">
                <h4 className="font-semibold">{alert.title}</h4>
                <Badge variant={alert.severity === 'High' ? 'destructive' : 'secondary'} className="capitalize">
                  {alert.severity}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{alert.area}</p>
              <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
