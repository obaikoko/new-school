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
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select';
import { Loader2 } from 'lucide-react';

const ROLES = ['Admin', 'Principal', 'HM', 'Head Of Department', 'Teacher'];
const LEVELS = ['JSS 1', 'JSS 2', 'JSS 3', 'SSS 1', 'SSS 2', 'SSS 3'];
const SUB_LEVELS = ['A', 'B', 'C', 'D', 'E'];
const STATUSES = ['active', 'suspended'];
interface EditUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  formData: EditUserFormData;
  setFormData: React.Dispatch<React.SetStateAction<EditUserFormData>>;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  title?: string
}


 interface EditUserFormData {
  userId?: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  status?: string;
  level: string;
  subLevel: string;
}


export default function EditUserDialog({
  open,
  onOpenChange,
  formData,
  setFormData,
  onSubmit,
  isLoading,
}: EditUserDialogProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handleSelectChange = (field: keyof EditUserFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
          <DialogDescription>Update user information.</DialogDescription>
        </DialogHeader>

        <form onSubmit={onSubmit} className='space-y-4'>
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
            name='email'
            value={formData.email}
            onChange={handleInputChange}
            placeholder='Email'
          />

          <Label htmlFor='role'>Select Role</Label>
          <Select
            value={formData.role}
            onValueChange={(value) => handleSelectChange('role', value)}
          >
            <SelectTrigger id='role'>
              <SelectValue placeholder='Assign Role' />
            </SelectTrigger>
            <SelectContent>
              {ROLES.map((role) => (
                <SelectItem key={role} value={role}>
                  {role}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={formData.level}
            onValueChange={(value) => handleSelectChange('level', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder='Select Level' />
            </SelectTrigger>
            <SelectContent>
              {LEVELS.map((lvl) => (
                <SelectItem key={lvl} value={lvl}>
                  {lvl}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={formData.subLevel}
            onValueChange={(value) => handleSelectChange('subLevel', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder='Select Sub-Level' />
            </SelectTrigger>
            <SelectContent>
              {SUB_LEVELS.map((sub) => (
                <SelectItem key={sub} value={sub}>
                  {sub}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={formData.status}
            onValueChange={(value) => handleSelectChange('status', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder='Select Status' />
            </SelectTrigger>
            <SelectContent>
              {STATUSES.map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button type='submit' disabled={isLoading} className='w-full'>
            {isLoading ? (
              <>
                <Loader2 className='h-4 w-4 animate-spin mr-2' />
                Updating...
              </>
            ) : (
              'Update User'
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
