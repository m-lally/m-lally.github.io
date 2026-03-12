const { chromium } = require('@playwright/test');
const path = require('path');
const fs = require('fs');

async function generatePDF() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Get the full file path
  const filePath = path.join(__dirname, 'dist', 'index.html');
  const fileUrl = `file://${filePath}`;
  
  await page.goto(fileUrl, { waitUntil: 'networkidle' });
  
  // Generate PDF with optimal settings
  await page.pdf({
    path: path.join(__dirname, 'dist', 'marc-lally-cv.pdf'),
    format: 'A4',
    margin: {
      top: '0.5in',
      right: '0.5in',
      bottom: '0.5in',
      left: '0.5in'
    },
    printBackground: true,
    preferCSSPageSize: true
  });
  
  console.log('✓ PDF generated: dist/marc-lally-cv.pdf');
  await browser.close();
}

generatePDF().catch(console.error);
