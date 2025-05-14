
import { portfolioData } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { YoutubeIcon, PlayCircle } from 'lucide-react'; // Using Youtube from lucide

export default function YouTubeVideosSection() {
  if (!portfolioData.youtubeVideos || portfolioData.youtubeVideos.length === 0) {
    return null;
  }

  return (
    <section id="videos" className="bg-background">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12 animate-fadeInUp">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-primary flex items-center justify-center gap-3">
            <YoutubeIcon className="h-8 w-8" />
            Recommended Videos
          </h2>
          <p className="mt-4 text-lg text-foreground/80 max-w-2xl mx-auto">
            Helpful and insightful YouTube videos on AI, Machine Learning, and related topics.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2">
          {portfolioData.youtubeVideos.map((video, index) => (
            <Card 
              key={video.id} 
              className="animate-fadeInUp overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <CardHeader>
                <div className="flex items-center gap-3 mb-1">
                  <PlayCircle className="h-6 w-6 text-accent" />
                  <CardTitle className="text-xl font-semibold text-primary">{video.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="aspect-video">
                <iframe
                  className="w-full h-full rounded-md"
                  src={`https://www.youtube.com/embed/${video.embedId}`}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </CardContent>
               {video.description && (
                 <CardContent className="pt-4">
                    <CardDescription className="text-sm text-foreground/80">
                        {video.description}
                    </CardDescription>
                 </CardContent>
               )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

    