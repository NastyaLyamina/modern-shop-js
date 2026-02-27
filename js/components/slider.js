export const initDaySlider = () => {
  const sliderElement = document.querySelector('.day-products__slider');

  // Swiper
  if (sliderElement) {
    new Swiper('.day-products__slider', {
      slidesPerView: 1,
      spaceBetween: 10,
      navigation: {
        nextEl: '.day-products__navigation-btn--next',
        prevEl: '.day-products__navigation-btn--prev',
      },
      watchOverflow: true,
      breakpoints: {
        576: {
          slidesPerView: 2,
          spaceBetween: 15
        },
        992: {
          slidesPerView: 3,
          spaceBetween: 20
        },
        1200: {
          slidesPerView: 4,
          spaceBetween: 20
        }
      }
    });
  }
};

// Товар дня
export const renderDayProducts = (products) => {
  const dayProductsList = document.querySelector('.day-products__list');
  if (!dayProductsList) return;

  dayProductsList.innerHTML = '';

  const dayProducts = products.filter(product => product.goodsOfDay);

  dayProducts.forEach(product => {
    const li = document.createElement('li');
    li.classList.add('day-products__item', 'swiper-slide');

    li.innerHTML = `
      <div class="product-card product-card--small">
        <div class="product-card__visual">
          <img class="product-card__img" src="${product.image}" height="344" width="290" alt="${product.name}">
          <div class="product-card__more">
            <a href="#" class="product-card__link btn btn--icon" data-id="${product.id}">
              <span class="btn__text">В корзину</span>
              <svg width="24" height="24" aria-hidden="true">
                <use xlink:href="images/sprite.svg#icon-basket"></use>
              </svg>
            </a>
            <a href="#" class="product-card__link btn btn--secondary">
              <span class="btn__text">Подробнее</span>
            </a>
          </div>
        </div>
        <div class="product-card__info">
          <h2 class="product-card__title">${product.name}</h2>
          <span class="product-card__old">
            <span class="product-card__old-number">${product.price.old.toLocaleString()}</span>
            <span class="product-card__old-add">₽</span>
          </span>
          <span class="product-card__price">
            <span class="product-card__price-number">${product.price.new.toLocaleString()}</span>
            <span class="product-card__price-add">₽</span>
          </span>
          <div class="product-card__tooltip tooltip">
            <button class="tooltip__btn" aria-label="Показать подсказку" type="button">
              <svg class="tooltip__icon" width="5" height="10" aria-hidden="true">
                <use xlink:href="images/sprite.svg#icon-i"></use>
              </svg>
            </button>
            <div class="tooltip__content" style="display: none;">
              <span class="tooltip__text">Наличие по городам:</span>
              <ul class="tooltip__list">
                <li class="tooltip__item">Москва: ${product.availability.moscow}</li>
                <li class="tooltip__item">Оренбург: ${product.availability.orenburg}</li>
                <li class="tooltip__item">Санкт-Петербург: ${product.availability.saintPetersburg}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    `;
    dayProductsList.append(li);

    // Tippy для слайдера
    const currentBtn = li.querySelector('.tooltip__btn');
    const currentContent = li.querySelector('.tooltip__content');

    if (currentBtn && currentContent) {
      window.tippy(currentBtn, {
        content: currentContent.innerHTML,
        allowHTML: true,
        interactive: true,
        theme: 'lightwhite',
        appendTo: () => document.body,
      });
    }
  });

  initDaySlider();
};