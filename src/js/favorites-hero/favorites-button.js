import { localStorageGet } from '../favorites-recipe/local-storage-favorites.js';
import { markupCardFavorites } from '../favorites-recipe/markup-card-favorites.js';
import { dishListEl } from '../favorites-recipe/markup-card-favorites.js';
import { updatePageShowEvent } from '../favorites-recipe/markup-card-favorites.js';

const wrapperEl = document.querySelector('.fav-wrapper');
const categoryContainer = document.getElementById('category-buttons');
// Виклик функції для завантаження даних з localStorage та відображення кнопок категорій
getDataFromLocalStorage();

// Функція, яка дістає унікальні категорії з даних
function getCategoriesFromData(data) {
  const categoryMap = new Map();
  data.forEach(item => {
    if (!categoryMap.has(item.category)) {
      categoryMap.set(item.category, true);
    }
  });
  return Array.from(categoryMap.keys());
}

// Функція для отримання та відображення даних з localStorage
export function getDataFromLocalStorage() {
  const storageData = localStorage.getItem('dishLocalKey');
  const isSmallScreen = window.matchMedia('(max-width: 767px)').matches;

  if (storageData) {
    const parsedData = JSON.parse(storageData);
    const uniqueCategories = getCategoriesFromData(parsedData);

    if (uniqueCategories.length === 0 && isSmallScreen) {
      wrapperEl.classList.add('visually-hidden');
      removeButtons(); // Видаляємо попередні кнопки
    } else {
      wrapperEl.classList.remove('visually-hidden');
      removeButtons(); // Видаляємо попередні кнопки
      if (uniqueCategories.length > 0) {
        createButtonMarkup(uniqueCategories); // Створюємо нові кнопки
      }
    }
  } else {
    console.log('No data found in localStorage.');

    if (isSmallScreen) {
      // Можна відобразити меню, яке було знизу або виконати інші дії на малих екранах
    }
  }
}

// Функція для створення розмітки кнопок категорій
function createButtonMarkup(categories) {
  categoryContainer.classList.add('category-buttons');
  const buttonAll = document.createElement('button');
  buttonAll.textContent = 'All categories';
  buttonAll.classList.add('fav-button');
  buttonAll.addEventListener('click', () => handleCategoryClick('All'));
  categoryContainer.appendChild(buttonAll);

  categories.forEach(category => {
    const button = document.createElement('button');
    button.textContent = category;
    button.id = `category-${category}`; // Встановлюємо унікальний id для кнопки
    button.classList.add('fav-button');
    button.addEventListener('click', () => handleCategoryClick(category));
    button.setAttribute('aria-label', `Show ${category} category`);
    categoryContainer.appendChild(button);
  });
}

// Додатковий код для обробки кліку на кнопку

function removeButtons() {
  const categoryContainer = document.getElementById('category-buttons');
  categoryContainer.innerHTML = ''; // Очищаємо контейнер з кнопками
}

function handleCategoryClick(category) {
  const buttons = document.querySelectorAll('.fav-button');
  buttons.forEach(button => {
    button.classList.remove('active');
  });

  const clickedButton = event.target;
  clickedButton.classList.add('active');

  // Отримуємо дані з локального сховища
  const arrLocal = localStorageGet();

  // Фільтруємо рецепти за вибраною категорією
  const filteredRecipes = arrLocal.filter(item => {
    if (category === 'All') {
      return true; // Відображати всі рецепти
    } else {
      return item.category === category;
    }
  });

  // Оновлюємо список рецептів на сторінці
  updateRecipeList(filteredRecipes);
}

// Функція для оновлення списку рецептів на сторінці
function updateRecipeList(recipes) {
  dishListEl.innerHTML = ''; // Очищаємо список перед оновленням
  markupCardFavorites(recipes); // Створюємо розмітку для відфільтрованих рецептів
}

// Рендерінг сторінки після перезавантаження //

updatePageShowEvent();
