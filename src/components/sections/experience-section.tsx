
import { Briefcase, CalendarDays } from "lucide-react";
import { portfolioData, type ExperienceEntry } from "@/lib/data"; // Assuming portfolioData contains the experience data
import { Badge } from "@/components/ui/badge";

export default function ExperienceSection() {
  return (
    <section id="experience" className="bg-secondary/50 dark:bg-secondary/20 w-full px-4 sm:px-6 lg:px-8"> 
      <div className="container mx-auto"> 
        <div className="text-center mb-10 md:mb-12 animate-fadeInUp max-w-3xl mx-auto"> 
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl text-primary">My Journey</h2>
          <p className="mt-3 sm:mt-4 text-base sm:text-lg text-foreground/80">
            A timeline of my professional experience and growth.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto"> 
          {/* Vertical line */}
          <div className="absolute left-4 md:left-1/2 top-0 h-full w-0.5 bg-border -translate-x-1/2" aria-hidden="true"></div>

          {/* Ensure component iterates through all entries */}
          {portfolioData.experience.map((exp, index) => {
            // Determine alignment based on index for alternating layout
            const isEven = index % 2 === 0;
            return (
            <ExperienceItem key={index} experience={exp} index={index} />
          )})}
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
    <div className={`relative mb-8 sm:mb-12 animate-fadeInUp`} style={{animationDelay: `${index * 0.2}s`}}>
      <div className="md:flex items-start">
        {/* Desktop: Alternating sides - Placeholder for structure */}
        <div className={`hidden md:block w-1/2 ${isEven ? 'pr-6 lg:pr-8 text-right' : 'pl-6 lg:pl-8 text-left order-2'}`}>
          {/* Content for desktop, aligned by isEven - not strictly needed if card is always on one side for content flow */}
        </div>
        
        {/* Mobile: Always on the right of the line */}
        {/* Desktop: Dot and Content */}
        <div className={`w-full md:w-1/2 ${isEven ? 'md:pl-6 lg:md:pl-8' : 'md:pr-6 lg:md:pr-8 md:text-right'}`}>
           {/* Dot on the line */}
          <div className="absolute left-4 top-1 w-3 h-3 bg-primary rounded-full transform -translate-x-[calc(50%-2px)] md:left-1/2 md:-translate-x-1/2" aria-hidden="true"></div>
          <div className="ml-10 md:ml-0 bg-card p-4 sm:p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center gap-2 mb-1">
 {experience.imageUrl && (
 <img src={experience.imageUrl} alt={`${experience.company} logo`} className="h-6 w-6 sm:h-7 sm:w-7 object-contain" />
 )}
              {/* <Briefcase className="h-4 w-4 sm:h-5 sm:w-5 text-accent" /> */}
              <h3 className="text-lg sm:text-xl font-semibold text-primary">{experience.role}</h3>
            </div>
            <p className="text-base sm:text-md font-medium text-foreground/90">{experience.company}</p>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground mt-1 mb-2 sm:mb-3">
              <CalendarDays className="h-3 w-3 sm:h-4 sm:w-4" />
              <span>{experience.period}</span>
            </div>
            <p className="text-foreground/80 text-sm sm:text-base mb-3">{experience.description}</p>
            {experience.techStack && experience.techStack.length > 0 && (
              <div className={`flex flex-wrap gap-1.5 sm:gap-2 ${!isEven && 'md:justify-end'}`}>
                {experience.techStack.map(skill => (
                  <Badge key={skill} variant="outline" className="text-[0.65rem] sm:text-xs px-1.5 sm:px-2 py-0.5">{skill}</Badge>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
