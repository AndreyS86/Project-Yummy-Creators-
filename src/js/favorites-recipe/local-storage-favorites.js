import { markupCardFavorites } from './markup-card-favorites.js';
import { oopsDivEl } from './oops-favorites.js';
import { getDataFromLocalStorage } from '../favorites-hero/favorites-button.js';

export function localStorageSet(dishArrBack) {
  let arrLocStorAdd = [];
  let dishArrMarkup = [];

  for (const objBack of dishArrBack) {
    arrLocStorAdd.push(objBack);
    dishArrMarkup.push(objBack);
  }

  localStorage.setItem('dishLocalKey', JSON.stringify(arrLocStorAdd));
  getDataFromLocalStorage(); // визиваю ф-ю створення кнопок
  if (!localStorageGet().length) {
    oopsDivEl.classList.remove('visually-hidden');
  } else {
    markupCardFavorites(dishArrMarkup);
    oopsDivEl.classList.add('visually-hidden');
  }
}

export function localStorageGet() {
  const dishArrLocStorGet = JSON.parse(localStorage.getItem('dishLocalKey'));
  return dishArrLocStorGet;
}
