import { Box, Text } from '@chakra-ui/layout';
import React, { useContext, useState } from 'react';

import PokemonCard from '../../components/PokemonCard';
import PokeballIcon from '../../components/CustomIcon/PokeballIcon';

import { MyPokemonContext } from '../../contexts/MyPokemonContext';
import ReleaseModal from './components/ReleaseModal';

const MyPokemon = () => {
  const { myPokemonData, removePokemon } = useContext(MyPokemonContext);

  const [released, setReleased] = useState(null);

  const handleClickRelease = (pokemon) => {
    setReleased(pokemon);
  }

  const handleSubmitRelease = () => {
    removePokemon(released.name);

    setReleased(null);
  }

  return (
    <div className="MyPokemon">
      {myPokemonData.length > 0 ? (
        <Box>
          {myPokemonData.map(pokemon => (
            <PokemonCard
              id={pokemon.id}
              name={pokemon.nickname}
              image={pokemon.image}
              isMyPokemon
              onRelease={handleClickRelease}
            />
          ))}

          <ReleaseModal
            isOpen={!!released}
            pokemon={released?.name}
            image={released?.image}
            onClose={() => setReleased(null)}
            onSubmit={handleSubmitRelease}
          />
        </Box>
      ) : (
        <Box 
          textAlign="center" 
          height="calc(100vh - 108px)" 
          display="flex" 
          alignItems="center"
        >
          <Box>
            <PokeballIcon size="100" color="#E2E8F0"/>
            <Text fontSize="xl">
              You don't own any Pokémon right now...
            </Text>
          </Box>
        </Box>
      )}

    </div>
  );
}

export default MyPokemon;
