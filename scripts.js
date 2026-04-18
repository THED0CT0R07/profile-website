document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-menu a');
  const yearTargets = document.querySelectorAll('[data-year]');
  const contactForm = document.querySelector('#contactForm');
  const formNotice = document.querySelector('#formNotice');
  const shareButton = document.querySelector('#shareProfile');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      navToggle.classList.toggle('active', isOpen);
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  yearTargets.forEach((item) => {
    item.textContent = new Date().getFullYear();
  });

  if (contactForm && formNotice) {
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const name = document.querySelector('#name')?.value.trim() || 'there';
      formNotice.textContent = `Thanks, ${name}. Your message has been captured in this demo contact form.`;
      formNotice.classList.add('show');
      contactForm.reset();
    });
  }

  if (shareButton) {
    shareButton.addEventListener('click', async () => {
      const shareData = {
        title: document.title,
        text: 'Take a look at Aaron Kerbs\'s software development profile.',
        url: window.location.href,
      };

      try {
        if (navigator.share) {
          await navigator.share(shareData);
        } else if (navigator.clipboard) {
          await navigator.clipboard.writeText(window.location.href);
          shareButton.textContent = 'Link Copied';
          setTimeout(() => {
            shareButton.textContent = 'Share Profile';
          }, 1800);
        }
      } catch (error) {
        console.error('Sharing failed:', error);
      }
    });
  }
});
