import { findRecipes, patchRating } from '../modal/API-modal';
import { ratingScale } from '../modal/ranging-modal';
import SmoothScrollbar from 'smooth-scrollbar';
import Notiflix from 'notiflix';

const refs = {
  closeModalBtn: document.querySelector('.close-modal'),
  backdropModal: document.querySelector('.backdrop-recipes'),
  mainModalRecipes: document.querySelector('.modal-recipes'),
  modalRecipes: document.querySelector('.modal-recipes-js'),
  backdropModal: document.querySelector('.backdrop-recipes'),
  saveRecipeBtn: document.querySelector('.save-recipes-btn'),
  giveRatingBtn: document.querySelector('.give-rating-btn'),
  rateModal: document.querySelector('.modal-rating'),
  closeRate: document.querySelector('.close-rate-modal'),
  modalRateList: document.querySelector('.modal-rate-list'),
  rateVal: document.querySelector('.rate-range-value'),
  rateRage: document.querySelector('.rate-range-input'),
  rateEmail: document.querySelector('.rate-email-input'),
  rateForm: document.querySelector('.rate-form'),
  sendRateBtn: document.querySelector('.send-rating-btn'),
};

//OpenModal: Эта функция вызывается при открытии модального окна. Внутри функции добавляются обработчики событий на кнопки и другие элементы модального окна. Также функция обновляет информацию о рецепте, проверяет, добавлен ли рецепт в избранное, и управляет стилями элементов.
export function OpenModal(id) {
  refs.closeModalBtn.addEventListener('click', CloseModal);
  refs.backdropModal.addEventListener('click', CloseOnClick);
  refs.giveRatingBtn.addEventListener('click', OpenRateModal);
  window.addEventListener('keydown', CloseOnBtnClick);

  refs.backdropModal.classList.remove('is-hidden-modal');
  refs.mainModalRecipes.classList.remove('is-hidden-modal');
  refs.rateForm.dataset.id = id;
  generateRecipe(id);
  ToggleScroll();

  //Получаем содержимое хранилища браузера с ключом 'favorites'
  const storage = localStorage.getItem('favorites');
  const data = JSON.parse(storage); //преобразовываем содержимое хранилища из JSON-строки (?) в JavaScript объект.

  if (storage) {
    if (data.find(el => el.id === id)) {
      refs.saveRecipeBtn.textContent = 'Remove favorite';
    } else {
      refs.saveRecipeBtn.textContent = 'Add to favorite';
    }
  }

  refs.saveRecipeBtn.addEventListener('click', AddToFav);
}

//isValidEmail(email): Это функция, которая проверяет, является ли переданный email допустимым по формату.
function isValidEmail(email) {
  const regex = /\S+@\S+\.\S+/;
  return regex.test(email);
}

//SubmitRate(e): Эта функция вызывается при отправке оценки рецепта. Она извлекает данные из формы, включая рейтинг и адрес электронной почты, и отправляет их на сервер с использованием функции patchRating. После успешной отправки, модальное окно закрывается, и пользователь уведомляется об успешной оценке.
async function SubmitRate(e) {
  e.preventDefault();
  const data = {
    rate: Number(e.target.elements['rating'].value),
    email: e.target.elements['email'].value,
  };
  const id = refs.rateForm.dataset.id;

  await patchRating(id, data);
  Notiflix.Notify.success('Thank you for appreciating the recipe.');

  CloseModal();
}

//OpenRateModal(): Эта функция вызывается при открытии модалки для оценки рецепта. Она добавляет обработчики событий для кнопок и формы оценки.
function OpenRateModal() {
  refs.mainModalRecipes.classList.add('is-hidden-modal');
  refs.rateModal.classList.remove('is-hidden-modal');

  refs.closeRate.addEventListener('click', CloseRateModal); //1
  refs.modalRateList.addEventListener('click', GiveRate); //2
  refs.rateEmail.addEventListener('input', checkRateInputs); //3
  refs.rateForm.addEventListener('submit', SubmitRate); //4
}

