/** @jsxRuntime classic */
/** @jsx jsx */
import { useContext, useState } from "react"
import { 
  Button, 
  Modal, 
  ModalContent, 
  ModalHeader, 
  ModalBody, 
  FormControl, 
  FormLabel, 
  Input, 
  ModalOverlay,
  Text
} from '@chakra-ui/react';
import { jsx, css } from '@emotion/react';

import { MyPokemonContext } from "../../../../contexts/MyPokemonContext";

const SuccessModal = ({
  isOpen,
  pokemon = '',
  image,
  onClose,
  onSubmit
}) => {
  const { myPokemonData } = useContext(MyPokemonContext);

  const [nickname, setNickname] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setNickname(e.target.value);

    if (errorMessage){
      setErrorMessage('');
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nickname || nickname.length > 10) {
      return setErrorMessage('Please give a nickname with max 10 characters');
    }

    const hasNickname = myPokemonData.some((pokemon) => 
      pokemon.nickname.toLowerCase() === nickname.toLowerCase());
    
    if (hasNickname) {
      return setErrorMessage('This nickname is already used');
    }

    setNickname('');
    setErrorMessage(false);
    onSubmit(nickname);
  }

  const center = css({
    textAlign: 'center'
  });

  const imgStyle = css({
    display: 'inline'
  })

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      closeOnOverlayClick={false} 
      size="xs"
      isCentered
    >
      <ModalOverlay />
      
      <ModalContent>
        <ModalHeader>
          <div css={center}>Gotcha! {pokemon} was caught!</div>
        </ModalHeader>
        <ModalBody>
          <div css={center}>
            <img 
              css={imgStyle} 
              src={image} 
              alt={pokemon} 
              loading="lazy"
              width="96px" 
              height="96px" 
            />
            
            <form onSubmit={handleSubmit}>
              <FormControl>
                <FormLabel>
                  Please give a nickname to the captured {pokemon}!
                </FormLabel>
                <Input
                  type="text"
                  name="nickname"
                  value={nickname}
                  isInvalid={!!errorMessage}
                  focusBorderColor={errorMessage ? 'red.500' : 'blue.500'}
                  autoComplete="off"
                  onChange={handleChange}  
                />
                {errorMessage && (
                  <Text 
                    fontSize="sm" 
                    textAlign="left" 
                    color="red.400"
                    mt="4px"
                  >
                    {errorMessage}
                  </Text>
                )}
              </FormControl>
              <Button 
                type="submit" 
                margin="8px 0" 
                width="100%" 
                size="lg"
                colorScheme="twitter"
              >
                Submit
              </Button>
            </form>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default SuccessModal;