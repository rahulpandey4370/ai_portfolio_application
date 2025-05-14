
"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight, Download } from 'lucide-react';
import { portfolioData } from '@/lib/data';

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
        className="hero-text-animation"
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
        {/* Base gradient - can be static or a very slow animation */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/80 to-primary/10 dark:from-background dark:via-background/80 dark:to-accent/10" />
        
        {/* New dynamic gradient overlay */}
        <div className="absolute inset-0 animate-hero-gradient-shift opacity-60 dark:opacity-40"></div> {/* Increased opacity */}

        {/* Existing subtle animated circles, slightly adjusted for effect */}
        <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-primary/5 dark:bg-primary/3 rounded-full filter blur-3xl animate-pulse opacity-30 dark:opacity-20 animation-delay-1000"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent/5 dark:bg-accent/3 rounded-full filter blur-3xl animate-pulse animation-delay-3000 opacity-30 dark:opacity-20"></div>
      </div>

      <div className="container px-4 md:px-6 grid md:grid-cols-5 gap-x-8 gap-y-12 items-center">
        {/* Text Content (Left Column) */}
        <div className="md:col-span-3 text-center md:text-left">
          <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl hero-text-animation mb-4">
            {renderText && animatedText(portfolioData.hero.title, 0)}
          </h1>
          <p 
            className="mt-4 text-md leading-relaxed text-foreground/80 md:text-lg lg:text-xl hero-text-animation opacity-0"
            style={{ animationDelay: `${portfolioData.hero.title.length * 0.03 + 0.2}s` }}
          >
            {portfolioData.hero.subtitle}
          </p>
          <div 
            className="mt-8 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 hero-text-animation opacity-0"
            style={{ animationDelay: `${portfolioData.hero.title.length * 0.03 + 0.5}s` }}
          >
            <Button asChild size="lg" className="shadow-lg hover:shadow-primary/30 transition-shadow w-full sm:w-auto">
              <Link href="/#projects">
                {portfolioData.hero.cta}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="shadow-lg hover:shadow-accent/30 transition-shadow w-full sm:w-auto">
              <a href="/resume.pdf" download="Rahul_Ranjan_Pandey_Resume.pdf"> {/* Placeholder link */}
                Download CV
                <Download className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>

        {/* Image and Details (Right Column) */}
        <div className="md:col-span-2 flex flex-col items-center animate-fadeInUp" style={{ animationDelay: "0.4s" }}>
          <Image
            src="https://placehold.co/280x280.png" 
            alt={portfolioData.name}
            width={280}
            height={280}
            className="rounded-xl shadow-2xl mb-6"
            data-ai-hint="professional portrait"
            priority 
          />
          <div className="text-center">
            <h3 className="text-2xl font-semibold text-primary">{portfolioData.name}</h3>
            <p className="text-md text-muted-foreground mt-1">{portfolioData.role}</p>
            <p className="text-sm text-foreground/70 mt-3 max-w-xs mx-auto">
              Crafting intelligent systems and data-driven solutions from Bengaluru, India.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
