import puppeteer from 'puppeteer';

export const generateStudentPdf = async (html: string): Promise<Buffer> => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setContent(html, { waitUntil: 'networkidle0' });

  const pdfBuffer = await page.pdf({
    format: 'A4',
    printBackground: true,
    margin: { top: '0cm', bottom: '0cm', left: '0cm', right: '0cm' },
    scale: 0.75, // Try 0.8 or 0.75 if needed
  });

  await browser.close();

  return Buffer.from(pdfBuffer);
};
