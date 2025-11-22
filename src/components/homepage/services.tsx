
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Briefcase, GraduationCap, Users, Target } from 'lucide-react';
import TextType from '@/components/ui/text-type';

const services = [
  {
    icon: Briefcase,
    title: 'Executive Job Postings',
    description: 'Access a curated selection of high-level job opportunities from leading companies worldwide.',
  },
  {
    icon: Target,
    title: 'Elite Internships',
    description: 'Gain invaluable experience with internships at prestigious firms and innovative startups.',
  },
  {
    icon: GraduationCap,
    title: 'Premium Online Courses',
    description: 'Master in-demand skills with our expert-led courses, designed for career advancement.',
  },
  {
    icon: Users,
    title: 'Strategic Employee Hiring',
    description: 'Connect with top-tier talent and build a workforce that drives success and innovation.',
  },
];

export function Services() {
  return (
    <section className="py-16 md:py-24 bg-card">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <TextType
            as="h2"
            text="Our Services"
            className="font-headline text-3xl font-bold text-primary md:text-4xl"
            typingSpeed={70}
            loop={false}
            startOnVisible={true}
           />
          <p className="mt-2 text-lg text-foreground/80 max-w-2xl mx-auto">
            Providing a comprehensive suite of services to elevate careers and organizations.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <Card key={index} className="bg-background border-primary/20 hover:border-primary transition-colors duration-300 transform hover:-translate-y-2">
              <CardHeader className="items-center text-center">
                <div className="p-4 bg-primary/10 rounded-full mb-4">
                   <service.icon className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="font-headline text-xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription>{service.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
