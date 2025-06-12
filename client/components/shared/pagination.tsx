'use client';

import { Button } from '@/components/ui/button';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const canGoBack = currentPage > 1;
  const canGoForward = currentPage < totalPages;

  return (
    <div className='flex items-center justify-center gap-2 mt-4'>
      <Button
        size='sm'
        variant='outline'
        onClick={() => onPageChange(1)}
        disabled={!canGoBack}
      >
        <ChevronsLeft className='h-4 w-4' />
      </Button>

      <Button
        size='sm'
        variant='outline'
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!canGoBack}
      >
        <ChevronLeft className='h-4 w-4' />
      </Button>

      <span className='text-sm font-medium'>
        Page {currentPage} of {totalPages}
      </span>

      <Button
        size='sm'
        variant='outline'
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!canGoForward}
      >
        <ChevronRight className='h-4 w-4' />
      </Button>

      <Button
        size='sm'
        variant='outline'
        onClick={() => onPageChange(totalPages)}
        disabled={!canGoForward}
      >
        <ChevronsRight className='h-4 w-4' />
      </Button>
    </div>
  );
};

export default Pagination;
