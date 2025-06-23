'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

type AffectiveAssessment = {
  aCategory: string;
  grade: string;
};

interface Props {
  data: AffectiveAssessment[];
}

const AffectiveAssessment = ({ data }: Props) => {
  return (
    <Card className='mt-4'>
      <CardHeader>
        <CardTitle>Affective Assessment</CardTitle>
      </CardHeader>
      <CardContent>
        {data && data.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead>Grade</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item) => (
                <TableRow key={item.aCategory}>
                  <TableCell>{item.aCategory}</TableCell>
                  <TableCell>{item.grade}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p className='text-muted-foreground'>
            No affective assessment available.
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default AffectiveAssessment;
