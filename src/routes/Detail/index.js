/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useContext, useState } from 'react';
import { useParams } from 'react-router';
import { useLazyQuery, useQuery } from '@apollo/client';

import { GET_POKEMON } from './queries';
import { jsx, css } from '@emotion/react';
import SuccessModal from './components/SuccessModal';
import FailedModal from './components/FailedModal';
import { capitalizeFirstLetter, getPokemonNumber } from '../../utils';
import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/table';
import { Button } from '@chakra-ui/button';
import { MyPokemonContext } from '../../contexts/MyPokemonContext';
import TopBar from '../../components/TopBar';
import PokemonType from '../../components/PokemonType';
import { Box, ListItem, OrderedList, Text } from '@chakra-ui/layout';
import { Tag } from '@chakra-ui/tag';
import { Image } from '@chakra-ui/image';
import { Skeleton, SkeletonText } from '@chakra-ui/skeleton';

const CATCH_PROBABILITY = 0.5;

const Detail = () => {
  const { addPokemon } = useContext(MyPokemonContext);

  const [showModal, setShowModal] = useState('');

  const { pokemonId } = useParams();

  const { 
    loading, 
    error, 
    data: pokemonData 
  } = useQuery(GET_POKEMON, {
    variables: {
      name: pokemonId
    }
  });

  const { pokemon } = pokemonData || {};
  const { 
    abilities, 
    base_experience, 
    game_indices, 
    height,
    id,  
    moves,
    name = '', 
    sprites,
    types,
    weight 
  } = pokemon || {};

  const capitalizedName = capitalizeFirstLetter(name);

  const nameStyles = css({
    textTransform: 'capitalize'
  });

  const summaryStyles = css({
    display: 'grid',
    gridTemplateColumns: '96px auto',
    gap: '8px'
  });

  const imagesStyles = css({
    display: 'flex',
    flexDirection: 'column'
  });

  const btnWrapperStyles = css({
    padding: '16px',
    // zIndex: 10,
    boxShadow: '0px 40px 50px 4px #000000'
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
    <Skeleton 
      height="96px" 
      width="96px" 
      mb="8px" 
      borderRadius="8px" 
    />
  );

  return (
    <React.Fragment>
      <TopBar />
      
      <Box className="detail" padding="8px 16px 78px 16px">
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
            />
            <Image 
              src={sprites?.back_default} 
              alt={pokemonId} 
              fallback={imgFallback}
              border="1px solid #CBD5E0"
              borderRadius="8px"
            />
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
    </React.Fragment>

  );
}

export default Detail;
