
import Link from 'next/link';
import { portfolioData } from '@/lib/data';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, BookOpen, FileText, Atom, Network } from 'lucide-react'; // Added more icons
import type { LucideIcon } from 'lucide-react';

const iconMap: { [key: string]: LucideIcon } = {
  FileText,
  Atom,
  Network,
  BookOpen, // Default
};


export default function ArticlesSection() {
  if (!portfolioData.articles || portfolioData.articles.length === 0) {
    return null;
  }

  return (
    <section id="articles" className="bg-secondary/50 dark:bg-secondary/20">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12 animate-fadeInUp">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-primary flex items-center justify-center gap-3">
            <BookOpen className="h-8 w-8" />
            Insightful Reads
          </h2>
          <p className="mt-4 text-lg text-foreground/80 max-w-2xl mx-auto">
            A curated collection of AI/ML articles and resources I find particularly insightful.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {portfolioData.articles.map((article, index) => {
            const IconComponent = article.iconName ? iconMap[article.iconName] || BookOpen : BookOpen;
            return (
              <Card 
                key={article.id} 
                className="flex flex-col animate-fadeInUp h-full shadow-lg hover:shadow-xl transition-shadow duration-300"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <IconComponent className="h-6 w-6 text-accent" />
                    <CardTitle className="text-xl font-semibold text-primary">{article.title}</CardTitle>
                  </div>
                  {article.source && <p className="text-sm text-muted-foreground">Source: {article.source}</p>}
                </CardHeader>
                <CardContent className="flex-grow">
                  <CardDescription className="text-sm text-foreground/80">
                    {article.description || "An insightful article on AI/ML."}
                  </CardDescription>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" asChild className="w-full">
                    <Link href={article.link} target="_blank" rel="noopener noreferrer">
                      Read Article <ExternalLink className="h-4 w-4 ml-2" />
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

    