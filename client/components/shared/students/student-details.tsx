'use client';

import { useState, FormEvent } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import {
  useGetStudentQuery,
  useUpdateStudentMutation,
} from '@/src/features/students/studentApiSlice';
import { formatDateTime, showZodErrors } from '@/lib/utils';
import StudentResults from './student-results';
import { Button } from '@/components/ui/button';
import EditStudentDialog from './edit-student-dialog';
import { toast } from 'sonner';

import DeleteStudentButton from './delete-student-button';

type StudentDetailsProps = {
  studentId: string;
};

type StudentFormData = {
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
};

const StudentDetails = ({ studentId }: StudentDetailsProps) => {
  const { data: student, isLoading, isError } = useGetStudentQuery(studentId);
  const [updateStudent, { isLoading: isUpdating }] = useUpdateStudentMutation();

  const [dialogOpen, setDialogOpen] = useState(false);

  const [formData, setFormData] = useState<StudentFormData>({
    firstName: '',
    lastName: '',
    otherName: '',
    gender: '',
    dateOfBirth: '',
    level: '',
    subLevel: '',
    stateOfOrigin: '',
    localGvt: '',
    homeTown: '',
    isPaid: false,
    isStudent: true,
    sponsorName: '',
    sponsorEmail: '',
    sponsorPhoneNumber: '',
    sponsorRelationship: '',
    yearAdmitted: '',
  });
  const handleEditClick = () => {
    setFormData({
      studentId: student.id,
      firstName: student.firstName || '',
      lastName: student.lastName || '',
      otherName: student.otherName || '',
      gender: student.gender || '',
      dateOfBirth: student.dateOfBirth || '',
      level: student.level || '',
      subLevel: student.subLevel || '',
      yearAdmitted: student.yearAdmitted || '',
      stateOfOrigin: student.stateOfOrigin || '',
      localGvt: student.localGvt || '',
      homeTown: student.homeTown || '',
      isPaid: student.isPaid || false,
      isStudent: student.isStudent || false,
      sponsorName: student.sponsorName || '',
      sponsorEmail: student.sponsorEmail || '',
      sponsorPhoneNumber: student.sponsorPhoneNumber || '',
      sponsorRelationship: student.sponsorRelationship || '',
    });
    setDialogOpen(true);
  };

  const handleUpdateSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await updateStudent({ id: student.id, ...formData }).unwrap();
      toast.success('Student updated successfully');
      setDialogOpen(false);
    } catch (error) {
      showZodErrors(error);
    }
  };

  if (isLoading) {
    return (
      <div className='p-6'>
        <Card>
          <CardContent>Loading Student data...</CardContent>
        </Card>
      </div>
    );
  }

  if (isError || !student) {
    return (
      <div className='p-6'>
        <Card>
          <CardContent>Failed to load Student data.</CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className='max-w-4xl mx-auto p-6 space-y-6'>
      <h1 className='text-3xl font-semibold'>Student Profile</h1>
      <Card>
        <CardContent className='p-6 flex gap-6'>
          <Avatar className='w-24 h-24'>
            <AvatarImage
              src={`https://ui-avatars.com/api/?name=${student.lastName}+${student.firstName}`}
            />
            <AvatarFallback>
              {student.firstName[0]}
              {student.lastName[0]}
            </AvatarFallback>
          </Avatar>
          <div className='space-y-1'>
            <h2 className='text-xl font-medium'>
              {student.lastName} {student.firstName} {student.otherName}
            </h2>
            <p className='text-sm text-muted-foreground'>
              ID: {student.studentId}
            </p>
            <p className='text-sm'>Gender: {student.gender}</p>
            <p className='text-sm'>
              Date of Birth: {formatDateTime(student.dateOfBirth)}
            </p>
            <p className='text-sm'>
              Level: {student.level} - {student.subLevel}
            </p>
            <p className='text-sm'>
              Admitted: {formatDateTime(student.yearAdmitted)}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className='p-6 grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div className='space-y-2'>
            <p>
              <strong>State of Origin:</strong> {student.stateOfOrigin}
            </p>
            <p>
              <strong>Local Govt:</strong> {student.localGvt}
            </p>
            <p>
              <strong>Home Town:</strong> {student.homeTown}
            </p>
            <p>
              <strong>Fees Paid:</strong> {student.isPaid ? 'Yes' : 'No'}
            </p>
            <p>
              <strong>Is Student:</strong> {student.isStudent ? 'Yes' : 'No'}
            </p>
          </div>
          <div className='space-y-2'>
            <p>
              <strong>Sponsor Name:</strong> {student.sponsorName}
            </p>
            <p>
              <strong>Email:</strong> {student.sponsorEmail}
            </p>
            <p>
              <strong>Phone:</strong> {student.sponsorPhoneNumber}
            </p>
            <p>
              <strong>Relationship:</strong> {student.sponsorRelationship}
            </p>
          </div>
        </CardContent>
        <CardContent className='flex justify-end gap-2'>
          <DeleteStudentButton studentId={studentId} />
          <Button variant='outline' onClick={handleEditClick}>
            Edit
          </Button>
        </CardContent>
      </Card>

      <StudentResults />

      <Card>
        <CardContent>
          <p className='text-sm text-muted-foreground text-left'>
            Registered On: {formatDateTime(student.createdAt)}
          </p>
          <p className='text-sm text-muted-foreground text-left'>
            Last Modified: {formatDateTime(student.updatedAt)}
          </p>
        </CardContent>
      </Card>

      <EditStudentDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleUpdateSubmit}
        isLoading={isUpdating}
      />
    </div>
  );
};

export default StudentDetails;
