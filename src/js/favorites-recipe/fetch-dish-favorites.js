//=================================================
//todo=============================================
const addBtn = document.querySelector('.add-btn');
const arr = [
  '6462a8f74c3d0ddd28897fb8',
  '6462a8f74c3d0ddd28897fba',
  '6462a8f74c3d0ddd28897fbb',
  '6462a8f74c3d0ddd28897fb9',
  '6462a8f74c3d0ddd28897fdf',
  '6462a8f74c3d0ddd28897fc2',
  '6462a8f74c3d0ddd28897fbf',
  '6462a8f74c3d0ddd28897fde',
  '6462a8f74c3d0ddd28897feb',
  '6462a8f74c3d0ddd28897fe6',
  '6462a8f74c3d0ddd28897ff0',
  '6462a8f74c3d0ddd28897fe3',
  '6462a8f74c3d0ddd28897fe7',
  '6462a8f74c3d0ddd28897fe9',
  '6462a8f74c3d0ddd28897fd3',
];

let i = 0;
function onClickBtn() {
  if (i < arr.length) {
    const inputDataArr = [];
    inputDataArr.push(arr[i]);
    fetchDishes(inputDataArr);
    i += 1;
  }
}
addBtn.addEventListener('click', onClickBtn);
//todo=============================================
//=================================================
//========================
// Підключення бібліотеки
import axios from 'axios';
//========================
import { localStorageSet } from './local-storage-favorites.js';

const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api';
async function fetchDishFavorites(ID) {
  const response = await axios.get(`${BASE_URL}/recipes/${ID}`);
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
