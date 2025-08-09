
"use client";

import * as React from "react";
import { Heart, ChevronDown, Search } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { Input } from "./ui/input";

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

const SearchSection = () => (
    <div className="mt-6 pt-4 border-t">
        <h3 className="text-md font-semibold mb-2">Can we help with something more?</h3>
        <div className="flex w-full max-w-sm items-center space-x-2">
            <Input type="text" placeholder="Search for more information..." />
            <Button type="submit" size="icon">
                <Search className="h-4 w-4" />
            </Button>
        </div>
    </div>
);

export function EvacuationGuide() {
  const [openSections, setOpenSections] = React.useState<string[]>(["before"]);

  const toggleSection = (id: string) => {
    setOpenSections(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };
  
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget;
    const ripple = document.createElement("span");
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.className = 'ripple';

    button.appendChild(ripple);

    ripple.onanimationend = () => {
      ripple.remove();
    };
  };

  return (
    <Card className="transition-transform duration-200 hover:scale-105 hover:shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Heart />
          Evacuation Protocol Guide
        </CardTitle>
        <CardDescription>Easy to understand guidelines on evacuation protocols for flood safety.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {evacuationData.map((item) => (
            <Collapsible
              key={item.id}
              open={openSections.includes(item.id)}
              onOpenChange={() => toggleSection(item.id)}
            >
              <CollapsibleTrigger asChild>
                <Button
                  variant="outline"
                  onClick={handleClick}
                  className="w-full justify-between text-lg font-semibold relative overflow-hidden transition-transform duration-200 hover:scale-105"
                >
                  {item.title}
                  <ChevronDown className={cn("h-5 w-5 transition-transform", openSections.includes(item.id) && "rotate-180")} />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="p-4 mt-2 border rounded-md bg-muted/50">
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    {item.content.map((point, index) => (
                      <li key={index}>{point}</li>
                    ))}
                  </ul>
                  <SearchSection />
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
