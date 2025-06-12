'use client';
import { Button } from '@/components/ui/button';
import {
  useGraduateStudentsMutation,
  useGetStudentsQuery,
} from '@/src/features/students/studentApiSlice';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useState } from 'react';
import { toast } from 'sonner';
import { showZodErrors } from '@/lib/utils';

const GraduateStudentsButton = () => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const { refetch } = useGetStudentsQuery(1);
  const [graduateStudents, { isLoading }] = useGraduateStudentsMutation();

  const handleGraduateStudents = async () => {
    try {
      await graduateStudents({}).unwrap();
      toast.success('graduated successfully');
      setOpenDialog(false);
      refetch();
    } catch (error) {
      showZodErrors(error);
    }
  };

  return (
    <>
      <Button
        variant='destructive'
        onClick={() => setOpenDialog(true)}
        className='cursor-pointer'
      >
        Graduate Students
      </Button>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Graduation</DialogTitle>
            <DialogDescription>
              This action will promote <strong>all students</strong> to their
              next class level.
            </DialogDescription>
          </DialogHeader>

          <div className='bg-destructive/10 p-3 rounded-md mt-2 text-destructive text-sm font-medium'>
            ⚠️ This action should only be used <u>once per term</u>. It cannot
            be undone.
          </div>

          <div className='flex justify-end gap-2 mt-4'>
            <Button variant='outline' onClick={() => setOpenDialog(false)}>
              Cancel
            </Button>
            <Button
              variant='destructive'
              onClick={handleGraduateStudents}
              disabled={isLoading}
            >
              {isLoading ? 'Graduating...' : 'Graduate'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default GraduateStudentsButton;
