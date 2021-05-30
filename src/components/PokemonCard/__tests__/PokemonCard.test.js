import { render, screen, fireEvent } from '@testing-library/react';
import PokemonCard from '../';

const onRelease = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: () => ({
    push: () => {}
  })
}));

test('renders PokemonCard', () => {
  const { container, rerender } = render(<PokemonCard/>);

  expect(screen.getByTestId('owned-badge')).toHaveTextContent('Not owned');
  expect(container).toMatchSnapshot();

  rerender(<PokemonCard owned={3}/>)
  expect(screen.getByTestId('owned-badge')).toHaveTextContent('Owned: 3');

  rerender(<PokemonCard isMyPokemon nickname="hihi" onRelease={onRelease}/>)
  expect(screen.getByTestId('release-button-hihi')).toBeInTheDocument();
  
  fireEvent.click(screen.getByText(/Release/i));
  expect(onRelease).toHaveBeenCalledTimes(1);

  fireEvent.click(screen.getByTestId('pokemon-card'));
});