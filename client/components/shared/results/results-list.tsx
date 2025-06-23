import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { StudentResult } from '@/schemas/resultSchema';
import Link from 'next/link';
import { useAppSelector } from '@/src/app/hooks';
import Spinner from '../spinner';
import { Card, CardHeader } from '@/components/ui/card';

const ResultList = ({
  results,
  loading,
  error,
}: {
  results: StudentResult[];
  loading: boolean;
  error: boolean;
}) => {
  const { user } = useAppSelector((state) => state.auth);
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <Spinner />
          Loading...
        </CardHeader>
      </Card>
    );
  }
  if (error) {
    return (
      <Card>
        <CardHeader>Error fetching results</CardHeader>
      </Card>
    );
  }
  return (
    <div className='overflow-x-auto max-h-[300px] overflow-y-auto border rounded-md'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Result ID</TableHead>
            <TableHead>Student</TableHead>
            <TableHead>Class</TableHead>
            <TableHead>Term</TableHead>
            <TableHead>Session</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {results.map((r) => (
            <TableRow key={r.id}>
              <TableCell>
                <Link
                  className='underline'
                  href={
                    user.isAdmin
                      ? `/admin/results/${r.id}`
                      : `/user/results/${r.id}`
                  }
                >
                  {`${r.id.slice(0, 6)}...`}
                </Link>
              </TableCell>
              <TableCell>
                <Link
                  className='underline'
                  href={
                    user.isAdmin
                      ? `/admin/students/${r.studentId}`
                      : `/user/students/${r.studentId}`
                  }
                >
                  {r.firstName} {r.lastName}
                </Link>
              </TableCell>
              <TableCell>
                {r.level}
                {r.subLevel}
              </TableCell>
              <TableCell>{r.term}</TableCell>
              <TableCell>{r.session}</TableCell>
              <TableCell
                className={`${
                  r.isPublished ? 'text-green-600 ' : 'text-red-600 '
                }font-medium`}
              >
                {r.isPublished ? 'Published' : 'Not published'}
              </TableCell>
            </TableRow>
          ))}
          {results.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={6}
                className='text-center py-4 text-muted-foreground'
              >
                No matching results found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ResultList;
