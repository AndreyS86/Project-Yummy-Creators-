import { markupCardFavorites } from './markup-card-favorites.js';

export function localStorageSet(dishArrBack) {
  let arrLocStorAdd;
  let dishArrMarkup = [];

  if (localStorageGet() === null) {
    arrLocStorAdd = [];
  } else {
    arrLocStorAdd = localStorageGet();
  }

  for (const objBack of dishArrBack) {
    arrLocStorAdd.push(objBack);
    dishArrMarkup.push(objBack);
  }

  markupCardFavorites(dishArrMarkup);
  localStorage.setItem('dishLocalKey', JSON.stringify(arrLocStorAdd));
}

export function localStorageGet() {
  const dishArrLocStorGet = JSON.parse(localStorage.getItem('dishLocalKey'));
  return dishArrLocStorGet;
}
