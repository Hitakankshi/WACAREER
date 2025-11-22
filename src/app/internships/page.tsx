
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Briefcase, Clock } from 'lucide-react';
import Link from 'next/link';
import TextType from '@/components/ui/text-type';

const internships = [
    {
        title: 'Digital Marketing Intern',
        company: 'InnovateNow',
        location: 'Remote',
        duration: '3 Months',
        tags: ['Marketing', 'SEO', 'Social Media'],
      },
      {
        title: 'Frontend Development Intern',
        company: 'CodeCrafters',
        location: 'New York, NY',
        duration: '4Months',
        tags: ['React', 'JavaScript', 'CSS'],
      },
      {
        title: 'AI Research Intern',
        company: 'Future AI',
        location: 'London, UK',
        duration: '6 Months',
        tags: ['Machine Learning', 'Python', 'Research'],
      },
];

export default function InternshipsPage() {
  return (
    <div className="container mx-auto max-w-7xl py-16 md:py-24">
      <div className="space-y-4 text-center">
        <TextType
            as="h1"
            text="Internships"
            className="font-headline text-4xl font-bold text-primary"
            typingSpeed={70}
            loop={false}
          />
        <p className="text-foreground/80 max-w-2xl mx-auto">
          Kickstart your career with our exclusive internship opportunities.
        </p>
      </div>
      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {internships.map((internship, index) => (
          <Card key={index} className="bg-card border-primary/20 hover:border-primary transition-colors duration-300 group">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="font-headline text-xl group-hover:text-primary transition-colors">
                    <Link href="/apply?type=internship">{internship.title}</Link>
                  </CardTitle>
                  <CardDescription className="flex items-center gap-2 pt-2">
                    <Briefcase size={14} /> {internship.company}
                  </CardDescription>
                </div>
                <div className="flex flex-col items-end gap-1 text-sm text-foreground/60">
                  <span className="flex items-center gap-1.5"><Clock size={14} /> {internship.duration}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {internship.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="border border-primary/20 text-primary">{tag}</Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild variant="link" className="p-0 h-auto text-primary">
                <Link href="/apply?type=internship">Apply Now &rarr;</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
