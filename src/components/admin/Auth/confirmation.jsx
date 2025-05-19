import {
  ModalOverlay,
  ModalContent,
  ModalTitle,
  ButtonGroup,
  Button,
  CloseButton,
} from "./authStyles";

const ConfirmationModal = ({ title, message, onConfirm, onCancel }) => {
  return (
    <ModalOverlay>
      <ModalContent>
        <CloseButton onClick={onCancel}>&times;</CloseButton>
        <ModalTitle>{title}</ModalTitle>
        <p>{message}</p>
        <ButtonGroup>
          <Button onClick={onConfirm}>Confirm</Button>
          <Button onClick={onCancel}>Cancel</Button>
        </ButtonGroup>
      </ModalContent>
    </ModalOverlay>
  );
};

export default ConfirmationModal;
