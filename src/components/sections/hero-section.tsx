
"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight, Download, Award, BrainCircuit, MapPin } from 'lucide-react';
import { portfolioData } from '@/lib/data';
import ChatInterface from '@/components/chat-interface'; // Import ChatInterface

export default function HeroSection() {
  const [renderText, setRenderText] = useState(false);

  useEffect(() => {
    // Trigger text animation after a short delay
    const timer = setTimeout(() => setRenderText(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const animatedText = (text: string, baseDelay: number = 0) => {
    return text.split("").map((char, index) => (
      <span
        key={index}
        className="hero-text-animation" // This class is for individual characters
        style={{ animationDelay: `${baseDelay + index * 0.03}s` }}
      >
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  };

  return (
    <section id="hero" className="relative w-full min-h-[calc(100vh-3.5rem)] flex items-center justify-center overflow-hidden py-16 md:py-0">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 -z-10">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/80 to-primary/10 dark:from-background dark:via-background/80 dark:to-accent/10" />
        
        {/* Dynamic gradient overlay */}
        <div className="absolute inset-0 animate-hero-gradient-shift opacity-60 dark:opacity-40"></div>

        {/* Subtle animated shapes */}
        <div 
          className="absolute top-1/4 left-1/4 w-48 h-48 bg-primary/5 dark:bg-primary/3 rounded-full filter blur-3xl animate-pulse opacity-30 dark:opacity-20"
          style={{ animationDelay: '1s', animationDuration: '3s' }}
        ></div>
        <div 
          className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent/5 dark:bg-accent/3 rounded-full filter blur-3xl animate-pulse opacity-30 dark:opacity-20"
          style={{ animationDelay: '3s', animationDuration: '5s' }}
        ></div>
        
        {/* Additional animated shapes for more engagement */}
        <div
          className="absolute top-1/3 right-1/5 w-24 h-24 bg-accent/10 dark:bg-accent/5 rounded-full filter blur-2xl animate-pulse opacity-25 dark:opacity-15"
          style={{ animationDelay: '0.5s', animationDuration: '4.5s' }}
        ></div>
        <div
          className="absolute bottom-1/5 left-1/10 w-72 h-48 bg-primary/10 dark:bg-primary/5 rounded-2xl filter blur-3xl animate-pulse opacity-20 dark:opacity-10"
          style={{ animationDelay: '2s', animationDuration: '6s' }}
        ></div>
         <div
          className="absolute top-1/2 left-1/2 w-32 h-32 bg-primary/15 dark:bg-primary/8 rounded-full filter blur-2xl animate-pulse opacity-20 dark:opacity-10 transform -translate-x-1/2 -translate-y-1/2"
          style={{ animationDelay: '1.5s', animationDuration: '4s' }}
        ></div>
      </div>

      <div className="container px-4 md:px-6 grid md:grid-cols-5 gap-x-8 gap-y-12 items-start"> {/* Changed items-center to items-start for better chat layout */}
        {/* Text Content & Chat (Left Column) */}
        <div className="md:col-span-3 text-center md:text-left flex flex-col">
          <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl mb-4">
            {renderText && animatedText(portfolioData.hero.title, 0)}
          </h1>
          <p 
            className="mt-4 text-md leading-relaxed text-foreground/80 md:text-lg lg:text-xl animate-fadeInUp opacity-0" // Used animate-fadeInUp directly
            style={{ animationDelay: `${portfolioData.hero.title.length * 0.03 + 0.2}s` }}
          >
            {portfolioData.hero.subtitle}
          </p>

          {/* Chat Interface Integration */}
          <div 
            className="mt-8 w-full max-w-lg mx-auto md:mx-0 animate-fadeInUp opacity-0" // Changed from hero-text-animation
            style={{ animationDelay: `${portfolioData.hero.title.length * 0.03 + 0.45}s` }} // Adjusted delay
          >
            <ChatInterface />
          </div>
          
          <div 
            className="mt-8 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 animate-fadeInUp opacity-0" // Used animate-fadeInUp
            style={{ animationDelay: `${portfolioData.hero.title.length * 0.03 + 0.65}s` }} // Adjusted delay
          >
            <Button asChild size="lg" className="shadow-lg hover:shadow-primary/30 transition-shadow w-full sm:w-auto">
              <Link href="/#projects">
                {portfolioData.hero.cta}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="shadow-lg hover:shadow-accent/30 transition-shadow w-full sm:w-auto">
              <a href="/resume.pdf" download="Rahul_Ranjan_Pandey_Resume.pdf"> 
                Download CV
                <Download className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>

        {/* Image and Details (Right Column) */}
        <div className="md:col-span-2 flex flex-col items-center animate-fadeInUp mt-0 md:mt-12" style={{ animationDelay: "0.4s" }}> {/* Added md:mt-12 to align better if left col gets very tall */}
          <Image
            src="https://placehold.co/280x280.png" 
            alt={portfolioData.name}
            width={280}
            height={280}
            className="rounded-xl shadow-2xl mb-4" 
            data-ai-hint="professional portrait"
            priority 
          />
          <div className="text-center">
            <h3 className="text-2xl font-semibold text-primary">{portfolioData.name}</h3>
            <p className="text-md text-muted-foreground mt-1">{portfolioData.role}</p>
            
            <ul className="mt-6 space-y-2 text-sm text-foreground/80 animate-fadeInUp" style={{ animationDelay: "0.6s" }}>
              <li className="flex items-center justify-center md:justify-start gap-2"> {/* md:justify-start */}
                <Award className="h-4 w-4 text-accent" />
                <span>2+ Years in AI/ML</span>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-2"> {/* md:justify-start */}
                <BrainCircuit className="h-4 w-4 text-accent" />
                <span>Generative AI Focus</span>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-2"> {/* md:justify-start */}
                <MapPin className="h-4 w-4 text-accent" />
                <span>Based in Bengaluru</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
