
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
import { MapPin, Mail, Phone } from 'lucide-react';
import { useFirestore } from '@/firebase';
import { addDoc, collection } from 'firebase/firestore';
import TextType from '@/components/ui/text-type';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  subject: z.string().min(3, { message: 'Subject must be at least 3 characters.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

type FormData = z.infer<typeof formSchema>;

export default function ContactPage() {
  const { toast } = useToast();
  const firestore = useFirestore();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  async function onSubmit(data: FormData) {
    if (!firestore) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not connect to the database. Please try again later.',
      });
      return;
    }

    try {
      const messagesRef = collection(firestore, 'contactMessages');
      await addDoc(messagesRef, {
        ...data,
        submittedAt: new Date().toISOString(),
      });

      toast({
        title: 'Message Sent!',
        description: "Thank you for contacting us. We'll get back to you shortly.",
      });
      form.reset();
    } catch (error) {
      console.error('Error submitting contact form:', error);
      toast({
        variant: 'destructive',
        title: 'Submission Failed',
        description: 'There was an error sending your message. Please try again.',
      });
    }
  }

  return (
    <div className="container mx-auto max-w-6xl py-16 md:py-24">
      <div className="space-y-4 text-center mb-12">
        <TextType
          as="h1"
          text="Contact Us"
          className="font-headline text-4xl font-bold text-primary"
          typingSpeed={70}
          loop={false}
        />
        <p className="text-foreground/80 max-w-2xl mx-auto">
          Have questions or feedback? We&apos;d love to hear from you.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="md:col-span-2">
            <Card className="border-primary/20 bg-card">
                 <CardHeader>
                    <CardTitle className="font-headline text-2xl text-primary">Send us a Message</CardTitle>
                    <CardDescription>Fill out the form and our team will get back to you within 24 hours.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
                                name="subject"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Subject</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g., Question about a course" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="message"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Message</FormLabel>
                                    <FormControl>
                                        <Textarea
                                        placeholder="Your message here..."
                                        className="resize-none"
                                        rows={6}
                                        {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" size="lg" className="w-full md:w-auto">Send Message</Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
        <div className="space-y-8">
            <h3 className="font-headline text-2xl text-primary">Contact Information</h3>
            <div className="space-y-6 text-foreground/80">
                <div className="flex items-start gap-4">
                    <div className="p-2 bg-primary/10 rounded-full mt-1">
                        <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                        <h4 className="font-semibold text-foreground">Our Office</h4>
                        <p>NIT,BBSR,4th floor</p>
                    </div>
                </div>
                 <div className="flex items-start gap-4">
                    <div className="p-2 bg-primary/10 rounded-full mt-1">
                        <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                        <h4 className="font-semibold text-foreground">Email Us</h4>
                        <p>wonderlightadventurecareer@gmail.com</p>
                    </div>
                </div>
                 <div className="flex items-start gap-4">
                    <div className="p-2 bg-primary/10 rounded-full mt-1">
                        <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                        <h4 className="font-semibold text-foreground">Call Us</h4>
                        <p>8117026570</p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
