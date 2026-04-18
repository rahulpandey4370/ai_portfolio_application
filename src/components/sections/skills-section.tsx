"use client";

import Image from 'next/image';
import * as LucideIcons from 'lucide-react';
import { portfolioData, type SkillEntry } from '@/lib/data';
import { cn } from '@/lib/utils';

const getIconComponent = (iconName?: string): React.FC<LucideIcons.LucideProps> | null => {
  if (!iconName) return null;
  const IconComponent = LucideIcons[iconName as keyof typeof LucideIcons] as React.FC<LucideIcons.LucideProps>;
  return IconComponent || null;
};

const sectionMeta = {
  'Core Skills': {
    eyebrow: 'Primary Focus',
    title: 'Core Skills',
    description:
      'The stack I rely on most for enterprise AI delivery: modern AI/ML systems, Python frameworks, cloud platforms, data engineering foundations, and agentic coding workflows.',
    shellClass:
      'border-primary/20 bg-[linear-gradient(145deg,hsl(var(--primary)/0.10),transparent_38%),linear-gradient(180deg,hsl(var(--card)),hsl(var(--card)/0.96))]',
  },
  'Additional Skills': {
    eyebrow: 'Also In Use',
    title: 'Additional Skills',
    description:
      'Supporting product, frontend, and engineering skills that round out delivery across full-stack applications and production systems.',
    shellClass:
      'border-border/70 bg-[linear-gradient(145deg,hsl(var(--accent)/0.10),transparent_34%),linear-gradient(180deg,hsl(var(--card)),hsl(var(--card)/0.96))]',
  },
} as const;

const subsectionMeta: Record<string, { description: string }> = {
  'AI & ML Systems': {
    description: 'Core modeling, orchestration, retrieval, evaluation, and real-time AI capabilities.',
  },
  'Python & AI Frameworks': {
    description: 'Python-first frameworks and libraries used for model building, RAG, and AI application development.',
  },
  'Cloud & AI Platforms': {
    description: 'Cloud services and infrastructure used for deploying, scaling, and securing AI systems.',
  },
  'AI Tools & Coding Agents': {
    description: 'AI-native developer tools and coding agents used to accelerate implementation and experimentation.',
  },
  'Data Engineering & Systems': {
    description: 'The data pipelines, streaming systems, APIs, and infrastructure patterns that support production AI workloads.',
  },
  'Frontend & Product Engineering': {
    description: 'Frontend technologies used to ship polished product experiences and production interfaces.',
  },
  'Workflow & Collaboration': {
    description: 'Delivery habits and collaboration strengths that help move complex product work forward.',
  },
  'Soft Skills': {
    description: 'The people, communication, and ownership strengths that support strong technical execution.',
  },
};

const sectionOrder = ['Core Skills', 'Additional Skills'] as const;

const subsectionOrder: Record<(typeof sectionOrder)[number], string[]> = {
  'Core Skills': ['AI & ML Systems', 'Python & AI Frameworks', 'Cloud & AI Platforms', 'Data Engineering & Systems', 'AI Tools & Coding Agents'],
  'Additional Skills': ['Frontend & Product Engineering', 'Workflow & Collaboration', 'Soft Skills'],
};

interface SkillItemProps {
  skill: SkillEntry;
  index: number;
  compact?: boolean;
}

function SkillItem({ skill, index, compact = false }: SkillItemProps) {
  const IconComponent = getIconComponent(skill.iconName);

  const sizeClasses = {
    high: 'min-h-[80px] p-3',
    medium: 'min-h-[74px] p-3',
    low: 'min-h-[68px] p-2.5',
  };

  const iconSizeClasses = {
    high: 'h-6 w-6',
    medium: 'h-5 w-5',
    low: 'h-4 w-4',
  };

  const imageSizes = {
    high: 28,
    medium: 24,
    low: 20,
  };

  const compactSizeClasses = {
    high: 'min-h-[64px] p-2.5',
    medium: 'min-h-[58px] p-2.5',
    low: 'min-h-[54px] p-2',
  };

  const compactIconSizeClasses = {
    high: 'h-5 w-5',
    medium: 'h-[18px] w-[18px]',
    low: 'h-4 w-4',
  };

  const compactImageSizes = {
    high: 22,
    medium: 20,
    low: 18,
  };

  return (
    <div
      className={cn(
        'animate-fadeInUp rounded-2xl border border-border/50 bg-background/80 text-center shadow-[0_16px_35px_-28px_rgba(15,23,42,0.6)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/35 hover:shadow-[0_20px_45px_-26px_hsl(var(--primary)/0.35)]',
        compact ? compactSizeClasses[skill.level] : sizeClasses[skill.level]
      )}
      style={{ animationDelay: `${index * 0.04}s` }}
    >
      <div className="flex h-full flex-col items-center justify-center gap-2">
        {skill.imageUrl ? (
          <Image
            src={skill.imageUrl}
            alt={`${skill.name} logo`}
            width={compact ? compactImageSizes[skill.level] : imageSizes[skill.level]}
            height={compact ? compactImageSizes[skill.level] : imageSizes[skill.level]}
            className="object-contain"
          />
        ) : IconComponent ? (
          <IconComponent
            className={cn('text-primary', compact ? compactIconSizeClasses[skill.level] : iconSizeClasses[skill.level])}
            strokeWidth={1.7}
          />
        ) : null}
        <span
          className={cn(
            'leading-tight text-foreground',
            compact
              ? skill.level === 'high'
                ? 'text-xs font-semibold'
                : 'text-[0.7rem] font-semibold'
              : skill.level === 'high'
                ? 'text-sm font-semibold'
                : skill.level === 'medium'
                  ? 'text-xs font-semibold'
                  : 'text-xs font-medium'
          )}
        >
          {skill.name}
        </span>
      </div>
    </div>
  );
}

