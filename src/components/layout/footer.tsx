import { Github, Linkedin, Mail } from 'lucide-react';
import { portfolioData } from '@/lib/data';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="border-t border-border/40 bg-background/95">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            &copy; {currentYear} Rahul Ranjan Pandey. All rights reserved.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <a href={portfolioData.contact.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <Github className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
          </a>
          <a href={portfolioData.contact.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <Linkedin className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
          </a>
          <a href={`mailto:${portfolioData.contact.email}`} aria-label="Email">
            <Mail className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
          </a>
        </div>
      </div>
    </footer>
  );
}
