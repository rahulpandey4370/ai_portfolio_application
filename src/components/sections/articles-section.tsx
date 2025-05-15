
import Link from 'next/link';
import { portfolioData } from '@/lib/data';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, BookOpen, FileText, Atom, Network } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const iconMap: { [key: string]: LucideIcon } = {
  FileText,
  Atom,
  Network,
  BookOpen, 
};


export default function ArticlesSection() {
  if (!portfolioData.articles || portfolioData.articles.length === 0) {
    return null;
  }

  return (
    <section id="articles" className="bg-secondary/50 dark:bg-secondary/20 w-full px-4 sm:px-6 lg:px-8"> 
      <div className="container mx-auto"> 
        <div className="text-center mb-10 md:mb-12 animate-fadeInUp max-w-3xl mx-auto"> 
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl text-primary flex items-center justify-center gap-2 sm:gap-3">
            <BookOpen className="h-6 w-6 sm:h-8 sm:w-8" />
            Insightful Reads
          </h2>
          <p className="mt-3 sm:mt-4 text-base sm:text-lg text-foreground/80">
            A curated collection of AI/ML articles and resources I find particularly insightful.
          </p>
        </div>
        <div className="grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto"> 
          {portfolioData.articles.map((article, index) => {
            const IconComponent = article.iconName ? iconMap[article.iconName] || BookOpen : BookOpen;
            return (
              <Card 
                key={article.id} 
                className="flex flex-col animate-fadeInUp h-full shadow-lg hover:shadow-xl transition-shadow duration-300"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <CardHeader className="pb-3 sm:pb-4">
                  <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
                    <IconComponent className="h-5 w-5 sm:h-6 sm:w-6 text-accent" />
                    <CardTitle className="text-lg sm:text-xl font-semibold text-primary">{article.title}</CardTitle>
                  </div>
                  {article.source && <p className="text-xs sm:text-sm text-muted-foreground">Source: {article.source}</p>}
                </CardHeader>
                <CardContent className="flex-grow pt-0 pb-3 sm:pb-4">
                  <CardDescription className="text-sm sm:text-base text-foreground/80">
                    {article.description || "An insightful article on AI/ML."}
                  </CardDescription>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button variant="outline" asChild className="w-full text-xs sm:text-sm">
                    <Link href={article.link} target="_blank" rel="noopener noreferrer">
                      Read Article <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4 ml-1.5 sm:ml-2" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            );
})}
        </div>
      </div>
    </section>
  );
}
