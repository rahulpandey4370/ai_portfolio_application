"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useTransition } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ExternalLink, Github, Sparkles, Loader2 } from 'lucide-react';
import type { ProjectEntry } from '@/lib/data';
import { summarizeProject, type SummarizeProjectInput } from '@/ai/flows/project-summarizer';

interface ProjectCardProps {
  project: ProjectEntry;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const [summary, setSummary] = useState<string | null>(null);
  const [isLoadingSummary, setIsLoadingSummary] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [isHovering, setIsHovering] = useState(false);

  const fetchSummary = async () => {
    if (!project.longDescription || summary) return; // Don't fetch if no long desc or summary already exists
    
    setIsLoadingSummary(true);
    try {
      const input: SummarizeProjectInput = { projectDescription: project.longDescription };
      const result = await summarizeProject(input);
      setSummary(result.summary);
    } catch (error) {
      console.error("Failed to fetch summary:", error);
      setSummary("Could not load summary."); // Fallback message
    } finally {
      setIsLoadingSummary(false);
    }
  };

  useEffect(() => {
    if (isHovering && !summary && !isLoadingSummary) {
      startTransition(() => {
        fetchSummary();
      });
    }
  }, [isHovering, summary, isLoadingSummary, project.longDescription]);

  return (
    <Card 
      className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col animate-fadeInUp h-full"
      style={{ animationDelay: `${index * 0.15}s` }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <CardHeader className="p-0">
        <div className="relative aspect-video w-full">
          <Image
            src={project.imageUrl}
            alt={project.title}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-500 group-hover:scale-105"
            data-ai-hint={project.dataAiHint}
          />
        </div>
      </CardHeader>
      <CardContent className="p-6 flex-grow">
        <CardTitle className="text-xl font-semibold mb-2 text-primary">{project.title}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground mb-3 h-12 overflow-hidden">
           {project.description}
        </CardDescription>
        
        <div className="mb-4">
          <h4 className="text-xs font-semibold uppercase text-muted-foreground mb-1">Tech Stack:</h4>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <Badge key={tech} variant="secondary" className="text-xs bg-accent/10 text-accent-foreground hover:bg-accent/20">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
        
        {project.longDescription && (
          <TooltipProvider delayDuration={300}>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="text-xs text-muted-foreground mt-2 p-2 border border-dashed rounded-md h-16 overflow-y-auto bg-secondary/30">
                  {isLoadingSummary ? (
                    <div className="flex items-center justify-center h-full">
                       <Loader2 className="h-4 w-4 animate-spin mr-2" /> Loading summary...
                    </div>
                  ) : summary ? (
                     <><Sparkles className="h-3 w-3 inline mr-1 text-accent" />{summary}</>
                  ) : (
                    <span className="italic">Hover or focus card to see AI summary.</span>
                  )}
                </div>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="max-w-xs bg-background border-border text-foreground shadow-lg">
                <p>{summary || "AI-generated project summary will appear here."}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}

      </CardContent>
      <CardFooter className="p-6 bg-secondary/30 dark:bg-secondary/10 flex justify-between items-center">
        <div className="flex gap-2">
          {project.liveLink && (
            <Button variant="outline" size="sm" asChild>
              <Link href={project.liveLink} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-2" /> Live Demo
              </Link>
            </Button>
          )}
          {project.repoLink && (
            <Button variant="ghost" size="sm" asChild>
              <Link href={project.repoLink} target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4 mr-2" /> Source
              </Link>
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
