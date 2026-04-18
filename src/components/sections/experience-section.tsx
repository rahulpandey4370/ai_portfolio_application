import { CalendarDays } from 'lucide-react';
import { portfolioData, type ExperienceEntry } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

function formatCompanyDuration(startDate: string, endDate?: string) {
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : new Date();

  let months = (end.getFullYear() - start.getFullYear()) * 12;
  months += end.getMonth() - start.getMonth();

  if (end.getDate() < start.getDate()) {
    months -= 1;
  }

  const safeMonths = Math.max(months, 0);
  const years = Math.floor(safeMonths / 12);
  const remainingMonths = safeMonths % 12;

  if (years === 0) {
    return `${remainingMonths} month${remainingMonths === 1 ? '' : 's'}`;
  }

  if (remainingMonths === 0) {
    return `${years} year${years === 1 ? '' : 's'}`;
  }

  return `${years} year${years === 1 ? '' : 's'} ${remainingMonths} month${remainingMonths === 1 ? '' : 's'}`;
}

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

        <TooltipProvider delayDuration={120}>
          <div className="relative max-w-5xl mx-auto">
            <div className="absolute left-4 md:left-1/2 top-0 h-full w-0.5 bg-border -translate-x-1/2" aria-hidden="true"></div>

            {portfolioData.experience.map((exp, index) => (
              <ExperienceItem key={exp.company} experience={exp} index={index} />
            ))}
          </div>
        </TooltipProvider>
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
  const durationLabel = formatCompanyDuration(experience.startDate, experience.endDate);

  return (
    <div className="relative mb-8 sm:mb-12 animate-fadeInUp" style={{ animationDelay: `${index * 0.2}s` }}>
      <div className="md:flex items-start">
        <div className={`hidden md:block w-1/2 ${isEven ? 'pr-6 lg:pr-8 text-right' : 'pl-6 lg:pl-8 text-left order-2'}`}>
        </div>

        <div className={`w-full md:w-1/2 ${isEven ? 'md:pl-6 lg:pl-8' : 'md:pr-6 lg:pr-8 md:text-right'}`}>
          <div
            className="absolute left-4 top-1 w-3 h-3 bg-primary rounded-full transform -translate-x-[calc(50%-2px)] md:left-1/2 md:-translate-x-1/2"
            aria-hidden="true"
          ></div>
          <div className="ml-10 md:ml-0 bg-card p-4 sm:p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center gap-2 mb-1">
              {experience.imageUrl && (
                <img
                  src={experience.imageUrl}
                  alt={`${experience.company} logo`}
                  className="h-6 w-6 sm:h-7 sm:w-7 object-contain"
                />
              )}
              <h3 className="text-lg sm:text-xl font-semibold text-primary">{experience.role}</h3>
            </div>

            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  className="text-left text-base sm:text-md font-medium text-foreground/90 underline decoration-dotted underline-offset-4 decoration-primary/50 hover:text-primary transition-colors"
                >
                  {experience.company}
                </button>
              </TooltipTrigger>
              <TooltipContent side="top" className="max-w-sm p-4">
                <div className="space-y-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-primary">Time at Company</p>
                    <p className="text-sm text-foreground/90">{durationLabel}</p>
                  </div>
                  {experience.skillsGained && experience.skillsGained.length > 0 && (
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-primary">Skills Gained</p>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {experience.skillsGained.map((skill) => (
                          <Badge key={skill} variant="secondary" className="text-[0.7rem]">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  {experience.notableProjects && experience.notableProjects.length > 0 && (
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-primary">Projects</p>
                      <ul className="mt-2 space-y-1 text-sm text-foreground/80">
                        {experience.notableProjects.map((project) => (
                          <li key={project}>{project}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </TooltipContent>
            </Tooltip>

            <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground mt-1 mb-2 sm:mb-3">
              <CalendarDays className="h-3 w-3 sm:h-4 sm:w-4" />
              <span>{experience.period}</span>
            </div>
            <p className="text-foreground/80 text-sm sm:text-base mb-3">{experience.description}</p>
            {experience.techStack && experience.techStack.length > 0 && (
              <div className={`flex flex-wrap gap-1.5 sm:gap-2 ${!isEven && 'md:justify-end'}`}>
                {experience.techStack.map((skill) => (
                  <Badge key={skill} variant="outline" className="text-[0.65rem] sm:text-xs px-1.5 sm:px-2 py-0.5">
                    {skill}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
