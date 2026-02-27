// Бургер
const initBurger = () => {
  const catalogBtn = document.querySelector('.header__catalog-btn');
  const mainMenu = document.querySelector('.main-menu');
  const closeMenuBtn = document.querySelector('.main-menu__close');

  if (catalogBtn && mainMenu) {
    catalogBtn.addEventListener('click', () => {
      mainMenu.classList.add('main-menu--active');
      document.body.style.overflow = 'hidden';
    });

    closeMenuBtn?.addEventListener('click', () => {
      mainMenu.classList.remove('main-menu--active');
      document.body.style.overflow = '';
    });
  }
};

// Город
const initCitySelect = () => {
  const cityBtn = document.querySelector('.location__city');
  const cityNameDisplay = document.querySelector('.location__city-name');
  const citySublinks = document.querySelectorAll('.location__sublink');

  if (cityBtn && cityNameDisplay) {
    cityBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      cityBtn.classList.toggle('location__city--active');
    });

    citySublinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        cityNameDisplay.textContent = link.textContent;
        cityBtn.classList.remove('location__city--active');
      });
    });

    document.addEventListener('click', (e) => {
      if (!e.target.closest('.location__city') && !e.target.closest('.location__sublist')) {
        cityBtn.classList.remove('location__city--active');
      }
    });
  }
};

// Аккордеон
const initAccordion = () => {
  const accordionBtns = document.querySelectorAll('.accordion__btn');

  if (accordionBtns.length > 0) {
    accordionBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const content = btn.nextElementSibling;
        const isActive = btn.classList.contains('accordion__btn--active');

        accordionBtns.forEach(otherBtn => {
          if (otherBtn !== btn) {
            otherBtn.classList.remove('accordion__btn--active');
            const otherContent = otherBtn.nextElementSibling;
            if (otherContent) otherContent.style.maxHeight = null;
          }
        });

        btn.classList.toggle('accordion__btn--active');
        if (btn.classList.contains('accordion__btn--active')) {
          content.style.maxHeight = content.scrollHeight + 'px';
        } else {
          content.style.maxHeight = null;
        }
      });
    });
  }
};

export const initUiModules = () => {
  initBurger();
  initCitySelect();
  initAccordion();
};