/**
 * @fileoverview Server-side PDF generation script using Playwright.
 * This script automates the process of rendering the CV HTML and exporting it as a high-quality PDF.
 */

const { chromium } = require('@playwright/test');
const path = require('path');
const fs = require('fs');

/**
 * Automates the PDF generation process.
 * Launches a headless browser, navigates to the local index.html,
 * emulates print media, and saves the output to the cv/ directory.
 * @async
 * @function generatePDF
 * @returns {Promise<void>}
 */
async function generatePDF() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Get the full file path - use current directory index.html
  const filePath = path.join(__dirname, 'index.html');
  const fileUrl = `file://${filePath}`;
  
  await page.goto(fileUrl, { waitUntil: 'networkidle' });
  
  // Add pdf-export class to body for consistent styling
  await page.evaluate(() => {
    document.body.classList.add('pdf-export');
  });
  
  // Emulate print media
  await page.emulateMedia({ media: 'print' });
  
  // Generate PDF with optimal settings
  const outputPath = path.join(__dirname, 'cv', 'marc.lally.pdf');
  await page.pdf({
    path: outputPath,
    format: 'A4',
    margin: {
      top: '0.4in',
      right: '0.4in',
      bottom: '0.4in',
      left: '0.4in'
    },
    printBackground: true,
    preferCSSPageSize: true
  });
  
  console.log(`✓ PDF generated: ${outputPath}`);
  await browser.close();
}

generatePDF().catch(console.error);
