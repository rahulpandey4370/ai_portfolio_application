
"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useTransition } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github, Sparkles, Loader2 } from 'lucide-react';
import type { ProjectEntry } from '@/lib/data';
import { summarizeProject, type SummarizeProjectInput } from '@/ai/flows/project-summarizer';
import { generateProjectImage, type GenerateProjectImageInput } from '@/ai/flows/project-image-generator';

interface ProjectCardProps {
  project: ProjectEntry;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const [summary, setSummary] = useState<string | null>(null);
  const [isLoadingSummary, setIsLoadingSummary] = useState(false);
  
  const [displayedImageUrl, setDisplayedImageUrl] = useState<string>(project.imageUrl);
  const [isImageLoading, setIsImageLoading] = useState(!!project.imageGenerationPrompt); // Only true if we intend to generate

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
      console.error("Failed to fetch summary for project:", project.title, error);
      setSummary("Click to learn more about this exciting project!"); // Fallback teaser
    } finally {
      setIsLoadingSummary(false);
    }
  };

  useEffect(() => {
    startSummaryTransition(() => {
      fetchSummary();
    });
  }, [project.longDescription, project.title]); // Added project.title to dependencies for safety, though longDescription should be key


  useEffect(() => {
    const fetchImage = async () => {
      if (!project.imageGenerationPrompt) {
        setIsImageLoading(false); // No prompt, use project.imageUrl, stop loading
        return;
      }
      
      // If we reach here, it means project.imageGenerationPrompt exists.
      setIsImageLoading(true); 
      try {
        const input: GenerateProjectImageInput = { prompt: project.imageGenerationPrompt };
        const result = await generateProjectImage(input);
        if (result.imageDataUri) {
          setDisplayedImageUrl(result.imageDataUri);
        } else {
           // Fallback to initial placeholder if generation returns nothing
           setDisplayedImageUrl(project.imageUrl);
        }
      } catch (error) {
        console.error("Failed to fetch project image for:", project.title, error);
        setDisplayedImageUrl(project.imageUrl); // Fallback to initial placeholder
      } finally {
        setIsImageLoading(false);
      }
    };

    if (project.imageGenerationPrompt) { // Only run if a prompt is provided
        startImageTransition(() => {
          fetchImage();
        });
    }
  }, [project.imageGenerationPrompt, project.imageUrl, project.title]);

  return (
    <Card 
      className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col animate-fadeInUp h-full"
      style={{ animationDelay: `${index * 0.15}s` }}
    >
      <CardHeader className="p-0">
        <div className="relative aspect-video w-full bg-muted">
          {isImageLoading ? (
            <div className="absolute inset-0 flex items-center justify-center bg-secondary/30">
              <Loader2 className="h-12 w-12 text-primary animate-spin" />
            </div>
          ) : (
            <Image
              src={displayedImageUrl}
              alt={project.title}
              layout="fill"
              objectFit="cover"
              className="transition-opacity duration-500"
              data-ai-hint={project.dataAiHint}
              unoptimized={displayedImageUrl.startsWith('data:') || displayedImageUrl.startsWith('blob:')}
            />
          )}
        </div>
      </CardHeader>
      <CardContent className="p-6 flex-grow">
        <CardTitle className="text-xl font-semibold mb-2 text-primary">{project.title}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground mb-3 h-20 overflow-y-auto">
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
          <div 
              className="text-xs text-muted-foreground mt-2 p-3 border border-dashed rounded-md min-h-[4rem] bg-secondary/30 flex items-center text-left"
          >
            {isLoadingSummary ? (
              <div className="flex items-center w-full">
                  <Loader2 className="h-4 w-4 animate-spin mr-2 text-primary" /> <span>Unveiling insights...</span>
              </div>
            ) : summary ? (
              <div className="flex items-start w-full">
                  <Sparkles className="h-4 w-4 mr-2 mt-0.5 text-accent flex-shrink-0" />
                  <span>{summary}</span>
              </div>
            ) : (
              <span className="italic w-full">Loading project details...</span>
            )}
          </div>
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
