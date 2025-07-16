
import Link from 'next/link';
import ProjectCard from '@/components/project-card';
import { portfolioData } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

const showcasedProjects = [
  {
    title: "Notora AI",
    url: "https://notora-ai.vercel.app/showcase/dashboard",
    description: "An AI-powered and gamified application for managing to-dos, taking notes, and saving links."
  },
  {
    title: "Finwise AI",
    url: "https://finwise-ai.vercel.app/demo",
    description: "A smart expense tracker with AI-driven spending forecasts, a finance chatbot, visual dashboards, and yearly overviews."
  },
  {
    title: "Prompt Pavilion",
    url: "https://prompt-pavilion.vercel.app/",
    description: "An interactive site teaching the core components of prompt engineering through a hands-on playground and visual cues."
  },
  {
    title: "Product Pavilion 2025",
    url: "https://product-pavilion-2025.vercel.app/",
    description: "A public project showcasing the manufacturing team's capabilities at Epicor."
  },
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="bg-background w-full px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="text-center mb-10 md:mb-12 animate-fadeInUp max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl text-primary">My Projects</h2>
          <p className="mt-3 sm:mt-4 text-base sm:text-lg text-foreground/80">
            A selection of projects I've worked on, demonstrating my skills and interests.
          </p>
        </div>

        {/* Live Project Showcase */}
        <div className="mb-16">
            <h3 className="text-xl sm:text-2xl font-semibold tracking-tight mb-6 sm:mb-8 text-center text-accent dark:text-primary">
                Live Project Showcase
            </h3>
            <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2">
                {showcasedProjects.map((project, index) => (
                    <Card 
                        key={index} 
                        className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col animate-fadeInUp h-[600px]"
                        style={{ animationDelay: `${index * 0.15}s` }}
                    >
                        <CardHeader>
                            <div className="flex justify-between items-start gap-4">
                                <div>
                                    <CardTitle className="text-lg mb-1">{project.title}</CardTitle>
                                    <CardDescription className="text-xs">{project.description}</CardDescription>
                                </div>
                                <Button asChild variant="outline" size="sm" className="flex-shrink-0">
                                    <Link href={project.url} target="_blank" rel="noopener noreferrer">
                                        Open Full Site
                                        <ExternalLink className="ml-2 h-4 w-4" />
                                    </Link>
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent className="flex-grow p-0 border-t">
                            <iframe
                                src={project.url}
                                className="w-full h-full border-0"
                                title={project.title}
                                sandbox="allow-scripts allow-same-origin allow-forms"
                            />
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>

        <div className="grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
          {portfolioData.projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
