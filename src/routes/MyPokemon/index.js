import React, { useContext, useState } from 'react';

import PokemonCard from '../../components/PokemonCard';

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
    </div>
  );
}

export default MyPokemon;
