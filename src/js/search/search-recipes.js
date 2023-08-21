import Notiflix from 'notiflix';
const axios = require('axios').default;

const gallery = document.querySelector(".gallery");
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
            gallery.innerHTML = showBreedImage(recipes);
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

function showBreedImage(img_recipes) { 

    return img_recipes.map((number) => 
        `<li class='js-recipes'>
            <img src="${number.thumb}" alt="${number.title}" width="335px">
            <h2>${number.title}</h2>
        </li>`).join("");
}