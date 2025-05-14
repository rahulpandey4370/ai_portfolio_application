
import Link from 'next/link';
import { ThemeToggleButton } from '@/components/theme-toggle-button';
import { Code2, Github, Linkedin } from 'lucide-react';
import { portfolioData } from '@/lib/data';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Code2 className="h-6 w-6 text-primary" />
          <span className="font-bold sm:inline-block">
            Rahul Ranjan Pandey
          </span>
        </Link>
        <nav className="flex flex-1 items-center space-x-4 sm:space-x-6 text-sm font-medium">
          <Link href="/#about" className="text-foreground/60 transition-colors hover:text-foreground/80">About</Link>
          <Link href="/#skills" className="text-foreground/60 transition-colors hover:text-foreground/80">Skills</Link>
          <Link href="/#experience" className="text-foreground/60 transition-colors hover:text-foreground/80">Experience</Link>
          <Link href="/#projects" className="text-foreground/60 transition-colors hover:text-foreground/80">Projects</Link>
          {/* <Link href="/#chatbot" className="text-foreground/60 transition-colors hover:text-foreground/80">AI Chat</Link> Removed */}
        </nav>
        <div className="flex items-center justify-end space-x-2">
          <a href={portfolioData.contact.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-foreground/60 transition-colors hover:text-foreground/80">
            <Github className="h-5 w-5" />
          </a>
          <a href={portfolioData.contact.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-foreground/60 transition-colors hover:text-foreground/80">
            <Linkedin className="h-5 w-5" />
          </a>
          <ThemeToggleButton />
        </div>
      </div>
    </header>
  );
}