//GiveRate(e): Эта функция обрабатывает событие клика по звезде в оценке. Она вычисляет выбранную оценку и обновляет соответствующие стили звезд и текстового поля с оценкой.
function GiveRate(e) {
  const target = e.target.closest('.item-modal-star');

  if (target) {
    const rate = [...e.currentTarget.children].indexOf(target) + 1;
    [...e.currentTarget.children].forEach((el, i) =>
      i <= rate - 1
        ? el.classList.add('is-rated')
        : el.classList.remove('is-rated')
    );
    refs.rateVal.textContent = rate.toFixed(1);
    refs.rateRage.value = rate;
  }
}

//checkRateInputs(): Эта функция проверяет введенный адрес электронной почты и активирует или деактивирует кнопку отправки оценки в зависимости от того, является ли адрес допустимым.
function checkRateInputs() {
  if (!isValidEmail(refs.rateEmail.value)) {
    refs.rateEmail.style.borderColor = '#b83245';
    refs.sendRateBtn.disabled = true;
  } else {
    refs.rateEmail.style.borderColor = '#9bb537';
    refs.sendRateBtn.disabled = false;
  }
}

//restoreForm(): Эта функция сбрасывает значения и состояния элементов формы для оценки, чтобы они были готовы к следующей оценке.
function restoreForm() {
  [...refs.modalRateList.children].forEach(el =>
    el.classList.remove('is-rated')
  );

  refs.rateEmail.style.borderColor = '';
  refs.sendRateBtn.disabled = true;
  refs.rateVal.textContent = '0.0';
  refs.rateForm.dataset.id = '';
  refs.rateForm.reset();
}

//CloseRateModal(): Эта функция закрывает модальное окно для оценки рецепта и удаляет обработчики событий, связанные с оценкой.
function CloseRateModal() {
  refs.mainModalRecipes.classList.remove('is-hidden-modal');
  refs.rateModal.classList.add('is-hidden-modal');

  refs.closeRate.removeEventListener('click', CloseRateModal); //1
  refs.modalRateList.addEventListener('click', GiveRate); //2
  refs.rateEmail.addEventListener('input', checkRateInputs); //3
  refs.rateForm.addEventListener('submit', SubmitRate); //4
}

//CloseModal(): Эта функция закрывает всю модалку и восстанавливает элементы в исходное состояние.
function CloseModal() {
  removeListeners();
  restoreForm();
  refs.backdropModal.classList.add('is-hidden-modal');
  refs.mainModalRecipes.classList.add('is-hidden-modal');
  refs.rateModal.classList.add('is-hidden-modal');
  refs.modalRecipes.innerHTML = '';
  ToggleScroll();
}

//CloseOnClick({ currentTarget, target }): Эта функция закрывает модалку при клике на затемненную область вокруг нее.
function CloseOnClick({ currentTarget, target }) {
  if (currentTarget === target) CloseModal();
}

//CloseOnBtnClick(e): Эта функция закрывает модальное окно при нажатии клавиши Escape.
function CloseOnBtnClick(e) {
  if (e.key === 'Escape') CloseModal();
}

//genereteRecipe(id): Эта асинхронная функция получает информацию о рецепте с сервера с использованием функции findRecipes и обновляет содержимое модального окна данными о рецепте.
async function generateRecipe(id) {
  try {
    const recipe = await findRecipes(id);

    const { title, description, preview, rating, _id, category } = recipe;

    const recipeObj = {
      title,
      description,
      preview,
      rating,
      id: _id,
      category,
    };

    refs.modalRecipes.dataset.info = `${JSON.stringify(recipeObj)}`;

    addData(CreateMarkup(recipe));
    addScrollbarText();
  } catch (err) {
    console.error(err);
  }
}

