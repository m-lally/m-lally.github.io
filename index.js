/**
 * @fileoverview Client-side behavior for PDF export and Calendly integration.
 */

/**
 * A function used to restore temporary DOM changes.
 * @callback CleanupFn
 * @returns {void}
 */

/**
 * Callback used once external scripts are loaded.
 * @callback VoidCallback
 * @returns {void}
 */

/**
 * jsPDF object exposed by html2pdf worker.
 * @typedef {object} JsPdfDocument
 * @property {object} internal
 * @property {function(number): void} deletePage
 */

/**
 * Worker chain used by html2pdf.
 * @typedef {object} Html2PdfWorker
 * @property {function(PdfOptions): Html2PdfWorker} set
 * @property {function((HTMLElement|null)): Html2PdfWorker} from
 * @property {function(): Html2PdfWorker} toPdf
 * @property {function(string): Promise<JsPdfDocument>} get
 * @property {function(): Promise<void>} save
 */

/**
 * html2pdf factory function attached to `window`.
 * @callback Html2PdfFactory
 * @returns {Html2PdfWorker}
 */

/**
 * Calendly popup API used on desktop.
 * @typedef {object} CalendlyApi
 * @property {function(object): void} initPopupWidget
 */

/**
 * Browser window with optional third-party globals.
 * @typedef {object} AppWindow
 * @property {Html2PdfFactory} [html2pdf]
 * @property {CalendlyApi} [Calendly]
 */

/**
 * PDF export settings consumed by html2pdf.
 * @typedef {object} PdfOptions
 * @property {number[]} margin
 * @property {string} filename
 * @property {{ type: string, quality: number }} image
 * @property {{ scale: number, useCORS: boolean, backgroundColor: string, scrollY: number, logging: boolean, windowWidth: number }} html2canvas
 * @property {{ unit: string, format: string, orientation: string }} jsPDF
 * @property {{ mode: string[], avoid: string[] }} pagebreak
 * @property {boolean} enableLinks
 */

