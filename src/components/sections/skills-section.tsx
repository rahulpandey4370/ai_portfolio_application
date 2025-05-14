
"use client";

import Image from 'next/image';
import { portfolioData, type SkillEntry } from '@/lib/data';
import * as LucideIcons from 'lucide-react';
import { cn } from '@/lib/utils';

// Helper function to get the Lucide icon component
const getIconComponent = (iconName?: keyof typeof LucideIcons): React.FC<LucideIcons.LucideProps> | null => {
  if (!iconName) return null;
  const IconComponent = LucideIcons[iconName] as React.FC<LucideIcons.LucideProps>;
  return IconComponent || null;
};

interface SkillItemProps {
  skill: SkillEntry;
  index: number;
}

const SkillItem: React.FC<SkillItemProps> = ({ skill, index }) => {
  const IconComponent = getIconComponent(skill.iconName);

  const sizeClasses = {
    high: 'p-3 min-h-[80px]',
    medium: 'p-2.5 min-h-[70px]',
    low: 'p-2 min-h-[60px]',
  };

  const iconOrImageSizeClasses = {
    high: 'h-7 w-7 mb-1.5',
    medium: 'h-6 w-6 mb-1',
    low: 'h-5 w-5 mb-1',
  };
  
  const textSizeClasses = {
    high: 'text-sm font-semibold',
    medium: 'text-xs font-semibold',
    low: 'text-xs font-normal',
  };

  return (
    <div
      className={cn(
        'bg-card text-card-foreground rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col items-center justify-center text-center border border-border/20 hover:border-primary/50',
        sizeClasses[skill.level],
        'animate-fadeInUp'
      )}
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      {skill.imageUrl ? (
        <Image
          src={skill.imageUrl}
          alt={`${skill.name} logo`}
          width={skill.level === 'high' ? 28 : skill.level === 'medium' ? 24 : 20} 
          height={skill.level === 'high' ? 28 : skill.level === 'medium' ? 24 : 20}
          className={cn('object-contain', iconOrImageSizeClasses[skill.level])}
        />
      ) : IconComponent ? (
        <IconComponent className={cn('text-primary', iconOrImageSizeClasses[skill.level])} strokeWidth={1.5} />
      ) : null}
      <span className={cn(textSizeClasses[skill.level], 'leading-tight mt-1')}>{skill.name}</span>
    </div>
  );
};

export default function SkillsSection() {
  const skillCategories = ['Technical', 'Machine Learning & AI', 'Soft Skills'] as const;

  return (
    <section id="skills" className="w-full px-4 sm:px-6 lg:px-8"> {/* Changed container to w-full and padding */}
      <div className="text-center mb-12 animate-fadeInUp max-w-2xl mx-auto"> {/* Kept max-width for text block */}
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-primary">Skills Arsenal</h2>
        <p className="mt-4 text-lg text-foreground/80">
          A showcase of my diverse technical and soft skills, honed through experience and continuous learning.
        </p>
      </div>

      {skillCategories.map((category, catIndex) => {
        const skillsInCategory = portfolioData.skills.filter(skill => skill.category === category);
        if (skillsInCategory.length === 0) return null;

        return (
          <div key={category} className="mb-12 animate-fadeInUp max-w-5xl mx-auto" style={{animationDelay: `${catIndex * 0.2}s`}}> {/* Kept max-width for category block */}
            <h3 className="text-2xl font-semibold tracking-tight mb-6 text-center sm:text-left text-secondary-foreground dark:text-primary-foreground/90 border-b-2 border-primary/50 pb-2">
              {category}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4">
              {skillsInCategory.map((skill, index) => (
                <SkillItem key={skill.name} skill={skill} index={index} />
              ))}
            </div>
          </div>
        );
      })}
    </section>
  );
}
