import React, { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { capitalLetter } from '../utilities/capitalLetter';
import { changeColor } from '../utilities/changeColor';

const getPokemonById = async (url) => {
  try {
    const res = await axios.get(url);

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const PokemonCard = ({ pokemonData }) => {
  const [pokemon, setPokemon] = useState(null);
  const navigate = useNavigate();

  const loadPokemon = async () => {
    const pokemonInfo = await getPokemonById(pokemonData.url);
    setPokemon(pokemonInfo);
  };

  const handleClickNavigate = () => {
    navigate(`/pokedex/${pokemon.id}`, { state: { pokemon } });
  };

  // const pokemonTypeName = pokemon?.types[0].type.name;
  // const changeColor = (pokemonTypeName) => {
  //   return colorsMapper[pokemonTypeName];
  // };

  useEffect(() => {
    loadPokemon();
  }, []);

  return (
    <>
      {pokemon && (
        <article
          className={`flex flex-col justify-center ${
            changeColor(pokemon, 0)?.background_color
          } items-center ${
            changeColor(pokemon, 0)?.border_color
          } rounded-lg border-8 bordeer-solid mt-10 ml-4`}
        >
          <header>
            <div className="w-48">
              <img
                src={pokemon?.sprites.other['official-artwork'].front_default}
                alt={pokemon.name}
              />
            </div>
          </header>

          <section className="bg-white flex flex-col justify-center px-5 py-1 rounded-md">
            <section className="flex flex-col items-center">
              <h2
                className={`text-sxl font-semibold ${
                  changeColor(pokemon, 0)?.text_color
                } text-2xl font-medium`}
              >
                {pokemon.name.toUpperCase()}
              </h2>
              <p>{capitalLetter(pokemon.types[0].type.name)}</p>
              <p className="text-gray-500 text-xs">Type</p>
            </section>
            <hr className="border border-gray-400" />
            <section className="grid grid-cols-2 grid-rows-3 gap-3">
              {pokemon.stats.map((stat) => (
                <section key={stat.stat.name}>
                  <h3 className="text-xs text-gray-500 text-center">
                    {capitalLetter(stat.stat.name)}
                  </h3>
                  <p
                    className={`text-base font-semibold ${
                      changeColor(pokemon, 0)?.text_color
                    } text-center`}
                  >
                    {stat.base_stat}
                  </p>
                </section>
              ))}
            </section>
            <button
              className={`${
                changeColor(pokemon, 0)?.background_color
              } text-xl rounded-2xl text-white w-32 ml-9`}
              onClick={handleClickNavigate}
            >
              Details
            </button>
          </section>
        </article>
      )}
    </>
  );
};

export default PokemonCard;
