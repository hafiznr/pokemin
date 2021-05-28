import { Box } from "@chakra-ui/layout"
import { useHistory, useLocation } from "react-router";
import ChevronLeftIcon from "../CustomIcon/ChevronLeftIcon";

const TopBar = () => {
  const history = useHistory();
  const location = useLocation();
  const { pathname } = location;
  const pathnameArr = pathname.split("/");

  const menus = {
    pokemon: 'Detail',
    mypokemon: 'My Pokemon'
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
          onClick={() => history.goBack()}
        >
          <ChevronLeftIcon />
        </Box>
      )}
      <Box lineHeight="24px">
        {menus[pathnameArr[1]] || 'Pokémin'}
      </Box>
    </Box>
  )
}

export default TopBar;