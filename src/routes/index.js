import { lazy } from 'react';
import Layout from '../components/Layout';

const Landing = lazy(() => import('./Landing'));
const Detail = lazy(() => import('./Detail'));
const MyPokemon = lazy(() => import('./MyPokemon'));


const routes = [
  {
    component: Layout,
    routes: [
      {
        path: "/",
        exact: true,
        component: Landing
      },
      {
        path: "/pokemon/:pokemonId",
        component: Detail
      },
      {
        path: "/mypokemon",
        exact: true,
        component: MyPokemon
      }
    ]
  }
];

export default routes;