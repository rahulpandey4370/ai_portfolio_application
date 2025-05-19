
"use client";

import { useState, useTransition, useRef, useEffect } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label'; // Keep if used by FormLabel
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Loader2, BedDouble, Sunrise, TrendingDown, Sparkles, Info, AlertTriangle, BarChartHorizontalBig, Brain, UserCheck, MessageSquareQuote, Wind, Thermometer, MoonStar, Send, User } from 'lucide-react';
import { SleepInputSchema, type SleepInput, type SleepOutput } from '@/ai/schemas/sleep-scientist-schemas';
import { analyzeSleepData } from '@/ai/flows/sleep-scientist-flow';
import { chatWithSleepCoach, type SleepChatInput, type SleepChatOutput } from '@/ai/flows/sleep-chat-flow';
import { type SleepChatMessage } from '@/ai/schemas/sleep-chat-schemas';
import { Separator } from '../ui/separator';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const ageRanges = ["18-25", "26-40", "41-60", "60+"];
const chronotypes = ["Morning Person", "Night Owl", "Flexible/Neither"];
const activityLevels = ["Sedentary", "Lightly Active", "Moderately Active", "Very Active"];
const primaryGoals = ["Optimize Wake-up Time", "Optimize Bedtime", "Understand Sleep Debt", "General Advice"];

const MAX_CHAT_HISTORY_LENGTH = 12;

