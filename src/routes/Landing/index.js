/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useEffect, useState } from 'react';
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
    const { results } = pokemons || {};

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
      if (window.innerHeight + document.documentElement.scrollTop 
        === document.documentElement.offsetHeight) {
        setOffset(offset + 10);
      }
    }

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [offset]);

  return (
    <React.Fragment>
      <TopBar />
      <Box padding="8px 16px 90px 16px">
        <div>
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
        </div>
      </Box>
    </React.Fragment>
  );
}

export default Landing;
