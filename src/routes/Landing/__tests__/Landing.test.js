import { MockedProvider } from '@apollo/client/testing';
import { act, render } from '@testing-library/react';
import Landing from '../';
import { MyPokemonContextProvider } from '../../../contexts/MyPokemonContext';
import { GET_POKEMONS } from '../queries';

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

test('renders Landing with loading', () => {
  const mocks = [];

  const { container } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <MyPokemonContextProvider initialData={JSON.stringify(pokemonData)}>
        <Landing />
      </MyPokemonContextProvider>
    </MockedProvider>
  );

  expect(container).toMatchSnapshot();
});

test('renders Landing with result', async () => {
  const mocks = [
    {
      request: {
        query: GET_POKEMONS,
        variables: {
          limit: 2,
          offset: 0
        },
      },
      result: {
        data: {
          pokemons: {
            count: 1118,
            results: [
              {
                id: 1,
                image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
                name: "bulbasaur"
              },
              {
                id: 2,
                image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png",
                name: "ivysaur"
              }
            ]
          }
        },
      },
    },
  ];
  
  const { container } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <MyPokemonContextProvider initialData={JSON.stringify(pokemonData)}>
        <Landing />
      </MyPokemonContextProvider>
    </MockedProvider>
  );

  await act(() => new Promise(resolve => setTimeout(resolve, 0)));

  expect(container).toMatchSnapshot();
});