'use client';

import { useState } from 'react';
import { Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import { toast } from 'sonner';

import {
  useDeleteUserMutation,
  useGetUsersQuery,
} from '@/src/features/auth/usersApiSlice';
import { showZodErrors } from '@/lib/utils';
import Spinner from '../spinner';

interface DeleteUserButtonProps {
  userId: string;
  isAdmin: boolean;
}

const DeleteUserButton = ({ userId, isAdmin }: DeleteUserButtonProps) => {
  const [open, setOpen] = useState(false);
  const [deleteUser, { isLoading }] = useDeleteUserMutation();
  const { refetch } = useGetUsersQuery({});

  const handleConfirmDelete = async () => {
    if (isAdmin) {
      toast.error('Cannot delete an admin user!');
      setOpen(false);
      return;
    }

    try {
      await deleteUser(userId).unwrap();
      toast.success('User deleted successfully');
      refetch();
      setOpen(false);
    } catch (err) {
      showZodErrors(err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size='sm'
          variant='destructive'
          className='cursor-pointer'
          onClick={() => setOpen(true)}
        >
          {isLoading ? <Spinner /> : <Trash className='h-4 w-4' />}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogDescription>
            Are you sure you want to remove this user? This action is
            irreversible.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className='flex justify-end space-x-2'>
          <Button variant='ghost' onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            variant='destructive'
            onClick={handleConfirmDelete}
            disabled={isLoading}
          >
            {isLoading ? <Spinner /> : 'Delete'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteUserButton;
