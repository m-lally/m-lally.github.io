# Project Documentation Index

Welcome to the Marc Lally Portfolio Website - JavaScript Application Documentation

## 📚 Documentation Files

### 1. **README.md** - Main Documentation
The comprehensive guide to using and understanding the JavaScript application.

**Contains:**
- ✅ Project overview and features
- ✅ Architecture and module structure  
- ✅ Configuration reference
- ✅ Complete API reference
- ✅ Usage examples and code samples
- ✅ Testing guide
- ✅ Development guide
- ✅ Browser compatibility
- ✅ Troubleshooting section

**[Read README.md](./README.md)**

---

### 2. **DEVELOPMENT.md** - Development Guide
Detailed guide for developers working on the codebase.

**Contains:**
- ✅ Quick start instructions
- ✅ Project structure overview
- ✅ JavaScript architecture explanation
- ✅ Core modules breakdown
- ✅ Configuration reference
- ✅ Testing guide with examples
- ✅ Code style guidelines
- ✅ Common development tasks
- ✅ Debugging techniques
- ✅ Performance optimization tips
- ✅ Git workflow
- ✅ Deployment checklist

**[Read DEVELOPMENT.md](./DEVELOPMENT.md)**

---

### 3. **REFACTORING_SUMMARY.md** - Refactoring Report
Executive summary of the code refactoring and improvements made.

**Contains:**
- ✅ Project overview and achievements
- ✅ Detailed changelog
- ✅ Before/after code comparison
- ✅ Feature comparison matrix
- ✅ Installation and usage instructions
- ✅ Test results summary
- ✅ Documentation overview
- ✅ Browser compatibility info
- ✅ Performance metrics
- ✅ Future enhancements
- ✅ Statistics and summaries

**[Read REFACTORING_SUMMARY.md](./REFACTORING_SUMMARY.md)**

---

## 📁 File Structure

```
m-lally.github.io/
├── README.md                    # Main documentation (START HERE)
├── DEVELOPMENT.md              # Development guide
├── REFACTORING_SUMMARY.md      # Refactoring report
├── jest.config.js              # Jest testing configuration
├── package.json                # npm configuration with scripts
├── index.html                  # Main portfolio page
├── 404.html                    # 404 error page
└── assets/
    ├── js/
    │   ├── main.js            # Main application (470 lines)
    │   ├── config.js          # Configuration file
    │   ├── main.test.js       # Jest test suite (50+ tests)
    │   └── vendor/            # Third-party libraries
    ├── css/
    │   ├── style.css          # Main styles
    │   └── 404.css            # 404 page styles
    └── img/                   # Images and assets
```

---

## 🚀 Quick Start

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

### Development
```javascript
// The application automatically initializes
// All modules are bootstrapped in App.bootstrap()

// To use the DOM utilities in your code:
const element = DOMUtils.select('#element-id');
DOMUtils.on('click', '.button', handler);
```

### Testing
```bash
# Run all tests
npm test

# Run specific test file
npm test main.test.js

# Run with coverage
npm test -- --coverage

# Watch mode for development
npm test -- --watch
```

---

## 📖 Reading Guide

### For Quick Overview (5 minutes)
1. Read this file
2. Skim REFACTORING_SUMMARY.md

### For Using the Code (15 minutes)
1. Read README.md sections: Overview and API Reference
2. Check usage examples in README.md
3. Refer to config.js for available configurations

### For Development Work (30 minutes)
1. Read DEVELOPMENT.md completely
2. Study the module structure in main.js
3. Look at main.test.js for testing examples
4. Review code style guidelines

### For Deep Understanding (1 hour)
1. Read all documentation files
2. Review main.js source code
3. Study main.test.js test cases
4. Experiment with modifications

---

## 🔧 Key Technologies

- **JavaScript:** ES6+ with modern patterns
- **Testing:** Jest with jsdom
- **Documentation:** Markdown with JSDoc
- **Package Manager:** npm
- **Version Control:** Git

---

## 📋 Module Overview

### 1. DOMUtils
Helper functions for DOM selection and event handling
- `select(selector, all)` - Select DOM elements
- `on(eventType, selector, listener)` - Add event listeners
- `off(eventType, selector, listener)` - Remove event listeners

### 2. Navigation
Handles all navigation functionality
- Mobile navbar toggle
- Navigation link click handling
- Section transitions with animations
- Hash-based URL routing

### 3. FormHandler
Manages contact form submission
- Form validation
- Formspree API integration
- User notifications
- Form reset

### 4. SkillsAnimation
Animates progress bars on scroll
- Waypoints integration
- Progress bar animations
- Scroll event handling

