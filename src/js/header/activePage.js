document.addEventListener('DOMContentLoaded', function () {
  const currentPage = window.location.pathname.split('/').pop();

  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    if (link.getAttribute('href').endsWith(currentPage)) {
      link.classList.add('nav-link-active');
    }

    link.addEventListener('focus', () => {
      link.classList.add('nav-link-active');
    });

    link.addEventListener('blur', () => {
      link.classList.remove('nav-link-active');
    });
  });
});

// Mobmenu

document.addEventListener('DOMContentLoaded', function () {
  const currentPage = window.location.pathname.split('/').pop();

  const mobNavLinks = document.querySelectorAll('.mob-nav-link');

  mobNavLinks.forEach(link => {
    if (link.getAttribute('href').endsWith(currentPage)) {
      link.classList.add('mob-nav-link-active');
    }

    link.addEventListener('focus', () => {
      link.classList.add('mob-nav-link-active');
    });

    link.addEventListener('blur', () => {
      link.classList.remove('mob-nav-link-active');
    });
  });
});
