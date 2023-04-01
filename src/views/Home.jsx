import React, { useState, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

import footer from '../assets/svg/Group216.svg';

const Home = () => {
  const [nameValue, setNameValue] = useState('');
  const [nameError, setNameError] = useState(null);
  const { user, saveUser } = useContext(UserContext);

  const handleChange = (e) => {
    const newNameValue = e.target.value;

    setNameValue(newNameValue);
    if (newNameValue === '') setNameError('Name is requeried');
    else if (!/^[A-Z][a-z ]{3,}$/.test(newNameValue))
      setNameError('Only letters and spaces are allowed, as a minimum of 3 letters.');
    else setNameError(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nameError) {
      saveUser(nameValue);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center mt-40">
      <div>
        <img src="./img/pokedex.png" alt="Pokedex" />
      </div>
      <div className="text-center">
        <h1 className="text-red-500 text-4xl font-bold">Hello Trainer!!</h1>
      </div>
      <form className="mt-8" onSubmit={handleSubmit}>
        <input
          type="text"
          className="shadow-md border border-black border-solid p-1 rounded-l-md"
          placeholder="Type your name to start"
          value={nameValue}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="bg-red-500 text-white border border-solid border-red-500 font-bold p-1 rounded-r-md"
        >
          {' '}
          Start{' '}
        </button>
      </form>
      {nameError && <p className="text-red-500 text-center">{nameError}</p>}

      <footer className="absolute bottom-0">
        <img src={footer} alt="pie de pagina" />
      </footer>

      {user && <Navigate to="/pokedex" replace />}
    </div>
  );
};

export default Home;
