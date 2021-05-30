import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/client/react';
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { ChakraProvider } from '@chakra-ui/react';

import routes from './routes';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';

import { MyPokemonContextProvider } from './contexts/MyPokemonContext';

import './index.css';
import { client } from './client';

const myPokemonData = localStorage.getItem('mypokemon');

ReactDOM.hydrate(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <ChakraProvider>
        <MyPokemonContextProvider initialData={myPokemonData}>
          {renderRoutes(routes)}
        </MyPokemonContextProvider>
      </ChakraProvider>
    </BrowserRouter>
  </ApolloProvider>, 
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
