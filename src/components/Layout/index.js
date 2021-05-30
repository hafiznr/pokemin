/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { Suspense } from 'react';
import { withRouter } from "react-router";
import { renderRoutes } from "react-router-config"

import MenuBar from '../MenuBar';
import TopBar from '../TopBar';

const Layout = ({route, location}) => {
  const { pathname } = location;

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
      <TopBar />
      <Suspense fallback={<div>Loading...</div>}>
        {renderRoutes(route.routes)}
      </Suspense>
      <MenuBar pathname={pathname} />
    </main>
  )
};

export default withRouter(Layout);