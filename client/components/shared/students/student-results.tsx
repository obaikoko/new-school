import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const dummyResults = [
  { session: '2022/2023', term: 'First Term', resultId: 'res_2022_1' },
  { session: '2022/2023', term: 'Second Term', resultId: 'res_2022_2' },
  { session: '2022/2023', term: 'Third Term', resultId: 'res_2022_3' },
  { session: '2023/2024', term: 'First Term', resultId: 'res_2023_1' },
  { session: '2023/2024', term: 'Second Term', resultId: 'res_2023_2' },
  { session: '2023/2024', term: 'Third Term', resultId: 'res_2023_3' },
  { session: '2024/2025', term: 'First Term', resultId: 'res_2024_1' },
  { session: '2024/2025', term: 'Second Term', resultId: 'res_2024_2' },
  { session: '2024/2025', term: 'Third Term', resultId: 'res_2024_3' },
];

const StudentResults = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Results</CardTitle>
        <CardDescription>Click to view term results</CardDescription>
      </CardHeader>

      <CardContent>
        <div className='flex flex-wrap gap-3'>
          {dummyResults.map((result) => (
            <div
              key={result.resultId}
              className='w-full sm:w-[48%] md:w-[30%] lg:w-[22%] p-3 border rounded-lg hover:bg-muted transition text-sm'
            >
              <p className='font-medium'>{result.term}</p>
              <p className='text-xs text-muted-foreground'>{result.session}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default StudentResults;
