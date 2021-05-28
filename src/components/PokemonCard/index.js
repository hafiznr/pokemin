/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { Link, useHistory } from "react-router-dom";
import { Badge, Box, Image, Button } from "@chakra-ui/react";

const PokemonCard = ({
  id, 
  name, 
  image, 
  isMyPokemon,
  onRelease
}) => {
  const history = useHistory();

  const linkStyle = css({
    textDecoration: 'none',
    color: 'unset'
  });

  const titleStyle = css({
    textTransform: 'capitalize',
    fontWeight: 'bold'
  });

  const parsedId = id?.toLocaleString('en-US', {
    minimumIntegerDigits: 3,
    useGrouping: false
  });

  const handleClickRelease = (e) => {
    e.stopPropagation();
    
    onRelease({
      id, 
      name, 
      image
    });
  }

  const handleClickCard = () => {
    history.push(`/pokemon/${name}`)
  }

  return (
    // <Link css={linkStyle}>
      <Box 
        d="grid" 
        bg="gray.100" 
        borderRadius="lg" 
        alignItems="center" 
        mb="2" 
        gridGap={4}
        gridTemplateColumns="96px 1fr"
        onClick={handleClickCard}
      >
        <Image src={image} alt={name}/>
        <Box>
          <Badge borderRadius="full" colorScheme="blackAlpha">
            #{parsedId}
          </Badge>
          <Box 
            fontWeight="semibold" 
            fontSize="lg" 
            textTransform="capitalize"
          >
            {name}
          </Box>
          {isMyPokemon ? (
            <Button 
              colorScheme="red" 
              mt="4px" 
              size="sm"
              onClick={handleClickRelease}
            >
              Release
            </Button>
          ) : (
            <Badge borderRadius="full" colorScheme="telegram">
              Owned
            </Badge>
          )}
        </Box>
      </Box>
    // </Link>
  )
}

export default PokemonCard;