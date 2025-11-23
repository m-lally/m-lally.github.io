/**
 * Main JavaScript Module
 * Handles navigation, form submission, and UI interactions
 */

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Query selector helper with optional multiple element support
 * @param {string} selector - CSS selector string
 * @param {boolean} all - Whether to select all matching elements
 * @returns {Element|Element[]|null} Selected element(s) or null
 */
const select = (selector, all = false) => {
  const trimmedSelector = selector.trim();
  return all 
    ? [...document.querySelectorAll(trimmedSelector)] 
    : document.querySelector(trimmedSelector);
};

/**
 * Add event listener helper
 * @param {string} type - Event type
 * @param {string} selector - CSS selector
 * @param {Function} listener - Event handler
 * @param {boolean} all - Whether to attach to all matching elements
 */
const on = (type, selector, listener, all = false) => {
  const elements = select(selector, all);
  
  if (!elements) return;
  
  if (all) {
    // 
    elements.forEach(el => {
      el.addEventListener(type, listener);
    });
  } else {
    elements.addEventListener(type, listener);
  }
};

/**
 * Smooth scroll to top of page
 */
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

// ============================================================================
// Navigation Module
// ============================================================================

const Navigation = {
  elements: {
    navbar: null,
    header: null,
    navlinks: null,
    sections: null,
    mobileToggle: null
  },

  /**
   * Cache DOM elements for better performance
   */
  init() {
    this.elements.navbar = select('#navbar');
    this.elements.header = select('#header');
    this.elements.navlinks = select('#navbar .nav-link', true);
    this.elements.sections = select('section', true);
    this.elements.mobileToggle = select('.mobile-nav-toggle');
    
    this.bindEvents();
    this.handleInitialHash();
  },

  /**
   * Bind all navigation-related events
   */
  bindEvents() {
    // Mobile nav toggle
    on('click', '.mobile-nav-toggle', () => this.toggleMobileNav());
    
    // Navigation links
    on('click', '#navbar .nav-link', (e) => this.handleNavClick(e), true);
    
    // Handle hash links on page load
    window.addEventListener('load', () => this.handleInitialHash());
  },

  /**
   * Toggle mobile navigation menu
   */
  toggleMobileNav() {
    const { navbar, mobileToggle } = this.elements;
    
    navbar.classList.toggle('navbar-mobile');
    mobileToggle.classList.toggle('bi-list');
    mobileToggle.classList.toggle('bi-x');
  },

  /**
   * Close mobile navigation if open
   */
  closeMobileNav() {
    const { navbar, mobileToggle } = this.elements;
    
    if (navbar.classList.contains('navbar-mobile')) {
      navbar.classList.remove('navbar-mobile');
      mobileToggle.classList.toggle('bi-list');
      mobileToggle.classList.toggle('bi-x');
    }
  },

  /**
   * Handle navigation link clicks
   * @param {Event} e - Click event
   */
  handleNavClick(e) {
    const link = e.currentTarget;
    const targetHash = link.hash;
    const targetSection = select(targetHash);
    
    if (!targetSection) return;
    
    e.preventDefault();
    
    // Remove intro block if exists
    const blockElement = select('#block');
    if (blockElement) {
      blockElement.remove();
    }
    
    // Update active state
    this.updateActiveLink(link);
    
    // Close mobile nav if open
    this.closeMobileNav();
    
    // Handle header and section visibility
    if (targetHash === '#header') {
      this.showHomePage();
    } else {
      this.showSection(targetSection);
    }
    
    scrollToTop();
  },

  /**
   * Update active navigation link
   * @param {Element} activeLink - The link to make active
   */
  updateActiveLink(activeLink) {
    this.elements.navlinks.forEach(link => {
      link.classList.remove('active');
    });
    activeLink.classList.add('active');
  },

  /**
   * Show homepage (remove header-top class and hide sections)
   */
  showHomePage() {
    const { header, sections } = this.elements;
    
    header.classList.remove('header-top');
    sections.forEach(section => {
      section.classList.remove('section-show');
    });
  },

  /**
   * Show a specific section
   * @param {Element} targetSection - Section to display
   */
  showSection(targetSection) {
    const { header, sections } = this.elements;
    const isHeaderCollapsed = header.classList.contains('header-top');
    
    if (!isHeaderCollapsed) {
      header.classList.add('header-top');
      // Delay section switch for header animation
      setTimeout(() => {
        this.switchToSection(targetSection);
      }, 350);
    } else {
      this.switchToSection(targetSection);
    }
  },

  /**
   * Switch active section
   * @param {Element} targetSection - Section to make active
   */
  switchToSection(targetSection) {
    this.elements.sections.forEach(section => {
      section.classList.remove('section-show');
    });
    targetSection.classList.add('section-show');
  },

  /**
   * Handle initial page load with hash in URL
   */
  handleInitialHash() {
    if (!window.location.hash) return;
    
    const targetSection = select(window.location.hash);
    
    if (!targetSection) return;
    
    const { header, navlinks } = this.elements;
    
    header.classList.add('header-top');
    
    // Update active link based on hash
    navlinks.forEach(link => {
      if (link.getAttribute('href') === window.location.hash) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
    
    // Show target section with delay for animation
    setTimeout(() => {
      targetSection.classList.add('section-show');
    }, 350);
    
    scrollToTop();
  }
};

// ============================================================================
// Skills Animation Module
// ============================================================================

const SkillsAnimation = {
  /**
   * Initialize skills progress bar animation
   */
  init() {
    const skillsContent = select('.skills-content');
    
    if (!skillsContent) return;
    
    // Use Waypoint library if available
    if (typeof Waypoint !== 'undefined') {
      new Waypoint({
        element: skillsContent,
        offset: '80%',
        handler: () => this.animateProgressBars()
      });
    }
  },

  /**
   * Animate all progress bars
   */
  animateProgressBars() {
    const progressBars = select('.progress .progress-bar', true);
    
    progressBars.forEach(bar => {
      const targetWidth = bar.getAttribute('aria-valuenow');
      bar.style.width = `${targetWidth}%`;
    });
  }
};

// ============================================================================
// Form Handler Module
// ============================================================================

const ContactForm = {
  form: null,

  /**
   * Initialize form handling
   */
  init() {
    this.form = select('#my-form');
    
    if (!this.form) return;
    
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
  },

  /**
   * Handle form submission
   * @param {Event} event - Submit event
   */
  async handleSubmit(event) {
    event.preventDefault();
    
    try {
      const response = await fetch(event.target.action, {
        method: this.form.method,
        body: new FormData(event.target),
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        this.showSuccessMessage();
        this.form.reset();
        console.log(response);
      } else {
        await this.handleError(response);
      }
    } catch (error) {
      this.showErrorMessage(error);
    }
  },

  /**
   * Show success notification
   */
  showSuccessMessage() {
    if (typeof notie !== 'undefined') {
      notie.alert({
        type: 1,
        text: 'Thank you! Your message has been sent.',
        position: 'bottom',
        time: 6
      });
    }
  },

  /**
   * Handle error response
   * @param {Response} response - Fetch response object
   */
  async handleError(response) {
    try {
      const data = await response.json();
      // Check for validation errors
      if (data.errors) {
        console.error('Form validation errors:', data.errors);
      }
    } catch (e) {
      console.error('Error parsing response:', e);
    }
    
    this.showErrorMessage();
  },

  /**
   * Show error notification
   */
  showErrorMessage() {
    if (typeof notie !== 'undefined') {
      notie.alert({
        type: 3, // Error type
        text: 'Sorry, something went wrong. Please try again or send an email directly.',
        position: 'bottom',
        time: 10
      });
    }
  }
};

// ============================================================================
// Resume Item Toggle (jQuery dependent)
// ============================================================================

const ResumeToggle = {
  /**
   * Initialize resume item toggle functionality
   */
  init() {
    // Only run if jQuery is available
    if (typeof $ === 'undefined') return;
    
    $('.resume-item > li > strong').on('click', function() {
      $(this).siblings('ul').slideToggle();
    });
  }
};

// ============================================================================
// Application Initialization
// ============================================================================

/**
 * Initialize all modules when DOM is ready
 */
const initializeApp = () => {
  Navigation.init();
  SkillsAnimation.init();
  ContactForm.init();
  ResumeToggle.init();
  
  // Initialize PureCounter if available
  if (typeof PureCounter !== 'undefined') {
    new PureCounter();
  }
};

// Run initialization when DOM is fully loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}