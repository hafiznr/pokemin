/** @jsxRuntime classic */
/** @jsx jsx */
import { Box } from '@chakra-ui/react';
import { jsx, css } from '@emotion/react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { MyPokemonContext } from '../../contexts/MyPokemonContext';

import HomeIcon from '../CustomIcon/HomeIcon';
import PokeballIcon from '../CustomIcon/PokeballIcon';

const MenuBar = ({pathname}) => {
  const { myPokemonData } = useContext(MyPokemonContext);

  const isHome = pathname === '/';
  const isMyPokemon = pathname === '/mypokemon';

  const linkStyle = css({
    color: 'white',
    textDecoration: 'none',
    '&:hover, &:focus, &:active': {
      color: '#fff',
      textDecoration: 'none'
    }
  });

  return (
    <Box 
      d="grid" 
      gridTemplateColumns="1fr 1fr" 
      textAlign="center"
      position="fixed"
      bottom="0"
      right="0"
      left="50%"
      maxWidth="480px"
      zIndex="2"
      transform="translate(-50%)"
      width="100%"
      boxShadow="2px 2px 23px 7px rgb(0 0 0 / 50%)"
    >
      <Link to="/" css={linkStyle}>
        <Box
          textColor={isHome ? 'white' : 'red.200'}
          textDecor="none"
          bg="red.500"
          height="100%"
          p="12px"
          fontWeight="bold"
          borderRight="0.5px solid white"
        >
          <Box>
            <HomeIcon size="22" color={isHome ? 'white' : '#FEB2B2'}/>
          </Box>
          Home
        </Box>
      </Link>
      <Link to="/mypokemon" css={linkStyle}>
        <Box
          textColor={isMyPokemon ? 'white' : 'red.200'}
          textDecor="none"
          bg="red.500"
          height="100%"
          p="12px"
          fontWeight="bold"
          borderLeft="0.5px solid white"
        >
          <Box>
            <PokeballIcon color={isMyPokemon ? 'white' : '#FEB2B2'}/>
          </Box>
          My Pokémon ({myPokemonData.length})
        </Box>
      </Link>
    </Box>
  );
}

export default MenuBar;