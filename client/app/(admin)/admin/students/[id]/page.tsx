import StudentDetails from '@/components/shared/students/student-details';

const StudentProfilePage = async (props: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await props.params;

  return (
    <>
      <StudentDetails studentId={id} />
    </>
  );
};

export default StudentProfilePage;
