/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { useHistory } from "react-router-dom";
import { Badge, Box, Button } from "@chakra-ui/react";
import { getPokemonNumber } from '../../utils';

const PokemonCard = ({
  id, 
  name, 
  nickname, 
  image, 
  isMyPokemon,
  owned,
  onRelease
}) => {
  const history = useHistory();

  const imgStyles = css({
    backgroundColor: '#fff',
    borderRadius: '8px'
  })

  const parsedId = getPokemonNumber(id);

  const handleClickRelease = (e) => {
    e.stopPropagation();
    
    onRelease({
      id, 
      name,
      nickname, 
      image
    });
  }

  const handleClickCard = () => {
    history.push(`/pokemon/${name}`)
  }

  return (
      <Box 
        d="grid" 
        bg="gray.100" 
        borderRadius="lg" 
        alignItems="center" 
        mb="2" 
        gridGap={4}
        gridTemplateColumns="96px 1fr"
        padding="8px"
        position="relative"
        onClick={handleClickCard}
      >
        <img 
          src={image} 
          alt={nickname || name} 
          loading="lazy" 
          width="96px" 
          height="96px"
          css={imgStyles}
        />
        <Box>
          <Badge 
            fontSize=""
            borderRadius="full" 
            colorScheme="blackAlpha"
          >
            #{parsedId}
          </Badge>
          <Box
            margin="2px 0"
            fontWeight="semibold" 
            fontSize="2xl"
            textTransform="capitalize"
          >
            {nickname || name}
          </Box>
          {isMyPokemon ? (
            <Button 
              colorScheme="red" 
              mt="4px" 
              size="md"
              position="absolute"
              right="8px"
              bottom="8px"
              onClick={handleClickRelease}
            >
              Release
            </Button>
          ) : (
            <Badge 
              fontSize="md"
              borderRadius="full" 
              colorScheme={owned ? "telegram" : "yellow"}
            >
              {owned ? `Owned: ${owned}` : 'Not owned'}
            </Badge>
          )}
        </Box>
      </Box>
  )
}

export default PokemonCard;