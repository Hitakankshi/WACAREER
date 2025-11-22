
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Briefcase, Clock, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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
    {
    title: 'Luxury Brand Ambassador',
    company: 'Elegance United',
    location: '',
    type: 'Full-time',
    tags: ['Luxury', 'Sales', 'Branding'],
    },
    {
    title: 'Data Entry',
    company: 'Quantum Analytics',
    location: '',
    type: 'Full-time',
    tags: ['Data Entry', 'Accuracy', 'Typing'],
    },
    {
    title: 'UX/UI Designer',
    company: 'Pixel Perfect',
    location: '',
    type: 'Full-time',
    tags: ['Figma', 'User Experience', 'Design'],
    },
    {
    title: 'Content Creator',
    company: 'StoryWeave',
    location: '',
    type: 'Part-time',
    tags: ['Writing', 'Video', 'Social Media'],
    },
];

export default function JobsPage() {
  return (
    <div className="container mx-auto max-w-7xl py-16 md:py-24">
      <div className="space-y-4 text-center">
        <h1 className="font-headline text-4xl font-bold text-primary">
          Find Your Dream Job
        </h1>
        <p className="text-foreground/80 max-w-2xl mx-auto">
          Browse our curated list of exclusive career opportunities.
        </p>
      </div>

      <Card className="mt-12 p-6 bg-card border-primary/20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 relative">
            <Input placeholder="Search by title, company, or keyword..." className="pl-10" />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          </div>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Job Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="full-time">Full-time</SelectItem>
              <SelectItem value="part-time">Part-time</SelectItem>
              <SelectItem value="contract">Contract</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>


      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          {jobs.map((job, index) => (
            <Card key={index} className="bg-card border-primary/20 hover:border-primary transition-colors duration-300 group">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="font-headline text-xl group-hover:text-primary transition-colors">
                      <Link href="/apply?type=job">{job.title}</Link>
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
                  <Link href="/apply?type=job">Apply Now &rarr;</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
    </div>
  );
}
