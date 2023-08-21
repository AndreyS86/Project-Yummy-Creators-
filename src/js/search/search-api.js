import Notiflix from 'notiflix';
import {updateOutput} from "./search.js";

const axios = require('axios').default;

const selectArea = document.querySelector('.select-area');
const selectIngredients = document.querySelector('.select-ingredients');

const url_areas = 'https://tasty-treats-backend.p.goit.global/api/areas';
const url_ingredients = 'https://tasty-treats-backend.p.goit.global/api/ingredients';

export function getArea() {
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

export function getIngredients() {
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
