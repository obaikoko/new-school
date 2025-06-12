import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  useDeleteStudentMutation,
  useGetStudentsQuery,
} from '@/src/features/students/studentApiSlice';
import { useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { showZodErrors } from '@/lib/utils';
const DeleteStudentButton = ({ studentId }: { studentId: string }) => {
  const router = useRouter();
  const { refetch } = useGetStudentsQuery(1);
  const [deleteStudent, { isLoading: isDeleting }] = useDeleteStudentMutation();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const handleDelete = async () => {
    try {
      await deleteStudent(studentId).unwrap();
      toast.success('Student deleted successfully');
      setDeleteDialogOpen(false);
      refetch();
      router.push('/admin/students');
    } catch (error) {
      showZodErrors(error);
    }
  };

  return (
    <>
      <Button
        variant='outline'
        className='text-destructive cursor-pointer'
        onClick={() => setDeleteDialogOpen(true)}
      >
        Delete
      </Button>
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to delete this student?</p>
          <DialogFooter>
            <Button
              variant='ghost'
              className='cursor-pointer'
              onClick={() => setDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant='destructive'
              className='cursor-pointer'
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DeleteStudentButton;
