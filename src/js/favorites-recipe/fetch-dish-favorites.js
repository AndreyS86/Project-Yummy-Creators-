//========================
// Підключення бібліотеки
import axios from 'axios';
//========================
import { localStorageSet } from './local-storage-favorites.js';

const arrInput = [...JSON.parse(localStorage.getItem('favoriteRecipesId'))];
fetchDishes(arrInput);

async function fetchDishFavorites(ID) {
  const response = await axios.get(
    `https://tasty-treats-backend.p.goit.global/api/recipes/${ID}`
  );
  return response.data;
}

async function fetchDishes(arrID) {
  try {
    // 1. Створюємо масив промісів
    const arrayOfPromises = arrID.map(async dishId => {
      const response = await fetchDishFavorites(dishId);
      return response;
    });
    // 2. Запускаємо усі проміси паралельно і чекаємо на їх завершення
    const dishArr = await Promise.all(arrayOfPromises);
    localStorageSet(dishArr);
    return dishArr;
  } catch (error) {
    console.log(error.message);
  }
}
