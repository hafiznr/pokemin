import { fireEvent, render, screen } from '@testing-library/react';
import MyPokemon from '../';
import { MyPokemonContextProvider } from '../../../contexts/MyPokemonContext';

test('renders empty MyPokemon', () => {
  const { container } = render(
    <MyPokemonContextProvider initialData={null}>
      <MyPokemon/>
    </MyPokemonContextProvider>
  );

  expect(container).toMatchSnapshot();
  expect(screen.getByTestId('mypokemon'))
    .toHaveTextContent(`You don't own any Pokémon right now...`);
});

test('renders MyPokemon', () => {

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
    }
  ];

  const { container } = render(
    <MyPokemonContextProvider initialData={JSON.stringify(pokemonData)}>
      <MyPokemon/>
    </MyPokemonContextProvider>
  );

  expect(container).toMatchSnapshot();
  expect(screen.getAllByTestId('pokemon-card')).toHaveLength(2);

  fireEvent.click(screen.getByTestId('release-button-ADsadasdas'));
});