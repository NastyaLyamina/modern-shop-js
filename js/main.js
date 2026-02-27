import { setAllProducts, applyFilters, updateFilterCounts, setCurrentPage, resetFilters } from './components/catalog.js';
import { initCart, updateCart } from './components/cart.js';
import { renderDayProducts } from './components/slider.js';
import { initFormValidation } from './components/form.js';
import { initUiModules } from './components/menu.js';

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await fetch('./data/data.json');
    if (!response.ok) throw new Error('Ошибка загрузки JSON');
    const data = await response.json();

    setAllProducts(data);
    initUiModules();
    initCart();
    updateCart();
    initFormValidation();
    renderDayProducts(data);
    updateFilterCounts(data);
    resetFilters();
    applyFilters();

    const catalogForm = document.querySelector('.catalog-form');
    const sortSelect = document.querySelector('.catalog__sort-select');

    if (catalogForm) {
      catalogForm.addEventListener('change', () => {
        setCurrentPage(1);
        applyFilters();
      });
    }

    if (catalogForm) {
      catalogForm.addEventListener('reset', () => {
        const sortSelect = document.querySelector('.catalog__sort-select');
        if (sortSelect) {
          sortSelect.value = 'price-min';
        }

        setTimeout(() => {
          setCurrentPage(1);
          applyFilters();
        }, 0);
      });
    }

    if (sortSelect) {
      sortSelect.addEventListener('change', () => {
        setCurrentPage(1);
        applyFilters();
      });
    }

  } catch (e) {
    console.error('Ошибка:', e);
  }
});