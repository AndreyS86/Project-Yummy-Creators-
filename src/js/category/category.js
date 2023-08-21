import axios from 'axios';
import Notiflix from 'notiflix';

const categoriesList = document.querySelector('.categories-list');
const allCategoriesButton = document.getElementById('all-categories-button');

const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api/categories';

async function getCategories() {
  try {
    const response = await axios.get(BASE_URL);
    const markUp = createMarkUp(response.data);
    if (categoriesList) {
      categoriesList.innerHTML = markUp;

      addClickListenersToCategories();

      allCategoriesButton.classList.add('active-category');
    }
  } catch (error) {
    // console.error(error);
    Notiflix.Notify.failure(
      'An error occurred while loading the data. Please try again later.'
    );
  }
}

function addClickListenersToCategories() {
  if (categoriesList) {
    const categoryItems = categoriesList.querySelectorAll('.category-item');
    categoryItems.forEach(item => {
      item.addEventListener('click', () => {
        const category = item.dataset.category;

        categoryItems.forEach(categoryItem => {
          categoryItem.classList.remove('active');
          categoryItem.classList.remove('active-category');
        });

        item.classList.add('active');

        if (allCategoriesButton) {
          allCategoriesButton.classList.remove('active-category');
        }
      });
    });
    if (allCategoriesButton) {
      allCategoriesButton.addEventListener('click', () => {
        categoryItems.forEach(categoryItem => {
          categoryItem.classList.remove('active');
          categoryItem.classList.remove('active-category');
        });
        allCategoriesButton.classList.add('active-category');
      });
    }
  }
}

function createMarkUp(data) {
  return data
    .map(
      ({ name }) => `<li class="category-item" data-category="${name}">
              <p class="category-name">${name}</p>
            </li>`
    )
    .join('');
}

function resetAllCategoriesButton() {
  if (allCategoriesButton) {
    allCategoriesButton.classList.remove('active-category');
  }
}

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
  });

  filter.addEventListener('click', () => {
    filter.classList.add('active-category');
  });
});

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

getCategories();
