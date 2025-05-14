
import ProjectCard from '@/components/project-card';
import { portfolioData } from '@/lib/data';

export default function ProjectsSection() {
  return (
    <section id="projects" className="bg-background w-full px-4 sm:px-6 lg:px-8"> {/* Changed container to w-full and padding */}
      <div className="container mx-auto"> {/* Added container here to constrain inner content */}
        <div className="text-center mb-12 animate-fadeInUp max-w-3xl mx-auto"> {/* Kept max-width for text block, increased from 2xl to 3xl */}
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-primary">My Projects</h2>
          <p className="mt-4 text-lg text-foreground/80">
            A selection of projects I've worked on, demonstrating my skills and interests.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto"> {/* Kept max-width and mx-auto to the grid. This is already quite wide. */}
          {portfolioData.projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
