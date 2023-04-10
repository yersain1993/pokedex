import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../contexts/UserContext';
import PokemonCard from '../contexts/PokemonCard';
import { usePagination } from '../hooks/usePagination';
import { useLoaderData } from 'react-router-dom';
import { Form } from 'react-router-dom';

const Pokedex = () => {
  const { user } = useContext(UserContext);
  const { pokemons, types, name, type } = useLoaderData();
  const [pokemonName, setPokemonName] = useState(name ?? '');
  const [pokemonType, setPokemonType] = useState(type ?? '');
  const pokemonsPagination = usePagination(pokemons, 59);

  const handleNameChange = (e) => {
    setPokemonName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setPokemonType(e.target.value);
  };

  useEffect(() => {
    setPokemonName(name ?? '');
  }, [name]);

  useEffect(() => {
    setPokemonType(type ?? '');
  }, [type]);

  return (
    <div>
      <p className="w-full p-5 text-center text-2xl mt-3">
        Welcome
        <span className="text-red-500 font-semibold"> {user}, </span>
        here you can find your favorite Pokemon
      </p>
      <div className="flex flex-wrap justify-center gap-2 text-2xl">
        {pokemonsPagination.pages.map((page) => (
          <button
            key={page}
            onClick={() => pokemonsPagination.changePageTo(page)}
            className={pokemonsPagination.currentPage === page ? 'text-red-500' : ''}
          >
            {page}
          </button>
        ))}
      </div>

      <div>
        <Form>
          <h3 className="text-red-500 text-center">Filter</h3>
          <div className="flex flex-row justify-center">
            <input
              type="text"
              name="pokemon_name"
              placeholder="Name"
              className="border border-solid border-red-400 rounded shadow-md shadow-red-200"
              vlaue={pokemonName}
              onChange={handleNameChange}
            />
            <select
              name="pokemon_type"
              id=""
              value={pokemonType}
              onChange={handleTypeChange}
            >
              <option value="Null" disabled>
                --Choose a option--
              </option>
              <option value="">All</option>
              {types.map((type) => (
                <option key={type.url} value={type.name}>
                  {type.name}
                </option>
              ))}
            </select>
            <button className="rounded px-2 bg-red-400 text-white hover:bg-red-500">
              Search
            </button>
          </div>
        </Form>
      </div>

      <section className="flex flex-wrap justify-center gap-4">
        {pokemonsPagination.listSlice.map((pokemon) => (
          <PokemonCard key={pokemon.url} pokemonData={pokemon} />
        ))}
      </section>
    </div>
  );
};

export default Pokedex;
