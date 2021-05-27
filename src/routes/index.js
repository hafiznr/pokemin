import Landing from './Landing';
import Detail from './Detail';
import MyPokemon from './MyPokemon';
import Layout from '../components/Layout';

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