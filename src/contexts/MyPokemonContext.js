import React, { createContext, useState } from 'react';

export const MyPokemonContext = createContext();

export const MyPokemonContextProvider = ({ children, initialData }) => {
  const [myPokemonData, setMyPokemonData] = useState(JSON.parse(initialData) || []);

  const addPokemon = (data) => {
    const newPokemonData = [...myPokemonData, data];

    setMyPokemonData(newPokemonData);

    localStorage.setItem('mypokemon', JSON.stringify(newPokemonData));
  }

  const removePokemon = (nickname) => {
    const newPokemonData = myPokemonData
      .filter(pokemon => pokemon.nickname !== nickname);

    setMyPokemonData(newPokemonData);

    localStorage.setItem('mypokemon', JSON.stringify(newPokemonData));
  }

  return (
    <MyPokemonContext.Provider 
      value={{ myPokemonData, addPokemon, removePokemon }}
    >
      {children}
    </MyPokemonContext.Provider>
  )
}
