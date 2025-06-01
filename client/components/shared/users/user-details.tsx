'use client';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useGetUserDetailsQuery } from '@/src/features/auth/usersApiSlice';
import { formatDateTime } from '@/lib/utils';

type UserDetailsProps = {
  userId: string;
};
const UserDetails = ({ userId }: UserDetailsProps) => {
  const { data: user, isLoading, isError } = useGetUserDetailsQuery(userId);

  if (isLoading) {
    return (
      <div className='p-6'>
        <Card>
          <CardContent>Loading user data...</CardContent>
        </Card>
      </div>
    );
  }

  if (isError || !user) {
    return (
      <div className='p-6'>
        <Card>
          <CardContent>Failed to load user data.</CardContent>
        </Card>
      </div>
    );
  }
  return (
    <div className='max-w-3xl mx-auto p-6 space-y-6'>
      <h1 className='text-3xl font-semibold'>User Profile</h1>

      <Card>
        <CardContent className='p-6 flex gap-6 items-center'>
          <Avatar className='w-20 h-20'>
            <AvatarImage
              src={`https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}`}
            />
            <AvatarFallback>
              {user.firstName[0]}
              {user.lastName[0]}
            </AvatarFallback>
          </Avatar>
          <div className='space-y-1'>
            <h2 className='text-xl font-medium'>
              {user.firstName} {user.lastName}
            </h2>
            <p className='text-sm text-muted-foreground'>Email: {user.email}</p>
            <p className='text-sm'>Role: {user.role}</p>
            <p className='text-sm'>Status: {user.status}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className='p-6 grid grid-cols-1 sm:grid-cols-2 gap-4'>
          <div>
            <p>
              <strong>ID:</strong> {user.id}
            </p>
            <p>
              <strong>Level:</strong> {user.level}
            </p>
            <p>
              <strong>Sub Level:</strong> {user.subLevel}
            </p>
          </div>
          <div>
            <p>
              <strong>Admin:</strong> {user.isAdmin ? 'Yes' : 'No'}
            </p>
            <p>
              <strong>Registered On:</strong> {formatDateTime(user.createdAt)}
            </p>
          </div>
          
        </CardContent>
      </Card>
    </div>
  );
};

export default UserDetails;
