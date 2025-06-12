'use client';
import Link from 'next/link';
import { Student } from '@/schemas/studentSchema';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatDateTime } from '@/lib/utils';
import Spinner from '../spinner';
import { Card, CardContent } from '@/components/ui/card';

const StudentsTable = ({
  students,
  isLoading,
  isError,
}: {
  students: Student[];
  isLoading: boolean;
  isError: boolean;
}) => {
  if (isLoading)
    return (
      <Card>
        <CardContent>
          <Spinner />
          Loading students...
        </CardContent>
      </Card>
    );
  if (isError)
    return (
      <div>
        <Card>
          <CardContent>Failed to load students. Please try again.</CardContent>
        </Card>
      </div>
    );

  return (
    <div className='max-h-[500px] overflow-y-auto border rounded-md'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>First Name</TableHead>
            <TableHead>Last Name</TableHead>
            <TableHead>Gender</TableHead>
            <TableHead>Level</TableHead>
            <TableHead>Date Of Birth</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.map((student) => (
            <TableRow key={student.id}>
              <TableCell>{student.studentId}</TableCell>
              <TableCell className='cursor-pointer text-primary underline'>
                <Link href={`/admin/students/${student.id}`}>
                  {student.firstName}
                </Link>
              </TableCell>
              <TableCell>{student.lastName}</TableCell>
              <TableCell>{student.gender}</TableCell>
              <TableCell>{student.level}</TableCell>
              <TableCell>{formatDateTime(student.dateOfBirth)}</TableCell>
            </TableRow>
          ))}
          {students.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={7}
                className='text-center py-4 text-muted-foreground'
              >
                No students found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default StudentsTable;
