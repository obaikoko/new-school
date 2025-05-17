'use client';

import { useState } from 'react';
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

const PublishResultForm = () => {
  const [formData, setFormData] = useState({
    session: '',
    term: '',
    studentClass: '',
    subClass: '',
  });

  const handleChange = (key: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Publishing Result for:', formData);
    // Add submit logic here
  };

  return (
    <form className='space-y-6 max-w-xl' onSubmit={handleSubmit}>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div>
          <Label htmlFor='session'>Session</Label>
          <Input
            id='session'
            value={formData.session}
            onChange={(e) => handleChange('session', e.target.value)}
            placeholder='e.g. 2024/2025'
          />
        </div>

        <div>
          <Label htmlFor='term'>Term</Label>
          <Select onValueChange={(value) => handleChange('term', value)}>
            <SelectTrigger>
              <SelectValue placeholder='Select term' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='1st Term'>1st Term</SelectItem>
              <SelectItem value='2nd Term'>2nd Term</SelectItem>
              <SelectItem value='3rd Term'>3rd Term</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor='studentClass'>Class</Label>
          <Select
            onValueChange={(value) => handleChange('studentClass', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder='Select class' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='JSS'>JSS</SelectItem>
              <SelectItem value='SSS'>SSS</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor='subClass'>Sub-Class</Label>
          <Select
            onValueChange={(value) => handleChange('subClass', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder='Select Arm' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='A'>A</SelectItem>
              <SelectItem value='B'>B</SelectItem>
              <SelectItem value='C'>C</SelectItem>
              <SelectItem value='D'>D</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button type='submit' className='w-full'>
        Publish Result
      </Button>
    </form>
  );
};

export default PublishResultForm;
