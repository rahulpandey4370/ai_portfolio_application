
"use client";

import { useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Lightbulb, ShieldQuestion } from 'lucide-react';
import { navigateDilemma, type DilemmaNavigatorOutput } from '@/ai/flows/dilemma-navigator-flow';

export default function DilemmaNavigator() {
  const [dilemmaData, setDilemmaData] = useState<DilemmaNavigatorOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [_isPending, startTransition] = useTransition();

  const fetchDilemma = () => {
    setIsLoading(true);
    setDilemmaData(null);
    startTransition(async () => {
      try {
        const result = await navigateDilemma();
        setDilemmaData(result);
      } catch (error) {
        console.error("Dilemma Navigator error:", error);
        setDilemmaData({
          dilemma: "Failed to fetch a dilemma. The AI ethics council is on a break!",
          perspectives: ["Please try again later.", "Check console for errors.", "Is the AI model available?"],
        });
      } finally {
        setIsLoading(false);
      }
    });
  };

  return (
    <Card className="w-full border-2 animate-border-flow animate-shadow-glow hover:scale-[1.05] transition-all duration-300">
      <CardHeader>
        <div className="flex items-center justify-center gap-2 mb-2">
          <ShieldQuestion className="h-8 w-8 text-primary dark:text-accent animate-pulse" />
          <CardTitle className="text-2xl font-bold text-primary dark:text-accent">Ethical AI Dilemma Navigator</CardTitle>
        </div>
        <CardDescription className="text-sm sm:text-base text-center">
          Explore complex AI ethics. Click below to ponder a new dilemma.
        </CardDescription>
      </CardHeader>
      <CardContent className="min-h-[200px] space-y-4">
        {isLoading && (
          <div className="flex flex-col items-center justify-center h-full">
            <Loader2 className="h-12 w-12 animate-spin text-primary dark:text-accent mb-4" />
            <p className="text-muted-foreground">Consulting the AI philosophers...</p>
          </div>
        )}
        {dilemmaData && !isLoading && (
          <div className="animate-fadeInUp space-y-4">
            <div>
              <h3 className="font-semibold text-lg text-accent dark:text-primary mb-2">The Dilemma:</h3>
              <p className="text-foreground/90 whitespace-pre-wrap">{dilemmaData.dilemma}</p>
            </div>
            <div>
              <h4 className="font-semibold text-md text-accent dark:text-primary mb-2">Perspectives to Consider:</h4>
              <ul className="list-disc list-inside space-y-1 text-foreground/80 pl-2">
                {dilemmaData.perspectives.map((perspective, index) => (
                  <li key={index} className="whitespace-pre-wrap">{perspective}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
        {!dilemmaData && !isLoading && (
            <div className="flex flex-col items-center justify-center h-full text-center">
                <Lightbulb className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Ready to explore an ethical AI challenge?</p>
            </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button onClick={fetchDilemma} disabled={isLoading} size="lg">
          {isLoading ? <Loader2 className="animate-spin" /> : <ShieldQuestion className="mr-2" />}
          Get New Dilemma
        </Button>
      </CardFooter>
    </Card>
  );
}
