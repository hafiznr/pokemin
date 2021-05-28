/** @jsxRuntime classic */
/** @jsx jsx */
import { 
  Button, 
  Modal, 
  ModalContent, 
  ModalHeader, 
  ModalBody, 
  ModalOverlay,
  ButtonGroup
} from '@chakra-ui/react';
import { jsx, css } from '@emotion/react';

const ReleaseModal = ({
  isOpen,
  pokemon = '',
  image,
  onClose,
  onSubmit
}) => {
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
          <div css={center}>Are you sure you want to release {pokemon}?</div>
        </ModalHeader>
        <ModalBody>
          <div css={center}>
            <img css={imgStyle} src={image} alt={pokemon} loading="lazy"/>
            
            <ButtonGroup spacing="4" width="100%">
              <Button onClick={onClose} width="100%">Cancel</Button>
              <Button onClick={onSubmit} colorScheme="red" width="100%">Release</Button>
            </ButtonGroup>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default ReleaseModal;