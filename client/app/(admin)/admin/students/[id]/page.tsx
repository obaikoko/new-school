import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
// import Student from '@/schemas/studentSchema';
const dummyStudent = {
  id: '1',
  studentId: 'STU2023001',
  firstName: 'John',
  lastName: 'Doe',
  otherName: 'Michael',
  dateOfBirth: '2005-08-15',
  level: 'Primary 5',
  subLevel: 'B',
  isStudent: true,
  isPaid: true,
  gender: 'Male',
  yearAdmitted: 2021,
  stateOfOrigin: 'Lagos',
  localGvt: 'Ikeja',
  homeTown: 'Yaba',
  sponsorEmail: 'sponsor@example.com',
  sponsorName: 'Jane Doe',
  sponsorPhoneNumber: '08012345678',
  sponsorRelationship: 'Mother',
  imageUrl: '/images/student-placeholder.jpg',
  createdAt: '2023-01-01T00:00:00.000Z',
};

const StudentProfilePage = () => {
  const student = dummyStudent; // Replace with actual data later

  return (
    <div className='max-w-4xl mx-auto p-6 space-y-6'>
      <h1 className='text-3xl font-semibold'>Student Profile</h1>

      <Card>
        <CardContent className='p-6 flex gap-6'>
          <Avatar className='w-24 h-24'>
            <AvatarImage src={student.imageUrl} alt='Student' />
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
            <p className='text-sm'>Date of Birth: {student.dateOfBirth}</p>
            <p className='text-sm'>
              Level: {student.level} - {student.subLevel}
            </p>
            <p className='text-sm'>Admitted: {student.yearAdmitted}</p>
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
      </Card>

      <p className='text-sm text-muted-foreground text-right'>
        Created: {new Date(student.createdAt).toLocaleDateString()}
      </p>
    </div>
  );
};

export default StudentProfilePage;
