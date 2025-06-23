'use client'
import UserSideNav from '@/components/shared/users/user-side-nav';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
  
  return (
    <div className='flex min-h-screen flex-col md:flex-row'>
      <UserSideNav isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
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
