'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Badge } from '@/components/ui/badge';
import { Clock, BarChart, Star } from 'lucide-react';

const courses = [
  {
    title: 'Web Development Bootcamp',
    category: 'Tech',
    level: 'Beginner',
    duration: '12 Weeks',
    rating: 4.8,
    imageId: 'course-web-dev',
    price: '999/-',
  },
  {
    title: 'Startup & Entrepreneurship',
    category: 'Business',
    level: 'Intermediate',
    duration: '8 Weeks',
    rating: 4.9,
    imageId: 'course-firebase',
    price: '999/-',
  },
  {
    title: 'Solar Entrepreneurship',
    category: 'Green Energy',
    level: 'All Levels',
    duration: '6 Weeks',
    rating: 4.7,
    imageId: 'course-ai-prompt',
    price: '999/-',
  },
  {
    title: 'New Idea Innovation',
    category: 'Creativity',
    level: 'Beginner',
    duration: '4 Weeks',
    rating: 4.6,
    imageId: 'about-image',
    price: '999/-',
  },
];

export default function CoursesPage() {
  return (
    <div className="container mx-auto max-w-7xl py-16 md:py-24">
      <div className="space-y-4 text-center">
        <h1 className="font-headline text-4xl font-bold text-primary">Explore Our Courses</h1>
        <p className="text-foreground/80 max-w-2xl mx-auto">
          Invest in yourself with our premium selection of courses designed for career acceleration.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {courses.map((course, index) => {
          const courseImage = PlaceHolderImages.find(p => p.id === course.imageId);
          return (
            <Card key={index} className="flex flex-col overflow-hidden border-primary/20 bg-card transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-primary/10">
              {courseImage && (
                <div className="relative h-56 w-full">
                  <Image
                    src={courseImage.imageUrl}
                    alt={course.title}
                    fill
                    className="object-cover"
                    data-ai-hint={courseImage.imageHint}
                  />
                  <Badge variant="secondary" className="absolute top-3 right-3 border border-primary/20 text-primary">{course.category}</Badge>
                </div>
              )}
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="font-headline text-xl text-primary">{course.title}</CardTitle>
                  <div className="text-xl font-bold text-primary">{course.price}</div>
                </div>
                <div className="flex items-center justify-between text-sm text-foreground/80 pt-2">
                  <span className="flex items-center gap-1.5"><BarChart size={14} /> {course.level}</span>
                  <span className="flex items-center gap-1.5"><Clock size={14} /> {course.duration}</span>
                  <span className="flex items-center gap-1.5"><Star size={14} /> {course.rating}</span>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                {/* A short description could go here if available */}
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href="/apply">Apply</Link>
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