//CreateMarkup(data): Эта функция формирует HTML-разметку для отображения инф-ции о рецепте на модальном окне. Она включает в себя название, описание, рейтинг, ингредиенты, изображение и другие детали рецепта.
function CreateMarkup(data) {
  const ingr = data.ingredients;
  const src = !data.youtube
    ? data.thumb
    : data.youtube.replace('watch?v=', 'embed/');
  const tags = data.tags;
  let tagslist = '';
  if (!tags[0]) {
  } else {
    for (let k = 0; k < tags.length; k++) {
      tagslist += `<li class="recipe-tag">#${tags[k]}</li>`;
    }
  }
  let ingrList = '';
  for (let i = 0; i < ingr.length; i++) {
    ingrList += `<li class="recipe-ingredient">${ingr[i].name} <span class="recipe-ps">${ingr[i].measure}</span></li>`;
  }
  const fixRating =
    data.rating > 5 ? Number(5).toFixed(1) : data.rating.toFixed(1);
  const markup = `<div class="recipe-parts">
    ${checkSrc(src, data.description)}
    <div class="recipe-title">
      <h2 class="recipe-title-txt">${data.title}</h2>
      <div class="rating-part">
        <p class='rate'>${fixRating}</p>
      ${ratingScale(fixRating)}
        <p class="recipe-time">${data.time} min</p>
      </div>
      <ul class="ingredients">
        ${ingrList}
      </ul>
    </div>
  </div>
  <ul class="recipe-tags">
    ${tagslist}
  </ul>
  <p class="recipe-instr">${data.instructions}</p>
  </div>
`;
  return markup;
}

//addScrollbarText(): Эта функция добавляет кастомные полосы прокрутки для текста в модальном окне.
function addScrollbarText() {
  const scrollbarBox = document.querySelector('.recipe-instr');
  const scrollbar = SmoothScrollbar.init(scrollbarBox, {
    alwaysShowTracks: true,
  });

  const scrollbarIngs = document.querySelector('.ingredients');
  const scrollbarSec = SmoothScrollbar.init(scrollbarIngs, {
    alwaysShowTracks: true,
  });
}

//addData(markup): Эта функция добавляет сформированный HTML-код на модальное окно.
function addData(markup) {
  refs.modalRecipes.insertAdjacentHTML('afterbegin', markup);
}

//ToggleScroll(): Эта функция переключает запрет прокрутки на элементе <body>, чтобы предотвратить прокрутку страницы, когда открыто модальное окно.
function ToggleScroll() {
  const body = document.querySelector('body');
  body.classList.toggle('overflow-hidden');
}

//checkSrc(url, description): Эта функция проверяет URL и возвращает разметку для изображения или видео в зависимости от его расширения.
function checkSrc(url, description) {
  if (url.endsWith('.jpg')) {
    return `<img class="modal-img" src="${url}" alt="${description}">`;
  } else {
    return `<iframe
      class="recipe-frame"
      src="${url}"
      frameborder="0"
      alt="${description}"
    ></iframe>`;
  }
}

//AddToFav({ target }): Эта функция добавляет или удаляет рецепт из избранного, в зависимости от его текущего статуса.
export function AddToFav({ target }) {
  const storage = localStorage.getItem('favorites');
  const data = JSON.parse(storage);
  const currentRec = JSON.parse(refs.modalRecipes.dataset.info);
  if (storage) {
    if (data.find(el => el.id === currentRec.id)) {
      localStorage.setItem(
        'favorites',
        JSON.stringify([...data.filter(el => el.id !== currentRec.id)])
      );
      target.textContent = 'Add to favorite';
    } else {
      localStorage.setItem('favorites', JSON.stringify([...data, currentRec]));
      target.textContent = 'Remove favorite';
    }
  } else {
    localStorage.setItem('favorites', JSON.stringify([currentRec]));
    target.textContent = 'Remove favorite';
  }
}

//removeListeners(): Эта функция удаляет обработчики событий, которые были добавлены при открытии модального окна.
function removeListeners() {
  refs.closeModalBtn.removeEventListener('click', CloseModal);
  refs.backdropModal.removeEventListener('click', CloseOnClick);
  refs.saveRecipeBtn.removeEventListener('click', AddToFav);

  refs.giveRatingBtn.removeEventListener('click', OpenRateModal);
  refs.closeRate.removeEventListener('click', CloseRateModal);

  refs.modalRateList.removeEventListener('click', GiveRate);
  refs.rateEmail.removeEventListener('input', checkRateInputs);
  refs.rateForm.removeEventListener('submit', SubmitRate);

  window.removeEventListener('keydown', CloseOnBtnClick);
}
