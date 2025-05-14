"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
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
    <section id="hero" className="relative w-full h-[calc(100vh-3.5rem)] flex items-center justify-center overflow-hidden">
      {/* Subtle Animated Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/80 to-accent/10 dark:from-background dark:via-background/80 dark:to-primary/20" />
        {/* Optional: more complex background shapes or particles could be added here */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/5 rounded-full filter blur-2xl animate-pulse opacity-50 dark:opacity-30"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-accent/5 rounded-full filter blur-3xl animate-pulse animation-delay-2000 opacity-50 dark:opacity-30"></div>
      </div>

      <div className="container px-4 md:px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl hero-text-animation mb-6">
            {renderText && animatedText(portfolioData.hero.title, 0)}
          </h1>
          <p className="mt-6 text-lg leading-8 text-foreground/80 sm:text-xl md:text-2xl hero-text-animation opacity-0" style={{ animationDelay: `${portfolioData.hero.title.length * 0.03 + 0.2}s` }}>
            {portfolioData.hero.subtitle}
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6 hero-text-animation opacity-0" style={{ animationDelay: `${portfolioData.hero.title.length * 0.03 + 0.5}s` }}>
            <Button asChild size="lg" className="shadow-lg hover:shadow-primary/30 transition-shadow">
              <Link href="/#projects">
                {portfolioData.hero.cta}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="shadow-lg hover:shadow-accent/30 transition-shadow">
              <a href="/resume.pdf" download="Rahul_Ranjan_Pandey_Resume.pdf"> {/* Placeholder link */}
                Download CV
                <Download className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
