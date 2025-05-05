import Link from 'next/link';
import Image from 'next/image';
import { APP_NAME } from '@/lib/constants';
import Menu from './menu';

const Header = () => {
  return (
    <header className='w-full border-b overflow-x-hidden'>
      <div className='mx-auto w-full max-w-screen-xl px-4 flex justify-between items-center py-2'>
        <div className='flex items-center'>
          <Link href='/' className='flex items-center space-x-2'>
            <Image
              src='/images/logo.jpg'
              alt={`${APP_NAME} logo`}
              width={48}
              height={48}
              priority
            />
          </Link>
        </div>
        <div className='flex items-center space-x-2'>
          <Menu />
        </div>
      </div>
    </header>
  );
};

export default Header;
