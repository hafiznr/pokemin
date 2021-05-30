import { render } from '@testing-library/react';
import HomeIcon from '../HomeIcon';

test('renders HomeIcon', () => {
  const { container } = render(<HomeIcon/>);

  expect(container).toMatchSnapshot();
});