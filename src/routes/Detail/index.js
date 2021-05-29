/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useContext, useState } from 'react';
import { useParams } from 'react-router';
import { useQuery } from '@apollo/client';
import { jsx, css } from '@emotion/react';
import { 
  Table, 
  Tbody, 
  Td, 
  Tr,
  Button,
  ListItem,
  OrderedList,
  Tag,
  Image,
  Skeleton,
  Box
} from '@chakra-ui/react';

// queries
import { GET_POKEMON } from './queries';

// components
import SuccessModal from './components/SuccessModal';
import FailedModal from './components/FailedModal';
import PokemonType from '../../components/PokemonType';

// utils
import { capitalizeFirstLetter, getPokemonNumber } from '../../utils';

// context
import { MyPokemonContext } from '../../contexts/MyPokemonContext';

const CATCH_PROBABILITY = 0.5;

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
    abilities, 
    base_experience,
    height,
    id,  
    moves,
    name = '', 
    sprites,
    types,
    weight 
  } = pokemon || {};

  const capitalizedName = capitalizeFirstLetter(name);

  const summaryStyles = css({
    display: 'grid',
    gridTemplateColumns: '96px auto',
    gap: '8px'
  });

  const imagesStyles = css({
    display: 'flex',
    flexDirection: 'column'
  });

  const handleClickCatch = () => {
    const isSuccess = Math.random() <= CATCH_PROBABILITY;

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

  const tableContent = [
    {
      label: 'Number',
      value: getPokemonNumber(id)
    },
    {
      label: 'Types',
      value: types?.map((item, i) => (
        <PokemonType key={i} type={item.type.name} />
      ))
    },
    {
      label: 'Height',
      value: height
    },
    {
      label: 'Weight',
      value: weight
    },
    {
      label: 'Abilities',
      value: (
        <OrderedList textTransform="capitalize">
          {abilities?.map((item, i) => (
            <ListItem key={i}>{item.ability.name}</ListItem>
          ))}
        </OrderedList>
      )
    },
    {
      label: 'Base exp.',
      value: base_experience
    }
  ]

  const imgFallback = (
    <>
      <Skeleton 
        height="96px" 
        width="96px" 
        mb="8px" 
        borderRadius="8px" 
      />
      <Skeleton 
        height="96px" 
        width="96px"
        borderRadius="8px" 
      />
    </>
  );

  return (
    <Box className="detail" padding="8px 16px 78px 16px">
      {error && (
        <Box mb="8px" fontSize="xl" fontWeight="bold">
          Something went wrong. Please try again later
        </Box>
      )}

      <Box textAlign="center" fontSize="2xl" fontWeight="bold" mb="8px">
        {loading ? (
          <Skeleton height="27px" mb="8px"/>
        ) : <>{capitalizedName}</>}
      </Box>
      <div css={summaryStyles}>
        <div css={imagesStyles}>
          <Image 
            src={sprites?.front_default} 
            alt={pokemonId}
            fallback={imgFallback}
            mb="8px"
            border="1px solid #CBD5E0"
            borderRadius="8px"
            htmlHeight="96px"
            htmlWidth="96px"
          />
          {sprites?.back_default && (
            <Image 
              src={sprites?.back_default} 
              alt={pokemonId} 
              fallback={imgFallback}
              border="1px solid #CBD5E0"
              borderRadius="8px"
              htmlHeight="96px"
              htmlWidth="96px"
            />
          )}
        </div>
        <Table>
          <Tbody>
            {tableContent.map((content, i) => (
              <Tr key={i}>
                <Td maxWidth="84px">{content.label}</Td>
                <Td>
                  {loading ? (
                    <Skeleton width="60px" height="14px"/>
                  ) : (<>{content.value}</>)}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </div>
      <Box fontSize="2xl" mb="4px">Moves</Box>
      {loading ? (
        <Skeleton height="100px"/>
      ) : (
        <Box 
          display="flex" 
          flexWrap="wrap"
          overflow="scroll"
          height="100px"
          bgColor="gray.100"
          borderRadius="8px"
          borderColor="gray.100"
          borderWidth="4px"
        >
          {moves?.map((item, i) => (
            <Tag 
              key={i}
              size="lg"
              margin="0 4px 4px 0"
              bgColor="white"
            >
              {item.move.name}
            </Tag>
          ))}
        </Box>
      )}

      <Box
        width="100%"
        textAlign="center"
        margin="16px 0"
      >
        {loading ? (
          <Skeleton height="36px" />
        ) : (
          <Button 
            size="lg"
            colorScheme="twitter"
            width="100%"
            onClick={handleClickCatch}
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
