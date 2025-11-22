
'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Bubbles from './bubbles';
import TextType from '@/components/ui/text-type';

export function Hero() {
  return (
    <section className="relative h-[60vh] min-h-[500px] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Bubbles className="w-full h-full" />
      </div>
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white">
        <TextType
          as="h1"
          text="Embark on Your Royal Ascent"
          className="font-headline text-4xl font-bold tracking-tight text-white md:text-6xl lg:text-7xl"
          typingSpeed={70}
          loop={false}
        />
        <p className="mt-4 max-w-2xl text-lg text-white/80 md:text-xl">
          Discover exclusive opportunities and premium courses designed for the elite. Your journey begins here.
        </p>
        <div className="mt-8 flex gap-4">
          <Button asChild size="lg">
            <Link href="/jobs">Find Your Dream Job</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
            <Link href="/courses">Explore Courses</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
