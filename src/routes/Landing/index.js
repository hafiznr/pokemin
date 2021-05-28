/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react';
import { css, jsx } from '@emotion/react';
import { useQuery, gql } from '@apollo/client';
import PokemonCard from '../../components/PokemonCard';
import { Box } from '@chakra-ui/layout';
import { useContext } from 'react';
import { MyPokemonContext } from '../../contexts/MyPokemonContext';
import TopBar from '../../components/TopBar';

const GET_POKEMONS = gql`
  query pokemons($limit: Int, $offset: Int) {
    pokemons(limit: $limit, offset: $offset) {
      count
      next
      previous
      status
      message
      results {
        id
        url
        name
        image
      }
    }
  }
`;

const Landing = () => {
  const { myPokemonData } = useContext(MyPokemonContext);

  const ownedData = {};
  myPokemonData.forEach(item => {
    if (ownedData[item.id]) {
      ownedData[item.id]++;
    } else {
      ownedData[item.id] = 1;
    }
  });

  const { loading, error, data } = useQuery(GET_POKEMONS, {
    variables: {
      limit: 10,
      offset: 0
    }
  });

  const { pokemons } = data || {};
  const { results } = pokemons || {};

  const listStyle = css({
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '8px'
  })

  return (
    <React.Fragment>
      <TopBar />
      <Box padding="16px 16px 78px 16px">
        <div>
          {results?.map(pokemon => {
            return (
              <PokemonCard
                id={pokemon.id}
                name={pokemon.name}
                image={pokemon.image}
                owned={ownedData[pokemon.id] || 0}
                key={pokemon.id}
              />
            )
          })}
        </div>
      </Box>
    </React.Fragment>
  );
}

export default Landing;
