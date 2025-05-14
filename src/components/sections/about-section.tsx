
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, Lightbulb, UserCircle } from "lucide-react";
import { portfolioData } from "@/lib/data";

export default function AboutSection() {
  return (
    <section id="about" className="container px-4 md:px-6">
      <div className="space-y-12">
        <div className="text-center animate-fadeInUp">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-primary">About Me</h2>
          <p className="mt-4 text-lg text-foreground/80 max-w-2xl mx-auto">
            {portfolioData.summary}
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2"> {/* Simplified grid for Bio and Education */}
          <Card className="animate-fadeInUp" style={{animationDelay: "0.2s"}}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserCircle className="h-6 w-6 text-accent" />
                <span>Bio</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-foreground/80">
              <p>My name is {portfolioData.name}, and I am a {portfolioData.role}. I thrive on solving complex problems and building applications that are both functional and delightful to use. My journey in tech is driven by a curiosity for learning and a passion for innovation, especially at the intersection of software engineering and artificial intelligence.</p>
            </CardContent>
          </Card>

          <Card className="animate-fadeInUp" style={{animationDelay: "0.4s"}}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-6 w-6 text-accent" />
                Education
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {portfolioData.education.map((edu, index) => (
                <div key={index}>
                  <h3 className="font-semibold">{edu.institution}</h3>
                  <p className="text-sm text-muted-foreground">{edu.degree}</p>
                  <p className="text-sm text-muted-foreground">{edu.period}</p>
                  {edu.details && <p className="text-sm mt-1">{edu.details}</p>}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

    