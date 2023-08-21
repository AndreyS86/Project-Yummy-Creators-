import Notiflix from 'notiflix';
let debounce = require('lodash.debounce');
import SlimSelect from 'slim-select';

const axios = require('axios').default;

const form = document.querySelector('.search-form');
const loadMore = document.querySelector('.load-more ');
const gallery = document.querySelector(".gallery");
const inputForm = document.querySelector('.style-form');
const selectTime = document.querySelector('.select-time');
const selectArea = document.querySelector('.select-area');
const selectIngredients = document.querySelector('.select-ingredients');
const formIconSearch = document.querySelector('.form-icon-search');
const inputFormClose = document.querySelector('.saarch-form-btn-close');
const formTime = document.querySelector('.select-time');
const formArea = document.querySelector('.select-area');
const formIngredients = document.querySelector('.select-ingredients');
const formReset = document.querySelector('.form-icon-x');
const galleryOops = document.querySelector('.gallery-oops');

const url_recipes = 'https://tasty-treats-backend.p.goit.global/api/recipes/';
const url_areas = 'https://tasty-treats-backend.p.goit.global/api/areas';
const url_ingredients = 'https://tasty-treats-backend.p.goit.global/api/ingredients';


for (let i = 5; i <= 160; i+=5) {
        
    let option = document.createElement('option');
    option.value = i;    
    option.innerHTML = `${i} min`;
    selectTime.appendChild(option);
}

function getArea() {
    axios.get(url_areas)
    .then((response) => {
        if (response.statusText!=='OK') {
            throw new Error(response.status);
        }

        let area = [];

        for (let i = 0; i < response.data.length; i++) {
            area.push(response.data[i].name)
        }

        area.sort((a, b) => a.localeCompare(b));

        for (let i = 0; i < area.length; i++) {

            let option = document.createElement('option');
            option.innerHTML = `${area[i]}`;
            selectArea.appendChild(option);
        }
    })
    .catch(function(error) {
        Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!');
    });
}

getArea();

function getIngredients() {
    axios.get(url_ingredients)
    .then((response) => {
        if (response.statusText!=='OK') {
            throw new Error(response.status);
        }
        let ingredients = [];
        for (let i = 0; i < response.data.length; i++) {
            ingredients.push({name: response.data[i].name,
                              id: response.data[i]._id})
        }

        ingredients.sort((firstStudent, secondStudent) =>
        firstStudent.name.localeCompare(secondStudent.name));

        for (let i = 0; i < ingredients.length; i++) {

            let option = document.createElement('option');
            option.value = ingredients[i].id;  
            option.innerHTML = `${ingredients[i].name}`;
            selectIngredients.appendChild(option);
        }
        updateOutput();
    })
    .catch(function(error) {
        Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!');
    });
}

getIngredients();

let currentPage = 1;

loadMore.addEventListener('click', onLoad)

function onLoad(entries, observer) {
    currentPage +=1;
    getRecipes();
}
const LOCALSTORAGE_KEY = "feedback-form-state";
const parsedSettings = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY)) ?? {};

function updateOutput() {
    if (parsedSettings) {
      inputForm.value = parsedSettings.title || "";
      currentPage = parsedSettings.page || 1;
      formTime.value = parsedSettings.time || "";
      formArea.value = parsedSettings.area || "";
      formIngredients.value = parsedSettings.ingredient || "";
    }
    getRecipes();
}

function getRecipes() {
    axios.get(url_recipes
        ,{
        params: {
            category: '',
            title: inputForm.value,
            page: currentPage,
            limit: 6,
            time: formTime.value,
            area: formArea.value,
            ingredient: formIngredients.value,
        }
    }
    )
    .then((response) => {
        if (response.statusText!=='OK') {
            throw new Error(response.status);
        }
        recipes = response.data.results;

        if (recipes.length > 0) {
            gallery.innerHTML = showBreedImage(recipes);
            galleryOops.style.display = 'none';
        } else {
            Notiflix.Notify.failure('Oops! Nothing found');
            gallery.innerHTML = '';
            galleryOops.style.display = 'block';
        }

        const formElements = {
            category: '',
            title: inputForm.value,
            page: currentPage,
            area: formArea.value,
            ingredient: formIngredients.value,
            time: formTime.value,
          }
        localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(formElements));
    
    })
    .catch(function(error) {
        Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!');
    });
}

// getRecipes();

function showBreedImage(img_recipes) { 

        return img_recipes.map((number) => 
            `<li class='js-recipes'>
                <img src="${number.thumb}" alt="${number.title}" width="335px">
                <h2>${number.title}</h2>
            </li>`).join("");
 }
 
 const debounceHandler = debounce(inputSaarch,300);

 inputForm.addEventListener('input', debounceHandler);

 function inputSaarch(evt) {
    evt.preventDefault();
    formIconSearch.style.stroke = '#9BB537';
    if (evt.target.value.length > 1) {
        inputFormClose.style.display = 'block';
    } else {
        inputFormClose.style.display = 'none';
    }
    getRecipes();
 }
 formTime.addEventListener('change', getRecipes);

 formArea.addEventListener('change', getRecipes);

 formIngredients.addEventListener('change', getRecipes);

 formReset.addEventListener('click', form_Reset);

 function form_Reset() {
    form.reset();
    inputFormClose.style.display = 'none';
    getRecipes();
 }

//  newnew SlimSelect({
    new SlimSelect({
        select: '#placeholder',
        settings: {
          placeholderText: 'Custom Placeholder Text',
        }
      })