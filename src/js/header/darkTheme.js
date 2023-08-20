document.addEventListener('DOMContentLoaded', function () {
  const desktopThemeSwitcher = document.querySelector('.header-switch input');
  const mobThemeSwitcher = document.querySelector('.switch input');

  const bodyElement = document.getElementById('bodyElement');
  const mobileMenu = document.querySelector('.mobile-menu');

  function toggleBackground(darkThemeEnabled) {
    if (darkThemeEnabled) {
      bodyElement.classList.add('dark-theme');
      mobileMenu.classList.add('dark-background-mob');
    } else {
      bodyElement.classList.remove('dark-theme');
      mobileMenu.classList.remove('dark-background-mob');
    }
  }

  function applyTheme() {
    const storedTheme = localStorage.getItem('theme');
    const darkThemeEnabled = storedTheme === 'dark';
    desktopThemeSwitcher.checked = darkThemeEnabled;
    mobThemeSwitcher.checked = darkThemeEnabled;
    toggleBackground(darkThemeEnabled);
  }

  function updateTheme(theme) {
    localStorage.setItem('theme', theme);
    applyTheme();
  }

  desktopThemeSwitcher.addEventListener('change', function () {
    updateTheme(desktopThemeSwitcher.checked ? 'dark' : 'light');
  });

  mobThemeSwitcher.addEventListener('change', function () {
    updateTheme(mobThemeSwitcher.checked ? 'dark' : 'light');
  });

  applyTheme();
});
