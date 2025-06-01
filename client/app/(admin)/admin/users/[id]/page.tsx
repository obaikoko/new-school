// import SendEmailForm from '@/components/shared/mails/send-mail-form';
import UserDetails from '@/components/shared/users/user-details';

const UserProfilePage = async (props: { params: Promise<{ id: string }> }) => {
  const { id } = await props.params;

  return (
    <>
      <UserDetails userId={id} />
    </>
  );
};

export default UserProfilePage;
