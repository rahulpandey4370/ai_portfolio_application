
import { portfolioData } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { YoutubeIcon, PlayCircle } from 'lucide-react';

export default function YouTubeVideosSection() {
  if (!portfolioData.youtubeVideos || portfolioData.youtubeVideos.length === 0) {
    return null;
  }

  return (
    <section id="videos" className="bg-background w-full px-4 sm:px-6 lg:px-8"> 
      <div className="container mx-auto"> 
        <div className="text-center mb-10 md:mb-12 animate-fadeInUp max-w-3xl mx-auto"> 
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl text-primary flex items-center justify-center gap-2 sm:gap-3">
            <YoutubeIcon className="h-6 w-6 sm:h-8 sm:w-8" />
            Recommended Videos
          </h2>
          <p className="mt-3 sm:mt-4 text-base sm:text-lg text-foreground/80">
            Helpful and insightful YouTube videos on AI, Machine Learning, and related topics.
          </p>
        </div>
        <div className="grid gap-6 md:gap-8 sm:grid-cols-1 lg:grid-cols-2 max-w-7xl mx-auto"> 
          {portfolioData.youtubeVideos.map((video, index) => (
            <Card 
              key={video.id} 
              className="animate-fadeInUp overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <CardHeader className="pb-2 sm:pb-3">
                <div className="flex items-center gap-2 sm:gap-3 mb-1">
                  <PlayCircle className="h-5 w-5 sm:h-6 sm:w-6 text-accent" />
                  <CardTitle className="text-lg sm:text-xl font-semibold text-primary">{video.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="aspect-video p-2 sm:p-3 md:p-4">
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
                 <CardContent className="pt-2 sm:pt-3 md:pt-4 px-2 sm:px-3 md:px-4 pb-2 sm:pb-3 md:pb-4">
                    <CardDescription className="text-sm sm:text-base text-foreground/80">
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
