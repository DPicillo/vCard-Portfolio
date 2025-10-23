'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables (only if elements exist)
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function (only if elements exist)
const testimonialsModalFunc = function () {
  if (modalContainer && overlay) {
    modalContainer.classList.toggle("active");
    overlay.classList.toggle("active");
  }
}

// add click event to all modal items (only if they exist)
if (testimonialsItem.length > 0 && modalImg && modalTitle && modalText) {
  for (let i = 0; i < testimonialsItem.length; i++) {

    testimonialsItem[i].addEventListener("click", function () {

      modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
      modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
      modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
      modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

      testimonialsModalFunc();

    });

  }
}

// add click event to modal close button (only if they exist)
if (modalCloseBtn) {
  modalCloseBtn.addEventListener("click", testimonialsModalFunc);
}
if (overlay) {
  overlay.addEventListener("click", testimonialsModalFunc);
}



// custom select variables (only if elements exist)
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

// add event to select (only if it exists)
if (select) {
  select.addEventListener("click", function () { elementToggleFunc(this); });
}

// add event in all select items (only if they exist)
if (selectItems.length > 0 && selectValue && select) {
  for (let i = 0; i < selectItems.length; i++) {
    selectItems[i].addEventListener("click", function () {

      let selectedValue = this.innerText.toLowerCase();
      selectValue.innerText = this.innerText;
      elementToggleFunc(select);
      filterFunc(selectedValue);

    });
  }
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen (only if they exist)
if (filterBtn.length > 0 && selectValue) {
  let lastClickedBtn = filterBtn[0];

  for (let i = 0; i < filterBtn.length; i++) {

    filterBtn[i].addEventListener("click", function () {

      let selectedValue = this.innerText.toLowerCase();
      selectValue.innerText = this.innerText;
      filterFunc(selectedValue);

      lastClickedBtn.classList.remove("active");
      this.classList.add("active");
      lastClickedBtn = this;

    });

  }
}



// contact form variables (only if elements exist)
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field (only if form exists)
if (form && formInputs.length > 0 && formBtn) {
  for (let i = 0; i < formInputs.length; i++) {
    formInputs[i].addEventListener("input", function () {

      // check form validation
      if (form.checkValidity()) {
        formBtn.removeAttribute("disabled");
      } else {
        formBtn.setAttribute("disabled", "");
      }

    });
  }
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// navigation function
function navigateToPage(targetPage) {
  // Find the nav index for the target page
  let navIndex = 0;
  switch(targetPage) {
    case "about":
      navIndex = 0;
      break;
    case "resume":
      navIndex = 1;
      break;
    case "blog":
      navIndex = 2;
      break;
    default:
      navIndex = 0;
      targetPage = "about";
  }

  // Update page visibility and navigation state
  for (let j = 0; j < pages.length; j++) {
    if (targetPage === pages[j].dataset.page) {
      pages[j].classList.add("active");
      if (navigationLinks[navIndex]) {
        navigationLinks[navIndex].classList.add("active");
      }
      window.scrollTo(0, 0);
    } else {
      pages[j].classList.remove("active");
      if (navigationLinks[j]) {
        navigationLinks[j].classList.remove("active");
      }
    }
  }

  // Don't update URL hash for Hugo-based navigation
  // history.replaceState(null, null, '#' + targetPage);
}

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    
    // Get the target page based on the navigation button index
    let targetPage;
    const navIndex = Array.from(navigationLinks).indexOf(this);
    
    switch(navIndex) {
      case 0:
        targetPage = "about";
        break;
      case 1:
        targetPage = "resume";
        break;
      case 2:
        targetPage = "blog";
        break;
      default:
        targetPage = "about";
    }

    navigateToPage(targetPage);
  });
}

// Disable hash-based navigation for Hugo sites
// Hugo uses URL-based navigation, not hash-based navigation
//
// window.addEventListener('hashchange', function() {
//   const hash = window.location.hash.substring(1);
//   const validPages = ['about', 'resume', 'blog'];
//
//   if (validPages.includes(hash)) {
//     navigateToPage(hash);
//   } else {
//     navigateToPage('about');
//   }
// });

// window.addEventListener('load', function() {
//   const hash = window.location.hash.substring(1);
//   const validPages = ['about', 'resume', 'blog'];
//
//   if (validPages.includes(hash)) {
//     navigateToPage(hash);
//   } else {
//     navigateToPage('about');
//   }
// });

// Language toggle functionality - redirect to correct URL
function setLanguage(lang) {
  // Validate language
  const validLanguages = ['de', 'en'];
  if (!validLanguages.includes(lang)) {
    lang = 'de'; // Default to German
  }
  
  // Save preference
  localStorage.setItem('preferred-language', lang);
  
  // Get current path (ignore hash)
  const currentPath = window.location.pathname;
  let newPath;
  
  if (lang === 'de') {
    // Switch to German (remove /en/ prefix)
    newPath = currentPath.replace(/^\/en\//, '/').replace(/^\/en$/, '/');
    if (newPath === currentPath && currentPath.startsWith('/en')) {
      newPath = '/';
    }
  } else {
    // Switch to English (add /en/ prefix)
    if (currentPath === '/' || currentPath === '') {
      newPath = '/en/';
    } else if (!currentPath.startsWith('/en/')) {
      newPath = '/en' + currentPath;
    } else {
      newPath = currentPath; // Already on English version
    }
  }
  
  // Only redirect if the path actually changed
  if (newPath !== currentPath) {
    // Redirect to clean URL without hash
    window.location.href = newPath;
  }
}

// Initialize language on page load
document.addEventListener('DOMContentLoaded', function() {
  // Check for saved language preference
  const savedLang = localStorage.getItem('preferred-language');
  
  if (savedLang) {
    // Validate saved language
    const validLanguages = ['de', 'en'];
    if (validLanguages.includes(savedLang)) {
      // Get current page language from URL
      const currentPath = window.location.pathname;
      const currentLang = currentPath.startsWith('/en') ? 'en' : 'de';
      
      // If saved language differs from current URL, redirect
      if (savedLang !== currentLang) {
        setLanguage(savedLang);
      }
    } else {
      // Invalid saved language, remove it
      localStorage.removeItem('preferred-language');
    }
  } else {
    // No saved preference - detect browser language on first visit
    const browserLang = navigator.language || navigator.userLanguage;
    const detectedLang = browserLang.startsWith('de') ? 'de' : 'en';
    
    // Get current page language from URL
    const currentPath = window.location.pathname;
    const currentLang = currentPath.startsWith('/en') ? 'en' : 'de';
    
    // If detected language differs from current page, redirect
    if (detectedLang !== currentLang) {
      setLanguage(detectedLang);
    } else {
      // Save the current language as preference
      localStorage.setItem('preferred-language', currentLang);
    }
  }
  
  // Add click handlers to language buttons
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const lang = this.classList.contains('lang-de') ? 'de' : 'en';
      setLanguage(lang);
    });
  });
});