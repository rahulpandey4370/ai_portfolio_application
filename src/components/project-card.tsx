
"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useTransition, Suspense } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ExternalLink, Github, Sparkles, Loader2 } from 'lucide-react';
import type { ProjectEntry } from '@/lib/data';
import { summarizeProject, type SummarizeProjectInput } from '@/ai/flows/project-summarizer';
import { generateProjectImage, type GenerateProjectImageInput } from '@/ai/flows/project-image-generator';
import { Skeleton } from '@/components/ui/skeleton';

interface ProjectCardProps {
  project: ProjectEntry;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const [summary, setSummary] = useState<string | null>(null);
  const [isLoadingSummary, setIsLoadingSummary] = useState(false);
  const [isSummaryHovering, setIsSummaryHovering] = useState(false);
  
  const [displayedImageUrl, setDisplayedImageUrl] = useState<string>(project.imageUrl);
  const [isImageLoading, setIsImageLoading] = useState(true); // Start loading image on mount

  const [_isPendingSummary, startSummaryTransition] = useTransition();
  const [_isPendingImage, startImageTransition] = useTransition();

  const fetchSummary = async () => {
    if (!project.longDescription || summary || isLoadingSummary) return;
    
    setIsLoadingSummary(true);
    try {
      const input: SummarizeProjectInput = { projectDescription: project.longDescription };
      const result = await summarizeProject(input);
      setSummary(result.summary);
    } catch (error) {
      console.error("Failed to fetch summary:", error);
      setSummary("Could not load summary.");
    } finally {
      setIsLoadingSummary(false);
    }
  };

  useEffect(() => {
    if (isSummaryHovering && !summary && !isLoadingSummary) {
      startSummaryTransition(() => {
        fetchSummary();
      });
    }
  }, [isSummaryHovering, summary, isLoadingSummary, project.longDescription, startSummaryTransition]);


  useEffect(() => {
    const fetchImage = async () => {
      if (!project.imageGenerationPrompt) {
        setIsImageLoading(false); // No prompt, stop loading
        return;
      }
      
      setIsImageLoading(true);
      try {
        const input: GenerateProjectImageInput = { prompt: project.imageGenerationPrompt };
        const result = await generateProjectImage(input);
        if (result.imageDataUri && result.imageDataUri !== displayedImageUrl) {
          setDisplayedImageUrl(result.imageDataUri);
        }
      } catch (error) {
        console.error("Failed to fetch project image:", error);
        // Keep placeholder if generation fails
      } finally {
        setIsImageLoading(false);
      }
    };

    startImageTransition(() => {
      fetchImage();
    });
  }, [project.imageGenerationPrompt, project.imageUrl]); // project.imageUrl removed as it's static

  return (
    <Card 
      className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col animate-fadeInUp h-full"
      style={{ animationDelay: `${index * 0.15}s` }}
      onMouseEnter={() => setIsSummaryHovering(true)}
      onMouseLeave={() => setIsSummaryHovering(false)}
    >
      <CardHeader className="p-0">
        <div className="relative aspect-video w-full bg-muted">
          {isImageLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="h-12 w-12 text-primary animate-spin" />
            </div>
          ) : (
            <Image
              src={displayedImageUrl}
              alt={project.title}
              layout="fill"
              objectFit="cover"
              className="transition-opacity duration-500"
              data-ai-hint={project.dataAiHint} // Keep hint for placeholder or if generation fails
              unoptimized={displayedImageUrl.startsWith('data:')} // Important for data URIs
            />
          )}
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
              <Badge 
                key={tech} 
                variant="secondary" 
                className="text-xs bg-accent/10 text-accent-foreground hover:bg-accent/20 dark:bg-accent dark:text-accent-foreground dark:hover:bg-accent/80"
              >
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
                    <span className="italic">Hover card to see AI summary.</span>
                  )}
                </div>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="max-w-xs bg-background border-border text-foreground shadow-lg">
                <p>{summary || "AI-generated project summary will appear here upon hover."}</p>
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
