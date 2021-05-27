/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { Link } from "react-router-dom";
import { Badge, Box } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/image";

const PokemonCard = ({id, name, image}) => {
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
  })

  return (
    <Link to={`/pokemon/${id}`} css={linkStyle}>
      <Box 
        d="grid" 
        bg="gray.100" 
        borderRadius="lg" 
        alignItems="center" 
        mb="2" 
        gridGap={4}
        gridTemplateColumns="96px 1fr"
      >
        <Image src={image} alt={name}/>
        <Box>
          <Badge borderRadius="full" colorScheme="blackAlpha">
            #{parsedId}
          </Badge>
          <Box fontWeight="semibold" fontSize="lg" textTransform="capitalize">{name}</Box>
          <Badge borderRadius="full" colorScheme="telegram">Owned</Badge>
        </Box>
      </Box>
    </Link>
  )
}

export default PokemonCard;