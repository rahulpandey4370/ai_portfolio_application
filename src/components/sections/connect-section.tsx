import { ArrowUpRight, FileText, Github, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { portfolioData } from '@/lib/data';

const connectLinks = [
  {
    href: portfolioData.contact.linkedin,
    label: 'LinkedIn',
    description: 'Professional experience, current role, and recruiter-facing profile details.',
    icon: Linkedin,
    cta: 'Open Profile',
    external: true,
    accentClass: 'from-primary/18 via-primary/8 to-transparent',
  },
  {
    href: portfolioData.contact.github,
    label: 'GitHub',
    description: 'Code, experiments, and implementation-heavy work across products and side projects.',
    icon: Github,
    cta: 'View Code',
    external: true,
    accentClass: 'from-accent/20 via-accent/10 to-transparent',
  },
  {
    href: '/Rahul_Ranjan_Pandey_Resume_AI_ML_Data.pdf',
    label: 'Resume',
    description: 'Download the latest CV with enterprise AI work, projects, and technical strengths.',
    icon: FileText,
    cta: 'Download PDF',
    external: false,
    accentClass: 'from-primary/14 via-accent/10 to-transparent',
  },
];

export default function ConnectSection() {
  return (
    <section id="connect" className="w-full px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="overflow-hidden rounded-[32px] border border-border/60 bg-card/80 shadow-[0_28px_80px_-48px_rgba(15,23,42,0.35)] backdrop-blur-sm">
          <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[1.05fr_1.95fr] lg:gap-8 lg:p-10">
            <div className="animate-fadeInUp">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary/80">
                Quick Connect
              </p>
              <h2 className="mt-3 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                The important links, right where a recruiter expects them.
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-foreground/75 sm:text-base">
                Open the LinkedIn profile, review GitHub work, or download the latest resume from a single place at the very bottom of the portfolio.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {connectLinks.map((link, index) => {
                const Icon = link.icon;

                return (
                  <Card
                    key={link.label}
                    className="group relative overflow-hidden border-border/60 bg-background/90 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/25 hover:shadow-[0_24px_60px_-36px_hsl(var(--primary)/0.45)]"
                    style={{ animationDelay: `${index * 0.08}s` }}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${link.accentClass} opacity-90 transition-opacity duration-300 group-hover:opacity-100`} />
                    <CardContent className="relative flex h-full flex-col p-5">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/12 text-primary transition-all duration-300 group-hover:scale-105 group-hover:bg-primary group-hover:text-primary-foreground dark:bg-primary/20">
                          <Icon className="h-5 w-5" />
                        </div>
                        <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
                      </div>

                      <div className="mt-8 flex-1">
                        <h3 className="text-lg font-semibold tracking-tight text-foreground">
                          {link.label}
                        </h3>
                        <p className="mt-3 text-sm leading-7 text-foreground/75">
                          {link.description}
                        </p>
                      </div>

                      <Button asChild variant="outline" className="mt-6 w-full justify-between rounded-xl bg-background/80 transition-all duration-300 group-hover:border-primary/30 group-hover:bg-background">
                        <a
                          href={link.href}
                          target={link.external ? '_blank' : undefined}
                          rel={link.external ? 'noopener noreferrer' : undefined}
                          download={link.external ? undefined : 'Rahul_Ranjan_Pandey_Resume_AI_ML_Data.pdf'}
                        >
                          {link.cta}
                          <ArrowUpRight className="h-4 w-4" />
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
