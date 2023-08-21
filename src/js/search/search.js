let debounce = require('lodash.debounce');

import {getArea, getIngredients} from "./search-api.js";
import {getRecipes} from "./search-recipes.js";

const form = document.querySelector('.search-form');
const inputForm = document.querySelector('.style-form');
const selectTime = document.querySelector('.select-time');
const formIconSearch = document.querySelector('.form-icon-search');
const inputFormClose = document.querySelector('.saarch-form-btn-close');
const formTime = document.querySelector('.select-time');
const formArea = document.querySelector('.select-area');
const formIngredients = document.querySelector('.select-ingredients');
const formInputReset = document.querySelector('.form-icon-close');
const formReset = document.querySelector('.form-icon-x');


for (let i = 5; i <= 160; i+=5) {
    let option = document.createElement('option');
    option.value = i;    
    option.innerHTML = `${i} min`;
    selectTime.appendChild(option);
}

getArea();

getIngredients();
 
 const debounceHandler = debounce(inputSaarch,300);

 inputForm.addEventListener('input', debounceHandler);

 function inputSaarch(evt) {
    evt.preventDefault();
    formIconSearch.style.stroke = '#9BB537';
    if (inputForm.value.length > 1) {
        inputFormClose.style.display = 'block';
    } else {
        inputFormClose.style.display = 'none';
    }
    form_searh();
 }

 formReset.addEventListener('click', form_Reset);

 form.addEventListener('change', form_searh);

 formInputReset.addEventListener('click', form_input);

 function form_input() {
    inputForm.value = '';
    inputFormClose.style.display = 'none';
    form_searh();
 }

const LOCALSTORAGE_KEY = "feedback-form-state";
const parsedSettings = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY)) ?? {};

export function updateOutput() {
    if (parsedSettings) {
      inputForm.value = parsedSettings.title || "";
      currentPage = parsedSettings.page || 1;
      formTime.value = parsedSettings.time || "";
      formArea.value = parsedSettings.area || "";
      formIngredients.value = parsedSettings.ingredient || "";
    }
    if (inputForm.value.length > 1) {
        inputFormClose.style.display = 'block';
    }
    getRecipes();
}

 function form_searh(evt) {
    const formElements = {
        category: '',
        title: inputForm.value,
        page: currentPage,
        area: formArea.value,
        ingredient: formIngredients.value,
        time: formTime.value,
      }
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(formElements));

    getRecipes();
 }

 function form_Reset() {
    form.reset();
    inputFormClose.style.display = 'none';
    form_searh();
 }
