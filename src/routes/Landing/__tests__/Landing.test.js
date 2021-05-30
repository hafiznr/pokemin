import { ApolloProvider } from '@apollo/client';
import { render, screen } from '@testing-library/react';
import Landing from '../';
import { MyPokemonContextProvider } from '../../../contexts/MyPokemonContext';
import { client }  from '../../../client';

test('renders Landing', () => {
  const pokemonData = [
    {
      id: 4,
      name: 'charmander',
      image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png",
      nickname: 'ADsadasdas'
    },
    {
      id: 2,
      name: 'ivysaur',
      image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png",
      nickname: '0'
    },
    {
      id: 4,
      name: 'charmander',
      image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png",
      nickname: 'hamamama'
    },
  ];

  const { container } = render(
    <ApolloProvider client={client}>
      <MyPokemonContextProvider initialData={JSON.stringify(pokemonData)}>
        <Landing />
      </MyPokemonContextProvider>
    </ApolloProvider>
  );

  expect(container).toMatchSnapshot();
});