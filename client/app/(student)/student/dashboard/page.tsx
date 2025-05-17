import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const StudentDashBoardPage = () => {
  return (
    <div className='p-6 space-y-6'>
      <h1 className='text-2xl font-bold'>Welcome Back, Student</h1>

      <div className='grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4'>
        <Card>
          <CardHeader>
            <CardTitle>Enrolled Courses</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-3xl font-semibold'>8</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>GPA</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-3xl font-semibold'>3.75</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Attendance</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-3xl font-semibold'>92%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Exams</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-3xl font-semibold'>2</p>
          </CardContent>
        </Card>
      </div>

      <div className='mt-8'>
        <Card>
          <CardHeader>
            <CardTitle>Recent Announcements</CardTitle>
          </CardHeader>
          <CardContent className='space-y-2'>
            <ul className='list-disc list-inside text-sm text-muted-foreground'>
              <li>Mid-term exams start next week.</li>
              <li>Science project due by Friday.</li>
              <li>Resumption date for next term is Sept 5th.</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentDashBoardPage;
