# JavaScript Application Documentation

## Table of Contents

1. [Overview](#overview)
2. [Architecture](#architecture)
3. [Configuration](#configuration)
4. [API Reference](#api-reference)
5. [Usage Examples](#usage-examples)
6. [Testing](#testing)
7. [Development Guide](#development-guide)
8. [Browser Support](#browser-support)
9. [Troubleshooting](#troubleshooting)

---

## Overview

This is a modern, modular JavaScript application that powers the Marc Lally portfolio website. It handles:

- **Navigation** - Mobile-responsive navbar with smooth scrolling and section transitions
- **Form Submission** - Contact form handling with validation and notifications
- **Animations** - Progress bar animations for skills section using Waypoints
- **DOM Interactions** - Accordion functionality for resume items
- **Page State Management** - Manages active states, headers, and section visibility

### Key Features

✅ **Modern ES6+ Code** - Uses classes, arrow functions, const/let, template literals
✅ **Modular Architecture** - Organized into separate concerns (Navigation, FormHandler, etc.)
✅ **Error Handling** - Graceful fallbacks when libraries are unavailable
✅ **Responsive** - Works seamlessly on mobile and desktop
✅ **Well Documented** - Comprehensive JSDoc comments
✅ **Zero jQuery Dependency** - Pure vanilla JavaScript

---

## Architecture

### Modular Structure

The application is organized into logical modules:

```
├── assets/js/
│   ├── config.js          # Centralized configuration
│   ├── main.js            # Main application file
│   ├── main.test.js       # Comprehensive test suite
│   └── vendor/            # External libraries
```

### Core Modules

#### 1. **DOMUtils Module**
Provides helper functions for DOM selection and event handling.

```javascript
// Select single element
const header = DOMUtils.select('#header');

// Select all matching elements
const navlinks = DOMUtils.select('#navbar .nav-link', true);

// Add event listener
DOMUtils.on('click', '.button', handler);

// Remove event listener
DOMUtils.off('click', '.button', handler);
```

#### 2. **Navigation Module**
Handles all navigation-related functionality including mobile toggle, link navigation, and section transitions.

**Key Methods:**
- `initMobileToggle()` - Initialize mobile nav toggle
- `initNavLinks()` - Initialize navigation link handlers
- `handleNavLinkClick(e)` - Handle individual link clicks
- `transitionToSection(targetSection, header)` - Animate section transitions
- `handleInitialNavigation()` - Handle page load with hash URLs

#### 3. **FormHandler Module**
Manages contact form submission via Formspree API.

**Key Methods:**
- `init()` - Initialize form handler
- `handleSubmit(e)` - Process form submission
- `showNotification(message, duration)` - Display user feedback

#### 4. **SkillsAnimation Module**
Handles progress bar animations using the Waypoints library.

**Key Methods:**
- `init()` - Initialize skills animation
- `animateProgressBars()` - Animate progress bars

#### 5. **ResumeAccordion Module**
Manages collapsible resume items.

**Key Methods:**
- `init()` - Initialize accordion
- `toggleAccordion(e)` - Toggle accordion item
- `slideToggle(element)` - Slide toggle element visibility

#### 6. **Counter Module**
Initializes the PureCounter library for animated counters.

---

## Configuration

All configuration values are centralized in `config.js` for easy maintenance.

### DOM_SELECTORS

CSS selectors used throughout the application:

```javascript
{
  header: '#header',
  navbar: '#navbar',
  navLink: '#navbar .nav-link',
  mobileNavToggle: '.mobile-nav-toggle',
  block: '#block',
  skillsContent: '.skills-content',
  progressBar: '.progress .progress-bar',
  form: '#my-form',
  resumerItem: '.resumer-item > li > strong',
  section: 'section',
}
```

### CSS_CLASSES

CSS class names used for state management:

```javascript
{
  active: 'active',
  navbarMobile: 'navbar-mobile',
  biList: 'bi-list',
  biX: 'bi-x',
  headerTop: 'header-top',
  sectionShow: 'section-show',
}
```

### TIMEOUTS

Timing configuration (in milliseconds):

```javascript
{
  sectionTransition: 350,      // Duration of section transition animation
  initialNavigation: 350,       // Delay for initial navigation on page load
}
```

### FORM_CONFIG

Form notification settings:

```javascript
{
  successMessage: 'Thank you! Your message has been sent.',
  errorMessage: 'Sorry, something went wrong. Please try again.',
  successNotificationTimeout: 6,    // seconds
  errorNotificationTimeout: 10,     // seconds
  notificationType: 1,              // notie alert type
  notificationPosition: 'bottom',
}
```

### SCROLL_CONFIG

Smooth scroll configuration:

```javascript
{
  top: 0,
  behavior: 'smooth',
}
```

---

## API Reference

### DOMUtils.select(selector, all = false)

Select DOM element(s) by CSS selector.

**Parameters:**
- `selector` (string) - CSS selector
- `all` (boolean) - If true, returns all matches; if false, returns first match

**Returns:**
- Single Element, Array of Elements, or null

**Example:**
```javascript
// Select single element
const header = DOMUtils.select('#header');

// Select all elements
const sections = DOMUtils.select('section', true);
```

### DOMUtils.on(eventType, selector, listener, all = false)

Add event listener to element(s).

**Parameters:**
- `eventType` (string) - Event type (e.g., 'click', 'submit')
- `selector` (string) - CSS selector
- `listener` (function) - Event handler
- `all` (boolean) - If true, attach to all matching elements

**Example:**
```javascript
DOMUtils.on('click', '.button', function() {
  console.log('Button clicked!');
});

DOMUtils.on('change', '.select', handler, true);
```

### DOMUtils.off(eventType, selector, listener, all = false)

Remove event listener from element(s).

**Parameters:**
- Same as `on()` method

**Example:**
```javascript
DOMUtils.off('click', '.button', handler);
```

### Navigation.initMobileToggle()

Initialize mobile navigation toggle.

**Example:**
```javascript
Navigation.initMobileToggle();
```

### Navigation.initNavLinks()

Initialize navigation link click handlers.

**Example:**
```javascript
Navigation.initNavLinks();
```

### Navigation.handleInitialNavigation()

Handle initial page load with URL hash.

**Example:**
```javascript
Navigation.handleInitialNavigation();
// Automatically transitions to section if URL contains hash
```

### FormHandler.init()

Initialize contact form submission handler.

**Example:**
```javascript
FormHandler.init();
// Form will be automatically handled on submission
```

### SkillsAnimation.init()

Initialize skills animation on scroll.

**Example:**
```javascript
SkillsAnimation.init();
// Progress bars will animate when section comes into view
```

### ResumeAccordion.init()

Initialize resume accordion functionality.

**Example:**
```javascript
ResumeAccordion.init();
// Resume items will toggle on click
```

---

## Usage Examples

### Basic Initialization

The application automatically initializes on page load:

```javascript
// Automatic initialization
App.init();
```

### Custom DOM Manipulation

```javascript
// Select and manipulate elements
const navbar = DOMUtils.select('#navbar');
navbar.classList.toggle('navbar-mobile');

// Handle events
DOMUtils.on('click', '#my-button', (e) => {
  console.log('Button clicked!');
  e.preventDefault();
});
```

### Adding Custom Event Handlers

```javascript
// Add custom scroll handler
window.addEventListener('scroll', () => {
  console.log('User is scrolling');
});

// Add custom resize handler
window.addEventListener('resize', () => {
  console.log('Window resized');
});
```

### Programmatically Triggering Navigation

```javascript
// Navigate to a section
const link = DOMUtils.select('[href="#about"]');
if (link) {
  link.click();
}
```

### Form Submission Handling

The form automatically handles submission. To customize:

```javascript
const form = DOMUtils.select('#my-form');
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  // Custom logic here
});
```

---

## Testing

### Running Tests

The project includes a comprehensive Jest test suite.

**Prerequisites:**
```bash
npm install --save-dev jest
```

**Run all tests:**
```bash
npm test
```

**Run tests in watch mode:**
```bash
npm test -- --watch
```

**Run specific test file:**
```bash
npm test main.test.js
```

### Test Coverage

The test suite covers:

- ✅ DOM utilities (select, on, off)
- ✅ Navigation functionality
- ✅ Form handling
- ✅ Skills animations
- ✅ Accordion toggle
- ✅ Scroll behavior
- ✅ CSS class management
- ✅ Integration workflows

### Test Structure

```javascript
describe('Module Name', () => {
  describe('Feature Group', () => {
    it('should do something specific', () => {
      // Arrange
      const element = document.createElement('div');
      
      // Act
      element.classList.add('active');
      
      // Assert
      expect(element.classList.contains('active')).toBe(true);
    });
  });
});
```

---

## Development Guide

### Adding New Features

1. **Identify the module** - Determine which module the feature belongs to, or create a new one

2. **Implement the feature:**
```javascript
const NewModule = {
  init() {
    // Initialize the module
  },
  
  methodName() {
    // Implement functionality
  },
};
```

3. **Add to App.bootstrap():**
```javascript
bootstrap() {
  // ... existing initializations
  NewModule.init();
}
```

4. **Add configuration** to `config.js` if needed

5. **Write tests** in `main.test.js`

### Code Style

- Use `const` for variables that won't change
- Use `let` for variables that will change
- Avoid `var`
- Use arrow functions for callbacks
- Use template literals for string interpolation
- Add JSDoc comments for all public methods

### Best Practices

1. **Error Handling** - Always check if elements/libraries exist
```javascript
if (!element) return;
if (typeof Waypoint === 'undefined') {
  console.warn('Waypoints library not loaded');
  return;
}
```

2. **Performance** - Minimize DOM reflows
```javascript
// Group DOM manipulations
elements.forEach((el) => {
  el.classList.add('active');
});
```

3. **Accessibility** - Use semantic HTML and ARIA attributes
```html
<div class="progress-bar" role="progressbar" aria-valuenow="75"></div>
```

4. **Event Delegation** - Use event delegation for dynamic content
```javascript
DOMUtils.on('click', '.dynamic-item', handler, true);
```

---

## Browser Support

### Supported Browsers

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Required APIs

- ES6+ (classes, arrow functions, template literals)
- Fetch API
- DOM Level 3 Events
- CSS Transitions

### Polyfills (if needed)

For older browsers, consider adding polyfills:

```html
<!-- Promise polyfill for IE11 -->
<script src="https://cdn.jsdelivr.net/npm/promise-polyfill@8/dist/polyfill.min.js"></script>

<!-- Fetch polyfill for IE11 -->
<script src="https://cdn.jsdelivr.net/npm/whatwg-fetch@3/dist/fetch.umd.js"></script>
```

---

## Troubleshooting

### Navigation Not Working

**Issue:** Nav links don't navigate to sections

**Solutions:**
1. Verify section IDs match nav link hashes
2. Check that nav links have correct `href` attributes
3. Ensure `Navigation.initNavLinks()` is called

### Form Not Submitting

**Issue:** Contact form doesn't submit

**Solutions:**
1. Verify form has correct `id="my-form"`
2. Check that Formspree endpoint is correct
3. Ensure network is available (check console)
4. Verify `FormHandler.init()` is called

### Progress Bars Not Animating

**Issue:** Skills progress bars don't animate on scroll

**Solutions:**
1. Verify Waypoints library is loaded
2. Check that progress bars have `aria-valuenow` attribute
3. Ensure skills section has correct selector (`.skills-content`)
4. Verify `SkillsAnimation.init()` is called

### Mobile Menu Stuck

**Issue:** Mobile menu won't close after selection

**Solutions:**
1. Verify toggle button has class `.mobile-nav-toggle`
2. Check navbar has correct ID (`#navbar`)
3. Ensure Bootstrap icons are loaded for `bi-list` and `bi-x`

### Console Warnings

**Warning:** "Waypoints library not loaded"
- Ensure waypoints script is loaded before main.js

**Warning:** "notie library not loaded"
- Ensure notie is loaded for notifications

**Warning:** "PureCounter library not loaded"
- Ensure PureCounter script is loaded for animated counters

### Performance Issues

1. **Slow scrolling animations:**
   - Reduce the number of animations on screen
   - Increase `TIMEOUTS.sectionTransition` value

2. **Janky transitions:**
   - Use CSS `transform` and `opacity` instead of position changes
   - Enable GPU acceleration with `will-change` CSS property

3. **Memory leaks:**
   - Always remove event listeners when removing elements
   - Clean up timers and intervals

---

## File Structure

```
/
├── index.html                    # Main HTML file
├── package.json                  # npm configuration
├── assets/
│   ├── css/
│   │   ├── style.css            # Main styles
│   │   └── 404.css              # 404 page styles
│   ├── js/
│   │   ├── main.js              # Main application (ES6 modules)
│   │   ├── config.js            # Configuration
│   │   ├── main.test.js         # Test suite
│   │   └── vendor/              # External libraries
│   └── img/                     # Images and assets
└── 404.html                      # 404 error page
```

---

## Contributing

When contributing to this codebase:

1. Follow the established code style
2. Write tests for new features
3. Update documentation
4. Test across supported browsers
5. Run the test suite: `npm test`

---

## License

This project is part of Marc Lally's portfolio website.

---

## Resources

- [MDN Web Docs](https://developer.mozilla.org/)
- [JavaScript.info](https://javascript.info/)
- [Jest Documentation](https://jestjs.io/)
- [Bootstrap Documentation](https://getbootstrap.com/)

---

## Support

For issues or questions, please contact: marc.lally@gmail.com

---

**Last Updated:** November 17, 2025
**Version:** 2.0.0
