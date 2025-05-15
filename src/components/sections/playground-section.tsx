
import DilemmaNavigator from '@/components/ai-playground/dilemma-navigator';
import RiddleMaster from '@/components/ai-playground/riddle-master';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TestTubeDiagonal, Puzzle, ShieldQuestion } from 'lucide-react';

export default function PlaygroundSection() {
  return (
    <section 
      id="playground" 
      className="relative w-full px-4 sm:px-6 lg:px-8 animate-hero-gradient-shift overflow-hidden" // Added animate-hero-gradient-shift and overflow-hidden
    >
      {/* Optional: Add a semi-transparent overlay if the gradient is too distracting under text */}
      {/* <div className="absolute inset-0 bg-background/30 dark:bg-background/50 z-0"></div> */}
      
      <div className="relative container mx-auto max-w-4xl z-10"> {/* Added relative and z-10 */}
        <div className="text-center mb-10 md:mb-12 animate-fadeInUp max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl text-primary flex items-center justify-center gap-2 sm:gap-3">
            <TestTubeDiagonal className="h-6 w-6 sm:h-8 sm:w-8 animate-pulse" />
            AI Playground
          </h2>
          <p className="mt-3 sm:mt-4 text-base sm:text-lg text-foreground/80">
            Engage with interactive AI experiments. Select an experiment below!
          </p>
        </div>
        
        <Tabs defaultValue="dilemma" className="w-full animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
          <TabsList className="grid w-full grid-cols-2 mb-6 bg-transparent border border-primary/80 dark:border-accent/80 p-1 rounded-lg shadow-md">
            <TabsTrigger 
              value="dilemma" 
              className="py-2.5 text-sm sm:text-base text-foreground/80 hover:bg-primary/20 dark:hover:bg-accent/20 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg dark:data-[state=active]:bg-accent dark:data-[state=active]:text-accent-foreground transition-all duration-300 rounded-md"
            >
              <ShieldQuestion className="mr-2 h-4 w-4 sm:h-5 sm:w-5" /> Ethical AI Dilemmas
            </TabsTrigger>
            <TabsTrigger 
              value="riddle" 
              className="py-2.5 text-sm sm:text-base text-foreground/80 hover:bg-primary/20 dark:hover:bg-accent/20 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg dark:data-[state=active]:bg-accent dark:data-[state=active]:text-accent-foreground transition-all duration-300 rounded-md"
            >
              <Puzzle className="mr-2 h-4 w-4 sm:h-5 sm:w-5" /> AI Riddle Master
            </TabsTrigger>
          </TabsList>
          <TabsContent value="dilemma">
            <DilemmaNavigator />
          </TabsContent>
          <TabsContent value="riddle">
            <RiddleMaster />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
