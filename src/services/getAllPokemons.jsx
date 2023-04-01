import axios from 'axios';

export const getAllPokemons = async () => {
  try {
    const res = await axios.get('https://pokeapi.co/api/v2/pokemon/?limit=1300');

    return res.data.results;
  } catch (error) {
    console.log(error);
  }
};
