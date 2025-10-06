document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.nav-links a, .menu-links a');
  const sections = document.querySelectorAll('section[data-page]');
  const navLinksContainer = document.querySelector('#desktop-nav .nav-links');
  const bubble = document.createElement('div');
  bubble.className = 'nav-bubble';
  navLinksContainer.appendChild(bubble);

  let currentSection = 'home';

  function updateBubble(activeLink) {
    if (!activeLink) return;
    const linkRect = activeLink.getBoundingClientRect();
    const containerRect = navLinksContainer.getBoundingClientRect();
    bubble.style.width = `${linkRect.width}px`;
    bubble.style.height = `${linkRect.height}px`;
    bubble.style.transform = `translateX(${linkRect.left - containerRect.left}px)`;
  }

  function switchSection(targetPage) {
    if (targetPage === currentSection) return;

    const currentPageElem = document.querySelector(`[data-page="${currentSection}"]`);
    const targetPageElem = document.querySelector(`[data-page="${targetPage}"]`);

    if (currentPageElem) {
      currentPageElem.classList.add('page-leaving');
      setTimeout(() => {
        currentPageElem.classList.remove('active');
        currentPageElem.classList.remove('page-leaving');
      }, 400);
    }

    if (targetPageElem) {
      targetPageElem.classList.add('active');
      targetPageElem.classList.add('page-entering');
      setTimeout(() => {
        targetPageElem.classList.remove('page-entering');
      }, 400);
    }

    currentSection = targetPage;
  }

  function setActiveLink(targetPage) {
    navLinks.forEach(link => {
      if (link.getAttribute('href') === `#${targetPage}`) {
        link.classList.add('active');
        if(window.innerWidth > 768) { // Only update bubble on desktop
          updateBubble(link);
        }
      } else {
        link.classList.remove('active');
      }
    });
  }

  // Initial setup
  sections.forEach(section => {
    if (section.dataset.page === 'home') {
      section.classList.add('active');
    } else {
      section.classList.remove('active');
    }
  });
  setActiveLink('home');

  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const targetPage = link.getAttribute('href').substring(1);
      switchSection(targetPage);
      setActiveLink(targetPage);
      history.pushState(null, null, `#${targetPage}`);
      if (document.body.classList.contains('menu-open')) {
        toggleMenu();
      }
    });
  });
  window.addEventListener('resize', () => {
      const activeLink = document.querySelector('.nav-links a.active');
      updateBubble(activeLink);
  });
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.scroll-reveal').forEach(el => {
    observer.observe(el);
  });
});
