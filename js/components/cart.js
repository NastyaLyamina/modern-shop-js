import { allProducts } from './catalog.js';

export let cartData = [];

const basketBtn = document.querySelector('.header__user-btn');
const basketMenu = document.querySelector('.basket');
const basketList = document.querySelector('.basket__list');
const headerCounter = document.querySelector('.header__user-count');

export function updateCart() {
  const emptyBlock = document.querySelector('.basket__empty-block');

  if (headerCounter) {
    headerCounter.textContent = cartData.length;
  }

  if (cartData.length === 0) {
    if (emptyBlock) emptyBlock.style.display = 'block';
    if (basketList) basketList.innerHTML = '';
    return;
  }

  if (emptyBlock) emptyBlock.style.display = 'none';

  if (basketList) {
    basketList.innerHTML = cartData.map((product, index) => `
      <li class="basket__item">
        <div class="basket__img">
          <img src="${product.image}" alt="${product.name}" height="60" width="60">
        </div>
        <span class="basket__name">${product.name}</span>
        <span class="basket__price">${product.price.new.toLocaleString()} руб</span>
        <button class="basket__item-close" type="button" data-index="${index}">
          <svg width="24" height="24" aria-hidden="true">
            <use xlink:href="images/sprite.svg#icon-close"></use>
          </svg>
        </button>
      </li>
    `).join('');
  }
}

// Функция добавления товара
export function addToCart(productId) {
  const product = allProducts.find(p => p.id === productId);
  if (product) {
    cartData.push(product);
    updateCart();
  }
}

export function initCart() {
  // Открытие/закрытие
  if (basketBtn && basketMenu) {
    basketBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      basketMenu.classList.toggle('basket--active');
    });

    // Закрытие при клике вне корзины
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.basket') && !e.target.closest('.header__user-btn')) {
        basketMenu.classList.remove('basket--active');
      }
    });
  }

  // Добавление товаров
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.product-card__link.btn--icon');
    if (btn) {
      e.preventDefault();
      const id = parseInt(btn.dataset.id);
      addToCart(id);
    }
  });

  // Удаление товаров из корзины
  if (basketList) {
    basketList.addEventListener('click', (e) => {
      const closeBtn = e.target.closest('.basket__item-close');
      if (closeBtn) {
        e.stopPropagation();
        const index = parseInt(closeBtn.dataset.index);
        cartData.splice(index, 1);
        const itemToRemove = closeBtn.closest('.basket__item');
        if (itemToRemove) {
          itemToRemove.remove();
        }
        
        updateCart();
      }
    });
  }
}