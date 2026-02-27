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
 * @property {{ scale: number, useCORS: boolean, backgroundColor: string, scrollY: number }} html2canvas
 * @property {{ unit: string, format: string, orientation: string }} jsPDF
 * @property {{ mode: string[] }} pagebreak
 * @property {boolean} enableLinks
 */

(function initPdfDownload() {
  const appWindow = /** @type {AppWindow} */ (window);
  const downloadButton = document.getElementById("downloadCvButton");
  if (!downloadButton) return;

  /**
   * Loads html2pdf from CDN if not already present.
   * @returns {Promise<Html2PdfFactory | undefined>}
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
   * Updates the download button UI while PDF generation is running.
   * @param {HTMLElement} button
   * @param {boolean} isBusy
   * @param {string} originalText
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
   * Builds the PDF generation options.
   * @returns {PdfOptions}
   */
  function getPdfOptions() {
    return {
      margin: [0.45, 0.2, 0.28, 0.2],
      filename: "marc-lally-cv.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: {
        scale: 1.45,
        useCORS: true,
        backgroundColor: "#ffffff",
        scrollY: 0
      },
      jsPDF: {
        unit: "in",
        format: "letter",
        orientation: "portrait"
      },
      pagebreak: { mode: ["css"] },
      enableLinks: true
    };
  }

  /**
   * Wraps company and role nodes into grouped containers for page-break control.
   * @returns {CleanupFn}
   */
  function wrapExperienceEntriesForPdf() {
    const wrapper = document.querySelector(".experience-wrapper");
    if (!wrapper) return () => {};

    const groups = [];
    const children = Array.from(wrapper.children);

    for (let i = 0; i < children.length; i += 2) {
      const company = children[i];
      const job = children[i + 1];
      if (!company || !job) continue;

      const entry = document.createElement("div");
      entry.className = "cv-entry";
      wrapper.insertBefore(entry, company);
      entry.appendChild(company);
      entry.appendChild(job);
      groups.push(entry);
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
   * Replaces phone link with a web-compatible fallback for PDF viewers.
   * @returns {CleanupFn}
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
   * Generates the PDF export from the page content and triggers file download.
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
      document.documentElement.classList.add("pdf-condensed");

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

      await worker.get("pdf").then((pdf) => {
        const pageCount = pdf.internal.getNumberOfPages();
        if (pageCount > 1) {
          pdf.deletePage(pageCount);
        }
      });
      await worker.save();
    } catch {
      window.location.href = downloadButton.getAttribute("href");
    } finally {
      cleanupPhoneLink();
      cleanupWrappedEntries();
      document.documentElement.classList.remove("pdf-export");
      document.documentElement.classList.remove("pdf-condensed");
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
