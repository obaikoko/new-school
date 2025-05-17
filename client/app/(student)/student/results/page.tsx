'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

const ResultPage = () => {
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: 'Student Result',
  });

  const handleDownloadPDF = async () => {
    if (typeof window === 'undefined' || !printRef.current) return;

    const { default: html2pdf } = await import('html2pdf.js');
    html2pdf().from(printRef.current).save('Emmanuella_Abang_Result.pdf');
  };

  return (
    <div className='max-w-4xl mx-auto p-6 space-y-6'>
      <div className='flex justify-between'>
        <Button onClick={handlePrint} className='hover:cursor-pointer'>
          Print
        </Button>
        <Button onClick={handleDownloadPDF} className='hover:cursor-pointer'>
          Download PDF
        </Button>
      </div>

      {/* ✅ Use a native div for ref */}
      <div ref={printRef}>
        <Card>
          <CardContent className='p-6 space-y-4 text-sm'>
            <h2 className='text-xl font-bold text-center'>Academic Report</h2>
            <p>
              <strong>Student Name:</strong> Emmanuella Christopher Abang
            </p>
            <p>
              <strong>Session:</strong> 2024/2025 Second Term
            </p>
            <p>
              <strong>Class:</strong> JSS 3A
            </p>
            <p>
              <strong>Total Score:</strong> 999 / 1400
            </p>
            <p>
              <strong>Average:</strong> 71.36
            </p>

            {/* ... rest of your existing table and sections ... */}

            <div className='mt-4 text-xs text-center text-muted-foreground'>
              Bendonalds International Schools, Calabar, Nigeria |
              bendonaldsschools.com/results/67e3accdeef2925733b402b3
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ResultPage;
