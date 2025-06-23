'use client';
import NaijaStates from 'naija-state-local-government';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { levels, subLevels } from '@/lib/utils';

import { showZodErrors } from '@/lib/utils';
import { RegisterStudentForm } from '@/schemas/studentSchema';
import { registerStudentSchema } from '@/validators/studentValidation';
import { useRegisterStudentMutation } from '@/src/features/students/studentApiSlice';
import { useState } from 'react';
import Spinner from '../spinner';

const RegisterStudentsForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<RegisterStudentForm>({
    resolver: zodResolver(registerStudentSchema),
  });

  const [registerStudent, { isLoading }] = useRegisterStudentMutation();
  const [selectedState, setSelectedState] = useState('');
  const states: string[] = NaijaStates.states();
  const getLgas = (state: string): string[] => NaijaStates.lgas(state).lgas;

  const onSubmit = async (data: RegisterStudentForm) => {
    try {
      await registerStudent(data).unwrap();
      toast.success(` registered successfully`);
    } catch (err) {
      showZodErrors(err);
    }
  };

  return (
    <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div>
          <Label htmlFor='firstName'>First Name</Label>
          <Input id='firstName' {...register('firstName')} />
          {errors.firstName && (
            <p className='text-sm text-red-500'>{errors.firstName.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor='lastName'>Last Name</Label>
          <Input id='lastName' {...register('lastName')} />
          {errors.lastName && (
            <p className='text-sm text-red-500'>{errors.lastName.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor='otherName'>Other Name</Label>
          <Input id='otherName' {...register('otherName')} />
        </div>
        <div>
          <Label htmlFor='dateOfBirth'>Date of Birth</Label>
          <Input type='date' id='dateOfBirth' {...register('dateOfBirth')} />
          {errors.dateOfBirth && (
            <p className='text-sm text-red-500'>{errors.dateOfBirth.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor='gender'>Gender</Label>
          <Select onValueChange={(value) => setValue('gender', value)}>
            <SelectTrigger>
              <SelectValue placeholder='Select gender' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='Male'>Male</SelectItem>
              <SelectItem value='Female'>Female</SelectItem>
            </SelectContent>
          </Select>
          {errors.gender && (
            <p className='text-sm text-red-500'>{errors.gender.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor='level'>Level</Label>
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
            <p className='text-sm text-red-500'>{errors.level.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor='s'>Sub-Level</Label>
          <Select onValueChange={(value) => setValue('subLevel', value)}>
            <SelectTrigger>
              <SelectValue placeholder='Select sub-level' />
            </SelectTrigger>
            <SelectContent>
              {subLevels.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.subLevel && (
            <p className='text-sm text-red-500'>{errors.subLevel.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor='yearAdmitted'>Year Admitted</Label>
          <Input
            id='yearAdmitted'
            type='date'
            {...register('yearAdmitted')}
            placeholder='e.g., 2023'
          />
          {errors.yearAdmitted && (
            <p className='text-sm text-red-500'>
              {errors.yearAdmitted.message}
            </p>
          )}
        </div>
      </div>

      {/* Origin */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div>
          <Label htmlFor='stateOfOrigin'>State of Origin</Label>
          <Select
            onValueChange={(value) => {
              setValue('stateOfOrigin', value);
              setSelectedState(value);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder='Select state' />
            </SelectTrigger>
            <SelectContent>
              {states.map((state: string) => (
                <SelectItem key={state} value={state}>
                  {state}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.stateOfOrigin && (
            <p className='text-sm text-red-500'>
              {errors.stateOfOrigin.message}
            </p>
          )}
        </div>
        <div>
          <Label htmlFor='localGvt'>Local Govt</Label>
          <Select onValueChange={(value) => setValue('localGvt', value)}>
            <SelectTrigger>
              <SelectValue placeholder='Select LGA' />
            </SelectTrigger>
            <SelectContent>
              {(selectedState ? getLgas(selectedState) : []).map(
                (lga: string) => (
                  <SelectItem key={lga} value={lga}>
                    {lga}
                  </SelectItem>
                )
              )}
            </SelectContent>
          </Select>
          {errors.localGvt && (
            <p className='text-sm text-red-500'>{errors.localGvt.message}</p>
          )}
        </div>
        <div className='md:col-span-2'>
          <Label htmlFor='homeTown'>Home Town</Label>
          <Input id='homeTown' {...register('homeTown')} />
          {errors.homeTown && (
            <p className='text-sm text-red-500'>{errors.homeTown.message}</p>
          )}
        </div>
      </div>

      {/* Sponsor */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div>
          <Label htmlFor='sponsorName'>Sponsor Name</Label>
          <Input id='sponsorName' {...register('sponsorName')} />
          {errors.sponsorName && (
            <p className='text-sm text-red-500'>{errors.sponsorName.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor='sponsorRelationship'>Relationship</Label>
          <Select
            onValueChange={(value) => setValue('sponsorRelationship', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder='Select relationship' />
            </SelectTrigger>
            <SelectContent>
              {['Mother', 'Father', 'Uncle', 'Aunt', 'Guardian', 'Other'].map(
                (r) => (
                  <SelectItem key={r} value={r}>
                    {r}
                  </SelectItem>
                )
              )}
            </SelectContent>
          </Select>
          {errors.sponsorRelationship && (
            <p className='text-sm text-red-500'>
              {errors.sponsorRelationship.message}
            </p>
          )}
        </div>
        <div>
          <Label htmlFor='sponsorPhoneNumber'>Phone Number</Label>
          <Input id='sponsorPhoneNumber' {...register('sponsorPhoneNumber')} />
          {errors.sponsorPhoneNumber && (
            <p className='text-sm text-red-500'>
              {errors.sponsorPhoneNumber.message}
            </p>
          )}
        </div>
        <div>
          <Label htmlFor='sponsorEmail'>Email</Label>
          <Input id='sponsorEmail' {...register('sponsorEmail')} />
          {errors.sponsorEmail && (
            <p className='text-sm text-red-500'>
              {errors.sponsorEmail.message}
            </p>
          )}
        </div>
      </div>

      <Button type='submit' className='w-full' disabled={isLoading}>
        {isLoading && <Spinner />}
        {isLoading ? 'Processing...' : 'Register Student'}
      </Button>
    </form>
  );
};

export default RegisterStudentsForm;
