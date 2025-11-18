import { Hero } from '@/components/homepage/hero';
import { About } from '@/components/homepage/about';
import { Services } from '@/components/homepage/services';
import { FeaturedJobs } from '@/components/homepage/featured-jobs';
import { Cta } from '@/components/homepage/cta';

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <About />
      <Services />
      <FeaturedJobs />
      <Cta />
    </div>
  );
}
