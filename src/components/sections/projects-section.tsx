
import ProjectCard from '@/components/project-card';
import { portfolioData } from '@/lib/data';

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
        <div className="grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto"> 
          {portfolioData.projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
