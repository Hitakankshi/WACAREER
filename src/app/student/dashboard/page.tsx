
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Briefcase, UserCircle } from 'lucide-react';
import Link from 'next/link';
import { useUser, useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy, limit } from 'firebase/firestore';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

export default function StudentDashboardPage() {
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();

  const applicationsQuery = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return query(
      collection(firestore, `users/${user.uid}/applications`),
      orderBy('applicationDate', 'desc')
    );
  }, [firestore, user]);

  const { data: applications, isLoading: isLoadingApplications } = useCollection(applicationsQuery);

  const courseApplications = applications?.filter(app => app.type === 'course') || [];
  const jobAndInternshipApplications = applications?.filter(app => app.type === 'job' || app.type === 'internship') || [];


  const getApplicationTitle = (app: any) => {
    if (app.type === 'job') return `Job: ${app.jobPostingId || 'General Application'}`;
    if (app.type === 'internship') return `Internship: ${app.internshipId || 'General Application'}`;
    if (app.type === 'course') return `Course: ${app.courseId || 'General Registration'}`;
    return 'Application';
  }

  const getCourseTitle = (app: any) => {
    // This could be enhanced to fetch course name from a 'courses' collection
    // using the app.courseId
    return app.courseId ? `Registration for ${app.courseId}` : 'Course Registration';
  };


  return (
    <div className="container mx-auto max-w-7xl py-16 md:py-24">
      <div className="space-y-4 mb-12">
        <h1 className="font-headline text-4xl font-bold text-primary">
          Student Dashboard
        </h1>
        <p className="text-foreground/80 max-w-2xl">
          Welcome back! Here's an overview of your learning and career journey.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card className="border-primary/20 bg-card">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="space-y-1.5">
              <CardTitle className="font-headline text-xl text-primary">My Courses</CardTitle>
              <CardDescription>Your enrolled courses</CardDescription>
            </div>
            <BookOpen className="h-8 w-8 text-primary/50" />
          </CardHeader>
          <CardContent>
            {isUserLoading || isLoadingApplications ? (
              <div className="space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ) : courseApplications.length > 0 ? (
              <>
                <p>You have applied for {courseApplications.length} course(s).</p>
                <div className="mt-4 space-y-2">
                  {courseApplications.map((app) => (
                    <div key={app.id} className="flex justify-between items-center text-sm p-2 rounded-md bg-secondary/30">
                      <span>{getCourseTitle(app)}</span>
                      <Badge variant={app.status === 'pending' ? 'secondary' : 'default'}>{app.status}</Badge>
                    </div>
                  ))}
                </div>
                 <Button asChild variant="link" className="p-0 mt-2">
                    <Link href="/courses">Explore More Courses &rarr;</Link>
                </Button>
              </>
            ) : (
                <>
                    <p>You have not enrolled in any courses yet.</p>
                     <Button asChild variant="link" className="p-0 mt-2">
                        <Link href="/courses">View Courses &rarr;</Link>
                    </Button>
                </>
            )}
          </CardContent>
        </Card>

        <Card className="border-primary/20 bg-card md:col-span-2 lg:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="space-y-1.5">
                <CardTitle className="font-headline text-xl text-primary">My Applications</CardTitle>
                <CardDescription>Track your job & internship applications</CardDescription>
            </div>
            <Briefcase className="h-8 w-8 text-primary/50" />
          </CardHeader>
          <CardContent>
            {isUserLoading || isLoadingApplications ? (
              <div className="space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            ) : jobAndInternshipApplications && jobAndInternshipApplications.length > 0 ? (
              <>
                <p>You have {jobAndInternshipApplications.length} recent application(s).</p>
                 <div className="mt-4 space-y-2">
                  {jobAndInternshipApplications.slice(0,5).map((app) => (
                    <div key={app.id} className="flex justify-between items-center text-sm p-2 rounded-md bg-secondary/30">
                      <span>{getApplicationTitle(app)}</span>
                      <Badge variant={app.status === 'pending' ? 'secondary' : 'default'}>{app.status}</Badge>
                    </div>
                  ))}
                </div>
                <Button asChild variant="link" className="p-0 mt-4">
                    <Link href="#">View All Applications &rarr;</Link>
                </Button>
              </>
            ) : (
              <p>You have not submitted any job or internship applications yet.</p>
            )}
          </CardContent>
        </Card>

        <Card className="border-primary/20 bg-card">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="space-y-1.5">
                <CardTitle className="font-headline text-xl text-primary">My Profile</CardTitle>
                <CardDescription>Manage your profile</CardDescription>
            </div>
            <UserCircle className="h-8 w-8 text-primary/50" />
          </CardHeader>
          <CardContent>
            <p>Your profile is 80% complete.</p>
            <Button asChild variant="link" className="p-0 mt-2">
                <Link href="#">Edit Profile &rarr;</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