export default function SkillsSection() {
  const skillsBySection = sectionOrder.map((section) => ({
    section,
    skills: portfolioData.skills.filter((skill) => skill.section === section),
  }));

  return (
    <section id="skills" className="w-full px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl text-center animate-fadeInUp">
        <h2 className="text-2xl font-bold tracking-tight text-primary sm:text-3xl md:text-4xl">Skills Stack</h2>
        <p className="mt-3 text-base text-foreground/80 sm:text-lg">
          A clearer breakdown of what I use most deeply in AI/ML work, followed by the additional technologies I use to ship complete products.
        </p>
      </div>

      <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-8 md:mt-12">
        {skillsBySection.map(({ section, skills }, sectionIndex) => {
          if (skills.length === 0) return null;

          const meta = sectionMeta[section];
          const isAdditionalSection = section === 'Additional Skills';
          const isCoreSection = section === 'Core Skills';
          const subsectionSkills = subsectionOrder[section]
            .map((subsection) => ({
              subsection,
              skills: skills.filter((skill) => skill.subsection === subsection),
            }))
            .filter((group) => group.skills.length > 0);

          const primaryCoreGroups = isCoreSection ? subsectionSkills.slice(0, 2) : subsectionSkills;
          const compactCoreGroups = isCoreSection ? subsectionSkills.slice(2) : [];

          return (
            <div
              key={section}
              className={cn(
                'animate-fadeInUp overflow-hidden rounded-[30px] border p-5 shadow-[0_28px_70px_-52px_rgba(15,23,42,0.5)] sm:p-6 lg:p-8',
                isAdditionalSection && 'lg:p-6',
                meta.shellClass
              )}
              style={{ animationDelay: `${sectionIndex * 0.14}s` }}
            >
              <div className={cn('flex flex-col gap-4 border-b border-border/50 pb-5 sm:pb-6', isAdditionalSection && 'pb-4')}>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-primary/80">
                    {meta.eyebrow}
                  </p>
                  <h3 className="mt-3 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                    {meta.title}
                  </h3>
                </div>
                <p className={cn('max-w-4xl text-sm leading-7 text-foreground/75 sm:text-base', isAdditionalSection && 'max-w-3xl text-[0.95rem] leading-6')}>
                  {meta.description}
                </p>
              </div>

              <div className="mt-6 space-y-4">
                <div className={cn('grid gap-5 lg:grid-cols-2', isAdditionalSection && 'gap-4 lg:grid-cols-3')}>
                  {primaryCoreGroups.map(({ subsection, skills: groupedSkills }, subsectionIndex) => (
                    <div
                      key={subsection}
                      className={cn(
                        'animate-fadeInUp rounded-[24px] border border-border/50 bg-background/72 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.14)] backdrop-blur-sm sm:p-5',
                        isAdditionalSection && 'rounded-[22px] p-3.5 sm:p-4'
                      )}
                      style={{ animationDelay: `${sectionIndex * 0.14 + subsectionIndex * 0.08}s` }}
                    >
                      <div className={cn('mb-4', isAdditionalSection && 'mb-3')}>
                        <h4 className={cn('text-lg font-semibold tracking-tight text-foreground', isAdditionalSection && 'text-base')}>
                          {subsection}
                        </h4>
                        <p className={cn('mt-2 text-sm leading-6 text-muted-foreground', isAdditionalSection && 'text-xs leading-5')}>
                          {subsectionMeta[subsection]?.description}
                        </p>
                      </div>

                      <div className={cn('grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4', isAdditionalSection && 'gap-2.5 sm:grid-cols-2 xl:grid-cols-2')}>
                        {groupedSkills.map((skill, index) => (
                          <SkillItem key={skill.name} skill={skill} index={index} compact={isAdditionalSection} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {compactCoreGroups.length > 0 && (
                  <div className="grid gap-4 lg:grid-cols-3">
                    {compactCoreGroups.map(({ subsection, skills: groupedSkills }, subsectionIndex) => (
                      <div
                        key={subsection}
                        className="animate-fadeInUp rounded-[22px] border border-border/50 bg-background/72 p-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.14)] backdrop-blur-sm sm:p-4"
                        style={{ animationDelay: `${sectionIndex * 0.14 + (subsectionIndex + 2) * 0.08}s` }}
                      >
                        <div className="mb-3">
                          <h4 className="text-base font-semibold tracking-tight text-foreground">{subsection}</h4>
                          <p className="mt-2 text-xs leading-5 text-muted-foreground">
                            {subsectionMeta[subsection]?.description}
                          </p>
                        </div>

                        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-2">
                          {groupedSkills.map((skill, index) => (
                            <SkillItem key={skill.name} skill={skill} index={index} compact />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
