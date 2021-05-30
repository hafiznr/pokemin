import { render } from '@testing-library/react';
import PokeballIcon from '../PokeballIcon';

test('renders PokeballIcon', () => {
  const { container } = render(<PokeballIcon/>);

  expect(container).toMatchSnapshot();
});