import { Waves, Building, ShieldCheck, MapPin, Cloudy, AlertTriangle, BookOpen, Sun, CloudRain } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FloodRiskAssessment } from "@/components/flood-risk-assessment";
import { ConstructionAdvisory } from "@/components/construction-advisory";
import { MapComponent } from "@/components/map-component";
import { EmergencyAlerts } from "@/components/emergency-alerts";
import { WeatherCard } from "@/components/weather-card";
import { EvacuationGuide } from "@/components/evacuation-guide";

export default function DashboardPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-40 w-full border-b bg-card/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center space-x-4 px-4 sm:justify-between sm:space-x-0">
          <div className="flex gap-2 items-center">
            <Waves className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">AquaGuard</h1>
          </div>
        </div>
      </header>

      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="grid gap-6 xl:grid-cols-5">
          <div className="xl:col-span-2 flex flex-col gap-6">
            <FloodRiskAssessment />
            <ConstructionAdvisory />
          </div>
          <div className="xl:col-span-3 flex flex-col gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin />
                  Water Level Monitoring
                </CardTitle>
                <CardDescription>Real-time water levels for rivers, lakes, and coastal areas.</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px] w-full">
                <MapComponent />
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <EmergencyAlerts />
              <WeatherCard />
            </div>

            <EvacuationGuide />
          </div>
        </div>
      </main>
    </div>
  );
}
