
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import Image from 'next/image';
import { useFirestore, useUser } from '@/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useRouter, useSearchParams } from 'next/navigation';

const baseSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  phone: z.string().min(10, { message: 'Please enter a valid phone number.' }),
  skills: z.string().min(3, { message: 'Please list at least one skill.' }),
  coverLetter: z.string().optional(),
});

const withResumeSchema = baseSchema.extend({
  resume: z.any().refine((files) => files?.length === 1, 'Resume is required.'),
});

interface ApplicationFormProps {
  type: 'job' | 'internship' | 'course';
}

export function ApplicationForm({ type }: ApplicationFormProps) {
  const { toast } = useToast();
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  const { user } = useUser();
  const firestore = useFirestore();
  const router = useRouter();
  const searchParams = useSearchParams();

  const isJobOrInternship = type === 'job' || type === 'internship';
  const formSchema = isJobOrInternship ? withResumeSchema : baseSchema;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user?.displayName || '',
      email: user?.email || '',
      phone: '',
      skills: '',
      coverLetter: '',
      ...(isJobOrInternship && { resume: undefined }),
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    if (!user || !firestore) {
      toast({
        variant: 'destructive',
        title: 'Authentication Error',
        description: 'You must be signed in to apply.',
      });
      router.push('/login');
      return;
    }
    
    try {
      const applicationsRef = collection(firestore, 'applications');
      
      // We are not handling file uploads for resume yet.
      // This will be implemented in a future step.
      const { resume, ...formData } = data as any;

      const applicationData = {
        ...formData,
        userProfileId: user.uid,
        applicationDate: new Date().toISOString(),
        status: 'pending',
        type: type,
        ...(type === 'job' && { jobPostingId: searchParams.get('id') || 'general' }),
        ...(type === 'internship' && { internshipId: searchParams.get('id') || 'general' }),
        ...(type === 'course' && { courseId: searchParams.get('id') || 'general' }),
      };

      await addDoc(applicationsRef, applicationData);

      if (type === 'course') {
          toast({
              title: 'Application Submitted!',
              description: `Thank you, ${data.name}. Please complete the payment.`,
          });
          setIsPaymentDialogOpen(true);
      } else {
          toast({
              title: 'Application Submitted!',
              description: `Thank you for applying, ${data.name}. We will be in touch shortly.`,
          });
          form.reset();
          router.push('/student/dashboard');
      }
    } catch (error) {
       toast({
        variant: 'destructive',
        title: 'Application Failed',
        description: 'There was an error submitting your application. Please try again.',
      });
    }
  }

  const closePaymentDialog = () => {
    setIsPaymentDialogOpen(false);
    form.reset();
    router.push('/student/dashboard');
  }

  return (
    <>
      <Card className="mt-8 border-primary/20 bg-card">
        <CardHeader>
          <div>
            <CardTitle className="font-headline text-2xl text-primary">Application Form</CardTitle>
            <CardDescription>Fill in your details to apply.</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input placeholder="email@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="(123) 456-7890" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               {isJobOrInternship && (
                <FormField
                  control={form.control}
                  name="resume"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Resume</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={(e) => field.onChange(e.target.files)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <FormField
                control={form.control}
                name="skills"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Skills</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., React, Project Management, Figma" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
                <FormField
                    control={form.control}
                    name="coverLetter"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Cover Letter (Optional)</FormLabel>
                        <FormControl>
                            <Textarea
                            placeholder="Tell us a little bit about yourself and why you're a good fit."
                            className="resize-none"
                            {...field}
                            />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
              <Button type="submit" size="lg" className="w-full md:w-auto">Submit Application</Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <AlertDialog open={isPaymentDialogOpen} onOpenChange={setIsPaymentDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Complete Your Payment</AlertDialogTitle>
            <AlertDialogDescription>
              Scan the QR code with your UPI app to complete the course application.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex justify-center">
            <Image
              src="/upi-qr-code.png"
              alt="UPI QR Code"
              width={250}
              height={250}
              data-ai-hint="qr code"
            />
          </div>
          <AlertDialogFooter>
            <AlertDialogAction onClick={closePaymentDialog}>Close</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
