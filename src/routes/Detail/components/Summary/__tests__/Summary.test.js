import { render, screen } from '@testing-library/react';
import Summary from '../';

test('renders Summary', () => {
  const { container, rerender } = render(<Summary loading/>);

  expect(container).toMatchSnapshot();
  expect(screen.getAllByTestId('summary-skeleton')).toHaveLength(6)

  const data = {
    abilities: [
      { 
        ability: {
          name: 'blaze'
        }  
      },
      { 
        ability: {
          name: 'solar-power'
        }  
      }
    ],
    base_experience: 240,
    height: 17,
    id: 6,
    moves: [
      {
        move: {
          name: 'mega-punch'
        }
      }
    ],
    name: "charizard",
    sprites: {
      back_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/6.png",  
      front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/front/6.png"
    },
    status: true,
    types: [
      {
        type: {
          name: 'fire'
        }
      },
      {
        type: {
          name: 'flying'
        }
      }
    ],
    weight: 905
  };

  rerender(<Summary data={data}/>)
  expect(screen.getAllByTestId('abilities')).toHaveLength(2);
});