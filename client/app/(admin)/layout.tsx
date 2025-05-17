'use client';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import SideNav from '@/components/shared/side-nav';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user } = useSelector((state) => state.auth);
  const [hasMounted, setHasMounted] = useState(false);

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

  // 💡 Only render after mount to avoid hydration error
  if (!hasMounted || !user || !user.isAdmin) {
    return null;
  }

  return (
    <div className='flex'>
      <SideNav />
      <main className='flex-1 md:pl-64 min-h-screen bg-gray-50 dark:bg-gray-950'>
        {children}
      </main>
    </div>
  );
}
