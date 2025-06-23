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

type Psychomotor = {
  pCategory: string;
  grade: string;
};

interface Props {
  data: Psychomotor[];
}

const Psychomotor = ({ data }: Props) => {
  return (
    <Card className='mt-4'>
      <CardHeader>
        <CardTitle>Psychomotor</CardTitle>
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
                <TableRow key={item.pCategory}>
                  <TableCell>{item.pCategory}</TableCell>
                  <TableCell>{item.grade}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p className='text-muted-foreground'>
            No psychomotor record available.
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default Psychomotor;
