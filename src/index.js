import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/client/react';
import { ApolloClient, InMemoryCache } from '@apollo/client/core';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import routes from './routes';
import { ChakraProvider } from '@chakra-ui/react';
import { MyPokemonContextProvider } from './contexts/MyPokemonContext';

const client = new ApolloClient({
  uri: 'https://graphql-pokeapi.vercel.app/api/graphql', 
  cache: new InMemoryCache() 
});

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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
