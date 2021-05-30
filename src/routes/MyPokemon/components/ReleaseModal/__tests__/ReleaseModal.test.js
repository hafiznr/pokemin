import { render } from '@testing-library/react';
import ReleaseModal from '../';

test('renders ReleaseModal', () => {
  const { container } = render(<ReleaseModal/>);

  expect(container).toMatchSnapshot();
});