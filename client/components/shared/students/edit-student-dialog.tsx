'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select';
import { Loader2 } from 'lucide-react';
import { Label } from '@/components/ui/label';

const LEVELS = ['JSS 1', 'JSS 2', 'JSS 3', 'SSS 1', 'SSS 2', 'SSS 3'];
const SUB_LEVELS = ['A', 'B', 'C', 'D', 'E'];
const GENDERS = ['male', 'female'];
const RELATIONSHIPS = ['Father', 'Mother', 'Uncle', 'Aunty', 'Guardian'];

interface EditStudentFormData {
  studentId?: string;
  firstName: string;
  lastName: string;
  otherName?: string;
  gender: string;
  dateOfBirth: string;
  level: string;
  subLevel: string;
  stateOfOrigin: string;
  localGvt: string;
  homeTown: string;
  isPaid: boolean;
  isStudent: boolean;
  sponsorName: string;
  sponsorEmail: string;
  sponsorPhoneNumber: string;
  sponsorRelationship: string;
  yearAdmitted: string;
}

interface EditStudentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  formData: EditStudentFormData;
  setFormData: React.Dispatch<React.SetStateAction<EditStudentFormData>>;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}

export default function EditStudentDialog({
  open,
  onOpenChange,
  formData,
  setFormData,
  onSubmit,
  isLoading,
}: EditStudentDialogProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (
    field: keyof EditStudentFormData,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-h-[90vh] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle>Edit Student</DialogTitle>
          <DialogDescription>Update student details.</DialogDescription>
        </DialogHeader>

        <form onSubmit={onSubmit} className='space-y-3'>
          <Input
            name='firstName'
            value={formData.firstName}
            onChange={handleInputChange}
            placeholder='First Name'
          />
          <Input
            name='lastName'
            value={formData.lastName}
            onChange={handleInputChange}
            placeholder='Last Name'
          />
          <Input
            name='otherName'
            value={formData.otherName}
            onChange={handleInputChange}
            placeholder='Other Name'
          />
          <Input
            name='dateOfBirth'
            value={formData.dateOfBirth}
            onChange={handleInputChange}
            type='date'
          />
          <Label htmlFor='gender'>Gender</Label>
          <Select
            value={formData.gender}
            onValueChange={(value) => handleSelectChange('gender', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder='Select Gender' />
            </SelectTrigger>
            <SelectContent>
              {GENDERS.map((g) => (
                <SelectItem key={g} value={g}>
                  {g}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Label htmlFor='level'>Class</Label>
          <Select
            value={formData.level}
            onValueChange={(value) => handleSelectChange('level', value)}
          >
            <SelectTrigger id='level'>
              <SelectValue placeholder='Select Level' />
            </SelectTrigger>
            <SelectContent>
              {LEVELS.map((l) => (
                <SelectItem key={l} value={l}>
                  {l}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Label htmlFor='subLevel'>Sub Class</Label>
          <Select
            value={formData.subLevel}
            onValueChange={(value) => handleSelectChange('subLevel', value)}
          >
            <SelectTrigger id='subLevel'>
              <SelectValue placeholder='Select Sub-Level' />
            </SelectTrigger>
            <SelectContent>
              {SUB_LEVELS.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Input
            name='yearAdmitted'
            value={formData.yearAdmitted}
            onChange={handleInputChange}
            placeholder='Year Admitted'
            type='number'
          />
          <Input
            name='stateOfOrigin'
            value={formData.stateOfOrigin}
            onChange={handleInputChange}
            placeholder='State of Origin'
          />
          <Input
            name='localGvt'
            value={formData.localGvt}
            onChange={handleInputChange}
            placeholder='Local Government'
          />
          <Input
            name='homeTown'
            value={formData.homeTown}
            onChange={handleInputChange}
            placeholder='Home Town'
          />
          <Input
            name='sponsorName'
            value={formData.sponsorName}
            onChange={handleInputChange}
            placeholder='Sponsor Name'
          />
          <Label htmlFor='sponsorRelationship'>Sponsor Relationship</Label>
          <Select
            value={formData.sponsorRelationship}
            onValueChange={(value) =>
              handleSelectChange('sponsorRelationship', value)
            }
          >
            <SelectTrigger id='sponsorRelationship'>
              <SelectValue placeholder='Sponsor Relationship' />
            </SelectTrigger>

            <SelectContent>
              {RELATIONSHIPS.map((r) => (
                <SelectItem key={r} value={r}>
                  {r}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Input
            name='sponsorPhoneNumber'
            value={formData.sponsorPhoneNumber}
            onChange={handleInputChange}
            placeholder='Sponsor Phone'
          />
          <Input
            name='sponsorEmail'
            value={formData.sponsorEmail}
            onChange={handleInputChange}
            placeholder='Sponsor Email'
          />

          <Button type='submit' disabled={isLoading} className='w-full'>
            {isLoading ? (
              <>
                <Loader2 className='h-4 w-4 animate-spin mr-2' />
                Updating...
              </>
            ) : (
              'Update Student'
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
