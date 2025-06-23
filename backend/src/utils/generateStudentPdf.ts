import puppeteer from 'puppeteer';

export const generateStudentPdf = async (html: string): Promise<Buffer> => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setContent(html, { waitUntil: 'networkidle0' });

  const pdfBuffer = await page.pdf({
    format: 'A4',
    printBackground: true,
    margin: { top: '1cm', bottom: '1cm', left: '1cm', right: '1cm' }, // Add margins for better spacing
    scale: 0.75, // Full scale to utilize the full page
  });

  await browser.close();

  return Buffer.from(pdfBuffer);
};
