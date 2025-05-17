'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Home, BookOpen, FileText, User } from 'lucide-react';
import ModeToggle from '../header/mode-toggle';

const navItems = [
  { href: '/student/dashboard', label: 'Dashboard', icon: Home },
  { href: '/student/courses', label: 'Courses', icon: BookOpen },
  { href: '/student/results', label: 'Results', icon: FileText },
  { href: '/student/profile', label: 'Profile', icon: User },
];

const StudentSideNav = () => {
  const pathname = usePathname();

  return (
    <aside className='fixed top-0 left-0 z-50 hidden md:flex flex-col w-64 h-screen border-r bg-white dark:bg-gray-900 px-4 py-6'>
      <div className='mb-6'>
        <h2 className='text-xl font-bold'>Student Panel</h2>
        <ModeToggle />
      </div>
      <nav className='space-y-2'>
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium',
                isActive
                  ? 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-white'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              )}
            >
              <Icon className='w-5 h-5' />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default StudentSideNav;
