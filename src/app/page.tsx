
import HeroSection from '@/components/sections/hero-section';
import AboutSection from '@/components/sections/about-section';
import SkillsSection from '@/components/sections/skills-section';
import ExperienceSection from '@/components/sections/experience-section';
import ProjectsSection from '@/components/sections/projects-section';
import TestimonialsSection from '@/components/sections/testimonials-section';
import ArticlesSection from '@/components/sections/articles-section';
import YouTubeVideosSection from '@/components/sections/youtube-videos-section';
import PlaygroundSection from '@/components/sections/playground-section'; // Added

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ExperienceSection />
      <ProjectsSection />
      <PlaygroundSection /> 
      <ArticlesSection />
      <YouTubeVideosSection />
    </>
  );
}
