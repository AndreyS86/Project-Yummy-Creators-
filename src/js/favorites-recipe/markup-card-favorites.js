import { localStorageGet } from './local-storage-favorites.js';
import { oopsDivEl } from './oops-favorites.js';
import { getDataFromLocalStorage } from '../favorites-hero/favorites-button.js';
import { OpenModal } from '../modal/modal-recipes-rating.js'

export const dishListEl = document.querySelector('.favorites-cards');

export function markupCardFavorites(dishArr) {
  if (dishArr !== null) {
    const patchStar =
      '<path d="M13.826 3.262c0.684-2.106 3.663-2.106 4.348 0l1.932 5.945c0.306 0.942 1.184 1.579 2.174 1.579h6.251c2.214 0 3.135 2.833 1.344 4.135l-5.057 3.674c-0.801 0.582-1.136 1.614-0.83 2.556l1.931 5.945c0.684 2.106-1.726 3.857-3.517 2.555l-5.057-3.674c-0.801-0.582-1.886-0.582-2.687 0l-5.057 3.674c-1.791 1.302-4.202-0.45-3.517-2.555l1.932-5.945c0.306-0.942-0.029-1.973-0.83-2.556l-5.057-3.674c-1.791-1.302-0.871-4.135 1.344-4.135h6.251c0.99 0 1.868-0.638 2.174-1.579l1.932-5.945z"></path>';
    const markup = dishArr
      .map(
        ({ _id, preview, title, description, rating }) =>
          `<li id=${_id} class="fav-card item">
                                  <button class="fav-card-heart-btn" aria-label="Delete dish">
                                      <svg aria-label="heart" class="fav-card-heart icon" viewBox="0 0 32 32">
                                        <path opacity="1"  d="M15.992 6.848c-2.666-3.117-7.111-3.955-10.451-1.101s-3.81 7.625-1.187 11c2.181 2.806 8.781 8.725 10.944 10.641 0.242 0.214 0.363 0.321 0.504 0.364 0.123 0.037 0.258 0.037 0.381 0 0.141-0.042 0.262-0.149 0.504-0.364 2.163-1.916 8.763-7.834 10.944-10.641 2.623-3.375 2.21-8.177-1.187-11.001s-7.785-2.015-10.451 1.101z"></path>
                                      </svg>
                                  </button>
                                  <img class="fav-card-img" src="${preview}" alt="${title}">
                                  <h3 class="fav-card-title">${title}</h3>
                                  <p class="fav-card-desc">${description}</p>
                                  <div class="fav-card-info-wrap">
                                      <div class="fav-rating-wrap">
                                          <span class="fav-card-rating">${rating}</span>
                                          <div class="fav-stars-wrap">
                                            <svg aria-label="star" class="fav-card-star icon" viewBox="0 0 32 32">
                                            ${patchStar}
                                            </svg>
                                            <svg aria-label="star" class="fav-card-star icon" viewBox="0 0 32 32">
                                            ${patchStar}
                                            </svg>
                                            <svg aria-label="star" class="fav-card-star icon" viewBox="0 0 32 32">
                                            ${patchStar}
                                            </svg>
                                            <svg aria-label="star" class="fav-card-star icon" viewBox="0 0 32 32">
                                            ${patchStar}
                                            </svg>
                                            <svg aria-label="star" class="fav-card-star icon" viewBox="0 0 32 32">
                                            ${patchStar}
                                            </svg>
                                          </div>                                          
                                      </div>
                                      <button class="fav-card-see-btn" aria-label="See recipe">See recipe</button>
                                  </div>            
                              </li>`
      )
      .join('');
    dishListEl.insertAdjacentHTML('beforeend', markup);

    const ratingDish = document.querySelectorAll('.fav-card-rating');
    ratingDish.forEach(rating => {
      const starsCard = Math.round(Number(rating.textContent));
      switch (starsCard) {
        case 1:
          rating.nextElementSibling.classList.add('star-one');
          break;
        case 2:
          rating.nextElementSibling.classList.add('star-two');
          break;
        case 3:
          rating.nextElementSibling.classList.add('star-three');
          break;
        case 4:
          rating.nextElementSibling.classList.add('star-four');
          break;
        case 5:
          rating.nextElementSibling.classList.add('star-five');
          break;
      }
    });

    const favCardHeartBtns = document.querySelectorAll('.fav-card-heart-btn');
    favCardHeartBtns.forEach(button => {
      button.addEventListener('click', onHeartClick);
    });

    const favCardStarBtns = document.querySelectorAll('.fav-card-see-btn');
    favCardStarBtns.forEach(button => {
      button.addEventListener('click', onSeeRecipeClick);
    });
  }
  return;
}

function onHeartClick(e) {
  const arrLocal = localStorageGet();
  if (arrLocal.length) {
    const liElement = e.currentTarget.closest('.fav-card');
    const itemId = liElement.getAttribute('id');
    //========== Оновлюємо масив ID Юрія в localStorage ==========//
    const arrLocUr = [...JSON.parse(localStorage.getItem('favoriteRecipesId'))];
    const newArrLocUr = [];
    for (const item of arrLocUr) {
      if (itemId !== item) {
        newArrLocUr.push(item);
      }
    }
    localStorage.setItem('favoriteRecipesId', JSON.stringify(newArrLocUr));
    //==============================================================//
    arrLocal.map((obj, idx) => {
      if (itemId === obj._id) {
        arrLocal.splice(idx, 1);
        liElement.remove();
        localStorage.setItem('dishLocalKey', JSON.stringify(arrLocal));

        getDataFromLocalStorage(); // при зміні для стирання кнопок категорій

        if (!localStorageGet().length) {
          oopsDivEl.classList.remove('visually-hidden');
        }
      }
    });
  }
}

function onSeeRecipeClick(e) {
  const liElement = e.currentTarget.closest('.fav-card');
  const itemId = liElement.getAttribute('id'); 
  OpenModal(itemId);
}

// Рендерінг сторінки після перезавантаження //
export function updatePageShowEvent() {
  window.addEventListener('pageshow', function () {
    if (localStorageGet() === null) {
      return;
    }
    if (!localStorageGet().length) {
      oopsDivEl.classList.remove('visually-hidden');
    }
  });
}
