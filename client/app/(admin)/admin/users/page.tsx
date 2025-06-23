'use client';

import { Button } from '@/components/ui/button';
import { BookOpenCheck, Loader2, Pencil } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useState, FormEvent } from 'react';
import {
  useGetUsersQuery,
  useUpdateUserMutation,
} from '@/src/features/auth/usersApiSlice';
import { useGetUsersDataQuery } from '@/src/features/data/dataApiSlice';
import { toast } from 'sonner';

import EditUserDialog from '@/components/shared/users/edit-user-dialog';
import DeleteUserButton from '@/components/shared/users/delete-user-button';
import { User } from '@/schemas/userSchema';
import Link from 'next/link';
import { showZodErrors } from '@/lib/utils';

type UserFormData = {
  userId?: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  status?: string;
  level: string;
  subLevel: string;
};

const UsersPage = () => {
  const { data: users = [], isLoading, isError } = useGetUsersQuery({});
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
  const {
    data: usersData,
    isLoading: loadingUsersData,
    isError: usersDataError,
    refetch,
  } = useGetUsersDataQuery({});

  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const [formData, setFormData] = useState<UserFormData>({
    firstName: '',
    lastName: '',
    email: '',
    role: '',
    level: '',
    subLevel: '',
  });

  const handleEditClick = (user: User) => {
    setSelectedUser(user);
    setFormData({
      userId: user.id,
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      email: user.email || '',
      role: user.role || '',
      status: user.status || '',
      level: user.level || '',
      subLevel: user.subLevel || '',
    });
    setDialogOpen(true);
  };

  const handleUpdateSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!selectedUser) return;

    try {
      await updateUser({ id: selectedUser.id, ...formData }).unwrap();
      refetch();
      toast.success('User updated successfully');
      setDialogOpen(false);
    } catch (error) {
      showZodErrors(error);
    }
  };

  if (isError) {
    return (
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Error</CardTitle>
          </CardHeader>
          <CardContent>
            Unable To Fetch Users, Check Your Internet Connection
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className='p-6'>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>All Users</CardTitle>
            <BookOpenCheck className='h-5 w-5 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>
              {' '}
              {loadingUsersData ? (
                <>
                  <p>Loading...</p>
                </>
              ) : usersDataError ? (
                <>
                  <p>An Error occurred</p>
                </>
              ) : (
                <> {usersData.totalUsers}</>
              )}
            </div>
            <p className='text-xs text-muted-foreground'>In Total</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Admin Users</CardTitle>
            <BookOpenCheck className='h-5 w-5 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>
              {' '}
              {loadingUsersData ? (
                <>
                  <p>Loading...</p>
                </>
              ) : usersDataError ? (
                <>
                  <p>An Error occurred</p>
                </>
              ) : (
                <> {usersData.adminUsers}</>
              )}
            </div>
            <p className='text-xs text-muted-foreground'>Administrators</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Active</CardTitle>
            <BookOpenCheck className='h-5 w-5 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>
              {' '}
              {loadingUsersData ? (
                <>
                  <p>Loading...</p>
                </>
              ) : usersDataError ? (
                <>
                  <p>An Error occurred</p>
                </>
              ) : (
                <> {usersData.activeUsers}</>
              )}
            </div>
            <p className='text-xs text-muted-foreground'>Active</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Inactive</CardTitle>
            <BookOpenCheck className='h-5 w-5 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>
              {' '}
              {loadingUsersData ? (
                <>
                  <p>Loading...</p>
                </>
              ) : usersDataError ? (
                <>
                  <p>An Error occurred</p>
                </>
              ) : (
                <> {usersData.suspendedUsers}</>
              )}
            </div>
            <p className='text-xs  text-red-600'>Suspended</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Users</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <Loader2 className='h-5 w-5 animate-spin text-muted-foreground' />
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Class</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className='text-right'>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user: User) => (
                    <TableRow key={user.id}>
                      <TableCell className='cursor-pointer text-primary underline'>
                        <Link href={`/admin/users/${user.id}`}>
                          {user.firstName} {user.lastName}
                        </Link>
                      </TableCell>
                      <TableCell>
                        {user.level ? (
                          <>
                            {user.level}
                            {user.subLevel}
                          </>
                        ) : (
                          'Not Assigned'
                        )}
                      </TableCell>
                      <TableCell>{user.role}</TableCell>
                      <TableCell
                        className={`${
                          user.status === 'suspended'
                            ? 'text-red-600'
                            : 'text-green-600'
                        }`}
                      >
                        {user.status}
                      </TableCell>
                      <TableCell className='text-right space-x-2'>
                        <Button
                          size='sm'
                          variant='outline'
                          onClick={() => handleEditClick(user)}
                          className='cursor-pointer'
                        >
                          <Pencil className='h-4 w-4' />
                        </Button>
                        <DeleteUserButton
                          userId={user.id}
                          isAdmin={user.role === 'Admin'}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <EditUserDialog
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                formData={formData}
                setFormData={setFormData}
                onSubmit={handleUpdateSubmit}
                isLoading={isUpdating}
                title='User Info'
              />
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UsersPage;
