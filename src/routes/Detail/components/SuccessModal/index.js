/** @jsxRuntime classic */
/** @jsx jsx */
import { useState } from "react"
import { 
  Button, 
  Modal, 
  ModalContent, 
  ModalHeader, 
  ModalBody, 
  FormControl, 
  FormLabel, 
  Input, 
  ModalOverlay
} from '@chakra-ui/react';
import { jsx, css } from '@emotion/react';

const SuccessModal = ({
  isOpen,
  pokemon = '',
  image,
  onClose,
  onSubmit
}) => {
  const [nickname, setNickname] = useState('');
  const [isError, setIsError] = useState(false);

  const handleChange = (e) => {
    setNickname(e.target.value);

    if (isError){
      setIsError(false);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nickname) {
      return setIsError(true);
    }

    setNickname('');
    setIsError(false);
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
            <img css={imgStyle} src={image} alt={pokemon} loading="lazy"/>
            
            <form onSubmit={handleSubmit}>
              <FormControl>
                <FormLabel>
                  Please give a nickname to the captured {pokemon}!
                </FormLabel>
                <Input
                  type="text"
                  name="nickname"
                  value={nickname}
                  isInvalid={isError}
                  focusBorderColor={isError ? 'red.500' : 'blue.500'}
                  onChange={handleChange}  
                />
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