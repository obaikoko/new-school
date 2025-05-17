'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectValue,
  SelectItem,
} from '@/components/ui/select';

const ResumptionInfoForm = () => {
  const [formData, setFormData] = useState({
    nextTermFees: '',
    session: '',
    term: '',
    studentClass: '',
    resumptionDate: '',
    busFee: '',
    otherCharges: '',
  });

  const handleChange = (key: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Resumption Info:', formData);
    // Add submission logic here
  };

  return (
    <form className='space-y-6 max-w-2xl' onSubmit={handleSubmit}>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div>
          <Label htmlFor='nextTermFees'>Next Term Fees</Label>
          <Input
            id='nextTermFees'
            type='number'
            value={formData.nextTermFees}
            onChange={(e) => handleChange('nextTermFees', e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor='session'>Session</Label>
          <Input
            id='session'
            value={formData.session}
            onChange={(e) => handleChange('session', e.target.value)}
            placeholder='e.g., 2024/2025'
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
          <Label htmlFor='resumptionDate'>Resumption Date</Label>
          <Input
            id='resumptionDate'
            type='date'
            value={formData.resumptionDate}
            onChange={(e) => handleChange('resumptionDate', e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor='busFee'>Bus Fee</Label>
          <Input
            id='busFee'
            type='number'
            value={formData.busFee}
            onChange={(e) => handleChange('busFee', e.target.value)}
          />
        </div>

        <div className='md:col-span-2'>
          <Label htmlFor='otherCharges'>Other Charges</Label>
          <Input
            id='otherCharges'
            type='number'
            value={formData.otherCharges}
            onChange={(e) => handleChange('otherCharges', e.target.value)}
          />
        </div>
      </div>

      <Button type='submit' className='w-full'>
        Submit Resumption Info
      </Button>
    </form>
  );
};

export default ResumptionInfoForm;
