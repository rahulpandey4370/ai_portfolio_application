import Link from 'next/link';
import ProjectCard from '@/components/project-card';
import { portfolioData, type ProjectEntry } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

interface ShowcaseProject {
  title: string;
  category: 'company' | 'personal';
  url: string;
  description: string;
}

const showcasedProjects: ShowcaseProject[] = [
  {
    title: 'Prompt Pavilion',
    category: 'company',
    url: 'https://prompt-pavilion.vercel.app/',
    description: 'An interactive site that teaches prompt engineering through hands-on examples, structured learning paths, and visual guidance.',
  },
  {
    title: 'Product Pavilion 2025',
    category: 'company',
    url: 'https://product-pavilion-2025.vercel.app/',
    description: 'A public-facing experience highlighting team capabilities, product value, and manufacturing-oriented solution storytelling.',
  },
  {
    title: 'Notora AI',
    category: 'personal',
    url: 'https://notora-ai.vercel.app/showcase/dashboard',
    description: 'An AI-powered and gamified application for managing to-dos, taking notes, and saving links.',
  },
  {
    title: 'Finwise AI',
    category: 'personal',
    url: 'https://finwise-ai.vercel.app/demo',
    description: 'A smart expense tracker with AI-driven forecasts, a finance chatbot, visual dashboards, and yearly overviews.',
  },
];

function ShowcaseGrid({
  heading,
  description,
  projects,
}: {
  heading: string;
  description: string;
  projects: ShowcaseProject[];
}) {
  if (projects.length === 0) {
    return null;
  }

  return (
    <div className="mb-16">
      <div className="text-center mb-6 sm:mb-8 max-w-3xl mx-auto">
        <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-accent dark:text-primary">{heading}</h3>
        <p className="mt-2 text-sm sm:text-base text-foreground/75">{description}</p>
      </div>
      <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2">
        {projects.map((project, index) => (
          <Card
            key={project.title}
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
  );
}

function ProjectGrid({
  heading,
  description,
  projects,
}: {
  heading: string;
  description: string;
  projects: ProjectEntry[];
}) {
  if (projects.length === 0) {
    return null;
  }

  return (
    <div className="mb-16">
      <div className="text-center mb-6 sm:mb-8 max-w-3xl mx-auto">
        <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-primary">{heading}</h3>
        <p className="mt-2 text-sm sm:text-base text-foreground/75">{description}</p>
      </div>
      <div className="grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </div>
  );
}

export default function ProjectsSection() {
  const companyProjects = portfolioData.projects.filter((project) => project.category === 'company');
  const personalProjects = portfolioData.projects.filter((project) => project.category === 'personal');
  const latestWorkProjects = companyProjects.filter((project) => project.isLatest);
  const workExperienceProjects = companyProjects.filter((project) => !project.isLatest);
  const allWorkProjects = [...latestWorkProjects, ...workExperienceProjects];
  const companyPublicProjects = showcasedProjects.filter((project) => project.category === 'company');
  const personalPublicProjects = showcasedProjects.filter((project) => project.category === 'personal');

  return (
    <section id="projects" className="bg-background w-full px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="text-center mb-10 md:mb-12 animate-fadeInUp max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl text-primary">My Projects</h2>
          <p className="mt-3 sm:mt-4 text-base sm:text-lg text-foreground/80">
            A curated mix of enterprise AI work, public-facing builds, and personal experiments that reflect how I design, ship, and scale products.
          </p>
        </div>

        <ShowcaseGrid
          heading="Public Work Showcase"
          description="Public-facing demos and sites connected to professional work and product storytelling."
          projects={companyPublicProjects}
        />

        <div className="mb-16">
          <div className="text-center mb-8 sm:mb-10 max-w-4xl mx-auto">
            <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-primary">
              Enterprise-Grade Work [Work Experience]
            </h3>
            <p className="mt-2 text-sm sm:text-base text-foreground/75">
              Enterprise AI, modernization, data, and platform projects delivered across product, transformation, and client-facing environments.
            </p>
          </div>

          <div className="grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
            {allWorkProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>

        <ShowcaseGrid
          heading="Personal Live Projects"
          description="Interactive personal builds where I experiment with AI products, UX patterns, and end-to-end application delivery."
          projects={personalPublicProjects}
        />

        <ProjectGrid
          heading="Built for Myself [Personal Projects]"
          description="Independent builds and research-led experiments across AI products, personal tooling, and end-to-end application delivery."
          projects={personalProjects}
        />
      </div>
    </section>
  );
}
