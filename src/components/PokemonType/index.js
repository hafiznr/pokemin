import { Box } from "@chakra-ui/react";

const CUSTOM_BG = {
  normal: '#aa9',
  fire: '#f42',
  water: '#39f',
  electric: '#fc3',
  grass: '#7c5',
  ice: '#6cf',
  fighting: '#b54',
  poison: '#a59',
  ground: '#db5',
  flying: '#89f',
  psychic: '#f59',
  bug: '#ab2',
  rock: '#ba6',
  ghost: '#66b',
  dragon: '#76e',
  dark: '#754',
  steel: '#aab',
  fairy: '#e9e',
};

const PokemonType = ({type}) => {
  
  return (
    <Box
      padding="6px 2px"
      width="76px"
      textTransform="uppercase"
      textAlign="center"
      bgColor={CUSTOM_BG[type]}
      borderRadius="4px"
      color="white"
      textShadow="1px 1px 2px rgb(0 0 0 / 70%)"
      mb="4px"
      data-testid="pokemon-type"
    >
      {type}
    </Box>
  )
}

export default PokemonType;