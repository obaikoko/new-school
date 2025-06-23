'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  useGenerateResultMutation,
  useGetResultsForStudentQuery,
} from '@/src/features/results/resultApiSlice';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { GenerateResultForm } from '@/schemas/resultSchema';
import { generateResultSchema } from '@/validators/resultValidator';
import { levels, sessions, terms } from '@/lib/utils';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';

const GenerateResultButton = ({ studentId }: { studentId: string }) => {
  const [open, setOpen] = useState(false);
  const {
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<GenerateResultForm>({
    resolver: zodResolver(generateResultSchema),
  });

  const [generateResult, { isLoading }] = useGenerateResultMutation();
  const { refetch } = useGetResultsForStudentQuery(studentId);

  const onSubmit = async (data: GenerateResultForm) => {
    try {
      await generateResult({
        session: data.session,
        term: data.term,
        level: data.level,
        studentId: studentId,
      }).unwrap();

      toast.success('Result Generated Successfully');
      refetch();
      reset();
      setOpen(false);
    } catch (err) {
      console.error('Error generating result:', err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Generate</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Generate Result</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4 py-2'>
          {/* Session Select */}
          <div className='grid gap-2'>
            <Label>Session</Label>
            <Select onValueChange={(value) => setValue('session', value)}>
              <SelectTrigger>
                <SelectValue placeholder='Select session' />
              </SelectTrigger>
              <SelectContent>
                {sessions.map((session) => (
                  <SelectItem key={session} value={session}>
                    {session}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.session && (
              <p className='text-red-500 text-sm'>{errors.session.message}</p>
            )}
          </div>

          {/* Term Select */}
          <div className='grid gap-2'>
            <Label>Term</Label>
            <Select onValueChange={(value) => setValue('term', value)}>
              <SelectTrigger>
                <SelectValue placeholder='Select term' />
              </SelectTrigger>
              <SelectContent>
                {terms.map((term) => (
                  <SelectItem key={term} value={term}>
                    {term}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.term && (
              <p className='text-red-500 text-sm'>{errors.term.message}</p>
            )}
          </div>

          {/* Level Select */}
          <div className='grid gap-2'>
            <Label>Level</Label>
            <Select onValueChange={(value) => setValue('level', value)}>
              <SelectTrigger>
                <SelectValue placeholder='Select level' />
              </SelectTrigger>
              <SelectContent>
                {levels.map((level) => (
                  <SelectItem key={level} value={level}>
                    {level}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.level && (
              <p className='text-red-500 text-sm'>{errors.level.message}</p>
            )}
          </div>

          <DialogFooter>
            <Button type='submit' disabled={isLoading}>
              {isLoading ? 'Generating...' : 'Submit'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default GenerateResultButton;
