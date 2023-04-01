import { createBrowserRouter } from 'react-router-dom';
import Home from '../views/Home';
import PokedexLayout from '../components/PokedexLayout';
import PokemonDetail from '../views/PokemonDetail';
import Pokedex from '../views/Pokedex';
import ProtectedRoute from '../components/ProtectedRoute';
import { pokedexLoader } from './loaders/pokedexLoader';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/pokedex',
    element: (
      <ProtectedRoute>
        <PokedexLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: ':id',
        element: <PokemonDetail />,
      },
      {
        path: '',
        element: <Pokedex />,
        loader: pokedexLoader,
      },
    ],
  },
]);
