import StudentSideNav from '@/components/shared/students/student-side-nav';

export default function StudentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='flex'>
      {/* Sidebar is fixed, so it's outside the flow */}
      <StudentSideNav />
      {/* Add left padding to offset the sidebar width */}
      <main className='flex-1 md:pl-64 min-h-screen bg-gray-50 dark:bg-gray-950'>
        {children}
      </main>
    </div>
  );
}
