
'use client';
import { useSearchParams } from 'next/navigation';
import { ApplicationForm } from './application-form';
import React, { Suspense } from 'react';

function ApplyPageContent() {
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
    <>
      <div className="space-y-4 text-center">
        <h1 className="font-headline text-4xl font-bold text-primary">
          {title}
        </h1>
        <p className="text-foreground/80">
          {description}
        </p>
      </div>
      <ApplicationForm type={type as 'job' | 'internship' | 'course'} />
    </>
  );
}

export default function ApplyPage() {
  return (
    <div className="container mx-auto max-w-4xl py-16 md:py-24">
       <Suspense fallback={<div>Loading...</div>}>
        <ApplyPageContent />
      </Suspense>
    </div>
  );
}
