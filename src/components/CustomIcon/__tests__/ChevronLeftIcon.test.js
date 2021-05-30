import { render } from '@testing-library/react';
import ChevronLeftIcon from '../ChevronLeftIcon';

test('renders ChevronLeftIcon', () => {
  const { container } = render(<ChevronLeftIcon />);

  expect(container).toMatchSnapshot();
});
