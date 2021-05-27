/** @jsxRuntime classic */
/** @jsx jsx */
import { Box } from '@chakra-ui/react';
import { jsx, css } from '@emotion/react';
import { Link } from 'react-router-dom';

const MenuBar = ({pathname}) => {
  const isHome = pathname === '/';
  const isMyPokemon = pathname === '/mypokemon';

  const linkStyle = css({
    color: 'white',
    textDecoration: 'none',
    '&:hover, &:focus, &:active': {
      color: '#fff',
      textDecoration: 'none'
    }
  })

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
    >
      <Link to="/" css={linkStyle}>
        <Box
          textColor="white"
          textDecor="none"
          bg={isHome ? 'red.400' : 'red.500'}
          height="100%"
          p="16px"
          borderTopLeftRadius="8px"
          borderBottomWidth="3px"
          borderBottomColor={isHome ? 'gray.100' : 'red.500'}
        >
          Home
        </Box>
      </Link>
      <Link to="/mypokemon" css={linkStyle}>
        <Box
          textColor="white"
          textDecor="none"
          bg={isMyPokemon ? 'red.400' : 'red.500'}
          height="100%"
          p="16px"
          borderTopRightRadius="8px"
          borderBottomWidth="3px"
          borderBottomColor={isMyPokemon ? 'gray.100' : 'red.500'}
        >
          My Pokemon
        </Box>
      </Link>
    </Box>
  );
}

export default MenuBar;