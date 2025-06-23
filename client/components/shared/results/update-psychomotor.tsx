'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import Spinner from '../spinner';
import {
  useUpdateResultMutation,
  useGetResultQuery,
} from '@/src/features/results/resultApiSlice';
import {
  psychomotorCategories as categories,
  grade,
  showZodErrors,
} from '@/lib/utils';

const UpdatePsychomotor = ({ resultId }: { resultId: string }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [updateResult, { isLoading }] = useUpdateResultMutation();
  const { refetch } = useGetResultQuery(resultId);

  const [formData, setFormData] = useState<Record<string, string>>({
    Handwriting: '',
    Games: '',
    Sports: '',
    Drawing: '',
    Speaking: '',
    HandlingTools: '',
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const psychomotor = Object.entries(formData)
      .filter(([, grade]) => grade)
      .map(([pCategory, grade]) => ({ pCategory, grade }));

    try {
      await updateResult({
        resultId,
        psychomotorAssessments: psychomotor,
      }).unwrap();
      toast.success('Psychomotor updated successfully');
      refetch();
      setOpenDialog(false);
    } catch (err) {
      showZodErrors(err);
    }
  };

  return (
    <div>
      <Button className='cursor-pointer' onClick={() => setOpenDialog(true)}>
        Update Psychomotor
      </Button>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className='max-w-4xl max-h-[90vh] overflow-y-auto'>
          <DialogHeader>
            <DialogTitle className='text-2xl font-bold text-gray-900 dark:text-gray-100'>
              Update Psychomotor
            </DialogTitle>
            <p className='text-sm text-gray-500 dark:text-gray-400 mt-1'>
              Select one grade for each category.
            </p>
          </DialogHeader>

          <form onSubmit={onSubmit} className='space-y-6 mt-4'>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
              {categories.map((category) => (
                <div key={category}>
                  <h3 className='font-semibold mb-2 text-gray-700 dark:text-gray-300'>
                    {category}
                  </h3>
                  <div className='flex flex-wrap gap-2'>
                    {grade.map((g) => (
                      <label
                        key={g}
                        className={`px-3 py-1 rounded border text-sm cursor-pointer transition
                          ${
                            formData[category] === g
                              ? 'bg-blue-600 text-white border-blue-600 dark:bg-blue-500 dark:border-blue-500'
                              : 'bg-muted border-gray-300 text-gray-800 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600'
                          }`}
                      >
                        <input
                          type='radio'
                          name={category}
                          value={g}
                          checked={formData[category] === g}
                          onChange={onChange}
                          className='hidden'
                        />
                        {g}
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className='flex justify-end gap-4 pt-4'>
              {isLoading ? (
                <Spinner />
              ) : (
                <>
                  <Button className='cursor-pointer' type='submit'>
                    Upload
                  </Button>
                  <Button
                    className='cursor-pointer'
                    type='button'
                    variant='destructive'
                    onClick={() => setOpenDialog(false)}
                  >
                    Cancel
                  </Button>
                </>
              )}
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UpdatePsychomotor;
