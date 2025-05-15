
import { Github, Linkedin, Mail } from 'lucide-react';
import { portfolioData } from '@/lib/data';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="border-t border-border/40 bg-background/95">
      <div className="w-full px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-between gap-4 py-8 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 md:flex-row md:gap-2">
          <p className="text-center text-xs sm:text-sm leading-loose text-muted-foreground md:text-left">
            &copy; {currentYear} Rahul Ranjan Pandey. All rights reserved.
          </p>
        </div>
        <div className="flex items-center gap-3 sm:gap-4">
          <a href={portfolioData.contact.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <Github className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground hover:text-foreground transition-colors" />
          </a>
          <a href={portfolioData.contact.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <Linkedin className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground hover:text-foreground transition-colors" />
          </a>
          <a href={`mailto:${portfolioData.contact.email}`} aria-label="Email">
            <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground hover:text-foreground transition-colors" />
          </a>
        </div>
      </div>
    </footer>
  );
}
