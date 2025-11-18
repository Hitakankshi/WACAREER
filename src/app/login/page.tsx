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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';
import { Chrome, Facebook } from 'lucide-react';
import { signInWithEmail, signInWithGoogle, signInWithFacebook } from '@/firebase/auth/actions';
import { useAuth } from '@/firebase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const formSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
});

type FormData = z.infer<typeof formSchema>;

export default function LoginPage() {
  const { toast } = useToast();
  const auth = useAuth();
  const router = useRouter();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(data: FormData) {
    if (!auth) {
        toast({
            variant: 'destructive',
            title: 'Sign In Failed',
            description: 'Authentication service is not available. Please try again later.',
        });
        return;
    }
    try {
      const { redirectPath } = await signInWithEmail(auth, data.email, data.password);
      toast({
        title: 'Signed In!',
        description: "You've successfully signed in.",
      });
      router.push(redirectPath);
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Sign In Failed',
        description: error.message || 'An unknown error occurred.',
      });
    }
  }

  const handleGoogleSignIn = async () => {
    if (!auth) return;
    try {
      const { redirectPath } = await signInWithGoogle(auth);
      toast({
        title: 'Signed In!',
        description: "You've successfully signed in with Google.",
      });
      router.push(redirectPath);
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Google Sign In Failed',
        description: error.message || 'An unknown error occurred.',
      });
    }
  };

  const handleFacebookSignIn = async () => {
    if (!auth) return;
    try {
      const { redirectPath } = await signInWithFacebook(auth);
      toast({
        title: 'Signed In!',
        description: "You've successfully signed in with Facebook.",
      });
      router.push(redirectPath);
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Facebook Sign In Failed',
        description: error.message || 'An unknown error occurred.',
      });
    }
  };

  return (
    <div className="container mx-auto max-w-md py-16 md:py-24">
      <Card className="border-primary/20 bg-card">
        <CardHeader className="text-center">
          <CardTitle className="font-headline text-2xl text-primary">Welcome Back</CardTitle>
          <CardDescription>Sign in to access your account.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <Button variant="outline" onClick={handleGoogleSignIn}>
              <Chrome className="mr-2 h-4 w-4" /> Google
            </Button>
            <Button variant="outline" onClick={handleFacebookSignIn}>
              <Facebook className="mr-2 h-4 w-4" /> Facebook
            </Button>
          </div>
          <div className="flex items-center my-4">
            <Separator className="flex-1" />
            <span className="px-4 text-xs text-muted-foreground">OR CONTINUE WITH</span>
            <Separator className="flex-1" />
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="********" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" size="lg" className="w-full">Sign In</Button>
            </form>
          </Form>
           <p className="mt-6 text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="font-semibold text-primary hover:underline">
              Sign up
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
