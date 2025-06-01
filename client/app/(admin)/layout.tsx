'use client';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import SideNav from '@/components/shared/side-nav';
import type { RootState } from '@/src/app/store'; 
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user } = useSelector((state: RootState) => state.auth);
  const [hasMounted, setHasMounted] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (hasMounted) {
      if (!user) {
        router.replace('/sign-in');
      } else if (!user.isAdmin) {
        router.replace('/unauthorized');
      }
    }
  }, [hasMounted, user, router]);

  if (!hasMounted || !user || !user.isAdmin) {
    return null;
  }

  return (
    <div className='flex min-h-screen flex-col md:flex-row'>
      <SideNav isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className='flex-1 flex flex-col'>
        <header className='flex justify-between items-center px-4 py-2 border-b'>
          <div></div>
          {/* Top-right toggler */}
          <div className='md:hidden'>
            <Button
              variant='outline'
              size='icon'
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className='w-5 h-5' />
            </Button>
          </div>
        </header>

        <main className='p-4 overflow-y-auto'>{children}</main>
      </div>
    </div>
  );
}
