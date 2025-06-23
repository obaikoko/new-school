'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
import { useAppSelector } from '@/src/app/hooks';
const StudentsTable = ({
  students,
  isLoading,
  isError,
}: {
  students: Student[];
  isLoading: boolean;
  isError: boolean;
}) => {
  const pathName = usePathname();
  const { user } = useAppSelector((state) => state.auth);
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
    <div className='max-h-[400px] overflow-y-auto border rounded-md'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>First Name</TableHead>
            <TableHead>Last Name</TableHead>
            <TableHead>Gender</TableHead>
            <TableHead>Level</TableHead>
            <TableHead>
              {pathName === '/admin/dashboard'
                ? 'Date Registered'
                : 'Date Of Birth'}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students &&
            students.map((student) => (
              <TableRow key={student.id}>
                <TableCell>{student.studentId}</TableCell>
                <TableCell className='cursor-pointer text-primary underline'>
                  <Link
                    href={
                      user.isAdmin
                        ? `/admin/students/${student.id}`
                        : `/user/students/${student.id}`
                    }
                  >
                    {student.firstName}
                  </Link>
                </TableCell>
                <TableCell>{student.lastName}</TableCell>
                <TableCell>{student.gender}</TableCell>
                <TableCell>
                  {student.level}
                  {student.subLevel}
                </TableCell>
                <TableCell>
                  {pathName === '/admin/dashboard'
                    ? formatDateTime(student.createdAt)
                    : formatDateTime(student.dateOfBirth)}
                </TableCell>
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
