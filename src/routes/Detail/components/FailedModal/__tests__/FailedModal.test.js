import { render } from '@testing-library/react';
import FailedModal from '../';

test('renders FailedModal', () => {
  const { container } = render(<FailedModal/>);

  expect(container).toMatchSnapshot();
});