export default function SleepScientist() {
  const [analysisResult, setAnalysisResult] = useState<SleepOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isAnalyzing, startAnalysisTransition] = useTransition();

  // Chat state
  const [chatMessages, setChatMessages] = useState<SleepChatMessage[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [_isChatPending, startChatTransition] = useTransition();
  const chatScrollAreaRef = useRef<HTMLDivElement>(null);

  const form = useForm<SleepInput>({
    resolver: zodResolver(SleepInputSchema),
    defaultValues: {
      ageRange: undefined,
      chronotype: undefined,
      typicalBedtime: "23:00",
      typicalWakeTime: "07:00",
      desiredSleepHours: 7.5,
      sleepActivityLevel: undefined,
      primaryGoal: "General Advice",
      sleepEnvironmentNotes: "",
      preSleepHabitsNotes: "",
      dailyStressLevels: "",
    },
  });

  const onSubmitAnalysis: SubmitHandler<SleepInput> = (data) => {
    setError(null);
    setAnalysisResult(null);
    setChatMessages([]); // Reset chat when new analysis is run
    startAnalysisTransition(async () => {
      try {
        const result = await analyzeSleepData(data);
        setAnalysisResult(result);
      } catch (err) {
        console.error("Sleep analysis error:", err);
        setError("An error occurred while analyzing your sleep data. Please try again.");
        setAnalysisResult(null);
      }
    });
  };

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || isChatLoading || !analysisResult) return;

    const userMessage: SleepChatMessage = {
      sender: 'user',
      text: chatInput,
    };
    
    const updatedMessages = [...chatMessages, userMessage];
    setChatMessages(updatedMessages);
    setChatInput('');
    setIsChatLoading(true);

    const historyForBackend: SleepChatMessage[] = updatedMessages
      .slice(-MAX_CHAT_HISTORY_LENGTH -1, -1) // Get up to MAX_CHAT_HISTORY_LENGTH previous messages
      .map(msg => ({ sender: msg.sender, text: msg.text }));

    startChatTransition(async () => {
      try {
        const chatInputPayload: SleepChatInput = {
          originalReport: analysisResult,
          userQuery: userMessage.text,
          chatHistory: historyForBackend.length > 0 ? historyForBackend : undefined,
        };
        const response = await chatWithSleepCoach(chatInputPayload);
        const botMessage: SleepChatMessage = {
          sender: 'bot',
          text: response.response,
        };
        setChatMessages((prev) => [...prev, botMessage]);
      } catch (error) {
        console.error("Sleep chat error:", error);
        const errorMessage: SleepChatMessage = {
          sender: 'bot',
          text: "Sorry, I encountered an error trying to respond. Please try again.",
        };
        setChatMessages((prev) => [...prev, errorMessage]);
      } finally {
        setIsChatLoading(false);
      }
    });
  };
  
  useEffect(() => {
    if (chatScrollAreaRef.current) {
      const scrollViewport = chatScrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
      if (scrollViewport) {
        scrollViewport.scrollTop = scrollViewport.scrollHeight;
      }
    }
  }, [chatMessages]);


  return (
    <Card className="w-full border-2 animate-border-flow animate-shadow-glow hover:scale-[1.02] transition-all duration-300 flex flex-col">
      <CardHeader className="items-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <MoonStar className="h-8 w-8 text-primary dark:text-accent animate-pulse" />
          <CardTitle className="text-2xl font-bold text-primary dark:text-accent">AI Sleep Scientist</CardTitle>
        </div>
        <CardDescription className="text-sm sm:text-base text-center">
          Unlock personalized insights for a better night's rest. Tell us about your sleep.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 flex-grow">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmitAnalysis)} className="space-y-8">
            {/* ... existing form fields ... */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="ageRange"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-1"><UserCheck className="h-4 w-4 text-muted-foreground"/>Age Range</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your age range" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {ageRanges.map(range => <SelectItem key={range} value={range}>{range}</SelectItem>)}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="chronotype"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-1"><Sunrise className="h-4 w-4 text-muted-foreground"/>Your Chronotype</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your chronotype" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {chronotypes.map(type => <SelectItem key={type} value={type}>{type}</SelectItem>)}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="typicalBedtime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-1"><BedDouble className="h-4 w-4 text-muted-foreground"/>Typical Bedtime</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} className="text-base"/>
                    </FormControl>
                    <FormDescription>e.g., 11:00 PM is 23:00</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="typicalWakeTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-1"><Sunrise className="h-4 w-4 text-muted-foreground"/>Typical Wake-up Time</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} className="text-base"/>
                    </FormControl>
                    <FormDescription>e.g., 7:00 AM is 07:00</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="desiredSleepHours"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-1"><BarChartHorizontalBig className="h-4 w-4 text-muted-foreground"/>Desired Sleep (hours)</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.5" {...field} 
                             onChange={event => field.onChange(parseFloat(event.target.value))}
                             className="text-base"/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="sleepActivityLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-1"><Sparkles className="h-4 w-4 text-muted-foreground"/>Daily Activity Level</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select activity level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {activityLevels.map(level => <SelectItem key={level} value={level}>{level}</SelectItem>)}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="primaryGoal"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="flex items-center gap-1"><Brain className="h-4 w-4 text-muted-foreground"/>What's your primary goal for this analysis?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-2"
                    >
                      {primaryGoals.map(goal => (
                        <FormItem key={goal} className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value={goal} />
                          </FormControl>
                          <FormLabel className="font-normal">{goal}</FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Separator />
            <h4 className="text-lg font-medium text-foreground/90 flex items-center gap-2">
                <MessageSquareQuote className="h-5 w-5 text-primary"/>
                Tell us more (Optional)
            </h4>
            <FormField
              control={form.control}
              name="sleepEnvironmentNotes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-1"><Wind className="h-4 w-4 text-muted-foreground"/>Sleep Environment</FormLabel>
                  <FormControl>
                    <Textarea placeholder="e.g., My room is usually dark and quiet, but sometimes gets too warm." {...field} />
                  </FormControl>
                  <FormDescription>Dark, quiet, cool, comfortable? Any disturbances?</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="preSleepHabitsNotes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-1"><MoonStar className="h-4 w-4 text-muted-foreground"/>Pre-Sleep Habits</FormLabel>
                  <FormControl>
                    <Textarea placeholder="e.g., I tend to watch TV in bed for about an hour before trying to sleep." {...field} />
                  </FormControl>
                  <FormDescription>Screen time, caffeine/alcohol, meals, relaxation routine?</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dailyStressLevels"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-1"><Thermometer className="h-4 w-4 text-muted-foreground"/>Daily Stress Levels</FormLabel>
                  <FormControl>
                    <Textarea placeholder="e.g., My work has been quite stressful lately, and I find it hard to switch off." {...field} />
                  </FormControl>
                  <FormDescription>How are your stress levels impacting your sleep?</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button type="submit" disabled={isAnalyzing} className="w-full" size="lg">
              {isAnalyzing ? <Loader2 className="animate-spin" /> : <Brain className="mr-2" />}
              Analyze My Sleep
            </Button>
          </form>
        </Form>

        {isAnalyzing && !analysisResult && (
          <div className="mt-6 flex flex-col items-center justify-center text-center p-6 bg-muted/50 rounded-lg animate-pulse">
            <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
            <p className="text-lg font-semibold text-primary">Dreaming up your analysis...</p>
            <p className="text-muted-foreground">Our AI Sleep Scientist is hard at work.</p>
          </div>
        )}

        {error && (
          <div className="mt-6 p-4 bg-destructive/10 border border-destructive/30 rounded-md text-destructive flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 mt-0.5 flex-shrink-0" />
            <div>
                <h4 className="font-semibold">Analysis Failed</h4>
                <p className="text-sm">{error}</p>
            </div>
          </div>
        )}

        {analysisResult && !isAnalyzing && (
          <div className="mt-8 space-y-6 animate-fadeInUp">
            <h3 className="text-xl font-semibold text-center text-primary dark:text-accent border-b-2 border-primary/50 dark:border-accent/50 pb-2 mb-4">
              Your Personalized Sleep Report
            </h3>
            {/* ... existing report display structure ... */}
            <div className="p-4 bg-card rounded-lg shadow-md border">
                <h4 className="text-lg font-medium text-accent dark:text-primary mb-2 flex items-center gap-2">
                    <BarChartHorizontalBig className="h-5 w-5"/> Current Sleep Snapshot
                </h4>
                <p className="text-foreground/90">{analysisResult.calculatedSleepDuration}</p>
                <p className="text-sm text-muted-foreground">Consistency: {analysisResult.consistencyScore}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-card rounded-lg shadow-md border">
                    <h4 className="text-lg font-medium text-accent dark:text-primary mb-2 flex items-center gap-2">
                        <BedDouble className="h-5 w-5"/> Recommended Bedtime
                    </h4>
                    <p className="text-2xl font-bold text-foreground/90">{analysisResult.recommendedBedtime}</p>
                </div>
                <div className="p-4 bg-card rounded-lg shadow-md border">
                    <h4 className="text-lg font-medium text-accent dark:text-primary mb-2 flex items-center gap-2">
                        <Sunrise className="h-5 w-5"/> Recommended Wake-up
                    </h4>
                    <p className="text-2xl font-bold text-foreground/90">{analysisResult.recommendedWakeTime}</p>
                </div>
            </div>

            <div className="p-4 bg-card rounded-lg shadow-md border">
                <h4 className="text-lg font-medium text-accent dark:text-primary mb-2 flex items-center gap-2">
                    <TrendingDown className="h-5 w-5"/> Sleep Debt
                </h4>
                <p className="text-foreground/90">Daily: {analysisResult.dailySleepDebt}</p>
                <p className="text-foreground/90">Weekly: {analysisResult.weeklySleepDebt}</p>
            </div>

            <div className="p-4 bg-card rounded-lg shadow-md border">
                <h4 className="text-lg font-medium text-accent dark:text-primary mb-2 flex items-center gap-2">
                    <Sparkles className="h-5 w-5"/> Personalized Tips
                </h4>
                <ul className="list-disc list-inside space-y-1 text-foreground/80 pl-2">
                    {analysisResult.personalizedTips.map((tip, index) => <li key={index}>{tip}</li>)}
                </ul>
            </div>
            
            <Separator className="my-6"/>

            {/* Follow-up Chat Section */}
            <div className="mt-6 pt-6 border-t border-border/50">
              <h4 className="text-lg font-semibold text-center text-primary dark:text-accent mb-4">
                Have Questions About Your Report? Chat Below!
              </h4>
              <div className="flex flex-col h-[400px] w-full bg-card/50 dark:bg-card/20 shadow-inner rounded-lg border p-4">
                <ScrollArea className="flex-grow mb-4" ref={chatScrollAreaRef}>
                  <div className="space-y-4 pr-2">
                    {chatMessages.map((msg, index) => (
                      <div
                        key={index}
                        className={cn(
                          "flex items-end gap-2 animate-fadeIn",
                          msg.sender === 'user' ? 'justify-end' : 'justify-start'
                        )}
                      >
                        {msg.sender === 'bot' && (
                          <Avatar className="h-8 w-8">
                             <AvatarImage src="https://placehold.co/40x40.png" alt="AI Coach" data-ai-hint="AI assistant" />
                             <AvatarFallback>AI</AvatarFallback>
                          </Avatar>
                        )}
                        <div
                          className={cn(
                            "max-w-[70%] rounded-lg px-4 py-2 text-sm shadow",
                            msg.sender === 'user'
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-secondary text-secondary-foreground'
                          )}
                        >
                          {msg.text}
                        </div>
                        {msg.sender === 'user' && (
                          <Avatar className="h-8 w-8">
                             <AvatarFallback><User className="h-5 w-5" /></AvatarFallback>
                          </Avatar>
                        )}
                      </div>
                    ))}
                    {isChatLoading && (
                      <div className="flex items-end gap-2 justify-start animate-fadeIn">
                        <Avatar className="h-8 w-8">
                           <AvatarImage src="https://placehold.co/40x40.png" alt="AI Coach" data-ai-hint="AI assistant" />
                           <AvatarFallback>AI</AvatarFallback>
                        </Avatar>
                        <div className="max-w-[70%] rounded-lg px-4 py-2 text-sm shadow bg-secondary text-secondary-foreground">
                          <Loader2 className="h-4 w-4 animate-spin inline-block" />
                        </div>
                      </div>
                    )}
                  </div>
                </ScrollArea>
                <form onSubmit={handleChatSubmit} className="flex items-center gap-2 border-t pt-4">
                  <Input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Ask about your sleep report..."
                    className="flex-grow"
                    aria-label="Chat input"
                    disabled={isChatLoading || !analysisResult}
                  />
                  <Button type="submit" size="icon" disabled={isChatLoading || !chatInput.trim() || !analysisResult}>
                    {isChatLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
                    <span className="sr-only">Send message</span>
                  </Button>
                </form>
              </div>
            </div>

            <div className="p-3 bg-muted/30 rounded-lg text-xs text-muted-foreground flex items-start gap-2 border border-muted/50">
              <Info className="h-4 w-4 mt-0.5 flex-shrink-0 text-primary"/>
              <p>{analysisResult.disclaimer}</p>
            </div>

          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-center pt-4 border-t">
        <p className="text-xs text-muted-foreground">Sweet Dreams & Stay Healthy!</p>
      </CardFooter>
    </Card>
  );
}
