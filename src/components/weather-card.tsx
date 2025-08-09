
"use client";

import * as React from 'react';
import { Cloudy, Sun, CloudRain, Droplet, Wind, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from './ui/separator';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

const weatherConditions = [
    {
        icon: <Sun className="w-12 h-12 text-yellow-300" />,
        temp: "28°C",
        condition: "Sunny",
        humidity: "45%",
        wind: "10 km/h",
        floodThreat: "Low",
        hourly: [
            { time: "1 PM", icon: <Sun className="w-8 h-8 text-yellow-300" />, temp: "29°C" },
            { time: "2 PM", icon: <Sun className="w-8 h-8 text-yellow-300" />, temp: "30°C" },
            { time: "3 PM", icon: <Cloudy className="w-8 h-8 text-gray-300" />, temp: "28°C" },
            { time: "4 PM", icon: <Cloudy className="w-8 h-8 text-gray-300" />, temp: "27°C" },
            { time: "5 PM", icon: <Sun className="w-8 h-8 text-yellow-300" />, temp: "26°C" },
            { time: "6 PM", icon: <Sun className="w-8 h-8 text-yellow-300" />, temp: "25°C" },
        ]
    },
    {
        icon: <Cloudy className="w-12 h-12 text-gray-300" />,
        temp: "24°C",
        condition: "Cloudy",
        humidity: "60%",
        wind: "15 km/h",
        floodThreat: "Medium",
        hourly: [
            { time: "1 PM", icon: <Cloudy className="w-8 h-8 text-gray-300" />, temp: "25°C" },
            { time: "2 PM", icon: <Cloudy className="w-8 h-8 text-gray-300" />, temp: "25°C" },
            { time: "3 PM", icon: <CloudRain className="w-8 h-8 text-blue-300" />, temp: "23°C" },
            { time: "4 PM", icon: <CloudRain className="w-8 h-8 text-blue-300" />, temp: "22°C" },
            { time: "5 PM", icon: <Cloudy className="w-8 h-8 text-gray-300" />, temp: "22°C" },
            { time: "6 PM", icon: <Cloudy className="w-8 h-8 text-gray-300" />, temp: "21°C" },
        ]
    },
    {
        icon: <CloudRain className="w-12 h-12 text-blue-300" />,
        temp: "20°C",
        condition: "Rainy",
        humidity: "85%",
        wind: "20 km/h",
        floodThreat: "High",
        hourly: [
            { time: "1 PM", icon: <CloudRain className="w-8 h-8 text-blue-300" />, temp: "21°C" },
            { time: "2 PM", icon: <CloudRain className="w-8 h-8 text-blue-300" />, temp: "21°C" },
            { time: "3 PM", icon: <CloudRain className="w-8 h-8 text-blue-300" />, temp: "20°C" },
            { time: "4 PM", icon: <Cloudy className="w-8 h-8 text-gray-300" />, temp: "22°C" },
            { time: "5 PM", icon: <CloudRain className="w-8 h-8 text-blue-300" />, temp: "20°C" },
            { time: "6 PM", icon: <CloudRain className="w-8 h-8 text-blue-300" />, temp: "19°C" },
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

  if (!isClient) {
    return (
        <Card className="border-primary/50 bg-primary/5 transition-transform duration-200 hover:scale-105 hover:shadow-lg">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Cloudy /> Weather
                </CardTitle>
                <CardDescription>Current weather conditions and hourly forecast</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 animate-pulse">
                <div className="h-24 rounded-lg bg-card/50" />
                <Separator />
                <div className="h-28 rounded-lg bg-blue-400" />
            </CardContent>
        </Card>
    );
  }

  const displayWeather = weatherConditions[currentWeatherIndex];

  const getThreatBadgeVariant = (threatLevel: string) => {
    switch (threatLevel.toLowerCase()) {
      case 'high':
        return 'destructive';
      case 'medium':
        return 'secondary';
      default:
        return 'default';
    }
  }

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
        <Dialog>
            <DialogTrigger asChild>
                <div className="flex items-center justify-between gap-4 p-4 rounded-lg bg-card/50 transition-transform duration-200 hover:scale-105 cursor-pointer">
                    <div>
                        <span className="text-4xl font-bold">{displayWeather.temp}</span>
                        <p>{displayWeather.condition}</p>
                    </div>
                    {displayWeather.icon}
                </div>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Current Weather Details</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between text-lg">
                        <div className="flex items-center gap-2">
                            {displayWeather.icon}
                            <div>
                                <p className="font-bold text-2xl">{displayWeather.temp}</p>
                                <p>{displayWeather.condition}</p>
                            </div>
                        </div>
                    </div>
                    <Separator />
                    <div className="flex justify-around">
                        <div className="text-center">
                            <Droplet className="mx-auto text-blue-400" />
                            <p className="font-semibold">{displayWeather.humidity}</p>
                            <p className="text-sm text-muted-foreground">Humidity</p>
                        </div>
                        <div className="text-center">
                            <Wind className="mx-auto text-gray-400" />
                            <p className="font-semibold">{displayWeather.wind}</p>
                            <p className="text-sm text-muted-foreground">Wind</p>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
        
        <Separator />
        
        <Dialog>
            <DialogTrigger asChild>
                <div className="p-4 rounded-lg bg-blue-400 transition-transform duration-200 hover:scale-105 cursor-pointer">
                    <h4 className="text-sm font-semibold text-primary-foreground mb-4">Hourly Forecast</h4>
                    <div className="flex justify-between gap-2 text-primary-foreground">
                        {displayWeather.hourly.slice(0, 4).map((hour, index) => (
                            <div key={index} className="flex flex-col items-center gap-1 text-center">
                                <span className="text-xs">{hour.time}</span>
                                {React.cloneElement(hour.icon, {className: "w-8 h-8 text-primary-foreground"})}
                                <span className="text-sm font-semibold">{hour.temp}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Extended Hourly Forecast</DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-3 gap-4">
                    {displayWeather.hourly.map((hour, index) => (
                        <div key={index} className="flex flex-col items-center gap-2 p-2 rounded-lg bg-muted">
                            <span className="text-sm text-muted-foreground">{hour.time}</span>
                            {hour.icon}
                            <span className="font-semibold">{hour.temp}</span>
                        </div>
                    ))}
                </div>
            </DialogContent>
        </Dialog>

        <div className="flex justify-center">
            <Button variant="outline" className="w-full transition-transform duration-200 hover:scale-105">
                <AlertTriangle className="mr-2 h-4 w-4" />
                <span>Flood Threat:</span>
                <Badge variant={getThreatBadgeVariant(displayWeather.floodThreat)} className="ml-2">
                  {displayWeather.floodThreat}
                </Badge>
            </Button>
        </div>

      </CardContent>
    </Card>
  );
}
