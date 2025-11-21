# Development Guide

## Quick Start

### Prerequisites
- Node.js 14+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run tests
npm test

# Run tests in watch mode
npm test -- --watch

# Generate coverage report
npm test -- --coverage
```

---

## Project Structure

```
m-lally.github.io/
├── index.html                 # Main HTML file
├── 404.html                   # 404 error page
├── package.json               # npm configuration with Jest setup
├── jest.config.js             # Jest configuration
├── README.md                  # Main documentation
├── DEVELOPMENT.md             # This file
└── assets/
    ├── css/
    │   ├── style.css          # Main stylesheet
    │   └── 404.css            # 404 page styles
    ├── js/
    │   ├── main.js            # Main application (ES6 modules)
    │   ├── config.js          # Configuration constants
    │   ├── main.test.js       # Jest test suite
    │   └── vendor/            # Third-party libraries
    ├── cv/
    ├── img/
    └── vendor/
        ├── bootstrap/
        ├── bootstrap-icons/
        ├── boxicons/
        ├── glightbox/
        ├── isotope-layout/
        ├── purecounter/
        ├── remixicon/
        ├── swiper/
        └── waypoints/
```

---

## JavaScript Architecture

### ES6 Module System

The codebase uses ES6 modules via the import/export system in `config.js`:

```javascript
// config.js - Exports configuration
export const DOM_SELECTORS = { ... };
export const CSS_CLASSES = { ... };

// main.js - Imports configuration
import {
  DOM_SELECTORS,
  CSS_CLASSES,
  TIMEOUTS,
  FORM_CONFIG,
  WAYPOINT_CONFIG,
  SCROLL_CONFIG,
} from './config.js';
```

### Module Pattern

The application uses a modular structure with object-based modules:

```javascript
const ModuleName = {
  init() {
    // Initialize module
  },
  
  methodName() {
    // Module methods
  },
};
```

### Application Bootstrap

```javascript
const App = {
  init() {
    // Bootstrap on DOMContentLoaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.bootstrap());
    } else {
      this.bootstrap();
    }
  },

  bootstrap() {
    // Initialize all modules
    Navigation.initMobileToggle();
    Navigation.initNavLinks();
    Navigation.handleInitialNavigation();
    SkillsAnimation.init();
    FormHandler.init();
    ResumeAccordion.init();
    Counter.init();
  },
};

App.init();
```

---

## Core Modules

### 1. DOMUtils

Provides DOM selection and event handling utilities.

```javascript
const DOMUtils = {
  // Select single or multiple elements
  select(selector, all = false) { },
  
  // Add event listeners
  on(eventType, selector, listener, all = false) { },
  
  // Remove event listeners
  off(eventType, selector, listener, all = false) { },
};
```

**Usage:**
```javascript
// Select elements
const header = DOMUtils.select('#header');
const sections = DOMUtils.select('section', true);

// Add listeners
DOMUtils.on('click', '.button', handleClick);

