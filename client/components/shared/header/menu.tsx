import { Button } from '@/components/ui/button';
import ModeToggle from './mode-toggle';
import Link from 'next/link';
import { EllipsisVertical } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import SignInButton from './sign-in-button';
const Menu = () => {
  return (
    <div className='flex items-center'>
      {/* Desktop nav */}
      <nav className='hidden md:flex items-center gap-2 flex-wrap'>
        <ModeToggle />
        <Button asChild variant='ghost'>
          <Link href='/'>Home</Link>
        </Button>
        <Button asChild variant='ghost'>
          <Link href='/about'>About</Link>
        </Button>
        <Button asChild variant='ghost'>
          <Link href='/admission'>Admission</Link>
        </Button>
        <Button asChild variant='ghost'>
          <Link href='/events'>Events</Link>
        </Button>
        <SignInButton />
      </nav>

      {/* Mobile nav */}
      <nav className='md:hidden'>
        <Sheet>
          <SheetTrigger className='align-middle'>
            <EllipsisVertical />
          </SheetTrigger>
          <SheetContent className='flex flex-col items-start space-y-2 pt-6'>
            <SheetTitle>Menu</SheetTitle>
            <ModeToggle />
            <Button asChild variant='ghost'>
              <Link href='/'>Home</Link>
            </Button>
            <Button asChild variant='ghost'>
              <Link href='/about'>About</Link>
            </Button>
            <Button asChild variant='ghost'>
              <Link href='/admission'>Admission</Link>
            </Button>
            <Button asChild variant='ghost'>
              <Link href='/events'>Events</Link>
            </Button>
            <SignInButton />
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  );
};

export default Menu;
