/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { useQuery, gql } from '@apollo/client';
import PokemonCard from '../../components/PokemonCard';
import { Box } from '@chakra-ui/layout';

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
    <Box pb="50px">
      Landing

      <div>
        {results?.map(pokemon => {
          return (
            <PokemonCard
              id={pokemon.id}
              name={pokemon.name}
              image={pokemon.image}
            />
          )
        })}
      </div>
    </Box>
  );
}

export default Landing;
