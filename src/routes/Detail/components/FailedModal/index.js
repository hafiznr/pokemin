/** @jsxRuntime classic */
/** @jsx jsx */
import { Button } from "@chakra-ui/button";
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from "@chakra-ui/modal";
import { jsx, css } from "@emotion/react";

const FailedModal = ({
  isOpen,
  pokemon = '',
  image,
  onClose,
  onRetry
}) => {
  const center = css({
    textAlign: 'center'
  });

  const imgStyle = css({
    display: 'inline'
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xs" isCentered>
      <ModalOverlay  />
      
      <ModalContent>
        <ModalHeader>
          <div css={center}>Aargh! Almost had it!</div>
        </ModalHeader>
        <ModalBody>
          <div css={center}>
            <img src={image} alt={pokemon} css={imgStyle} />
            <br />
            <Button
              colorScheme="twitter"
              size="lg"
              width="100%"
              onClick={onRetry}
            >
              Try again!
            </Button>
            <Button
              m="8px 0"
              size="lg"
              width="100%"
              onClick={onClose}
            >
              Close
            </Button>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default FailedModal;