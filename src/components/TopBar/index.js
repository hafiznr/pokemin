import { Box } from "@chakra-ui/react"
import { useHistory, useLocation } from "react-router";

import ChevronLeftIcon from "../CustomIcon/ChevronLeftIcon";

const TopBar = () => {
  const history = useHistory();
  const location = useLocation();
  const { pathname } = location;
  const pathnameArr = pathname.split("/");

  const menus = {
    pokemon: 'Detail',
    mypokemon: 'My Pokémon'
  };

  return (
    <Box 
      bgColor="red.500"
      color="white"
      fontWeight="bold"
      padding="8px"
      textAlign="center"
      maxWidth="480px"
    >
      {history?.length && (
        <Box
          pos="absolute"
          top="8px"
          cursor="pointer"
          onClick={() => history.goBack()}
          data-testid="back-button"
        >
          <ChevronLeftIcon />
        </Box>
      )}
      <Box lineHeight="24px" fontSize="14px">
        {menus[pathnameArr[1]] || 'Pokémin'}
      </Box>
    </Box>
  )
}

export default TopBar;