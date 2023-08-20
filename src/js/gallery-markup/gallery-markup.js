import Notiflix from 'notiflix';
import { getImagesRecipes } from './recieps-api';
export const gallery = {};

const refs = {
  recipeCardList: document.querySelector('.recipe-card__list'),
};
console.log(refs.recipeCardList);

let currentPage = 1;
let totalPageLocc = 0;

getImagesRecipes(currentPage);

onImagesRecipesMarkup();
function onImagesRecipesMarkup(e) {
  // e.preventDefault();

  // query = e.currentTarget.elements.searchQuery.value;

  // refs.recipeCardList.innerHTML = '';

  getImagesRecipes(currentPage).then(data => {
    console.log(data);
    if (data.results.length !== 0) {
      createMarkup(data.results);
      totalPageLocc = Math.ceil(data.totalPages / 9);
      console.log(totalPageLocc);
      console.log('results OK');
    } else {
      console.log('results DONT OK');
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
  });
}

function createMarkup(items) {
  const markup = items
    .map(({ thumb, title, preview }) => {
      return `
    <div class="photo-card">
        <img src="${thumb}" alt="${title}" loading="lazy" width="320" height="200"/>
        <div class="info">
        </div>
    </div>`;
    })
    .join('');
  refs.recipeCardList.insertAdjacentHTML('beforeend', markup);
}
