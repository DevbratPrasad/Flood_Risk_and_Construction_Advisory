import { BookOpen } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

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
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen />
          Evacuation Protocol Guide
        </CardTitle>
        <CardDescription>Easy to understand guidelines on evacuation protocols for flood safety.</CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible defaultValue="before" className="w-full">
          {evacuationData.map((item) => (
            <AccordionItem value={item.id} key={item.id}>
              <AccordionTrigger className="text-lg font-semibold">{item.title}</AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  {item.content.map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}
