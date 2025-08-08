"use client";

import { Cloudy, Sun, CloudRain } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";

const weatherConditions = [
    { icon: <Sun className="w-12 h-12 text-yellow-400" />, temp: "82°F", condition: "Sunny" },
    { icon: <Cloudy className="w-12 h-12 text-gray-400" />, temp: "75°F", condition: "Cloudy" },
    { icon: <CloudRain className="w-12 h-12 text-blue-400" />, temp: "68°F", condition: "Rainy" },
];

export function WeatherCard() {
    const [currentWeather, setCurrentWeather] = useState(weatherConditions[0]);

    useEffect(() => {
        const interval = setInterval(() => {
            const randomIndex = Math.floor(Math.random() * weatherConditions.length);
            setCurrentWeather(weatherConditions[randomIndex]);
        }, 5000); // Change weather every 5 seconds for demo

        return () => clearInterval(interval);
    }, []);


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