// Remove listeners
DOMUtils.off('click', '.button', handleClick);
```

### 2. Navigation

Handles all navigation functionality including mobile toggle and section transitions.

**Key Responsibilities:**
- Mobile navbar toggle
- Navigation link click handling
- Section transitions with animations
- Hash-based URL navigation on page load

**Methods:**
- `initMobileToggle()` - Setup mobile toggle button
- `initNavLinks()` - Setup navigation link handlers
- `handleNavLinkClick(e)` - Process link clicks
- `transitionToSection(targetSection, header)` - Animate section changes
- `resetSectionVisibility()` - Reset all section states
- `smoothScroll()` - Smooth scroll to top
- `handleInitialNavigation()` - Handle initial page load with hash

### 3. FormHandler

Manages contact form submission to Formspree.

**Key Responsibilities:**
- Form submission via Fetch API
- Form validation
- User notifications (success/error)
- Form reset after successful submission

**Methods:**
- `init()` - Initialize form handler
- `handleSubmit(e)` - Process form submission
- `handleFormError()` - Handle submission errors
- `showNotification(message, duration)` - Display notifications using notie

### 4. SkillsAnimation

Animates progress bars when the skills section comes into view using Waypoints.

**Key Responsibilities:**
- Watch for skills section visibility
- Animate progress bars on scroll
- Set progress bar widths based on aria-valuenow

**Methods:**
- `init()` - Initialize Waypoint observer
- `animateProgressBars()` - Set progress bar widths

### 5. ResumeAccordion

Manages collapsible resume item lists.

**Key Responsibilities:**
- Toggle resume lists on click
- Manage display state

**Methods:**
- `init()` - Setup accordion click handlers
- `toggleAccordion(e)` - Toggle specific accordion item
- `slideToggle(element)` - Toggle element display

### 6. Counter

Initializes the PureCounter library for animated counters.

**Methods:**
- `init()` - Initialize PureCounter

---

## Configuration Reference

All configuration is in `config.js`:

### DOM_SELECTORS
CSS selectors used throughout the app.

### CSS_CLASSES
CSS class names for state management.

### TIMEOUTS
Animation and transition timings (milliseconds).

### FORM_CONFIG
Form notification messages and settings.

### SCROLL_CONFIG
Smooth scroll behavior settings.

### WAYPOINT_CONFIG
Waypoint library offset for scroll animations.

---

## Testing

### Test Structure

Tests are organized by module in `main.test.js`:

```javascript
describe('Module Name', () => {
  describe('Feature Group', () => {
    it('should do something', () => {
      // Test implementation
    });
  });
});
```

### Writing Tests

Example test structure:

```javascript
describe('DOMUtils Module Tests', () => {
  describe('select() - Single Element Selection', () => {
    it('should return single element for valid selector', () => {
      // Arrange
      const mockElement = document.createElement('div');
      mockElement.id = 'test';
      document.body.appendChild(mockElement);

      // Act
      const result = document.querySelector('#test');

      // Assert
      expect(result).toEqual(mockElement);

      // Cleanup
      document.body.removeChild(mockElement);
    });
  });
});
```

### Test Coverage

Run tests with coverage:

```bash
npm run test:coverage
```

Current test categories:
- ✅ DOM utilities
- ✅ Navigation functionality
- ✅ Form handling
- ✅ Skills animations
- ✅ Accordion toggle
- ✅ Scroll behavior
- ✅ CSS class management
- ✅ Integration workflows

---

## Code Style Guide

### Variables
```javascript
const immutable = 'use const by default';
let mutable = 'use let for changing values';
// Avoid var
```

### Functions
```javascript
// Use arrow functions for callbacks
DOMUtils.on('click', '.button', () => {
  console.log('clicked');
});

// Use regular functions for object methods
const Module = {
  methodName() {
    // Implementation
  }
};
```

### Strings
```javascript
// Use template literals
const message = `Hello, ${name}!`;
const selector = `${parent} .${className}`;
```

### Comments
```javascript
// Use JSDoc for public methods
/**
 * Description of what the function does
 * @param {type} paramName - Description
 * @returns {type} Description
 */
function publicMethod(paramName) {
  // Implementation
}

// Use inline comments for logic
const result = value * 2; // Double the value
```

### Naming
```javascript
// Use camelCase for variables and functions
const userName = 'John';
function handleClick() { }

// Use PascalCase for modules/objects
const Navigation = { };
const FormHandler = { };

// Use UPPER_SNAKE_CASE for constants
const DEFAULT_TIMEOUT = 1000;
const CSS_CLASSES = { };
```

---

## Common Tasks

### Adding a New Feature

1. **Create/modify the module:**
```javascript
const NewFeature = {
  init() {
    // Setup code
  },
  
  handleEvent(e) {
    // Event handler
  },
};
```

2. **Update config.js if needed:**
```javascript
export const NEW_FEATURE_CONFIG = {
  // Configuration values
};
```

3. **Add to App.bootstrap():**
```javascript
bootstrap() {
  // ... existing
  NewFeature.init();
}
```

4. **Write tests:**
```javascript
describe('NewFeature Module', () => {
  it('should do something', () => {
    // Test
  });
});
```

### Modifying a Module

1. Update the module method
2. Update JSDoc comments
3. Add/update tests
4. Test manually in browser
5. Run test suite: `npm test`

### Debugging

#### Browser DevTools
```javascript
// Add debug logs
console.log('Debug info:', variable);

