
"use client";

import * as React from 'react';
import { Cloudy, Sun, CloudRain } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const weatherConditions = [
    { icon: <Sun className="w-12 h-12 text-yellow-400" />, temp: "28°C", condition: "Sunny" },
    { icon: <Cloudy className="w-12 h-12 text-gray-400" />, temp: "24°C", condition: "Cloudy" },
    { icon: <CloudRain className="w-12 h-12 text-blue-400" />, temp: "20°C", condition: "Rainy" },
];

export function WeatherCard() {
  const [currentWeather, setCurrentWeather] = React.useState(weatherConditions[0]);
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
    const interval = setInterval(() => {
      setCurrentWeather(prev => {
        const currentIndex = weatherConditions.findIndex(c => c.condition === prev.condition);
        const nextIndex = (currentIndex + 1) % weatherConditions.length;
        return weatherConditions[nextIndex];
      });
    }, 5000); // Change weather every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const displayWeather = isClient ? currentWeather : weatherConditions[0];

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
                <span className="text-4xl font-bold">{displayWeather.temp}</span>
                <span className="text-muted-foreground">{displayWeather.condition}</span>
            </div>
            <div>
                {displayWeather.icon}
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
