'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Download } from 'lucide-react';
import { toast } from 'sonner';
import { showZodErrors } from '@/lib/utils';

const DownloadResult = ({ resultId }: { resultId: string }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/results/pdf/${resultId}`,
        {
          method: 'GET',
          credentials: 'include',
        }
      );

      if (!res.ok) {
        toast.error('Failed to download PDF');

        return;
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = `result-${resultId}.pdf`;
      a.click();

      window.URL.revokeObjectURL(url);

      // Close only after successful download
      setOpen(false);
    } catch (error) {
      showZodErrors(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        className='cursor-pointer'
        variant='outline'
        onClick={() => setOpen(true)}
      >
        <Download className='mr-2 h-4 w-4' />
        Download Result
      </Button>

      <Dialog open={open} onOpenChange={(val) => !loading && setOpen(val)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Download Result</DialogTitle>
            <DialogDescription>
              Are you sure you want to download this result as a PDF?
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className='flex justify-end gap-2'>
            <Button
              className='cursor-pointer'
              variant='outline'
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              className='cursor-pointer'
              onClick={handleDownload}
              disabled={loading}
            >
              {loading ? 'Downloading...' : 'Confirm'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DownloadResult;
