
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Briefcase, Clock } from 'lucide-react';

const jobs = [
  {
    title: 'Marketing Manager',
    company: 'Starlight Resorts',
    location: '',
    type: 'Full-time',
    tags: ['Marketing', 'Luxury', 'Hospitality'],
  },
  {
    title: 'Web Developer',
    company: 'WonderlightAdventure',
    location: '',
    type: 'Full-time',
    tags: ['React', 'Next.js', 'Tailwind CSS'],
  },
  {
    title: 'AI Prompt Engineer',
    company: 'Visionary AI',
    location: '',
    type: 'Contract',
    tags: ['AI', 'GenAI', 'NLP'],
  },
  {
    title: 'Tour Guide',
    company: 'Explore More',
    location: '',
    type: 'Part-time',
    tags: ['Travel', 'Adventure', 'Customer Service'],
  },
];

export function FeaturedJobs() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl font-bold text-primary md:text-4xl">Latest Job Posts</h2>
          <p className="mt-2 text-lg text-foreground/80 max-w-2xl mx-auto">
            Handpicked opportunities for the discerning professional.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {jobs.map((job, index) => (
            <Card key={index} className="bg-card border-primary/20 hover:border-primary transition-colors duration-300 group">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="font-headline text-xl group-hover:text-primary transition-colors">
                      <Link href="/apply">{job.title}</Link>
                    </CardTitle>
                    <CardDescription className="flex items-center gap-2 pt-2">
                      <Briefcase size={14} /> {job.company}
                    </CardDescription>
                  </div>
                  <div className="flex flex-col items-end gap-1 text-sm text-foreground/60">
                    {job.location && <span className="flex items-center gap-1.5"><MapPin size={14} /> {job.location}</span>}
                    <span className="flex items-center gap-1.5"><Clock size={14} /> {job.type}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {job.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="border border-primary/20 text-primary">{tag}</Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild variant="link" className="p-0 h-auto text-primary">
                  <Link href="/apply">Apply Now &rarr;</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Button variant="outline" size="lg" asChild>
            <Link href="/jobs">View All Jobs</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
