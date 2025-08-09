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
    const [currentWeatherIndex, setCurrentWeatherIndex] = useState(0);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
      setIsClient(true);
      const interval = setInterval(() => {
          setCurrentWeatherIndex(prevIndex => (prevIndex + 1) % weatherConditions.length);
      }, 5000); // Change weather every 5 seconds for demo

      return () => clearInterval(interval);
    }, []);

    const currentWeather = weatherConditions[currentWeatherIndex];

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
                {isClient ? (
                    <>
                        <span className="text-4xl font-bold">{currentWeather.temp}</span>
                        <span className="text-muted-foreground">{currentWeather.condition}</span>
                    </>
                ) : (
                    <>
                        <span className="text-4xl font-bold">{weatherConditions[0].temp}</span>
                        <span className="text-muted-foreground">{weatherConditions[0].condition}</span>
                    </>
                )}
            </div>
            <div>
                {isClient ? currentWeather.icon : weatherConditions[0].icon}
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
