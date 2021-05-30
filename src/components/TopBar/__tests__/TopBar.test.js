import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import TopBar from '../';

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: () => ({
    pathname: "localhost:3000/"
  }),
  useHistory: () => ({
    length: 2,
    push: ()=> {}
  }),
}));

test('renders TopBar', () => {
  const { container } = render(
    <BrowserRouter>
      <TopBar/>
    </BrowserRouter>
  );

  expect(container).toMatchSnapshot();
  fireEvent.click(screen.getByTestId('back-button'));
});