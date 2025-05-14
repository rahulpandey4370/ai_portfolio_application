import { Briefcase, CalendarDays } from "lucide-react";
import { portfolioData, type ExperienceEntry } from "@/lib/data";
import { Badge } from "@/components/ui/badge";

export default function ExperienceSection() {
  return (
    <section id="experience" className="bg-secondary/50 dark:bg-secondary/20">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12 animate-fadeInUp">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-primary">My Journey</h2>
          <p className="mt-4 text-lg text-foreground/80 max-w-2xl mx-auto">
            A timeline of my professional experience and growth.
          </p>
        </div>

        <div className="relative max-w-3xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-4 md:left-1/2 top-0 h-full w-0.5 bg-border -translate-x-1/2" aria-hidden="true"></div>

          {portfolioData.experience.map((exp, index) => (
            <ExperienceItem key={index} experience={exp} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

interface ExperienceItemProps {
  experience: ExperienceEntry;
  index: number;
}

function ExperienceItem({ experience, index }: ExperienceItemProps) {
  const isEven = index % 2 === 0;
  return (
    <div className={`relative mb-12 animate-fadeInUp`} style={{animationDelay: `${index * 0.2}s`}}>
      <div className="md:flex items-start">
        {/* Desktop: Alternating sides */}
        <div className={`hidden md:block w-1/2 ${isEven ? 'pr-8 text-right' : 'pl-8 text-left order-2'}`}>
          {/* Content for desktop, aligned by isEven */}
        </div>
        
        {/* Mobile: Always on the right of the line */}
        {/* Desktop: Dot and Content */}
        <div className={`w-full md:w-1/2 ${isEven ? 'md:pl-8' : 'md:pr-8 md:text-right'}`}>
           {/* Dot on the line */}
          <div className="absolute left-4 top-1 w-3 h-3 bg-primary rounded-full transform -translate-x-[calc(50%-2px)] md:left-1/2 md:-translate-x-1/2" aria-hidden="true"></div>
          <div className="ml-10 md:ml-0 bg-card p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center gap-2 mb-1">
              <Briefcase className="h-5 w-5 text-accent" />
              <h3 className="text-xl font-semibold text-primary">{experience.role}</h3>
            </div>
            <p className="text-md font-medium text-foreground/90">{experience.company}</p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1 mb-3">
              <CalendarDays className="h-4 w-4" />
              <span>{experience.period}</span>
            </div>
            <p className="text-foreground/80 text-sm mb-3">{experience.description}</p>
            {experience.techStack && experience.techStack.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {experience.techStack.map(skill => (
                  <Badge key={skill} variant="outline" className="text-xs">{skill}</Badge>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
