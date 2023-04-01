import { getAllPokemons } from '../../services/getAllPokemons';
import { getAllTypes } from '../../services/getAllTypes';
import { getPokemonByType } from '../../services/getPokemonByType';

export const pokedexLoader = async ({ request }) => {
  const types = await getAllTypes();
  const url = new URL(request.url);
  const name = url.searchParams.get('pokemon_name')?.toLowerCase();
  const type = url.searchParams.get('pokemon_type')?.toLowerCase();

  let pokemons;

  if (!name && !type) {
    pokemons = await getAllPokemons();
  } else if (name && type) {
    pokemons = await getPokemonByType(type);
    pokemons = pokemons.filter((pokemon) => pokemon.name.includes(name));
  } else if (name) {
    pokemons = await getAllPokemons();
    pokemons = pokemons.filter((pokemon) => pokemon.name.includes(name));
  } else if (type) {
    pokemons = await getPokemonByType(type);
  }
  return { pokemons, types, name, type };
};
