/** @jsxRuntime classic */
/** @jsx jsx */
import { useEffect, useState, useContext } from 'react';
import { jsx } from '@emotion/react';
import { useQuery, gql } from '@apollo/client';
import { Skeleton, Box, Stack } from '@chakra-ui/react';

import PokemonCard from '../../components/PokemonCard';

import { MyPokemonContext } from '../../contexts/MyPokemonContext';

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
  
  const [maxPokemon, setMaxPokemon] = useState(0);
  const [offset, setOffset] = useState(0);
  const [pokemonList, setPokemonList] = useState([]);

  const ownedData = {};
  myPokemonData.forEach(item => {
    if (ownedData[item.id]) {
      ownedData[item.id]++;
    } else {
      ownedData[item.id] = 1;
    }
  });

  const handleSetPokemonList = (data) => {
    const { pokemons } = data || {};
    const { results, count } = pokemons || {};


    if (!maxPokemon) {
      setMaxPokemon(count);
    }
    
    setPokemonList([...pokemonList, ...results]);
  }

  const { loading, error } = useQuery(GET_POKEMONS, {
    variables: {
      limit: 10,
      offset
    },
    onCompleted: handleSetPokemonList
  });

  useEffect(() => {
    const handleScroll = () => {
      if (pokemonList.length < maxPokemon 
        && window.innerHeight + document.documentElement.scrollTop 
        === document.documentElement.offsetHeight) {
        setOffset(offset + 10);
      }
    }

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [offset, pokemonList, maxPokemon]);

  return (
    <Box padding="8px 16px 90px 16px">
      {pokemonList.map(pokemon => {
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

      {error && (
        <Box mb="8px" fontSize="xl" fontWeight="bold">
          Something went wrong. Please try again later
        </Box>
      )}

      {(loading || error) && (
        <Stack>
          {[...new Array(8)].map((v,i) => (
            <Skeleton height="112px" key={i}/>
          ))}
        </Stack>
      )}
    </Box>
  );
}

export default Landing;
