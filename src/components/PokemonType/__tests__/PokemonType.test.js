import { render, screen } from '@testing-library/react';
import PokemonType from '../';

test('renders PokemonType', () => {
  const { container, rerender } = render(<PokemonType/>);

  expect(container).toMatchSnapshot();

  rerender(<PokemonType type="psychic" />)
  expect(screen.getByTestId('pokemon-type')).toHaveTextContent('psychic');
});