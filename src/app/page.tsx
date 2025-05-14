
import HeroSection from '@/components/sections/hero-section';
import AboutSection from '@/components/sections/about-section';
import SkillsSection from '@/components/sections/skills-section'; // Import new SkillsSection
import ExperienceSection from '@/components/sections/experience-section';
import ProjectsSection from '@/components/sections/projects-section';
// ChatbotSection is no longer needed as it's integrated into HeroSection

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <SkillsSection /> {/* Add SkillsSection here */}
      <ExperienceSection />
      <ProjectsSection />
      {/* <ChatbotSection /> Removed */}
    </>
  );
}
