
'use client';

import Link from 'next/link';
import { Menu } from 'lucide-react';
import { useState } from 'react';
import { Logo } from '@/components/icons';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetDescription,
} from '@/components/ui/sheet';
import { useUser, useAuth } from '@/firebase';
import { signOut } from '@/firebase/auth/actions';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useRouter } from 'next/navigation';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/jobs', label: 'Jobs' },
  { href: '/internships', label: 'Internships' },
  { href: '/courses', label: 'Courses' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut(auth);
    router.push('/');
  };

  const getInitials = (name: string | null | undefined) => {
    if (!name) return 'U';
    const names = name.split(' ');
    return names.map((n) => n[0]).join('');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Logo className="h-6 w-auto" />
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-foreground/60 transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
          {user && (
            <>
              <Link href="/student/dashboard" className="text-sm font-medium text-foreground/60 transition-colors hover:text-primary">Student Dashboard</Link>
              <Link href="/employer/dashboard" className="text-sm font-medium text-foreground/60 transition-colors hover:text-primary">Employer Dashboard</Link>
            </>
          )}
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          {isUserLoading ? (
            <div className="h-9 w-20 animate-pulse rounded-md bg-muted" />
          ) : user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={user.photoURL || ''} alt={user.displayName || 'User'} />
                    <AvatarFallback>{getInitials(user.displayName)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.displayName}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push('/student/dashboard')}>
                  Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleSignOut}>
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button variant="outline" size="sm" asChild>
                <Link href="/login">Sign In</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/signup">Sign Up</Link>
              </Button>
            </>
          )}
        </div>
        <div className="md:hidden">
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] flex flex-col">
              <SheetHeader>
                <SheetTitle>
                    <Logo className="h-8 w-auto" />
                </SheetTitle>
                <SheetDescription className="sr-only">A menu of navigation links</SheetDescription>
              </SheetHeader>
              <div className="flex-grow flex flex-col py-4">
                  <div className="flex flex-col gap-4">
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsMenuOpen(false)}
                        className="text-lg font-medium hover:text-primary"
                      >
                        {link.label}
                      </Link>
                    ))}
                    {user && (
                      <>
                        <Link href="/student/dashboard" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium hover:text-primary">Student Dashboard</Link>
                        <Link href="/employer/dashboard" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium hover:text-primary">Employer Dashboard</Link>
                      </>
                    )}
                  </div>
              </div>
              <div className="mt-auto flex flex-col gap-2">
                {user ? (
                    <Button onClick={() => { handleSignOut(); setIsMenuOpen(false); }}>Sign Out</Button>
                ) : (
                    <>
                        <Button variant="outline" asChild>
                        <Link href="/login" onClick={() => setIsMenuOpen(false)}>Sign In</Link>
                        </Button>
                        <Button asChild>
                        <Link href="/signup" onClick={() => setIsMenuOpen(false)}>Sign Up</Link>
                        </Button>
                    </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
