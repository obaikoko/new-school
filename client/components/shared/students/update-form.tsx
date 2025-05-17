'use client';

import { useState, useEffect } from 'react';
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

type StudentData = {
  firstName: string;
  lastName: string;
  otherName: string;
  dateOfBirth: string;
  level: string;
  subLevel: string;
  gender: string;
  yearAdmitted: string;
  stateOfOrigin: string;
  localGvt: string;
  homeTown: string;
  sponsorName: string;
  sponsorRelationship: string;
  sponsorPhoneNumber: string;
  sponsorEmail: string;
};

const defaultData: StudentData = {
  firstName: '',
  lastName: '',
  otherName: '',
  dateOfBirth: '',
  level: '',
  subLevel: '',
  gender: '',
  yearAdmitted: '',
  stateOfOrigin: '',
  localGvt: '',
  homeTown: '',
  sponsorName: '',
  sponsorRelationship: '',
  sponsorPhoneNumber: '',
  sponsorEmail: '',
};

const UpdateStudentForm = ({ initialData }: { initialData?: StudentData }) => {
  const [formData, setFormData] = useState<StudentData>(defaultData);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (key: keyof StudentData, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Updating Student:', formData);
    // Call your update logic or API here
  };

  return (
    <form className='space-y-6' onSubmit={handleSubmit}>
      {/* Student Info */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div>
          <Label htmlFor='firstName'>First Name</Label>
          <Input
            id='firstName'
            value={formData.firstName}
            onChange={(e) => handleChange('firstName', e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor='lastName'>Last Name</Label>
          <Input
            id='lastName'
            value={formData.lastName}
            onChange={(e) => handleChange('lastName', e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor='otherName'>Other Name</Label>
          <Input
            id='otherName'
            value={formData.otherName}
            onChange={(e) => handleChange('otherName', e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor='dateOfBirth'>Date of Birth</Label>
          <Input
            type='date'
            id='dateOfBirth'
            value={formData.dateOfBirth}
            onChange={(e) => handleChange('dateOfBirth', e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor='gender'>Gender</Label>
          <Select
            value={formData.gender}
            onValueChange={(value) => handleChange('gender', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder='Select gender' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='Male'>Male</SelectItem>
              <SelectItem value='Female'>Female</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor='level'>Level</Label>
          <Input
            id='level'
            value={formData.level}
            onChange={(e) => handleChange('level', e.target.value)}
            placeholder='e.g., JSS'
          />
        </div>
        <div>
          <Label htmlFor='subLevel'>Sub-Level</Label>
          <Input
            id='subLevel'
            value={formData.subLevel}
            onChange={(e) => handleChange('subLevel', e.target.value)}
            placeholder='e.g., 2'
          />
        </div>
        <div>
          <Label htmlFor='yearAdmitted'>Year Admitted</Label>
          <Input
            id='yearAdmitted'
            value={formData.yearAdmitted}
            onChange={(e) => handleChange('yearAdmitted', e.target.value)}
            placeholder='e.g., 2023'
          />
        </div>
      </div>

      {/* Origin */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div>
          <Label htmlFor='stateOfOrigin'>State of Origin</Label>
          <Input
            id='stateOfOrigin'
            value={formData.stateOfOrigin}
            onChange={(e) => handleChange('stateOfOrigin', e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor='localGvt'>Local Govt</Label>
          <Input
            id='localGvt'
            value={formData.localGvt}
            onChange={(e) => handleChange('localGvt', e.target.value)}
          />
        </div>
        <div className='md:col-span-2'>
          <Label htmlFor='homeTown'>Home Town</Label>
          <Input
            id='homeTown'
            value={formData.homeTown}
            onChange={(e) => handleChange('homeTown', e.target.value)}
          />
        </div>
      </div>

      {/* Sponsor */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div>
          <Label htmlFor='sponsorName'>Sponsor Name</Label>
          <Input
            id='sponsorName'
            value={formData.sponsorName}
            onChange={(e) => handleChange('sponsorName', e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor='sponsorRelationship'>Relationship</Label>
          <Input
            id='sponsorRelationship'
            value={formData.sponsorRelationship}
            onChange={(e) =>
              handleChange('sponsorRelationship', e.target.value)
            }
          />
        </div>
        <div>
          <Label htmlFor='sponsorPhoneNumber'>Phone Number</Label>
          <Input
            id='sponsorPhoneNumber'
            value={formData.sponsorPhoneNumber}
            onChange={(e) => handleChange('sponsorPhoneNumber', e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor='sponsorEmail'>Email</Label>
          <Input
            id='sponsorEmail'
            value={formData.sponsorEmail}
            onChange={(e) => handleChange('sponsorEmail', e.target.value)}
          />
        </div>
      </div>

      <Button type='submit' className='w-full'>
        Update Student
      </Button>
    </form>
  );
};

export default UpdateStudentForm;
