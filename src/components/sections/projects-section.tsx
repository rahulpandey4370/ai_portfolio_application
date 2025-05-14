import ProjectCard from '@/components/project-card';
import { portfolioData } from '@/lib/data';

export default function ProjectsSection() {
  return (
    <section id="projects" className="bg-background">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12 animate-fadeInUp">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-primary">My Projects</h2>
          <p className="mt-4 text-lg text-foreground/80 max-w-2xl mx-auto">
            A selection of projects I've worked on, demonstrating my skills and interests.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {portfolioData.projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
