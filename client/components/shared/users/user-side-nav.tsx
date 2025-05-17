'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  ClipboardList,
  BookOpen,
  CalendarDays,
  Settings,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import ModeToggle from '../header/mode-toggle';
import SignOutButton from '../sign-out';

const teacherNavItems = [
  { label: 'Dashboard', href: '/users/dashboard', icon: Home },
  { label: 'My Classes', href: '/users/students', icon: ClipboardList },
  { label: 'Upload Results', href: '/users/results', icon: BookOpen },
  { label: 'Timetable', href: '/users/timetable', icon: CalendarDays },
  { label: 'Settings', href: '/users/settings', icon: Settings },
];

const UserSideNav = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className='md:hidden fixed top-4 left-4 z-50'>
        <Button size='icon' variant='outline' onClick={() => setOpen(!open)}>
          {open ? <X className='h-5 w-5' /> : <Menu className='h-5 w-5' />}
        </Button>
      </div>

      {/* Sidebar */}
      <aside className='fixed top-0 left-0 z-50 hidden md:flex flex-col w-64 h-screen border-r bg-white dark:bg-gray-900 px-4 py-6'>
        <div className='mb-6'>
          <h2 className='text-xl font-bold'>Teacher Panel</h2>
          <ModeToggle />
        </div>

        <nav className='flex flex-col gap-2 flex-1'>
          {teacherNavItems.map(({ label, href, icon: Icon }) => (
            <Link key={label} href={href} onClick={() => setOpen(false)}>
              <Button
                variant='ghost'
                className={cn(
                  'w-full justify-start gap-3',
                  pathname === href && 'bg-muted hover:bg-muted font-semibold'
                )}
              >
                <Icon className='h-5 w-5' />
                {label}
              </Button>
            </Link>
          ))}
        </nav>

        <div className='mt-auto'>
          <SignOutButton />
        </div>
      </aside>
    </>
  );
};

export default UserSideNav;
