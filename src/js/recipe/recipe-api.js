import axios from 'axios';

const API_URL = 'https://tasty-treats-backend.p.goit.global/api/recipes';

export const getImagesRecipes = async (page, limit) => {
  try {
    const { data } = await axios(`${API_URL}?page=${page}&limit=${limit}`);
    return data;
  } catch (error) {
    console.log(error.message);
  }
};
