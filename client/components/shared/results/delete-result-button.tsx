'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  useDeleteResultMutation,
  useGetResultsForStudentQuery,
} from '@/src/features/results/resultApiSlice';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { showZodErrors } from '@/lib/utils';

const DeleteResultButton = ({
  resultId,
  studentId,
}: {
  resultId: string;
  studentId: string;
}) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [deleteResult, { isLoading }] = useDeleteResultMutation();
  const { refetch } = useGetResultsForStudentQuery(studentId);

  const handleDelete = async () => {
    try {
      await deleteResult(resultId).unwrap();
      setOpen(false);
      toast.success('Result Deleted');
      refetch();
      router.back();
    } catch (error) {
      showZodErrors(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className='cursor-pointer' variant='destructive' size='sm'>
          Delete
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
        </DialogHeader>
        <p>
          This action cannot be undone. This will permanently delete the result.
        </p>

        <DialogFooter>
          <Button
            className='cursor-pointer'
            variant='ghost'
            onClick={() => setOpen(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            className='cursor-pointer'
            variant='destructive'
            onClick={handleDelete}
            disabled={isLoading}
          >
            {isLoading ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteResultButton;
