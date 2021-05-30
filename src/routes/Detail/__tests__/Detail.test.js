import { MockedProvider } from '@apollo/client/testing';
import { fireEvent, render, screen, act } from '@testing-library/react';
import Detail from '../';
import { MyPokemonContextProvider } from '../../../contexts/MyPokemonContext';
import { BrowserRouter } from 'react-router-dom';
import { GET_POKEMON } from '../queries';

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({
    pokemonId: "blastoise"
  })
}));

test('renders Detail with loading', () => {
  const mocks = [];

  const { container } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <BrowserRouter>
        <MyPokemonContextProvider initialData={null}>
          <Detail />
        </MyPokemonContextProvider>
      </BrowserRouter>
    </MockedProvider>
  );

  expect(container).toMatchSnapshot();
  expect(screen.getByTestId('name-skeleton')).toBeInTheDocument();
  expect(screen.getByTestId('catch-button-skeleton')).toBeInTheDocument();
});

test('renders Detail with results', async () => {
  const mocks = [
    {
      request: {
        query: GET_POKEMON,
        variables: {
          name: 'Blastoise',
        },
      },
      result: {
        data: {
          pokemon: {
            abilities: [],
            base_experience: 239,
            height: 16,
            id: 9,
            message: "",
            moves: [],
            name: "blastoise",
            sprites: {
              back_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/9.png",
              front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/front/9.png"
            },
            status: true,
            types: [],
          }
        },
      },
    }
  ];

  const { container } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <BrowserRouter>
        <MyPokemonContextProvider initialData={null}>
          <Detail />
        </MyPokemonContextProvider>
      </BrowserRouter>
    </MockedProvider>
  );

  await act(() => new Promise(resolve => setTimeout(resolve, 0)));

  expect(container).toMatchSnapshot();
  expect(screen.getByTestId('capital-name')).toBeInTheDocument();
  expect(screen.getByTestId('catch-button')).toBeInTheDocument();

  process.env.REACT_APP_CATCH_PROBABILITY = "1";
  fireEvent.click(screen.getByTestId('catch-button'));

  process.env.REACT_APP_CATCH_PROBABILITY = "0";
  fireEvent.click(screen.getByTestId('catch-button'));
});