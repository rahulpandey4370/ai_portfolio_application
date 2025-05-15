
"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ThemeToggleButton } from '@/components/theme-toggle-button';
import { Code2, Github, Linkedin, Menu, X } from 'lucide-react';
import { portfolioData } from '@/lib/data';
import { usePathname } from 'next/navigation'; // Import usePathname
import { cn } from '@/lib/utils';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname(); // Get current path

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { href: "/#about", label: "About" },
    { href: "/#skills", label: "Skills" },
    { href: "/#experience", label: "Experience" },
    { href: "/#projects", label: "Projects" },
    { href: "/#articles", label: "Articles" },
    { href: "/#videos", label: "Videos" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 w-full items-center px-4 sm:px-6 lg:px-8">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Code2 className="h-6 w-6 text-primary" />
          <span className="font-bold sm:inline-block">
            Rahul Ranjan Pandey
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex flex-1 items-center space-x-4 sm:space-x-6 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-foreground/60 transition-colors hover:text-foreground/80"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button & Social Links for smaller screens */}
        <div className="flex flex-1 items-center justify-end md:hidden space-x-2">
          <a href={portfolioData.contact.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-foreground/60 transition-colors hover:text-foreground/80">
            <Github className="h-5 w-5" />
          </a>
          <a href={portfolioData.contact.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-foreground/60 transition-colors hover:text-foreground/80">
            <Linkedin className="h-5 w-5" />
          </a>
          <ThemeToggleButton />
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-foreground/60 hover:text-foreground/80"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
        
        {/* Social Links & Theme Toggle for larger screens */}
        <div className="hidden md:flex items-center justify-end space-x-2">
          <a href={portfolioData.contact.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-foreground/60 transition-colors hover:text-foreground/80">
            <Github className="h-5 w-5" />
          </a>
          <a href={portfolioData.contact.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-foreground/60 transition-colors hover:text-foreground/80">
            <Linkedin className="h-5 w-5" />
          </a>
          <ThemeToggleButton />
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background/95 border-b border-border/40 shadow-lg animate-fadeIn">
          <nav className="flex flex-col space-y-1 px-4 py-3">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="block rounded-md px-3 py-2 text-base font-medium text-foreground/80 hover:bg-accent hover:text-accent-foreground"
                onClick={() => setIsMobileMenuOpen(false)} // Close menu on click
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
