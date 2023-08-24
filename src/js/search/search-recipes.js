import Notiflix from 'notiflix';
const axios = require('axios').default;
import {createMarkup} from "./recipe.js";

const gallery = document.querySelector(".recipe__card--list");
const galleryOops = document.querySelector('.gallery-oops');
const inputForm = document.querySelector('.style-form');
const formTime = document.querySelector('.select-time');
const formArea = document.querySelector('.select-area');
const formIngredients = document.querySelector('.select-ingredients');


let currentPage = 1;
const url_recipes = 'https://tasty-treats-backend.p.goit.global/api/recipes/';

export function getRecipes() {
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
            createMarkup(recipes);
            galleryOops.style.display = 'none';
        } else {
            Notiflix.Notify.failure('Oops! Nothing found');
            gallery.innerHTML = '';
            galleryOops.style.display = 'flex';
        }
    })
    .catch(function(error) {
        Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!');
    });
}
