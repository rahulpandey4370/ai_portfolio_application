
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, UserCircle } from "lucide-react";
import { portfolioData } from "@/lib/data";

export default function AboutSection() {
  return (
    <section id="about" className="w-full px-4 sm:px-6 lg:px-8">
      <div className="space-y-10 md:space-y-12">
        <div className="text-center animate-fadeInUp max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl text-primary">About Me</h2>
          <p className="mt-3 sm:mt-4 text-base sm:text-lg text-foreground/80">
            {portfolioData.summary}
          </p>
        </div>

        <div className="grid gap-6 md:gap-8 md:grid-cols-2 max-w-5xl mx-auto"> 
          <Card className="animate-fadeInUp" style={{animationDelay: "0.2s"}}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl sm:text-2xl">
                <UserCircle className="h-5 w-5 sm:h-6 sm:w-6 text-accent" />
                <span>Bio</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm sm:text-base text-foreground/80">
              <p>My name is {portfolioData.name}, and I am a {portfolioData.role}. I thrive on solving complex problems and building applications that are both functional and delightful to use. My journey in tech is driven by a curiosity for learning and a passion for innovation, especially at the intersection of software engineering and artificial intelligence.</p>
            </CardContent>
          </Card>

          <Card className="animate-fadeInUp" style={{animationDelay: "0.4s"}}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl sm:text-2xl">
                <GraduationCap className="h-5 w-5 sm:h-6 sm:w-6 text-accent" />
                Education
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4">
              {portfolioData.education.map((edu, index) => (
                <div key={index}>
                  <h3 className="font-semibold text-base sm:text-lg">{edu.institution}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">{edu.degree}</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">{edu.period}</p>
                  {edu.details && <p className="text-xs sm:text-sm mt-1">{edu.details}</p>}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
