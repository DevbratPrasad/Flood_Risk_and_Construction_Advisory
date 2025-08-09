"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ShieldCheck, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { assessFloodRisk, type FloodRiskAssessmentOutput } from "@/ai/flows/flood-risk-assessment";
import { Skeleton } from "./ui/skeleton";

const formSchema = z.object({
  address: z.string().min(5, { message: "Address must be at least 5 characters." }),
  latitude: z.coerce.number().min(-90).max(90),
  longitude: z.coerce.number().min(-180).max(180),
});

export function FloodRiskAssessment() {
  const [result, setResult] = React.useState<FloodRiskAssessmentOutput | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      address: "",
      latitude: "" as any,
      longitude: "" as any,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);
    try {
      const res = await assessFloodRisk(values);
      setResult(res);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to assess flood risk. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  const getBadgeVariant = (riskLevel: string) => {
    switch (riskLevel.toLowerCase()) {
      case 'high':
        return 'destructive';
      case 'medium':
        return 'secondary';
      default:
        return 'default';
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShieldCheck />
          Flood Risk Assessment
        </CardTitle>
        <CardDescription>Analyze flood risk for a specific location using real-time data and AI.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 123, MG Road, Bangalore, India" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="latitude"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Latitude</FormLabel>
                    <FormControl>
                      <Input type="number" step="any" placeholder="e.g., 12.9716" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="longitude"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Longitude</FormLabel>
                    <FormControl>
                      <Input type="number" step="any" placeholder="e.g., 77.5946" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Assess Risk
            </Button>
          </form>
        </Form>
        
        {isLoading && (
          <div className="mt-6 space-y-4">
            <div className="flex justify-between items-center">
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-6 w-16" />
            </div>
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-16 w-full" />
          </div>
        )}

        {result && (
          <div className="mt-6 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-lg">Assessment Result</h3>
              <Badge variant={getBadgeVariant(result.riskLevel)} className="text-lg">
                {result.riskLevel} Risk
              </Badge>
            </div>
            <div>
              <h4 className="font-semibold">Risk Factors</h4>
              <p className="text-sm text-muted-foreground">{result.riskFactors}</p>
            </div>
            <div>
              <h4 className="font-semibold">Recommendations</h4>
              <p className="text-sm text-muted-foreground">{result.recommendations}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
