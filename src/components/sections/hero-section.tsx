
"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight, Download, Award, BrainCircuit, MapPin } from 'lucide-react';
import { portfolioData } from '@/lib/data';
import ChatInterface from '@/components/chat-interface';

export default function HeroSection() {
  const [renderText, setRenderText] = useState(false);

  useEffect(() => {
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
    <section id="hero" className="relative w-full min-h-[calc(100vh-3.5rem)] flex items-center justify-center overflow-hidden px-1 py-16 md:px-0 md:py-10 lg:py-14">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/80 to-primary/10 dark:from-background dark:via-background/80 dark:to-accent/10" />
        <div className="absolute inset-0 animate-hero-gradient-shift opacity-60 dark:opacity-40"></div>
        <div
          className="absolute top-1/4 left-1/4 w-32 h-32 sm:w-48 sm:h-48 bg-primary/5 dark:bg-primary/3 rounded-full filter blur-3xl animate-pulse opacity-30 dark:opacity-20"
          style={{ animationDelay: '1s', animationDuration: '3s' }}
        ></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-48 h-48 sm:w-64 sm:h-64 bg-accent/5 dark:bg-accent/3 rounded-full filter blur-3xl animate-pulse opacity-30 dark:opacity-20"
          style={{ animationDelay: '3s', animationDuration: '5s' }}
        ></div>
        <div
          className="absolute top-1/3 right-1/5 w-16 h-16 sm:w-24 sm:h-24 bg-accent/10 dark:bg-accent/5 rounded-full filter blur-2xl animate-pulse opacity-25 dark:opacity-15"
          style={{ animationDelay: '0.5s', animationDuration: '4.5s' }}
        ></div>
        <div
          className="absolute bottom-1/5 left-1/10 w-56 h-32 sm:w-72 sm:h-48 bg-primary/10 dark:bg-primary/5 rounded-2xl filter blur-3xl animate-pulse opacity-20 dark:opacity-10"
          style={{ animationDelay: '2s', animationDuration: '6s' }}
        ></div>
         <div
          className="absolute top-1/2 left-1/2 w-24 h-24 sm:w-32 sm:h-32 bg-primary/15 dark:bg-primary/8 rounded-full filter blur-2xl animate-pulse opacity-20 dark:opacity-10 transform -translate-x-1/2 -translate-y-1/2"
          style={{ animationDelay: '1.5s', animationDuration: '4s' }}
        ></div>
      </div>

      <div className="w-full px-4 sm:px-6 lg:px-8 grid md:grid-cols-5 gap-x-8 lg:gap-x-12 gap-y-10 md:gap-y-12 items-start">
        {/* Left Column: Title, Subtitle, Image/Details, CTAs */}
        <div className="md:col-span-3 flex flex-col text-center md:text-left">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl mb-3 sm:mb-4">
            {renderText && animatedText(portfolioData.hero.title, 0)}
          </h1>
          <p
            className="mt-2 sm:mt-4 text-base leading-relaxed text-foreground/80 sm:text-md md:text-lg lg:text-xl animate-fadeInUp opacity-0"
            style={{ animationDelay: `${portfolioData.hero.title.length * 0.03 + 0.2}s` }}
          >
            {portfolioData.hero.subtitle}
          </p>

          {/* Image and Details Block - Centered on Mobile & Desktop within this column */}
          <div
            className="mt-6 sm:mt-8 flex flex-col items-center md:items-center animate-fadeInUp opacity-0" 
            style={{ animationDelay: `${portfolioData.hero.title.length * 0.03 + 0.4}s` }}
          >
            <Image
              src="/rahul_pic.png" 
              alt={portfolioData.name}
              width={200} 
              height={200}
              className="rounded-xl shadow-2xl mb-4 sm:mb-6 w-48 h-48 sm:w-52 sm:h-52 md:w-56 md:h-56 lg:w-64 lg:h-64 object-cover" 
              data-ai-hint="professional portrait"
              priority
            />
            <div className="text-center md:text-center">  
              <h3 className="text-xl sm:text-2xl font-semibold text-primary">{portfolioData.name}</h3>
              <p className="text-sm sm:text-md text-muted-foreground mt-1">{portfolioData.role}</p>

              <ul className="mt-4 sm:mt-6 space-y-2 sm:space-y-3 text-xs sm:text-sm text-foreground/80">
                <li className="flex items-center justify-center md:justify-center gap-2"> 
                  <Award className="h-4 w-4 text-accent" />
                  <span>4+ Years in AI/ML</span>
                </li>
                <li className="flex items-center justify-center md:justify-center gap-2"> 
                  <BrainCircuit className="h-4 w-4 text-accent" />
                  <span>Generative AI Focus</span>
                </li>
                <li className="flex items-center justify-center md:justify-center gap-2"> 
                  <MapPin className="h-4 w-4 text-accent" />
                  <span>Based in Bengaluru</span>
                </li>
              </ul>
            </div>
          </div>

          <div
            className="mt-10 w-full max-w-2xl px-3 sm:px-2 md:px-0 md:max-w-xl lg:max-w-2xl animate-fadeInUp opacity-0"
            style={{ animationDelay: `${portfolioData.hero.title.length * 0.03 + 0.6}s` }}
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Button asChild size="lg" className="group h-14 w-full rounded-2xl bg-gradient-to-r from-primary via-primary to-primary/90 px-6 text-sm sm:text-base shadow-[0_18px_45px_-22px_hsl(var(--primary)/0.9)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_55px_-22px_hsl(var(--primary)/0.95)]">
                <Link href="/#projects">
                  {portfolioData.hero.cta}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 sm:h-5 sm:w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="group h-14 w-full rounded-2xl border-white/50 bg-white/75 px-6 text-sm text-foreground shadow-[0_18px_45px_-28px_rgba(15,23,42,0.45)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/25 hover:bg-white/90 hover:shadow-[0_24px_55px_-26px_hsl(var(--primary)/0.35)] dark:border-white/10 dark:bg-white/5 dark:text-foreground dark:hover:bg-white/10 sm:text-base">
                <a href="/Rahul_Ranjan_Pandey_Resume_AI_ML_Data.pdf" download="Rahul_Ranjan_Pandey_Resume_AI_ML_Data.pdf">
                  Download CV
                  <Download className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 sm:h-5 sm:w-5" />
                </a>
              </Button>
            </div>
          </div>

        </div>

        {/* Right Column: Chat Interface */}
        <div
            className="md:col-span-2 w-full animate-fadeInUp opacity-0 md:mt-28" 
            style={{ animationDelay: `${portfolioData.hero.title.length * 0.03 + 0.5}s` }}
          >
            <ChatInterface />
        </div>
      </div>
    </section>
  );
}