(function initPdfDownload() {
  /**
   * The application window object cast to AppWindow for type safety.
   * @type {AppWindow}
   */
  const appWindow = /** @type {AppWindow} */ (window);

  /**
   * The download button element for triggering PDF generation.
   * @type {HTMLElement|null}
   */
  const downloadButton = document.getElementById("downloadCvButton");

  if (!downloadButton) return;

  /**
   * Asynchronously loads the html2pdf library from a CDN if it's not already available.
   * @async
   * @function loadHtml2Pdf
   * @returns {Promise<Html2PdfFactory | undefined>} A promise that resolves to the html2pdf factory.
   */
  async function loadHtml2Pdf() {
    if (appWindow.html2pdf) return appWindow.html2pdf;

    await new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src =
        "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js";
      script.async = true;
      script.onload = resolve;
      script.onerror = reject;
      document.body.appendChild(script);
    });

    return appWindow.html2pdf;
  }

  /**
   * Updates the UI state of the download button during the PDF generation process.
   * Disables interaction and shows a loading spinner when busy.
   * @function setButtonState
   * @param {HTMLElement} button - The button element to update.
   * @param {boolean} isBusy - Whether the PDF generation is currently in progress.
   * @param {string} originalText - The original text to restore when not busy.
   * @returns {void}
   */
  function setButtonState(button, isBusy, originalText) {
    const textNode = button.querySelector("p");
    if (!textNode) return;

    if (isBusy) {
      button.setAttribute("aria-disabled", "true");
      button.style.pointerEvents = "none";
      textNode.innerHTML =
        '<i class="fa fa-spinner fa-spin" aria-hidden="true"></i> Generating PDF...';
      return;
    }

    button.removeAttribute("aria-disabled");
    button.style.pointerEvents = "";
    textNode.innerHTML = originalText;
  }

  /**
   * Configures and returns the options for html2pdf generation.
   * Defines margins, filename, image quality, and page break behavior.
   * @function getPdfOptions
   * @returns {PdfOptions} The configuration object for html2pdf.
   */
  function getPdfOptions() {
    return {
      margin: [0.4, 0.32, 0.4, 0.32],
      filename: "marc-lally-cv.pdf",
      image: { type: "jpeg", quality: 0.96 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        scrollY: 0,
        logging: false,
        windowWidth: document.documentElement.scrollWidth
      },
      jsPDF: {
        unit: "in",
        format: "a4",
        orientation: "portrait"
      },
      pagebreak: {
        mode: ["css", "legacy"],
        avoid: [
          ".cv-entry",
          ".role-card",
          ".intro-card",
          ".highlight-item",
          ".note-card",
          ".experience-standout",
          ".education-card",
          ".contact-presentation",
          ".job-bullets li"
        ]
      },
      enableLinks: true
    };
  }

  /**
   * Groups company and job description nodes into single 'cv-entry' containers.
   * This is critical for preventing awkward page breaks between a company header and its text.
   * @function wrapExperienceEntriesForPdf
   * @returns {CleanupFn} A function to undo the wrapping and restore the original DOM structure.
   */
  function wrapExperienceEntriesForPdf() {
    const wrapper = document.querySelector(".experience-wrapper");
    if (!wrapper) return () => {};

    const groups = [];
    const children = Array.from(wrapper.children);
    for (let i = 0; i < children.length;) {
    for (let i = 0; i < children.length; i += 2) {
      const company = children[i];
      const job = children[i + 1];
      if (
        !company ||
        !job ||
        !company.classList.contains("company-wrapper") ||
        !job.classList.contains("job-wrapper")
      ) {
        i += 1;
        continue;
      }

      const divider = children[i + 2];
      const hasDivider =
        !!divider && divider.classList.contains("section-divider");

      const entry = document.createElement("div");
      entry.className = "cv-entry";
      wrapper.insertBefore(entry, company);
      entry.appendChild(company);
      entry.appendChild(job);
      if (hasDivider) {
        entry.appendChild(divider);
      }
      groups.push(entry);
      i += hasDivider ? 3 : 2;
    }

    return function cleanup() {
      groups.forEach((entry) => {
        while (entry.firstChild) {
          wrapper.insertBefore(entry.firstChild, entry);
        }
        entry.remove();
      });
    };
  }

  /**
   * Swaps the default 'tel:' link with a WhatsApp link for the PDF version.
   * This provides a better user experience for digital PDF readers.
   * @function swapPhoneLinkForPdf
   * @returns {CleanupFn} A function to restore the original phone link attributes.
   */
  function swapPhoneLinkForPdf() {
    const phoneLink = document.getElementById("phoneLink");
    if (!phoneLink) return () => {};

    const originalHref = phoneLink.getAttribute("href");
    const originalTarget = phoneLink.getAttribute("target");
    const originalRel = phoneLink.getAttribute("rel");

    phoneLink.setAttribute("href", "https://wa.me/447516029946");
    phoneLink.setAttribute("target", "_blank");
    phoneLink.setAttribute("rel", "noopener noreferrer");

    return function cleanup() {
      if (originalHref) phoneLink.setAttribute("href", originalHref);
      else phoneLink.removeAttribute("href");

      if (originalTarget) phoneLink.setAttribute("target", originalTarget);
      else phoneLink.removeAttribute("target");

      if (originalRel) phoneLink.setAttribute("rel", originalRel);
      else phoneLink.removeAttribute("rel");
    };
  }

  /**
   * Manages the end-to-end client-side PDF generation flow.
   * Handles UI updates, DOM preparation (wrapping, CSS classes), and cleanup.
   * @async
   * @function generatePdf
   * @returns {Promise<void>}
   */
  async function generatePdf() {
    const textNode = downloadButton.querySelector("p");
    const originalText = textNode ? textNode.innerHTML : "Download CV";
    /** @type {CleanupFn} */
    let cleanupWrappedEntries = () => {};
    /** @type {CleanupFn} */
    let cleanupPhoneLink = () => {};

    try {
      setButtonState(downloadButton, true, originalText);
      document.documentElement.classList.add("pdf-export");

      if (document.fonts && document.fonts.ready) {
        await document.fonts.ready;
      }

      cleanupPhoneLink = swapPhoneLinkForPdf();
      cleanupWrappedEntries = wrapExperienceEntriesForPdf();
      const html2pdf = await loadHtml2Pdf();
      if (!html2pdf) throw new Error("Failed to load html2pdf");

      const source = document.getElementById("content");
      const options = getPdfOptions();
      const worker = html2pdf().set(options).from(source).toPdf();
      await worker.save();
    } catch (error) {
      console.error("PDF generation failed, falling back to direct download:", error);
      window.location.href = downloadButton.getAttribute("href") || "";
    } finally {
      cleanupPhoneLink();
      cleanupWrappedEntries();
      document.documentElement.classList.remove("pdf-export");
      setButtonState(downloadButton, false, originalText);
    }
  }

  downloadButton.addEventListener("click", async (event) => {
    event.preventDefault();
    await generatePdf();
  });
})();

(function initCalendlyOverlay() {
  const appWindow = /** @type {AppWindow} */ (window);
  const calendlyEmbedUrl =
    "https://calendly.com/marc-lally/30min?background_color=0a0a0b&text_color=fafafa&primary_color=e4a853";

  /**
   * Loads Calendly CSS and script, then invokes the callback.
   * @param {VoidCallback} cb
   * @returns {void}
   */
  function loadCalendlyAssets(cb) {
    if (appWindow.Calendly) {
      cb();
      return;
    }

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://assets.calendly.com/assets/external/widget.css";
    document.head.appendChild(link);

    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    script.onload = cb;
    document.body.appendChild(script);
  }

  const meetingLink = document.getElementById("meetingLink");
  if (!meetingLink) return;

  meetingLink.addEventListener("click", (event) => {
    if (window.matchMedia("(max-width: 768px)").matches) return;
    event.preventDefault();
    loadCalendlyAssets(() => {
      if (!appWindow.Calendly) return;
      appWindow.Calendly.initPopupWidget({ url: calendlyEmbedUrl });
    });
  });
})();
