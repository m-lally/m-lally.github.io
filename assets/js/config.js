/**
 * Application Configuration
 * Centralized configuration for DOM selectors, timeouts, and constants
 */

export const DOM_SELECTORS = {
  header: '#header',
  navbar: '#navbar',
  navLink: '#navbar .nav-link',
  mobileNavToggle: '.mobile-nav-toggle',
  block: '#block',
  skillsContent: '.skills-content',
  progressBar: '.progress .progress-bar',
  progressBarWrap: '.progress-bar-wrap',
  form: '#my-form',
  formStatus: '#my-form-status',
  resumerItem: '.resumer-item > li > strong',
  section: 'section',
};

export const CSS_CLASSES = {
  active: 'active',
  navbarMobile: 'navbar-mobile',
  biList: 'bi-list',
  biX: 'bi-x',
  headerTop: 'header-top',
  sectionShow: 'section-show',
};

export const TIMEOUTS = {
  sectionTransition: 350,
  initialNavigation: 350,
};

export const FORM_CONFIG = {
  successMessage: 'Thankyou! Your message has been sent.',
  errorMessage: 'Sorry, something has gone wrong, please try again. Alternatively, schedule a meeting with me from the home page or send me an email.',
  successNotificationTimeout: 6,
  errorNotificationTimeout: 10,
  notificationType: 1,
  notificationPosition: 'bottom',
};

export const WAYPOINT_CONFIG = {
  offset: '80%',
};

export const SCROLL_CONFIG = {
  top: 0,
  behavior: 'smooth',
};
