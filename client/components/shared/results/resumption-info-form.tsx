'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { nextTermDetailsSchema } from '@/validators/studentValidation';
import { NextTermDetailsForm } from '@/schemas/studentSchema';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { levels, sessions, showZodErrors, terms } from '@/lib/utils';
import { useAddNextTermInfoMutation } from '@/src/features/nextTerm/nextTermApiSlcie';
import { Input } from '@/components/ui/input';

const ResumptionInfoForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NextTermDetailsForm>({
    resolver: zodResolver(nextTermDetailsSchema),
  });

  const [nextTermDetails, { isLoading }] = useAddNextTermInfoMutation();

  const onSubmit = async (data: NextTermDetailsForm) => {
    try {
      await nextTermDetails({
        session: data.session,
        level: data.level,
        term: data.term,
        nextTermFee: data.nextTermFee,
        reOpeningDate: data.reOpeningDate,
        busFee: data.busFee,
        otherCharges: data.otherCharges,
      }).unwrap();
      toast.success(`Uploaded successfully`);
      reset();
    } catch (err) {
      showZodErrors(err);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div>
          <div>
            <Label htmlFor='reOpeningDate'>Reopening Date</Label>
            <Input
              type='date'
              id='reOpeningDate'
              {...register('reOpeningDate')}
              className='bg-background text-foreground'
            />
            {errors.reOpeningDate && (
              <p className='text-red-500 text-sm mt-1'>
                {errors.reOpeningDate.message}
              </p>
            )}
          </div>

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
          <Input
            className='bg-background text-foreground'
            {...register('nextTermFee')}
            placeholder='Enter next fee (eg. 67,000)'
          />
          {errors.nextTermFee && (
            <p className='text-red-500 text-sm mt-1'>
              {errors.nextTermFee.message}
            </p>
          )}
        </div>
        <div>
          <Input
            className='bg-background text-foreground'
            {...register('busFee')}
            placeholder='Enter Bus Fee (eg. 25,000)'
          />
          {errors.busFee && (
            <p className='text-red-500 text-sm mt-1'>{errors.busFee.message}</p>
          )}
        </div>
        <div>
          <Input
            className='bg-background text-foreground'
            {...register('otherCharges')}
            placeholder='Enter Other Charges (eg. 10,000)'
          />
          {errors.otherCharges && (
            <p className='text-red-500 text-sm mt-1'>
              {errors.otherCharges.message}
            </p>
          )}
        </div>
      </div>

      <Button
        type='submit'
        className='w-full cursor-pointer'
        disabled={isLoading}
      >
        {isLoading ? 'Processing...' : 'Upload'}
      </Button>
    </form>
  );
};

export default ResumptionInfoForm;
