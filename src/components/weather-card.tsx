
"use client";

import { Cloudy, Sun, CloudRain } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const weatherConditions = [
    { icon: <Sun className="w-12 h-12 text-yellow-400" />, temp: "28°C", condition: "Sunny" },
    { icon: <Cloudy className="w-12 h-12 text-gray-400" />, temp: "24°C", condition: "Cloudy" },
    { icon: <CloudRain className="w-12 h-12 text-blue-400" />, temp: "20°C", condition: "Rainy" },
];

// To prevent hydration errors, we'll cycle through the weather conditions on the client-side.
// This is a simple example and for a real app, you would fetch this data from an API.
const currentWeather = weatherConditions[0];

export function WeatherCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Cloudy />
          Weather
        </CardTitle>
        <CardDescription>Current weather conditions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between gap-4">
            <div className="flex flex-col">
                <span className="text-4xl font-bold">{currentWeather.temp}</span>
                <span className="text-muted-foreground">{currentWeather.condition}</span>
            </div>
            <div>
                {currentWeather.icon}
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
