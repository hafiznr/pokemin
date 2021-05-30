import { useContext, useState } from 'react';
import { useParams } from 'react-router';
import { useQuery } from '@apollo/client';
import { 
  Button,
  Skeleton,
  Box
} from '@chakra-ui/react';

// queries
import { GET_POKEMON } from './queries';

// components
import SuccessModal from './components/SuccessModal';
import FailedModal from './components/FailedModal';
import Moves from './components/Moves';
import Summary from './components/Summary';

// utils
import { capitalizeFirstLetter } from '../../utils';

// context
import { MyPokemonContext } from '../../contexts/MyPokemonContext';

const Detail = () => {
  const { addPokemon } = useContext(MyPokemonContext);

  const [showModal, setShowModal] = useState('');

  const { pokemonId } = useParams();

  const { loading, error, data: pokemonData } = useQuery(GET_POKEMON, {
    variables: {
      name: pokemonId
    }
  });

  const { pokemon } = pokemonData || {};
  const {
    id,  
    moves,
    name = '', 
    sprites,
  } = pokemon || {};

  const capitalizedName = capitalizeFirstLetter(name);

  const handleClickCatch = () => {
    const probability = +process.env.REACT_APP_CATCH_PROBABILITY;
    const isSuccess = Math.random() <= probability;

    if(isSuccess) {
      setShowModal('success');
    } else {
      setShowModal('failed');
    }
  }

  const handleAddPokemon = (nickname) => {
    addPokemon({
      id,
      name,
      image: sprites.front_default,
      nickname
    });

    setShowModal('');
  }

  return (
    <Box className="detail" padding="8px 16px 78px 16px">
      {error && (
        <Box mb="8px" fontSize="xl" fontWeight="bold">
          Something went wrong. Please try again later
        </Box>
      )}

      <Box 
        textAlign="center" 
        fontSize="2xl" 
        fontWeight="bold" 
        mb="8px"
      >
        {loading ? (
          <Skeleton 
            height="27px" 
            mb="8px" 
            data-testid="name-skeleton"
          />
        ) : (
          <div data-testid="capital-name">
            {capitalizedName}
          </div>
        )}
      </Box>

      <Summary loading={loading} data={pokemon} />

      <Moves loading={loading} moves={moves} />

      <Box
        width="100%"
        textAlign="center"
        margin="16px 0"
      >
        {loading ? (
          <Skeleton 
            height="36px" 
            data-testid="catch-button-skeleton"
          />
        ) : (
          <Button 
            size="lg"
            colorScheme="twitter"
            width="100%"
            onClick={handleClickCatch}
            data-testid="catch-button"
          >
            Catch!
          </Button>
        )}
      </Box>

      <SuccessModal
        isOpen={showModal === 'success'}
        pokemon={capitalizedName}
        image={sprites?.front_default}
        onClose={() => setShowModal('')}
        onSubmit={handleAddPokemon}
      />

      <FailedModal
        isOpen={showModal === 'failed'}
        pokemon={capitalizedName}
        image={sprites?.back_default}
        onClose={() => setShowModal('')}
        onRetry={handleClickCatch}
      />
    </Box>
  );
}

export default Detail;
