// components/shared/side-nav.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  BookOpenCheck,
  UserCog,
  Table2,
  BookMarked,
  BarChart,
  Settings,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import ModeToggle from '../header/mode-toggle';
import SignOutButton from '../sign-out';

const navItems = [
  { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Users', href: '/admin/users', icon: Users },
  { label: 'Students', href: '/admin/students', icon: BookMarked },
  { label: 'Results', href: '/admin/results', icon: BookOpenCheck },
  { label: 'Staff', href: '/admin/staff', icon: UserCog },
  { label: 'Broadsheet', href: '/admin/broadsheet', icon: Table2 },
  { label: 'Actions', href: '/admin/actions', icon: BookOpenCheck },
  { label: 'Reports', href: '/admin/reports', icon: BarChart },
  { label: 'Settings', href: '/admin/settings', icon: Settings },
];

interface SideNavProps {
  isOpen: boolean;
  onClose: () => void;
}

const SideNav = ({ isOpen, onClose }: SideNavProps) => {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Sidebar Overlay */}
      <div
        className={cn(
          'fixed inset-0 bg-black/30 z-40 transition-opacity md:hidden',
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        )}
        onClick={onClose}
      />

      <aside
        className={cn(
          'fixed top-0 left-0 z-50 flex flex-col w-64 h-full border-r bg-white dark:bg-gray-900 px-4 py-6 transition-transform transform',
          isOpen ? 'translate-x-0' : '-translate-x-full',
          'md:translate-x-0 md:static md:flex'
        )}
      >
        <div className='mb-8 flex justify-between items-center'>
          <h2 className='text-xl font-bold tracking-tight'>Admin Panel</h2>
          <div className='md:hidden'>
            <Button variant='ghost' size='icon' onClick={onClose}>
              <X className='w-5 h-5' />
            </Button>
          </div>
        </div>

        <ModeToggle />

        <nav className='flex flex-col gap-2 flex-1 mt-4'>
          {navItems.map(({ label, href, icon: Icon }) => (
            <Link key={label} href={href}>
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

export default SideNav;
