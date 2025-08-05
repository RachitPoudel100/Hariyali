// Mobile menu toggle functionality
document.addEventListener('DOMContentLoaded', function() {
  const toggle = document.getElementById('mobile-toggle');
  const menu = document.getElementById('mobile-menu');
  
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      menu.classList.toggle('hidden');
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
});
