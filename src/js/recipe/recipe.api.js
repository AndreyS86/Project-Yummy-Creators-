import axios from 'axios';

const API_URL = 'https://tasty-treats-backend.p.goit.global/api/recipes';
// const API_KEY = '38831051-4c682304c811c7cc8e516c013';

export const getImagesRecipes = async (page, limit) => {
  try {
    const { data } = await axios(`${API_URL}?page=${page}&limit=${50}`);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error.message);
  }
};
