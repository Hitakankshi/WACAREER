
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Building, Users, FileText } from 'lucide-react';
import Link from 'next/link';
import TextType from '@/components/ui/text-type';

export default function EmployerDashboardPage() {
  return (
    <div className="container mx-auto max-w-7xl py-16 md:py-24">
      <div className="space-y-4 mb-12">
        <TextType
          as="h1"
          text="Employer Dashboard"
          className="font-headline text-4xl font-bold text-primary"
          typingSpeed={70}
          loop={false}
        />
        <p className="text-foreground/80 max-w-2xl">
          Manage your job postings and connect with top talent.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card className="border-primary/20 bg-card">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="space-y-1.5">
              <CardTitle className="font-headline text-xl text-primary">Job Postings</CardTitle>
              <CardDescription>Manage your open roles</CardDescription>
            </div>
            <FileText className="h-8 w-8 text-primary/50" />
          </CardHeader>
          <CardContent>
            <p>You have 5 active job postings.</p>
            <Button asChild variant="link" className="p-0 mt-2">
                <Link href="/jobs">Manage Postings &rarr;</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="border-primary/20 bg-card">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="space-y-1.5">
                <CardTitle className="font-headline text-xl text-primary">Applicants</CardTitle>
                <CardDescription>Review candidate applications</CardDescription>
            </div>
            <Users className="h-8 w-8 text-primary/50" />
          </CardHeader>
          <CardContent>
            <p>You have 12 new applicants to review.</p>
            <Button asChild variant="link" className="p-0 mt-2">
                <Link href="#">View Applicants &rarr;</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="border-primary/20 bg-card">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="space-y-1.5">
                <CardTitle className="font-headline text-xl text-primary">Company Profile</CardTitle>
                <CardDescription>Showcase your brand</CardDescription>
            </div>
            <Building className="h-8 w-8 text-primary/50" />
          </CardHeader>
          <CardContent>
            <p>Your company profile is active.</p>
            <Button asChild variant="link" className="p-0 mt-2">
                <Link href="#">Edit Profile &rarr;</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
