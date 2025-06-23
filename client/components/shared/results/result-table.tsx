'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { SubjectResult } from '@/schemas/resultSchema';

const ResultTable = ({ results }: { results: SubjectResult[] }) => {
  return (
    <div className='p-4 rounded-xl shadow-md bg-white dark:bg-zinc-900'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Subject</TableHead>
            <TableHead>Test</TableHead>
            <TableHead>Exam</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Grade</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {results.map((result, index) => (
            <TableRow key={index}>
              <TableCell>{result.subject}</TableCell>

              <TableCell>{result.testScore}</TableCell>
              <TableCell>{result.examScore}</TableCell>
              <TableCell>{result.totalScore}</TableCell>
              <TableCell>{result.grade}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ResultTable;
