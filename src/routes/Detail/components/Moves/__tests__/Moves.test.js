import { render, screen } from '@testing-library/react';
import Moves from '../';

test('renders Moves', () => {
  const { container, rerender } = render(<Moves/>);

  expect(container).toMatchSnapshot();

  rerender(<Moves loading/>);
  expect(screen.getByTestId('moves-skeleton')).toBeInTheDocument();

  const moves = [
    {
      move: {
        name: 'swords-dance'
      }
    },
    {
      move: {
        name: 'leaf-storm'
      }
    }
  ];

  rerender(<Moves moves={moves}/>);
  expect(screen.getByTestId('moves-container'))
    .toHaveTextContent('swords-danceleaf-storm');
});