
"use client";

import * as React from "react";
import { BookOpen, ChevronDown } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";

const evacuationData = [
  {
    id: "before",
    title: "Before a Flood",
    content: [
      "Create a family emergency plan and practice it.",
      "Assemble a disaster supplies kit (water, non-perishable food, flashlight, batteries, first aid).",
      "Know your evacuation routes. Identify higher ground you can move to.",
      "Secure your property. Move essential items to an upper floor.",
      "Bring in outdoor furniture and other items that could float away.",
      "Turn off utilities at the main switches or valves if instructed to do so.",
    ],
  },
  {
    id: "during",
    title: "During a Flood",
    content: [
      "Do not walk, swim, or drive through floodwaters. Turn Around, Don’t Drown!",
      "Stay off bridges over fast-moving water.",
      "Listen to your battery-powered radio for the latest emergency information.",
      "Evacuate immediately if told to do so.",
      "If your vehicle is trapped in rapidly moving water, stay inside. If water is rising inside the vehicle, seek refuge on the roof.",
      "If trapped in a building, get to the highest level. Do not climb into a closed attic.",
    ],
  },
  {
    id: "after",
    title: "After a Flood",
    content: [
      "Return home only when authorities say it is safe.",
      "Be aware of areas where floodwaters have receded. Roads may have weakened and could collapse.",
      "Avoid standing water as it may be electrically charged from underground or downed power lines.",
      "Stay out of any building if it is surrounded by floodwaters.",
      "Service damaged septic tanks, cesspools, pits, and leaching systems as soon as possible.",
      "Clean and disinfect everything that got wet. Mud left from floodwater can contain sewage and chemicals.",
    ],
  },
];

export function EvacuationGuide() {
  const [openSection, setOpenSection] = React.useState<string | null>("before");

  return (
    <Card className="transition-transform duration-200 hover:scale-105 hover:shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen />
          Evacuation Protocol Guide
        </CardTitle>
        <CardDescription>Easy to understand guidelines on evacuation protocols for flood safety.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {evacuationData.map((item) => (
            <Collapsible
              key={item.id}
              open={openSection === item.id}
              onOpenChange={(isOpen) => setOpenSection(isOpen ? item.id : null)}
            >
              <CollapsibleTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-between text-lg font-semibold transition-transform duration-200 hover:scale-105"
                >
                  {item.title}
                  <ChevronDown className={cn("h-5 w-5 transition-transform", openSection === item.id && "rotate-180")} />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="p-4 mt-2 border rounded-md bg-muted/50">
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    {item.content.map((point, index) => (
                      <li key={index}>{point}</li>
                    ))}
                  </ul>
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
