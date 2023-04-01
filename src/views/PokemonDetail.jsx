import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';

import { changeColor } from '../utilities/changeColor';
import { capitalLetter } from '../utilities/capitalLetter';
import stats from '../assets/svg/Group233.svg';
import moves from '../assets/svg/Group234.svg';

const getPokemonById = async (id) => {
  try {
    const rest = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    return rest.data;
  } catch (error) {
    console.log(error);
  }
};

const PokemonDetail = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const [statElement, setPokemon] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      const pokemon = await getPokemonById(id);
      setPokemon(pokemon);
    };

    if (!state?.pokemon) loadData();
    else setPokemon(state.pokemon);
  }, []);

  return (
    <div>
      {statElement && (
        <div className="relative">
          <div className={`flex flex-row justify-center`}>
            <img
              className={`absolute w-40 mt-12`}
              src={statElement?.sprites.other['official-artwork'].front_default}
              alt={statElement.name}
            />
          </div>
          <article className="mt-28 mx-10 flex flex-col items-center border-t-zinc-200 border-2 rounded-2xl">
            <div
              className={`w-full h-28 ${
                changeColor(statElement, 0)?.background_color
              } rounded-t-2xl`}
            ></div>
            <p
              className={`text-center mt-8 ${
                changeColor(statElement, 0)?.text_color
              } font-medium text-4xl border w-14`}
            >
              #{statElement.id}
            </p>
            <h1
              className={`text-4xl mt-5 font-bold text-center ${
                changeColor(statElement, 0)?.text_color
              }`}
            >
              {statElement.name.toUpperCase()}
            </h1>
            <div className="flex flex-row justify-center gap-10 mt-4">
              <p
                className={`text-center font-medium ${
                  changeColor(statElement, 0)?.text_color
                }`}
              >
                Weight <br /> {statElement.weight}
              </p>
              <p
                className={`text-center font-medium ${
                  changeColor(statElement, 0)?.text_color
                }`}
              >
                Height <br /> {statElement.height}
              </p>
            </div>
            <div className="flex gap-12">
              <span>
                <h2 className="text-center text-3xl font-medium">Types</h2>
                <div className="flex flex-wrap justify-center gap-2">
                  <p
                    className={`${
                      changeColor(statElement, 0)?.background_color
                    } w-[84px] text-center mt-3 text-white text-l font-medium`}
                  >
                    {capitalLetter(statElement.types[0].type.name)}
                  </p>
                  {statElement.types[1] && (
                    <p
                      className={`${
                        changeColor(statElement, 1)?.background_color
                      } w-[84px] text-center mt-3 text-white text-l font-medium`}
                    >
                      {capitalLetter(statElement.types[1].type.name)}
                    </p>
                  )}
                </div>
              </span>
              <span>
                <h2 className="text-center text-3xl font-medium">Abilities</h2>
                <div className="flex flex-wrap justify-center gap-2">
                  <p className="flex flex-row justify-center items-center border border-gray-300 w-[84px] text-center mt-3 text-l font-medium">
                    {capitalLetter(statElement.abilities[0].ability.name)}
                  </p>
                  {statElement.abilities[1] && (
                    <p className="flex flex-row justify-center items-center border border-gray-300 w-[84px] text-center mt-3 text-l font-medium">
                      {capitalLetter(statElement.abilities[1].ability.name)}
                    </p>
                  )}
                </div>
              </span>
            </div>
            <div className="w-3/4">
              <img className="w-full" src={stats} alt="stats" />
              {statElement &&
                statElement.stats.map((statElement) => (
                  <span>
                    <div className="grid grid-cols-2">
                      <p className="font-semibold text-xl">
                        {capitalLetter(statElement.stat.name)}:
                      </p>
                      <p className="flex flex-row-reverse">{statElement.base_stat}/150</p>
                    </div>
                    <div className="min-w-fit h-[25px] bg-gray-100 rounded-sm mt-1">
                      <hr
                        style={{
                          height: '24px',
                          backgroundImage:
                            'linear-gradient(to right, rgba(252, 214, 118, 1), rgba(230, 144, 30, 1))',
                          borderRadius: '2px',
                          width: `${statElement.base_stat}%`,
                        }}
                      />
                    </div>
                  </span>
                ))}
            </div>
            <span className="h-4"></span>
          </article>
          <article className="mt-20 mx-10 flex flex-col justify-center items-center border-t-zinc-200 border-2 rounded-2xl">
            <div className="w-3/4">
              <span>
                <img className="w-full" src={moves} alt="moves" />
              </span>
              <div className="flex flex-wrap gap-1">
                {statElement &&
                  statElement.moves.map((moveElement) => (
                    <div className="text-center ml-1 mt-1 border-gray-200 border-2 rounded-2xl px-2">
                      <p>{moveElement.move.name}</p>
                    </div>
                  ))}
              </div>
            </div>
            <span className="h-4"></span>
          </article>
          <footer className="h-10"></footer>
        </div>
      )}
    </div>
  );
};

export default PokemonDetail;
