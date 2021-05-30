import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { MyPokemonContextProvider } from '../../../contexts/MyPokemonContext';
import routes from '../../../routes';
import Layout from '../';

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: () => ({
    pathname: "localhost:3000/"
  })
}));

test('renders Layout', () => {
  const { container } = render(
    <MyPokemonContextProvider initialData={null}>
      <BrowserRouter>
        <Layout routes={routes}/>
      </BrowserRouter>
    </MyPokemonContextProvider>
  );

  expect(container).toMatchSnapshot();
});