// Use debugger statement
debugger; // Pauses execution in DevTools

// Use console methods
console.table(data);
console.group('Group name');
console.time('timer-name');
console.timeEnd('timer-name');
```

#### Error Handling
Always check if elements/libraries exist:
```javascript
if (!element) {
  console.warn('Element not found');
  return;
}

if (typeof ExternalLib === 'undefined') {
  console.warn('External library not loaded');
  return;
}
```

### Performance Optimization

1. **Minimize DOM reflows:**
```javascript
// Bad: Multiple reflows
elements.forEach(el => el.style.left = '10px');

// Good: Batch updates
const fragment = document.createDocumentFragment();
```

2. **Use event delegation:**
```javascript
// Good: Single listener instead of multiple
DOMUtils.on('click', '.item', handler, true);
```

3. **Throttle/debounce expensive operations:**
```javascript
function debounce(func, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

window.addEventListener('resize', debounce(handleResize, 250));
```

---

## Browser DevTools Tips

### Inspect Navigation State
```javascript
// In console
console.log('Current URL:', window.location.href);
console.log('Hash:', window.location.hash);

// Check element states
const navbar = document.querySelector('#navbar');
console.log('Navbar classes:', navbar.classList);
```

### Monitor Event Listeners
```javascript
// In console
getEventListeners(element);
```

### Profile Performance
```javascript
// Measure operation duration
console.time('operation');
// ... code to measure
console.timeEnd('operation');
```

---

## Git Workflow

### Branching
```bash
# Create feature branch
git checkout -b feature/feature-name

# Create bugfix branch
git checkout -b bugfix/bug-name

# Create release branch
git checkout -b release/v1.0.0
```

### Commits
```bash
# Commit with clear message
git commit -m "feat: Add new navigation feature"
git commit -m "fix: Resolve form submission issue"
git commit -m "docs: Update README"
git commit -m "test: Add tests for module"
```

### Push and Pull Requests
```bash
# Push to remote
git push origin feature/feature-name

# Create pull request on GitHub
# - Add clear description
# - Link any related issues
# - Ensure tests pass
```

---

## Deployment

### Build Process
The site is deployed to GitHub Pages. No build step is needed since it's static HTML/CSS/JS.

### Deployment Steps
1. Test locally in browser
2. Run test suite: `npm test`
3. Commit changes: `git commit`
4. Push to main: `git push origin main`
5. GitHub Actions automatically deploys to gh-pages

### Pre-deployment Checklist
- [ ] Tests pass locally
- [ ] No console errors
- [ ] Responsive on mobile
- [ ] Links work correctly
- [ ] Forms submit properly
- [ ] Animations smooth

---

## Troubleshooting

### Tests Not Running
```bash
# Ensure Jest is installed
npm install --save-dev jest

# Run with verbose output
npm test -- --verbose
```

### Module Import Issues
Ensure:
- `config.js` uses `export`
- `main.js` uses `import`
- File paths are correct
- CORS issues for local testing (use a server)

### Form Not Submitting
Check:
- Formspree endpoint is correct
- Form ID is `my-form`
- Network tab shows request
- notie library is loaded

### Navigation Issues
Verify:
- Section IDs match nav link hashes
- Navigation module is initialized
- No conflicting scripts

---

## Resources

- [MDN Web Docs](https://developer.mozilla.org/)
- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [JavaScript Info](https://javascript.info/)
- [Bootstrap Docs](https://getbootstrap.com/docs/)
- [Formspree Docs](https://formspree.io/)

---

## Support & Contact

For questions or issues:
- Email: marc.lally@gmail.com
- GitHub: https://github.com/m-lally/m-lally.github.io

---

**Last Updated:** November 17, 2025
**Version:** 2.0.0
