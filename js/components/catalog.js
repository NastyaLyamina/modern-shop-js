export let allProducts = [];
export let currentPage = 1;
export const itemsPerPage = 6;

export const setAllProducts = (data) => { allProducts = data; };
export const setCurrentPage = (page) => { currentPage = page; };

export const resetFilters = () => {
  setCurrentPage(1);
  applyFilters();
};

// Отрисовка товаров
export function renderProducts(products) {
  const catalogList = document.querySelector('.catalog__list');
  if (!catalogList) return;

  catalogList.innerHTML = '';

  products.forEach(product => {
    const cardHTML = `
      <li class="catalog__item">
        <div class="product-card">
          <div class="product-card__visual">
            <img class="product-card__img" src="${product.image}" height="436" width="290" alt="${product.name}">
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
              <button class="tooltip__btn" aria-label="Показать подсказку">
                <svg class="tooltip__icon" width="5" height="10" aria-hidden="true">
                  <use xlink:href="images/sprite.svg#icon-i"></use>
                </svg>
              </button>
              <div class="tooltip__content" style="display: none;">
                <span class="tooltip__text">Наличие товара по городам:</span>
                <ul class="tooltip__list">
                  <li class="tooltip__item">Москва: ${product.availability.moscow}</li>
                  <li class="tooltip__item">Оренбург: ${product.availability.orenburg}</li>
                  <li class="tooltip__item">Санкт-Петербург: ${product.availability.saintPetersburg}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </li>
    `;

    catalogList.insertAdjacentHTML('beforeend', cardHTML);

    // Tippy
    const currentItem = catalogList.lastElementChild;
    const currentBtn = currentItem.querySelector('.tooltip__btn');
    const currentContent = currentItem.querySelector('.tooltip__content');

    if (currentBtn && currentContent) {
      tippy(currentBtn, {
        content: currentContent.innerHTML,
        allowHTML: true,
        interactive: true,
        theme: 'lightwhite',
        appendTo: () => document.body,
      });
    }
  });
}

// Счётчики фильтров
export function updateFilterCounts(products) {
  if (!products || products.length === 0) return;

  const types = [
    'pendant',
    'nightlights',
    'overhead',
    'point',
    'ceiling'
  ];

  types.forEach(type => {
    const count = products.filter(p => p.type && p.type.includes(type)).length;
    const input = document.getElementById(type);
    if (input) {
      const parent = input.closest('.custom-checkbox');
      if (parent) {
        const countEl = parent.querySelector('.custom-checkbox__count');
        if (countEl) {
          countEl.textContent = count;
        }
      }
    }
  });
}

// Пагинация
export function renderPagination(totalItems) {
  const paginationContainer = document.querySelector('.catalog__pagination');
  if (!paginationContainer) return;

  paginationContainer.innerHTML = '';

  if (totalItems <= itemsPerPage) {
    paginationContainer.style.display = 'none';
    return;
  }

  paginationContainer.style.display = 'flex';
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    const li = document.createElement('li');
    li.classList.add('catalog__pagination-item');

    const btn = document.createElement('button');
    btn.classList.add('catalog__pagination-link');

    if (i === currentPage) {
      btn.classList.add('catalog__pagination-link--active');
    }

    btn.textContent = i;
    btn.type = 'button';

    btn.addEventListener('click', () => {
      currentPage = i;
      applyFilters();
    });

    li.append(btn);
    paginationContainer.append(li);
  }
}

// Функция фильтрации и сортировки
export function applyFilters() {
  const checkedCheckboxes = document.querySelectorAll('.custom-checkbox__field:checked');
  const activeTypes = Array.from(checkedCheckboxes).map(checkbox => checkbox.value);

  const inStockRadio = document.getElementById('instock');
  const isStockOnly = inStockRadio ? inStockRadio.checked : false;

  let filtered = allProducts.filter(product => {
    const matchesType = activeTypes.length === 0 || product.type.some(type => activeTypes.includes(type));
    const isAvailable = Object.values(product.availability).some(count => count > 0);
    const matchesStock = isStockOnly ? isAvailable : true;
    return matchesType && matchesStock;
  });

  const sortSelect = document.querySelector('.catalog__sort-select');
  if (sortSelect) {
    const sortValue = sortSelect.value;
    if (sortValue === 'price-min') filtered.sort((a, b) => a.price.new - b.price.new);
    else if (sortValue === 'price-max') filtered.sort((a, b) => b.price.new - a.price.new);
    else if (sortValue === 'rating-max') filtered.sort((a, b) => b.rating - a.rating);
  }

  const itemsToRender = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  renderProducts(itemsToRender);
  renderPagination(filtered.length);
}