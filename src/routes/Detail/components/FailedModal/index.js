import { Button } from "@chakra-ui/button";
import { Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay } from "@chakra-ui/modal";

const FailedModal = ({
  isOpen,
  pokemon = '',
  image,
  onClose,
  onRetry
}) => {

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xs">
      <ModalOverlay  />
      
      <ModalContent>
        <ModalHeader>
          Aargh! Almost had it!
        </ModalHeader>
        <ModalBody>
          <img src={image} alt={pokemon} />
          <br />
          <Button onClick={onRetry}>Try again!</Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default FailedModal;