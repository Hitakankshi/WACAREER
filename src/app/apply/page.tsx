
'use client';
import { useSearchParams } from 'next/navigation';
import { ApplicationForm } from './application-form';
import TextType from '@/components/ui/text-type';

export default function ApplyPage() {
  const searchParams = useSearchParams();
  const type = searchParams.get('type') || 'job'; // Default to 'job'

  const titles: { [key: string]: string } = {
    job: 'Apply for a Job',
    internship: 'Apply for an Internship',
    course: 'Enroll in a Course',
  };

  const descriptions: { [key: string]: string } = {
    job: 'Complete the form below to submit your application for a job.',
    internship: 'Complete the form below to submit your application for an internship.',
    course: 'Complete the form below to enroll in the course.',
  };

  const title = titles[type] || 'Apply Now';
  const description = descriptions[type] || 'Complete the form below to submit your application.';


  return (
    <div className="container mx-auto max-w-4xl py-16 md:py-24">
      <div className="space-y-4 text-center">
        <TextType
          as="h1"
          text={title}
          className="font-headline text-4xl font-bold text-primary"
          typingSpeed={70}
          loop={false}
        />
        <p className="text-foreground/80">
          {description}
        </p>
      </div>
      <ApplicationForm type={type as 'job' | 'internship' | 'course'} />
    </div>
  );
}
