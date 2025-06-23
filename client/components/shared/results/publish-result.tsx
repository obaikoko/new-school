'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { generatePositionSchema } from '@/validators/resultValidator';
import { GeneratePositionForm } from '@/schemas/resultSchema';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { levels, subLevels, sessions, showZodErrors, terms } from '@/lib/utils';
import { useGeneratePositionsMutation } from '@/src/features/results/resultApiSlice';

const PublishResultForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<GeneratePositionForm>({
    resolver: zodResolver(generatePositionSchema),
  });

  const [generatePosition, { isLoading }] = useGeneratePositionsMutation();

  const onSubmit = async (data: GeneratePositionForm) => {
    try {
      await generatePosition({
        session: data.session,
        level: data.level,
        term: data.term,
        subLevel: data.subLevel,
      }).unwrap();
      toast.success(
        `${data.level}  ${data.subLevel} results published successfully`
      );
      reset();
    } catch (err) {
      showZodErrors(err);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div>
          <select
            className='bg-background text-foreground'
            {...register('session')}
            defaultValue=''
          >
            <option value=''>Select Session</option>

            {sessions.map((session, index) => (
              <option key={index} value={session}>
                {session}
              </option>
            ))}
          </select>

          {errors.session && (
            <p className='text-red-500 text-sm mt-1'>
              {errors.session.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor='term'>Term</Label>
          <select
            className='bg-background text-foreground'
            {...register('term')}
          >
            <option value=''>Select Term</option>

            {terms.map((term, index) => (
              <option key={index} value={term}>
                {term}
              </option>
            ))}
          </select>
          {errors.term && (
            <p className='text-red-500 text-sm mt-1'>{errors.term.message}</p>
          )}
        </div>

        <div>
          <select
            className='bg-background text-foreground'
            {...register('level')}
          >
            <option value=''>Select Level/Class</option>

            {levels.map((level, index) => (
              <option key={index} value={level}>
                {level}
              </option>
            ))}
          </select>
          {errors.level && (
            <p className='text-red-500 text-sm mt-1'>{errors.level.message}</p>
          )}
        </div>

        <div>
          <select
            className='bg-background text-foreground'
            {...register('subLevel')}
          >
            <option value=''>select Sub class category</option>

            {subLevels.map((subLevel, index) => (
              <option
                className='bg-background text-foreground'
                key={index}
                value={subLevel}
              >
                {subLevel}
              </option>
            ))}
          </select>
          {errors.subLevel && (
            <p className='text-red-500 text-sm mt-1'>
              {errors.subLevel.message}
            </p>
          )}
        </div>
      </div>

      <Button
        type='submit'
        className='w-full cursor-pointer'
        disabled={isLoading}
      >
        {isLoading ? 'Processing...' : 'Publish Results'}
      </Button>
    </form>
  );
};

export default PublishResultForm;
