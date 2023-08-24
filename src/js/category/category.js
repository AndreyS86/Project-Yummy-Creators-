import axios from 'axios'; // Імпортуємо бібліотеку для HTTP-запитів
import Notiflix from 'notiflix'; // Імпортуємо бібліотеку для сповіщень
import { createMarkup, onImagesRecipesMarkup, refs } from '../recipe/recipe'; // Імпортуємо необхідні функції

// Оголошуємо змінні для параметрів запиту
let cardsPerPage = 9;
let pageNumb = 1;


// Отримуємо елементи з DOM
const categoriesList = document.querySelector('.categories-list');
const allCategoriesButton = document.getElementById('all-categories-button');

// URL для запиту категорій
const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api/categories';

// Асинхронна функція для отримання категорій з бекенду
async function getCategories() {
  try {
    const response = await axios.get(BASE_URL);
    const markUp = createMarkUp(response.data); // Створюємо розмітку для категорій
    if (categoriesList) {
      categoriesList.innerHTML = markUp; // Вставляємо розмітку в DOM

      addClickListenersToCategories(); // Додаємо слухачів подій для категорій

      allCategoriesButton.classList.add('active-category'); // Додаємо клас активної категорії
    }
  } catch (error) {
    // Обробка помилки
    Notiflix.Notify.failure(
      'An error occurred while loading the data. Please try again later.'
    );
  }
  onImagesRecipesMarkup(); // Викликаємо функцію для додавання розмітки рецептів
}

// Асинхронна функція для отримання рецептів за категорією
export async function getRecipesByCategory(category) {
  const API_URL = `https://tasty-treats-backend.p.goit.global/api/recipes?category=${category}&limit=${cardsPerPage}&page=${pageNumb}`;

  try {
    const response = await axios.get(API_URL);
    const { results } = response.data;
    renderRecipes(results); // Викликаємо функцію для відображення рецептів
  } catch (error) {
    console.error(error);
    // Обробка помилки
    Notiflix.Notify.failure(
      'An error occurred while loading the data. Please try again later.'
    );
  }
}

// Функція для створення розмітки рецепту
function renderRecipes(recipes) {
  const recipeCards = recipes.map(recipe => createMarkup([recipe])).join('');
  refs.recipeCardList.innerHTML = recipeCards;
}

// Додаємо слухачів подій для категорій
function addClickListenersToCategories() {
  if (categoriesList) {
    const categoryItems = categoriesList.querySelectorAll('.category-item');
    categoryItems.forEach(item => {
      item.addEventListener('click', () => {
        const category = item.dataset.category;
        getRecipesByCategory(category); // Отримуємо рецепти за обраною категорією

        categoryItems.forEach(categoryItem => {
          categoryItem.classList.remove('active');
          categoryItem.classList.remove('active-category');
        });

        item.classList.add('active'); // Додаємо клас активної категорії

        if (allCategoriesButton) {
          allCategoriesButton.classList.remove('active-category');
        }
      });
    });

    // Додаємо слухача події для кнопки "All Categories"
    if (allCategoriesButton) {
      allCategoriesButton.addEventListener('click', () => {
        categoryItems.forEach(categoryItem => {
          categoryItem.classList.remove('active');
          categoryItem.classList.remove('active-category');
        });
        allCategoriesButton.classList.add('active-category');
        showAllCategories();
        onImagesRecipesMarkup();
        // getCategories();
      });

      onImagesRecipesMarkup(); // Викликаємо функцію для додавання розмітки рецептів з зображеннями
    }
  }
}

// Функція для видалення розмітки всіх рецептів
function removeAllRecipes() {
  refs.recipeCardList.innerHTML = ''; // Очищуємо контейнер з рецептами
}

function showAllCategories() {
  resetAllCategoriesButton(); // Знімаємо активний клас з кнопки "All Categories"
  removeAllRecipes(); // Видаляємо розмітку рецептів
  getCategories(); // Отримуємо всі категорії заново
}

// Функція для створення розмітки категорій
function createMarkUp(data) {
  return data
    .map(
      ({ name }) => `<li class="category-item" data-category="${name}">
              <p class="category-name">${name}</p>
            </li>`
    )
    .join('');
}

// Функція для скидання стану кнопки "All Categories"
function resetAllCategoriesButton() {
  if (allCategoriesButton) {
    allCategoriesButton.classList.remove('active-category');
  }
}

// Додаємо слухачів подій для інших фільтрів
const otherFilters = document.querySelectorAll(
  '.category-item:not(#all-categories-button)'
);

otherFilters.forEach(filter => {
  filter.addEventListener('click', () => {
    resetAllCategoriesButton();
    otherFilters.forEach(categoryItem => {
      categoryItem.classList.remove('active');
    });
    filter.classList.add('active');
    const category = filter.dataset.category;
    getRecipesByCategory(category); // Отримуємо рецепти за обраною категорією
  });

  filter.addEventListener('click', () => {
    filter.classList.add('active-category');
  });
});

// Додаємо слухачів подій для кнопки "All Categories"
if (allCategoriesButton) {
  allCategoriesButton.addEventListener('click', () => {
    allCategoriesButton.classList.add('active-category');
  });

  allCategoriesButton.addEventListener('mouseout', () => {
    if (!allCategoriesButton.classList.contains('active-category')) {
      allCategoriesButton.classList.remove('active-category');
    }
  });
}

// Викликаємо функцію для отримання категорій при завантаженні сторінки
getCategories();
