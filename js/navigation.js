// Mobile menu toggle functionality
document.addEventListener('DOMContentLoaded', function() {
  const toggle = document.getElementById('mobile-toggle');
  const menu = document.getElementById('mobile-menu');
  const mobileIcon = toggle.querySelector('i');
  
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      menu.classList.toggle('hidden');
      menu.classList.toggle('active');
      
      // Change icon
      if (mobileIcon.classList.contains('fa-bars')) {
        mobileIcon.classList.remove('fa-bars');
        mobileIcon.classList.add('fa-times');
      } else {
        mobileIcon.classList.remove('fa-times');
        mobileIcon.classList.add('fa-bars');
      }
    });
  }

  // Dropdown handling for both desktop and mobile
  document.querySelectorAll('.group > button').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const parent = btn.parentElement;
      
      // Close other open dropdowns
      document.querySelectorAll('.group .group-hover\\:block').forEach(el => {
        if (!parent.contains(el)) el.style.display = 'none';
      });
      
      // Toggle current dropdown
      const dropdown = parent.querySelector('.group-hover\\:block');
      if (dropdown) {
        dropdown.style.display = (dropdown.style.display === 'block') ? 'none' : 'block';
      }
    });
  });

  // Close dropdowns when clicking outside
  document.addEventListener('click', function(e) {
    document.querySelectorAll('.group .group-hover\\:block').forEach(el => {
      if (!el.contains(e.target) && !el.parentElement.contains(e.target)) {
        el.style.display = 'none';
      }
    });
  });
  
  // Mobile dropdown toggles
  const mobileDropdownToggles = document.querySelectorAll('.mobile-dropdown-toggle');
  
  mobileDropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', function() {
      const content = this.nextElementSibling;
      const icon = this.querySelector('i');
      
      // Toggle content visibility
      content.classList.toggle('hidden');
      
      // Animate icon
      if (icon.classList.contains('fa-plus')) {
        icon.classList.remove('fa-plus');
        icon.classList.add('fa-minus');
      } else {
        icon.classList.remove('fa-minus');
        icon.classList.add('fa-plus');
      }
    });
  });
  
  // Keyboard navigation for accessibility
  const navItems = document.querySelectorAll('.nav-item');
  
  navItems.forEach(item => {
    const navLink = item.querySelector('.nav-link');
    const dropdown = item.querySelector('.nav-dropdown');
    
    if (navLink && dropdown) {
      navLink.addEventListener('keydown', function(e) {
        // Open dropdown on Enter or Space
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          dropdown.classList.add('visible-dropdown');
          
          // Focus first link in dropdown
          const firstLink = dropdown.querySelector('a');
          if (firstLink) firstLink.focus();
        }
      });
      
      // Close dropdown when Tab out
      item.addEventListener('focusout', function(e) {
        if (!item.contains(e.relatedTarget)) {
          dropdown.classList.remove('visible-dropdown');
        }
      });
    }
  });
  
  // Add visible-dropdown class for keyboard navigation
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      document.querySelectorAll('.visible-dropdown').forEach(el => {
        el.classList.remove('visible-dropdown');
      });
    }
  });
  
  // Sticky navigation behavior
  const nav = document.querySelector('nav');
  let lastScrollTop = 0;
  
  window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 120) {
      nav.classList.add('nav-scrolled', 'shadow-md');
    } else {
      nav.classList.remove('nav-scrolled', 'shadow-md');
    }
    
    // Hide on scroll down, show on scroll up
    if (scrollTop > lastScrollTop && scrollTop > 200) {
      // Scrolling down
      nav.style.transform = 'translateY(-100%)';
    } else {
      // Scrolling up
      nav.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  }, false);
  
  // Add styles for scrolled nav
  const style = document.createElement('style');
  style.textContent = `
    .nav-scrolled {
      background-color: rgba(255, 255, 255, 0.98) !important;
      padding-top: 4px;
      padding-bottom: 4px;
      transition: transform 0.3s ease, background-color 0.3s ease, padding 0.3s ease;
    }
    
    .visible-dropdown {
      opacity: 1 !important;
      visibility: visible !important;
      transform: translateY(0) !important;
    }
  `;
  document.head.appendChild(style);
});
