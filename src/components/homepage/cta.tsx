
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import TextType from '@/components/ui/text-type';

export function Cta() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto text-center">
        <div className="bg-gradient-to-br from-card to-background border border-primary/20 rounded-lg p-12 shadow-lg shadow-primary/10">
          <TextType
            as="h2"
            text="Ready to Begin Your Ascent?"
            className="font-headline text-3xl font-bold text-primary md:text-4xl"
            typingSpeed={70}
            loop={false}
            startOnVisible={true}
          />
          <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/80">
            Join our exclusive network of professionals and industry leaders. Your next chapter awaits.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/signup">Create Your Profile</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
