import path from 'path';
import fs from 'fs';

import React from 'react';
import express from 'express';
import ReactDOMServer from 'react-dom/server';
import { ApolloProvider } from '@apollo/client';
import { StaticRouter } from 'react-router';
import { ChakraProvider } from '@chakra-ui/react';
import { MyPokemonContextProvider } from '../src/contexts/MyPokemonContext';
import { renderRoutes } from 'react-router-config';
import { client } from '../src/client';
import routes from '../src/routes';
import * as serviceWorkerRegistration from '../src/serviceWorkerRegistration';

const PORT = process.env.PORT || 3006;
const app = express();

const myPokemonData = localStorage.getItem('mypokemon');

app.get('/', (req, res) => {
  const app = ReactDOMServer.renderToString(
    <ApolloProvider client={client}>
      <StaticRouter>
        <ChakraProvider>
          <MyPokemonContextProvider initialData={myPokemonData}>
            {renderRoutes(routes)}
          </MyPokemonContextProvider>
        </ChakraProvider>
      </StaticRouter>
    </ApolloProvider>
  );

  const indexFile = path.resolve('./build/index.html');
  fs.readFile(indexFile, 'utf8', (err, data) => {
    if (err) {
      console.error('Something went wrong:', err);
      return res.status(500).send('Oops, better luck next time!');
    }

    return res.send(
      data.replace('<div id="root"></div>', `<div id="root">${app}</div>`)
    );
  });
});

app.use(express.static('./build'));

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

serviceWorkerRegistration.unregister();