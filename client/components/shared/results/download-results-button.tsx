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
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { showZodErrors } from '@/lib/utils';
import { sessions, terms, levels, subLevels } from '@/lib/utils';

const DownloadResults = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [session, setSession] = useState('');
  const [term, setTerm] = useState('');
  const [level, setLevel] = useState('');
  const [subLevel, setSubLevel] = useState('');

  const handleDownload = async () => {
    if (!session || !term || !level || !subLevel) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      setLoading(true);

      const query = new URLSearchParams({
        session,
        term,
        level,
        subLevel,
      }).toString();

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/results/pdf?${query}`,
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
      a.download = `results-${level}${subLevel}-${term}-${session}.pdf`;
      a.click();

      window.URL.revokeObjectURL(url);
      setOpen(false);
    } catch (error) {
      showZodErrors(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button variant='outline' onClick={() => setOpen(true)}>
        <Download className='mr-2 h-4 w-4' />
        Download Class Results
      </Button>

      <Dialog open={open} onOpenChange={(val) => !loading && setOpen(val)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Download Class Results</DialogTitle>
            <DialogDescription>
              Select class details to download the results as a PDF.
            </DialogDescription>
          </DialogHeader>

          <form
            className='space-y-4'
            onSubmit={(e) => {
              e.preventDefault();
              handleDownload();
            }}
          >
            <div className='space-y-2'>
              <Label>Session</Label>
              <Select value={session} onValueChange={setSession}>
                <SelectTrigger>
                  <SelectValue placeholder='Select session' />
                </SelectTrigger>
                <SelectContent>
                  {sessions.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className='space-y-2'>
              <Label>Term</Label>
              <Select value={term} onValueChange={setTerm}>
                <SelectTrigger>
                  <SelectValue placeholder='Select term' />
                </SelectTrigger>
                <SelectContent>
                  {terms.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className='space-y-2'>
              <Label>Level</Label>
              <Select value={level} onValueChange={setLevel}>
                <SelectTrigger>
                  <SelectValue placeholder='Select level' />
                </SelectTrigger>
                <SelectContent>
                  {levels.map((l) => (
                    <SelectItem key={l} value={l}>
                      {l}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className='space-y-2'>
              <Label>Sub-Level</Label>
              <Select value={subLevel} onValueChange={setSubLevel}>
                <SelectTrigger>
                  <SelectValue placeholder='Select sub-level' />
                </SelectTrigger>
                <SelectContent>
                  {subLevels.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <DialogFooter className='pt-4'>
              <Button
                type='button'
                variant='outline'
                onClick={() => setOpen(false)}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button type='submit' disabled={loading}>
                {loading ? 'Downloading...' : 'Confirm & Download'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DownloadResults;
