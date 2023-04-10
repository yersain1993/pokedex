import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

import header from '../assets/svg/Group217.svg';

const PokedexLayout = () => {
  const { removeUser } = useContext(UserContext);

  return (
    <div className="relative">
      <div className="w-full ml-0">
        <img src={header} alt="header" />
      </div>
      <button
        className="absolute bg-red-400 text-white rounded-full px-2 hover:bg-red-200 shadow-md shadow-red-600 right-10"
        onClick={removeUser}
      >
        Log out
      </button>
      <div className="absolute top-0 w-2/5">
        <img src="./img/pokedex.png" alt="img" />
      </div>
      <Outlet />
    </div>
  );
};

export default PokedexLayout;
