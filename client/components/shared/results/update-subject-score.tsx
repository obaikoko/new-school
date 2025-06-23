'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  useUpdateResultMutation,
  useGetResultQuery,
} from '@/src/features/results/resultApiSlice';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UpdateSubjectScoreSchema } from '@/schemas/resultSchema';
import { updateSubjectScoreSchema } from '@/validators/resultValidator';
import { Loader2 } from 'lucide-react';
import { showZodErrors } from '@/lib/utils';
import { toast } from 'sonner';

const UpdateSubjectScore = ({ resultId }: { resultId: string }) => {
  const [open, setOpen] = useState(false);
  const [updateResult] = useUpdateResultMutation();
  const { data, refetch } = useGetResultQuery(resultId);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<UpdateSubjectScoreSchema>({
    resolver: zodResolver(updateSubjectScoreSchema),
    defaultValues: {
      test: 0,
      exam: 0,
    },
  });

  const handleFormSubmit = async (data: UpdateSubjectScoreSchema) => {
    try {
      await updateResult({
        resultId: resultId,
        subject: data.subject,
        test: data.test,
        exam: data.exam,
      }).unwrap();
      refetch();
      setOpen(false);
      toast.success(`${data.subject} updated successfully`);
      reset();
    } catch (error) {
      showZodErrors(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className='cursor-pointer' size='sm' variant='outline'>
          Update Scores
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>Update Score</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className='space-y-4 mt-4'
        >
          <div>
            <label className='block text-sm font-medium mb-1'>Subject</label>
            <select
              {...register('subject')}
              className='w-full border rounded px-3 py-2 bg-white text-black dark:bg-zinc-900 dark:text-white dark:border-zinc-700'
              defaultValue=''
            >
              <option disabled value=''>
                Select a subject
              </option>
              {data && data.subjectResults && data.subjectResults.length > 0 ? (
                data.subjectResults.map((result, index) => (
                  <option key={index} value={result.subject}>
                    {result.subject}
                  </option>
                ))
              ) : (
                <option disabled>No subjects available</option>
              )}
            </select>
            {errors.subject && (
              <p className='text-sm text-red-500 mt-1'>
                {errors.subject.message}
              </p>
            )}
          </div>
          <div>
            <label className='block text-sm font-medium mb-1'>Test Score</label>
            <Input
              type='number'
              step='0.01'
              {...register('test', { valueAsNumber: true })}
            />
            {errors.test && (
              <p className='text-sm text-red-500 mt-1'>{errors.test.message}</p>
            )}
          </div>

          <div>
            <label className='block text-sm font-medium mb-1'>Exam Score</label>
            <Input
              type='number'
              step='0.01'
              {...register('exam', { valueAsNumber: true })}
            />
            {errors.exam && (
              <p className='text-sm text-red-500 mt-1'>{errors.exam.message}</p>
            )}
          </div>

          <Button type='submit' className='w-full cursor-pointer' disabled={isSubmitting}>
            {isSubmitting && <Loader2 className='w-4 h-4 mr-2 animate-spin' />}
            Save Scores
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateSubjectScore;
