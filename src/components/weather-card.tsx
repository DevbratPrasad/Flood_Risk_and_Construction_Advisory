
"use client";

import * as React from 'react';
import { Cloudy, Sun, CloudRain } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from './ui/separator';
import Image from 'next/image';

const weatherConditions = [
    {
        icon: <Sun className="w-12 h-12 text-yellow-300" />,
        temp: "28°C",
        condition: "Sunny",
        imageUrl: "https://placehold.co/300x200.png",
        aiHint: "sunny sky",
        hourly: [
            { time: "1 PM", icon: <Sun className="w-8 h-8 text-yellow-300" />, temp: "29°C" },
            { time: "2 PM", icon: <Sun className="w-8 h-8 text-yellow-300" />, temp: "30°C" },
            { time: "3 PM", icon: <Cloudy className="w-8 h-8 text-gray-300" />, temp: "28°C" },
            { time: "4 PM", icon: <Cloudy className="w-8 h-8 text-gray-300" />, temp: "27°C" },
        ]
    },
    {
        icon: <Cloudy className="w-12 h-12 text-gray-300" />,
        temp: "24°C",
        condition: "Cloudy",
        imageUrl: "https://placehold.co/300x200.png",
        aiHint: "cloudy sky",
        hourly: [
            { time: "1 PM", icon: <Cloudy className="w-8 h-8 text-gray-300" />, temp: "25°C" },
            { time: "2 PM", icon: <Cloudy className="w-8 h-8 text-gray-300" />, temp: "25°C" },
            { time: "3 PM", icon: <CloudRain className="w-8 h-8 text-blue-300" />, temp: "23°C" },
            { time: "4 PM", icon: <CloudRain className="w-8 h-8 text-blue-300" />, temp: "22°C" },
        ]
    },
    {
        icon: <CloudRain className="w-12 h-12 text-blue-300" />,
        temp: "20°C",
        condition: "Rainy",
        imageUrl: "https://placehold.co/300x200.png",
        aiHint: "rainy day",
        hourly: [
            { time: "1 PM", icon: <CloudRain className="w-8 h-8 text-blue-300" />, temp: "21°C" },
            { time: "2 PM", icon: <CloudRain className="w-8 h-8 text-blue-300" />, temp: "21°C" },
            { time: "3 PM", icon: <CloudRain className="w-8 h-8 text-blue-300" />, temp: "20°C" },
            { time: "4 PM", icon: <Cloudy className="w-8 h-8 text-gray-300" />, temp: "22°C" },
        ]
    },
];

export function WeatherCard() {
  const [currentWeatherIndex, setCurrentWeatherIndex] = React.useState(0);
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
    const interval = setInterval(() => {
      setCurrentWeatherIndex(prev => (prev + 1) % weatherConditions.length);
    }, 5000); // Change weather every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const displayWeather = weatherConditions[currentWeatherIndex];

  return (
    <Card className="border-primary/50 bg-primary/5 transition-transform duration-200 hover:scale-105 hover:shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Cloudy />
          Weather
        </CardTitle>
        <CardDescription>Current weather conditions and hourly forecast</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="relative flex items-center justify-between gap-4 p-4 rounded-lg transition-transform duration-200 hover:scale-105 overflow-hidden">
            <Image 
                src={displayWeather.imageUrl} 
                alt={displayWeather.condition} 
                layout="fill" 
                objectFit="cover" 
                className="absolute inset-0 z-0 opacity-40"
                data-ai-hint={displayWeather.aiHint} 
            />
            <div className="relative z-10 flex flex-col text-white">
                <span className="text-4xl font-bold">{displayWeather.temp}</span>
                <span className="text-gray-200">{displayWeather.condition}</span>
            </div>
            <div className="relative z-10">
                {displayWeather.icon}
            </div>
        </div>
        <Separator />
        <div className="relative p-4 rounded-lg transition-transform duration-200 hover:scale-105 overflow-hidden">
             <Image 
                src={displayWeather.imageUrl} 
                alt={displayWeather.condition} 
                layout="fill" 
                objectFit="cover" 
                className="absolute inset-0 z-0 opacity-40"
                data-ai-hint={displayWeather.aiHint}
            />
            <div className="relative z-10">
                <h4 className="text-sm font-semibold text-gray-200 mb-4">Hourly Forecast</h4>
                <div className="flex justify-between gap-2">
                    {displayWeather.hourly.map((hour, index) => (
                        <div key={index} className="flex flex-col items-center gap-1 text-center text-white">
                            <span className="text-xs text-gray-300">{hour.time}</span>
                            {hour.icon}
                            <span className="text-sm font-semibold">{hour.temp}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