### 5. ResumeAccordion
Collapsible resume items
- Toggle functionality
- Slide animations
- State management

### 6. Counter
Pure counter library initialization
- Animated number counters
- Formspree integration

### 7. App
Application bootstrap
- Module initialization
- Lifecycle management

---

## ✅ Quality Assurance

### Code Quality
- ✅ Zero linting errors
- ✅ JSDoc on all functions
- ✅ Comprehensive comments
- ✅ Modern JavaScript patterns

### Testing
- ✅ 50+ test cases
- ✅ Unit tests
- ✅ Integration tests
- ✅ DOM manipulation tests
- ✅ Event handling tests

### Documentation
- ✅ 1300+ lines of documentation
- ✅ API reference
- ✅ Code examples
- ✅ Troubleshooting guide
- ✅ Development guide

### Performance
- ✅ Optimized event handling
- ✅ Minimal DOM reflows
- ✅ Efficient selectors
- ✅ Proper error handling

---

## 🌐 Browser Support

| Browser | Version | Status |
|---------|---------|--------|
| Chrome  | 90+     | ✅ Supported |
| Firefox | 88+     | ✅ Supported |
| Safari  | 14+     | ✅ Supported |
| Edge    | 90+     | ✅ Supported |

---

## 🔍 Common Tasks

### Running Tests
```bash
npm test                    # Run all tests once
npm test -- --watch        # Watch mode
npm test -- --coverage     # Coverage report
npm test -- --verbose      # Detailed output
```

### Adding a Feature
1. Create/modify module in main.js
2. Add configuration to config.js
3. Update App.bootstrap() in main.js
4. Write tests in main.test.js
5. Update documentation

### Debugging
1. Use browser DevTools (F12)
2. Check console for warnings
3. Use debugger statement
4. Add console.log statements
5. Check test output for issues

### Deploying
1. Run tests: `npm test`
2. Commit changes: `git commit`
3. Push to main: `git push origin main`
4. GitHub Pages auto-deploys

---

## 🐛 Troubleshooting

### Tests Not Running
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
npm test
```

### Form Not Submitting
1. Check Formspree endpoint in HTML
2. Verify form ID is `my-form`
3. Check network tab in DevTools
4. Ensure notie library is loaded

### Navigation Issues
1. Verify section IDs match nav hashes
2. Check that Navigation.init is called
3. Look for conflicting scripts
4. Check console for errors

### Animation Not Playing
1. Verify Waypoints library is loaded
2. Check progress bar aria-valuenow
3. Ensure selector is correct
4. Check CSS for conflicting rules

---

## 📞 Support

### Contact Information
- **Email:** marc.lally@gmail.com
- **GitHub:** https://github.com/m-lally/m-lally.github.io
- **Website:** https://m-lally.github.io

### Reporting Issues
1. Check README.md troubleshooting section
2. Check DEVELOPMENT.md debugging tips
3. Run tests: `npm test`
4. Check browser console (F12)
5. Create GitHub issue with details

---

## 📚 Resource Links

### Documentation
- [README.md](./README.md) - Main documentation
- [DEVELOPMENT.md](./DEVELOPMENT.md) - Development guide
- [REFACTORING_SUMMARY.md](./REFACTORING_SUMMARY.md) - Refactoring report

### External Resources
- [MDN Web Docs](https://developer.mozilla.org/)
- [JavaScript.info](https://javascript.info/)
- [Jest Documentation](https://jestjs.io/)
- [Bootstrap Documentation](https://getbootstrap.com/)

---

## 📊 Project Statistics

| Metric | Value |
|--------|-------|
| **JavaScript Files** | 3 |
| **Lines of Code (main)** | 470 |
| **Test Cases** | 50+ |
| **Documentation** | 1300+ lines |
| **Functions** | 25+ |
| **Modules** | 7 |
| **Linting Errors** | 0 |
| **Test Coverage** | Comprehensive |

---

## 🎯 Next Steps

1. **Start Here:** Read README.md
2. **For Development:** Read DEVELOPMENT.md  
3. **For Details:** Read REFACTORING_SUMMARY.md
4. **Run Tests:** `npm test`
5. **Make Changes:** Follow the development guide
6. **Deploy:** Commit and push to main

---

## 📝 File Version Info

- **Version:** 2.0.0
- **Last Updated:** November 17, 2025
- **Status:** Production Ready
- **Tested:** All tests passing
- **Browser Support:** Chrome 90+, Firefox 88+, Safari 14+, Edge 90+

---

**Happy Coding! 🚀**

For questions or support, please reach out to marc.lally@gmail.com

---

*Generated: November 17, 2025*  
*Project: Marc Lally Portfolio Website*
