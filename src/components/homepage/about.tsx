
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent } from '@/components/ui/card';

const aboutImage = PlaceHolderImages.find(p => p.id === 'about-image');

export function About() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto grid grid-cols-1 items-center gap-12 md:grid-cols-2">
        <div className="order-2 md:order-1">
          <h2 className="font-headline text-3xl font-bold text-primary md:text-4xl">
            About WonderlightAdventure
          </h2>
          <p className="mt-4 text-foreground/80">
            Founded on the principles of excellence and exclusivity, WonderlightAdventure Careers is the premier destination for ambitious professionals and forward-thinking companies. We bridge the gap between exceptional talent and extraordinary opportunities.
          </p>
          <p className="mt-4 text-foreground/80">
            Our curated platform offers not just jobs, but career-defining moves. With a suite of premium courses, we empower individuals to master their craft and ascend to new heights. We are more than a service; we are a partner in your journey to the top.
          </p>
        </div>
        <div className="order-1 md:order-2">
          <Card className="overflow-hidden border-2 border-primary/20 shadow-lg shadow-primary/10">
            <CardContent className="p-0">
            {aboutImage && (
              <Image
                src={aboutImage.imageUrl}
                alt={aboutImage.description}
                width={600}
                height={700}
                className="h-full w-full object-cover"
                data-ai-hint={aboutImage.imageHint}
              />
            )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
