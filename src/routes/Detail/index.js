/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useContext, useState } from 'react';
import { useParams } from 'react-router';
import { useLazyQuery, useQuery } from '@apollo/client';

import { GET_POKEMON } from './queries';
import { jsx, css } from '@emotion/react';
import SuccessModal from './components/SuccessModal';
import FailedModal from './components/FailedModal';
import { capitalizeFirstLetter } from '../../utils';
import { Table } from '@chakra-ui/table';
import { Button } from '@chakra-ui/button';
import { MyPokemonContext } from '../../contexts/MyPokemonContext';

const CATCH_PROBABILITY = 0.5;

const Detail = () => {
  const { addPokemon } = useContext(MyPokemonContext);

  const [showModal, setShowModal] = useState('');

  const { pokemonId } = useParams();

  const { 
    loading: loadingGetPokemon, 
    error: errorGetPokemon, 
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
    flexDirection: 'column',
    justifyContent: 'center'
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

  return (
    <div className="detail">
      Detail

      <h1>{capitalizedName}</h1>
      <div css={summaryStyles}>
        <div css={imagesStyles}>
          <img src={sprites?.front_default} alt={pokemonId} />
          <img src={sprites?.back_default} alt={pokemonId} />
        </div>
        <Table>
          <tbody>
            <tr>
              <td>ID</td>
              <td>{id}</td>
            </tr>
            <tr>
              <td>Types</td>
              <td>{types?.map(item => item.type.name).join(", ")}</td>
            </tr>
            <tr>
              <td>height</td>
              <td>{height}</td>
            </tr>
            <tr>
              <td>weight</td>
              <td>{weight}</td>
            </tr>
            <tr>
              <td>abilites</td>
              <td>{abilities?.map(item => item.ability.name).join(", ")}</td>
            </tr>
            <tr>
              <td>Base experience</td>
              <td>{base_experience}</td>
            </tr>
          </tbody>
        </Table>
      </div>
      <h2>Moves</h2>
      <h2>Stats</h2>

      <div className="fixed-bottom" css={btnWrapperStyles}>
        <Button 
          size="lg"
          onClick={handleClickCatch}
        >
          Catch!
        </Button>
      </div>

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
    </div>
  );
}

export default Detail;
