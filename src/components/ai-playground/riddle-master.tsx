
"use client";

import { useState, useTransition, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Loader2, Brain, Puzzle, CheckCircle, XCircle, Lightbulb } from 'lucide-react';
import { generateRiddle, type RiddleMasterOutput } from '@/ai/flows/riddle-master-flow';
import { Badge } from '../ui/badge';
import { cn } from '@/lib/utils';

// Helper function to get the essential part of a string (lowercase, trimmed, no leading article, no punctuation)
function getEssentialPart(text: string): string {
    if (!text) return "";
    let essential = text.trim().toLowerCase();
    // Remove common punctuation, including apostrophes if they aren't crucial for the answer
    essential = essential.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?']/g,""); 
    const articles = ["a ", "an ", "the "];
    for (const article of articles) {
        if (essential.startsWith(article)) {
            essential = essential.substring(article.length).trim(); 
            break; 
        }
    }
    return essential;
}

// Improved answer checking logic
function checkAnswer(guess: string, correctAnswer: string): boolean {
    if (!guess || !correctAnswer) return false;

    const essentialGuess = getEssentialPart(guess);
    const essentialCorrectAnswer = getEssentialPart(correctAnswer);

    if (essentialGuess === essentialCorrectAnswer) {
        return true;
    }
    
    // Simple plural check (e.g. "map" vs "maps", "box" vs "boxes")
    // This is a basic check and might need to be more sophisticated for complex plurals
    if (essentialGuess.length > 0 && essentialCorrectAnswer.length > 0) {
      const guessEndsWithS = essentialGuess.endsWith('s');
      const correctEndsWithS = essentialCorrectAnswer.endsWith('s');
      const guessEndsWithEs = essentialGuess.endsWith('es');
      const correctEndsWithEs = essentialCorrectAnswer.endsWith('es');

      if (guessEndsWithS && essentialGuess.slice(0, -1) === essentialCorrectAnswer) return true;
      if (correctEndsWithS && essentialCorrectAnswer.slice(0, -1) === essentialGuess) return true;
      if (guessEndsWithEs && essentialGuess.slice(0, -2) === essentialCorrectAnswer) return true;
      if (correctEndsWithEs && essentialCorrectAnswer.slice(0, -2) === essentialGuess) return true;
    }
    
    return false;
}


export default function RiddleMaster() {
  const [riddleData, setRiddleData] = useState<RiddleMasterOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [userGuess, setUserGuess] = useState('');
  const [guessFeedback, setGuessFeedback] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [_isPending, startTransition] = useTransition();

  const fetchRiddle = () => {
    setIsLoading(true);
    setRiddleData(null);
    setShowAnswer(false);
    setUserGuess('');
    setGuessFeedback(null);
    startTransition(async () => {
      try {
        const result = await generateRiddle();
        setRiddleData(result);
      } catch (error) {
        console.error("Riddle Master error:", error);
        setRiddleData({
          riddle: "Oops! The riddle sphinx is napping. Try again later.",
          answer: "Not available",
        });
      } finally {
        setIsLoading(false);
      }
    });
  };

  const handleGuessSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userGuess.trim() || !riddleData) {
      setGuessFeedback({ message: "Please enter your guess first!", type: 'info'});
      return;
    }
    if (checkAnswer(userGuess, riddleData.answer)) {
      setGuessFeedback({ message: "Correct! You're a true Riddle Master!", type: 'success'});
      setShowAnswer(true); // Automatically show answer if correct
    } else {
      setGuessFeedback({ message: "Not quite! Try thinking a bit more.", type: 'error'});
    }
  };
  
  const toggleAnswer = () => {
    if (riddleData) {
      setShowAnswer(!showAnswer);
      if (!showAnswer) { // If revealing answer
        setGuessFeedback(null); // Clear guess feedback
      }
    }
  };

  // Clear feedback and guess when a new riddle is loaded or answer is toggled
  useEffect(() => {
    if (riddleData) {
        setGuessFeedback(null);
        setUserGuess('');
    }
  }, [riddleData?.riddle]); 

  return (
    <Card className="w-full border-2 animate-border-flow-alt animate-shadow-glow-alt hover:scale-[1.05] transition-all duration-300 flex flex-col">
      <CardHeader>
        <div className="flex items-center justify-center gap-2 mb-2">
          <Puzzle className="h-8 w-8 text-accent dark:text-primary animate-pulse" />
          <CardTitle className="text-2xl font-bold text-accent dark:text-primary">AI Riddle Master</CardTitle>
        </div>
        <CardDescription className="text-sm sm:text-base text-center">
          Test your wits! Get a riddle from the AI and try to solve it.
        </CardDescription>
      </CardHeader>
      <CardContent className="min-h-[200px] space-y-4 flex-grow">
        {isLoading && (
          <div className="flex flex-col items-center justify-center h-full">
            <Loader2 className="h-12 w-12 animate-spin text-accent dark:text-primary mb-4" />
            <p className="text-muted-foreground">Conjuring a clever riddle...</p>
          </div>
        )}
        {riddleData && !isLoading && (
          <div className="animate-fadeInUp text-center space-y-4">
            <p className="text-lg text-foreground/90 whitespace-pre-wrap italic">
              &quot;{riddleData.riddle}&quot;
            </p>
            
            <form onSubmit={handleGuessSubmit} className="space-y-3">
              <Input
                type="text"
                value={userGuess}
                onChange={(e) => setUserGuess(e.target.value)}
                placeholder="Your answer..."
                className="max-w-sm mx-auto"
                disabled={showAnswer && guessFeedback?.type === 'success'}
              />
              {guessFeedback && (
                <div className={cn(
                    "flex items-center justify-center gap-2 p-2 rounded-md text-sm mx-auto max-w-sm",
                    guessFeedback.type === 'success' && "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
                    guessFeedback.type === 'error' && "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
                    guessFeedback.type === 'info' && "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                )}>
                  {guessFeedback.type === 'success' && <CheckCircle className="h-5 w-5" />}
                  {guessFeedback.type === 'error' && <XCircle className="h-5 w-5" />}
                  {guessFeedback.type === 'info' && <Lightbulb className="h-5 w-5" />}
                  <span>{guessFeedback.message}</span>
                </div>
              )}
              <Button type="submit" disabled={showAnswer && guessFeedback?.type === 'success'}>Submit Guess</Button>
            </form>

            {showAnswer && (
                <div className="pt-2">
                    <Badge variant="secondary" className="text-md p-2">
                        Answer: {riddleData.answer}
                    </Badge>
                </div>
            )}
          </div>
        )}
        {!riddleData && !isLoading && (
             <div className="flex flex-col items-center justify-center h-full text-center">
                <Brain className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Ready for a challenge?</p>
            </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row justify-center items-center gap-3 pt-4">
        <Button onClick={fetchRiddle} disabled={isLoading} size="lg" className="w-full sm:w-auto">
          {isLoading ? <Loader2 className="animate-spin" /> : <Puzzle className="mr-2" />}
          Get New Riddle
        </Button>
        {riddleData && !isLoading && (
            <Button onClick={toggleAnswer} variant="outline" size="lg" className="w-full sm:w-auto">
                {showAnswer ? "Hide" : "Show"} Answer
            </Button>
        )}
      </CardFooter>
    </Card>
  );
}
