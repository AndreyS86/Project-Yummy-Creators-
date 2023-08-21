import axios from 'axios';
const popularRecipesWrapper = document.querySelector(".popular-list");

if (popularRecipesWrapper) {
  popularRecipesRender();
}
async function getRecipes() {
  const POPUPLAR_API = 'https://tasty-treats-backend.p.goit.global/api/recipes/popular';
  try {
    const response = await axios.get(POPUPLAR_API);
    return response.data;
  } catch (error) {
    console.log("error1")
  }
}
async function popularRecipesRender() {
  try {
    const data = await getRecipes();
    const markup = popularRecipesMarkup(data);
    popularRecipesWrapper.insertAdjacentHTML('beforeend', markup.join(''));
  } catch (error) {
    console.log("error2")
  }
}
function popularRecipesMarkup(recipes) {
  return recipes.map(({ title, description, preview }) => {
    return `
         <li>
            <a class ="popular-link" href="#!">
               <img class ="img-popular" src="${preview}" alt="${title}">
               <div class="popular-text-conteiner">
               <h3 class ="popular-title">${title}</h3>
               <p class="popular-text">${description}</p>
               </div>
            </a>
         </li>`;
  });
}