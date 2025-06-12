'use client';

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search } from 'lucide-react';
import { searchSchema } from '@/validators/studentValidation';
import { SearchForm } from '@/schemas/studentSchema';
import { useRouter } from 'next/navigation';
import { levels } from '@/lib/utils';

const StudentsSearch = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SearchForm>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      name: '',
      level: 'All',
    },
  });

  const handleSearch = (data: SearchForm) => {
    const { name, level } = data;
    if ((!name || name.trim() === '') && level === 'All') {
      router.push(`/admin/students`);
    } else {
      const query = `?keyword=${encodeURIComponent(
        name ?? ''
      )}&level=${encodeURIComponent(level)}`;
      router.push(`/admin/students/search${query}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleSearch)}
      className='bg-background p-6 mt-1 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4 text-foreground max-w-4xl mx-auto rounded-md'
    >
      <div className='flex flex-col sm:flex-row items-center gap-4 w-full'>
        <div className='relative w-full sm:flex-1'>
          <Input
            {...register('name')}
            placeholder='Enter Name (First, Last, Other)'
            className={`w-full pr-10 ${
              errors.name ? 'border-destructive' : ''
            }`}
            aria-invalid={!!errors.name}
          />
          <Search
            className='absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none'
            size={18}
          />
        </div>

        <Controller
          control={control}
          name='level'
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger className='w-full sm:w-auto flex-1'>
                <SelectValue placeholder='Select level' />
              </SelectTrigger>
              <SelectContent>
                {levels.map((lvl: string) => (
                  <SelectItem key={lvl} value={lvl}>
                    {lvl}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </div>

      <Button
        type='submit'
        className='flex items-center gap-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors cursor-pointer'
      >
        <Search size={16} />
        Search
      </Button>
    </form>
  );
};

export default StudentsSearch;
