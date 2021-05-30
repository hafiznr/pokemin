import { render } from '@testing-library/react';
import SuccessModal from '../';
import { MyPokemonContextProvider } from '../../../../../contexts/MyPokemonContext';

test('renders SuccessModal', () => {
  const { container } = render(
    <MyPokemonContextProvider initialData={null}>
      <SuccessModal/>
    </MyPokemonContextProvider>
  );

  expect(container).toMatchSnapshot();
});