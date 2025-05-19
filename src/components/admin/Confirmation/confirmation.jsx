// import {
//   ModalOverlay,
//   ModalContent,
//   ModalTitle,
//   ButtonGroup,
//   Button,
//   CloseButton,
// } from "./confirmationStyles";

// const ConfirmationModal = ({
//   title,
//   message,
//   onConfirm,
//   onCancel,
//   confirmLabel = "Confirm",
//   cancelLabel = "Cancel",
//   isConfirmDisabled = false,
//   isCancelDisabled = false,
//   isLoading = false,
// }) => {
//   return (
//     <ModalOverlay>
//       <ModalContent>
//         <CloseButton onClick={onCancel}>&times;</CloseButton>
//         <ModalTitle>{title}</ModalTitle>
//         <p>{message}</p>
//         <ButtonGroup>
//           <Button onClick={onConfirm} disabled={isConfirmDisabled || isLoading}>
//             {isLoading ? "Processing..." : confirmLabel}
//           </Button>
//           <Button onClick={onCancel} disabled={isCancelDisabled || isLoading}>
//             {cancelLabel}
//           </Button>
//         </ButtonGroup>
//       </ModalContent>
//     </ModalOverlay>
//   );
// };

// export default ConfirmationModal;

import {
  ModalOverlay,
  ModalContent,
  ModalTitle,
  ButtonGroup,
  Button,
  CloseButton,
} from "./confirmationStyles";

const ConfirmationModal = ({
  title,
  message,
  onConfirm,
  onCancel,
  isProcessing = false,
  confirmText = "Confirm",
  cancelText = "Cancel",
  processingText = "Processing...",
}) => {
  return (
    <ModalOverlay>
      <ModalContent>
        <CloseButton onClick={onCancel} disabled={isProcessing}>
          &times;
        </CloseButton>
        <ModalTitle>{title}</ModalTitle>
        <p>{message}</p>
        <ButtonGroup>
          <Button onClick={onConfirm} disabled={isProcessing}>
            {isProcessing ? processingText : confirmText}
          </Button>
          <Button onClick={onCancel} disabled={isProcessing}>
            {cancelText}
          </Button>
        </ButtonGroup>
      </ModalContent>
    </ModalOverlay>
  );
};

export default ConfirmationModal;
