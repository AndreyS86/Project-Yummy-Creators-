import Notiflix from 'notiflix';
import { getImagesRecipes } from './recieps-api';

const refs = {
  recipeCardList: document.querySelector('.recipe-card__list'),
  likeBtn: document.querySelector('.recipe-like__button'),
  likeSvg: document.querySelector(`.like__svg`),
};

refs.recipeCardList.addEventListener('click', addFavoriteRecipes);
document.addEventListener('DOMContentLoaded', function () {
  getImagesRecipes(currentPage);
  onImagesRecipesMarkup();
  saveLocalStorage();
  getLocalStorage();
});

let currentPage = 1;
let totalPageLocc = 0;
let newselectedId;

const selectedId = new Set();

function onImagesRecipesMarkup(e) {
  // e.preventDefault();

  // refs.recipeCardList.innerHTML = '';

  // function getSizeScreen() {
  //   const bodyWidth = document.body.clientWidth;
  //   console.log(`Ширина body: ${bodyWidth}px`);

  //   let quantityImg = 0;
  //   if (bodyWidth < 768) {
  //     return quantityImg = 6;
  //   } else if (bodyWidth < 1280) {
  //     return quantityImg = 8;
  //   } else {
  //     return quantityImg = 9;
  //   }

  // }
  // console.log(getSizeScreen());

  getImagesRecipes(currentPage).then(data => {
    if (data.results.length !== 0) {
      createMarkup(data.results);
      totalPageLocc = Math.ceil(data.totalPages / 9);
      // addLikeRestart();
      newselectedId = getLocalStorage();
    } else {
      console.log('results DONT OK');
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
  });
}

function normalizeStarMarkup(rating) {
  return Math.round(rating);
}

function descriptionCuter(description) {
  const maxLength = 100;

  if (description.length <= maxLength) {
    return description;
  } else {
    return description.substring(0, maxLength - 3) + '...';
  }
}

function addFavoriteRecipes(e) {
  const liElement = e.target.closest('li');
  const id = liElement.id;
  const hasContains = e.target.classList.contains('like-filled');

  if (e.target.nodeName !== 'svg') {
    console.log("!e.target.nodeName === 'svg'");
    return;
  }

  if (hasContains) {
    selectedId.delete(id);
  } else {
    selectedId.add(liElement.id);
  }

  e.target.classList.toggle('like-filled');
  console.log(selectedId);
  saveLocalStorage(selectedId);
}

function createMarkup(items) {
  const markup = items
    .map(
      ({
        area,
        category,
        description,
        ingredients,
        instructions,
        preview,
        rating,
        tags,
        thumb,
        time,
        title,
        youtube,
        _id,
      }) => {
        return `
    <li class="recipe-card__item" id="${_id}">
          <button class="recipe-like__button">
            <svg
              class="like__svg"
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
            >
              <path
                id="Icon"
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M10.9944 4.70783C9.16163 2.5652 6.10542 1.98884 3.80912 3.95085C1.51282 5.91285 1.18954 9.19323 2.99283 11.5137C4.49215 13.443 9.02961 17.5121 10.5167 18.8291C10.6831 18.9764 10.7663 19.0501 10.8633 19.0791C10.948 19.1043 11.0407 19.1043 11.1254 19.0791C11.2224 19.0501 11.3056 18.9764 11.472 18.8291C12.9591 17.5121 17.4966 13.443 18.9959 11.5137C20.7992 9.19323 20.5154 5.89221 18.1796 3.95085C15.8439 2.00948 12.8271 2.5652 10.9944 4.70783Z"
                stroke="#F8F8F8"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
          <img
            class="recipe-card__image"
            src="${thumb}"
            alt="${title}"
          />
          <div class="general__information">
            <div class="recipe-card__text">
              <h3 class="recipe-card__title">${title}</h3>
              <p class="recipe-card__description">${descriptionCuter(
                description
              )}</p>
            </div>
            <div class="recipe-card__rating">
              <p class="rating__value">${rating}</p>
              <div class="rating__star" data-total-value="${normalizeStarMarkup(
                rating
              )}">
                  <svg
                    class="star__swg"
                    data-swg-value="5"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                  >
                    <path
                      id="Star 1"
                      d="M11.5578 0.83817C11.7454 0.482597 12.2546 0.482596 12.4422 0.838169L15.5531 6.73429C15.6254 6.87141 15.7573 6.96722 15.91 6.99365L22.4789 8.13022C22.875 8.19877 23.0324 8.68309 22.7522 8.97138L18.1059 13.752C17.9979 13.8631 17.9475 14.0182 17.9696 14.1716L18.9185 20.7702C18.9758 21.1681 18.5638 21.4674 18.203 21.29L12.2206 18.3485C12.0815 18.2801 11.9185 18.2801 11.7794 18.3485L5.79701 21.29C5.43623 21.4674 5.02425 21.1681 5.08147 20.7702L6.03041 14.1716C6.05248 14.0182 6.00211 13.8631 5.89406 13.752L1.24781 8.97139C0.967617 8.68309 1.12498 8.19877 1.52112 8.13022L8.08997 6.99365C8.24273 6.96722 8.3746 6.87141 8.44695 6.73429L11.5578 0.83817Z"
                    />
                  </svg>
                  <svg
                    class="star__swg"
                    data-swg-value="4"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                  >
                    <path
                      id="Star 2"
                      d="M11.5578 0.83817C11.7454 0.482597 12.2546 0.482596 12.4422 0.838169L15.5531 6.73429C15.6254 6.87141 15.7573 6.96722 15.91 6.99365L22.4789 8.13022C22.875 8.19877 23.0324 8.68309 22.7522 8.97138L18.1059 13.752C17.9979 13.8631 17.9475 14.0182 17.9696 14.1716L18.9185 20.7702C18.9758 21.1681 18.5638 21.4674 18.203 21.29L12.2206 18.3485C12.0815 18.2801 11.9185 18.2801 11.7794 18.3485L5.79701 21.29C5.43623 21.4674 5.02425 21.1681 5.08147 20.7702L6.03041 14.1716C6.05248 14.0182 6.00211 13.8631 5.89406 13.752L1.24781 8.97139C0.967617 8.68309 1.12498 8.19877 1.52112 8.13022L8.08997 6.99365C8.24273 6.96722 8.3746 6.87141 8.44695 6.73429L11.5578 0.83817Z"
                    />
                  </svg>
                  <svg
                    class="star__swg"
                    data-swg-value="3"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                  >
                    <path
                      id="Star 3"
                      d="M11.5578 0.83817C11.7454 0.482597 12.2546 0.482596 12.4422 0.838169L15.5531 6.73429C15.6254 6.87141 15.7573 6.96722 15.91 6.99365L22.4789 8.13022C22.875 8.19877 23.0324 8.68309 22.7522 8.97138L18.1059 13.752C17.9979 13.8631 17.9475 14.0182 17.9696 14.1716L18.9185 20.7702C18.9758 21.1681 18.5638 21.4674 18.203 21.29L12.2206 18.3485C12.0815 18.2801 11.9185 18.2801 11.7794 18.3485L5.79701 21.29C5.43623 21.4674 5.02425 21.1681 5.08147 20.7702L6.03041 14.1716C6.05248 14.0182 6.00211 13.8631 5.89406 13.752L1.24781 8.97139C0.967617 8.68309 1.12498 8.19877 1.52112 8.13022L8.08997 6.99365C8.24273 6.96722 8.3746 6.87141 8.44695 6.73429L11.5578 0.83817Z"
                    />
                  </svg>
                  <svg
                    class="star__swg"
                    data-swg-value="2"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                  >
                    <path
                      id="Star 4"
                      d="M11.5578 0.83817C11.7454 0.482597 12.2546 0.482596 12.4422 0.838169L15.5531 6.73429C15.6254 6.87141 15.7573 6.96722 15.91 6.99365L22.4789 8.13022C22.875 8.19877 23.0324 8.68309 22.7522 8.97138L18.1059 13.752C17.9979 13.8631 17.9475 14.0182 17.9696 14.1716L18.9185 20.7702C18.9758 21.1681 18.5638 21.4674 18.203 21.29L12.2206 18.3485C12.0815 18.2801 11.9185 18.2801 11.7794 18.3485L5.79701 21.29C5.43623 21.4674 5.02425 21.1681 5.08147 20.7702L6.03041 14.1716C6.05248 14.0182 6.00211 13.8631 5.89406 13.752L1.24781 8.97139C0.967617 8.68309 1.12498 8.19877 1.52112 8.13022L8.08997 6.99365C8.24273 6.96722 8.3746 6.87141 8.44695 6.73429L11.5578 0.83817Z"
                    />
                  </svg>
                  <svg
                    class="star__swg"
                    data-swg-value="1"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                  >
                    <path
                      id="Star 5"
                      d="M11.5578 0.83817C11.7454 0.482597 12.2546 0.482596 12.4422 0.838169L15.5531 6.73429C15.6254 6.87141 15.7573 6.96722 15.91 6.99365L22.4789 8.13022C22.875 8.19877 23.0324 8.68309 22.7522 8.97138L18.1059 13.752C17.9979 13.8631 17.9475 14.0182 17.9696 14.1716L18.9185 20.7702C18.9758 21.1681 18.5638 21.4674 18.203 21.29L12.2206 18.3485C12.0815 18.2801 11.9185 18.2801 11.7794 18.3485L5.79701 21.29C5.43623 21.4674 5.02425 21.1681 5.08147 20.7702L6.03041 14.1716C6.05248 14.0182 6.00211 13.8631 5.89406 13.752L1.24781 8.97139C0.967617 8.68309 1.12498 8.19877 1.52112 8.13022L8.08997 6.99365C8.24273 6.96722 8.3746 6.87141 8.44695 6.73429L11.5578 0.83817Z"
                    />
                  </svg>
              </div>
              <button class="recipe-see__button">See recipe</button>
            </div>
          </div>
        </li>`;
      }
    )
    .join('');
  refs.recipeCardList.insertAdjacentHTML('beforeend', markup);
}

function saveLocalStorage(selectedId) {
  const selectedIdArray = Array.from(selectedId); // Преобразовываем Set в массив
  const selectedIdAsString = JSON.stringify(selectedIdArray); // Преобразовываем массив в строку JSON
  localStorage.setItem('Id', selectedIdAsString); // Сохраняем строку JSON в localStorage
}

function getLocalStorage() {
  const selectedIdAsString = localStorage.getItem('Id');
  const likeSvgList = document.querySelectorAll('.like__svg');
  let selectedIdArray;

  if (selectedIdAsString) {
    selectedIdArray = JSON.parse(selectedIdAsString); // Преобразовываем строку JSON в массив
  }

  newselectedId = new Set(selectedIdArray);

  console.log(selectedIdArray);
  console.log(selectedId);

  likeSvgList.forEach(likeSvg => {
    const liElement = likeSvg.closest('li');
    console.log(liElement);

    if (liElement && selectedIdArray.includes(liElement.id)) {
      likeSvg.classList.add('like-filled');
    } else {
      likeSvg.classList.remove('like-filled');
    }
  });
}
