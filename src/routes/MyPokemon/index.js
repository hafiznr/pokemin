import React, { useContext, useState } from 'react';
import { Box, Text } from '@chakra-ui/react';

// assets
import PokemonCard from '../../components/PokemonCard';
import PokeballIcon from '../../components/CustomIcon/PokeballIcon';

// context
import { MyPokemonContext } from '../../contexts/MyPokemonContext';

// components
import ReleaseModal from './components/ReleaseModal';

const MyPokemon = () => {
  const { myPokemonData, removePokemon } = useContext(MyPokemonContext);

  const [released, setReleased] = useState(null);

  const handleClickRelease = (pokemon) => {
    setReleased(pokemon);
  }

  const handleSubmitRelease = () => {
    removePokemon(released.nickname);

    setReleased(null);
  }

  return (
    <Box padding="8px 16px 78px 16px" data-testid="mypokemon">
      {myPokemonData.length > 0 ? (
        <div>
          {myPokemonData.map(pokemon => (
            <PokemonCard
              id={pokemon.id}
              nickname={pokemon.nickname}
              name={pokemon.name}
              image={pokemon.image}
              isMyPokemon
              onRelease={handleClickRelease}
              key={pokemon.nickname}
            />
          ))}

          <ReleaseModal
            isOpen={!!released}
            pokemon={released?.nickname}
            image={released?.image}
            onClose={() => setReleased(null)}
            onSubmit={handleSubmitRelease}
          />
        </div>
      ) : (
        <Box 
          textAlign="center" 
          height="calc(100vh - 134px)" 
          display="flex" 
          alignItems="center"
        >
          <Box width="100%">
            <PokeballIcon size="100" color="#E2E8F0"/>
            <Text fontSize="xl">
              You don't own any Pokémon right now...
            </Text>
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default MyPokemon;
