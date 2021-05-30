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

  const menus = [
    {
      label: 'Home',
      url: '/',
      active: isHome,
      customProps: {
        borderRight: "0.5px solid white"
      },
      icon: <HomeIcon size="22" color={isHome ? 'white' : '#FEB2B2'}/>
    },
    {
      label: `My Pokémon (${myPokemonData.length})`,
      url: '/mypokemon',
      active: isMyPokemon,
      customProps: {
        borderLeft: "0.5px solid white"
      },
      icon: <PokeballIcon color={isMyPokemon ? 'white' : '#FEB2B2'}/>
    }
  ]

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
      {menus.map(menu => {
        return (
          <Link to={menu.url} css={linkStyle} key={menu.url}>
            <Box
              textColor={menu.active ? 'white' : 'red.200'}
              textDecor="none"
              bg="red.500"
              height="100%"
              p="12px"
              fontWeight="bold"
              {...menu.customProps}
            >
              <div>{menu.icon}</div>
              {menu.label}
            </Box>
          </Link>
        )
      })}
    </Box>
  );
}

export default MenuBar;