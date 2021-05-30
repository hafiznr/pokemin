import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { MyPokemonContextProvider } from '../../../contexts/MyPokemonContext';

import MenuBar from '../';

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: () => ({
    pathname: "localhost:3000/"
  })
}));

test('renders MenuBar', () => {
  const { container } = render(
      <MyPokemonContextProvider initialData={null}>
        <BrowserRouter>
          <MenuBar />
        </BrowserRouter>
      </MyPokemonContextProvider>
  );

  expect(container).toMatchSnapshot();
});
