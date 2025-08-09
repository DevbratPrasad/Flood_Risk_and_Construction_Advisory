"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Wrench, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { constructionAdvisory, type ConstructionAdvisoryOutput } from "@/ai/flows/construction-advisory";
import { Skeleton } from "./ui/skeleton";

const formSchema = z.object({
  location: z.string().min(2, { message: "Location must be at least 2 characters." }),
  floodRiskLevel: z.enum(["low", "medium", "high"]),
  houseType: z.string().min(3, { message: "House type must be at least 3 characters." }),
  budget: z.string().min(3, { message: "Budget must be at least 3 characters." }),
});

export function ConstructionAdvisory() {
  const [result, setResult] = React.useState<ConstructionAdvisoryOutput | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      location: "",
      floodRiskLevel: "medium",
      houseType: "",
      budget: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);
    try {
      const res = await constructionAdvisory(values);
      setResult(res);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to get construction advisory. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wrench />
          Construction Advisory
        </CardTitle>
        <CardDescription>Get AI recommendations for flood-resistant building materials and techniques.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Location</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Mumbai, Maharashtra" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="floodRiskLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Flood Risk Level</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a risk level" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="houseType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>House Type</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Single-family home" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="budget"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Budget</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Moderate, ₹1,50,00,000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Get Advice
            </Button>
          </form>
        </Form>

        {isLoading && (
          <div className="mt-6 space-y-4">
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-16 w-full" />
          </div>
        )}

        {result && (
          <div className="mt-6">
            <h3 className="font-semibold text-lg">Recommendations</h3>
            <div className="mt-2 text-sm text-muted-foreground prose prose-sm max-w-none">
              {result.recommendations.split('\n').map((line, index) => (
                <p key={index}>{line}</p>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
