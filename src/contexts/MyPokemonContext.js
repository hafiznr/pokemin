import React, { createContext, useState } from 'react';

export const MyPokemonContext = createContext();

export const MyPokemonContextProvider = ({ children, initialData }) => {
  // const initialData = sessionStorage.getItem('mypokemon');
  console.log({initialData})

  const [myPokemonData, setMyPokemonData] = useState(JSON.parse(initialData) || []);

  const addPokemon = (data) => {
    const newPokemonData = [...myPokemonData, data];

    setMyPokemonData(newPokemonData);

    sessionStorage.setItem('mypokemon', JSON.stringify(newPokemonData));
  }

  return (
    <MyPokemonContext.Provider 
      value={{ ...myPokemonData, addPokemon }}
    >
      {children}
    </MyPokemonContext.Provider>
  )
}
