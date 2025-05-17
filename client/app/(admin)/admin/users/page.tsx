'use client';
import { Button } from '@/components/ui/button';
import { Loader2, Pencil, Trash } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useState } from 'react';
import {
  useGetUsersQuery,
  useUpdateUserMutation,
} from '@/src/features/auth/usersApiSlice';
import { toast } from 'sonner';

import EditUserDialog from '@/components/shared/users/edit-user-dialog';
import DeleteUserButton from '@/components/shared/users/delete-user-button';

const UsersPage = () => {
  const { data: users = [], isLoading, isError } = useGetUsersQuery();
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    role: '',
    level: '',
    subLevel: '',
  });

  const handleEditClick = (user) => {
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

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateUser({ id: selectedUser.id, ...formData }).unwrap();
      toast.success('User updated successfully');
      setDialogOpen(false);
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to update user');
    }
  };

  if (isError) {
    return <div className='text-center text-3xl'>Error loading users...</div>;
  }

  return (
    <div className='p-6'>
      <Card>
        <CardHeader>
          <CardTitle>Users</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <Loader2 className='h-5 w-5 animate-spin text-muted-foreground' />
          ) : (
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
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      {user.firstName} {user.lastName}
                    </TableCell>
                    <TableCell>
                      {user?.level?.length > 0 ? (
                        <>
                          {user.level}
                          {user.subLevel}
                        </>
                      ) : (
                        'Not Assigned'
                      )}
                    </TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>{user.status}</TableCell>
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
          )}
        </CardContent>
      </Card>

      <EditUserDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleUpdateSubmit}
        isLoading={isUpdating}
      />
    </div>
  );
};

export default UsersPage;
