import axios from 'axios';

//Эта функция принимает идентификатор (id) рецепта и выполняет GET-запрос к удаленному серверу по определенному URL-адресу, чтобы получить данные о конкретном рецепте. URL-адрес формируется путем подстановки переданного идентификатора в строку. В ответ на запрос, она ожидает объект данных рецепта и возвращает его.
export async function findRecipes(id) {
  const url = `https://tasty-treats-backend.p.goit.global/api/recipes/${id}`;
  const res = await axios.get(url);
  return res.data;
}

//Эта функция выполняет GET-запрос к удаленному серверу для получения данных об ингредиентах, используемых в рецептах. Она просто отправляет запрос на определенный URL-адрес, и как результат получает массив данных об ингредиентах.
export async function fetchIngredientsRecipes() {
  const url = `https://tasty-treats-backend.p.goit.global/api/ingredients`;
  const res = await axios.get(url);
  return res.data;
}

//Эта функция принимает идентификатор (id) рецепта и объект данных (data), которые представляют оценку рецепта (рейтинг и, возможно, другие связанные данные). Она выполняет PATCH-запрос к удаленному серверу по определенному URL-адресу, чтобы обновить оценку рецепта с указанным идентификатором. В ответ на запрос, функция возвращает результат обновления
export async function patchRating(id, data) {
  const url = `https://tasty-treats-backend.p.goit.global/api/recipes/${id}/rating`;
  return await axios.patch(url, data);
}
