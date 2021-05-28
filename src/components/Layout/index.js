/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react';
import { css, jsx } from '@emotion/react';
import { withRouter } from "react-router";
import { renderRoutes } from "react-router-config"
import MenuBar from '../MenuBar';

const Layout = ({route, location}) => {
  const { pathname } = location;
  const isMyPokemonPage = pathname === '/mypokemon';

  const myPokemonLinkStyles = css({
    color: isMyPokemonPage ? '#fff' : 'rgba(255,255,255,.5)',
    textDecoration: 'none',
    '&:hover, &:focus, &:active': {
      color: '#fff'
    }
  });

  const brandStyles = css({
    color: '#fff',
    textDecoration: 'none',
    '&:hover, &:focus, &:active': {
      color: '#fff',
      textDecoration: 'none'
    }
  });

  const mainStyles = css({
    maxWidth: '480px',
    boxSizing: 'border-box',
    width: '100%',
    margin: '0px auto',
    background: '#fff',
    minHeight: '100vh'
  });

  return (
    <main css={mainStyles}>
      {renderRoutes(route.routes)}
      <MenuBar pathname={pathname} />
    </main>
  )
};

export default withRouter(Layout);