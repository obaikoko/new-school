import { Loader2 } from 'lucide-react';

const Spinner = () => {
  return (
    <div className='flex justify-center items-center p-4'>
      <Loader2 className='animate-spin h-6 w-6 text-blue-600' />
    </div>
  );
};

export default Spinner;
