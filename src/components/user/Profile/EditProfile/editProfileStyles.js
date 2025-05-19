import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideUp = keyframes`
  from { transform: translateY(50px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: ${fadeIn} 0.3s ease-out;
  backdrop-filter: blur(5px);
  overflow: hidden;
`;

export const ModalContainer = styled.div`
  position: relative;
  background: white;
  border-radius: 20px;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: scroll;
  animation: ${slideUp} 0.4s ease-out;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: ${({ theme }) => theme.colors.glass};
  color: ${({ theme }) => theme.colors.primary};
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all ${({ theme }) => theme.transitions.default};
  z-index: 1;

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: white;
    transform: rotate(90deg);
  }
`;

export const ModalHeader = styled.div`
  padding: 1.5rem 2rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.glass};

  h2 {
    color: ${({ theme }) => theme.colors.primary};
    margin: 0;
    font-size: 1.5rem;
  }
`;

export const ModalBody = styled.div`
  padding: 2rem;
`;

export const ModalFooter = styled.div`
  padding: 1.5rem 2rem;
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  border-top: 1px solid ${({ theme }) => theme.colors.glass};
`;

export const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

export const FormLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 500;
`;

export const FormInput = styled.input`
  width: 100%;
  padding: 0.8rem 1rem;
  border: 2px solid ${({ theme }) => theme.colors.glass};
  border-radius: 10px;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.glass};
    outline: none;
  }
`;

export const FormTextArea = styled.textarea`
  width: 100%;
  padding: 0.8rem 1rem;
  border: 2px solid ${({ theme }) => theme.colors.glass};
  border-radius: 10px;
  font-size: 1rem;
  resize: vertical;
  min-height: 100px;
  font-family: inherit;
  transition: all 0.3s ease;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.glass};
    outline: none;
  }
`;

export const ImageUploadPreview = styled.div`
  position: relative;
  width: 150px;
  height: 150px;
  margin: 0 auto 2rem;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid ${({ theme }) => theme.colors.primary};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  &:hover img {
    transform: scale(1.1);
  }
`;

export const UploadButton = styled.label`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(91, 35, 51, 0.8);
  color: white;
  padding: 0.5rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  opacity: 0;

  ${ImageUploadPreview}:hover & {
    opacity: 1;
  }

  &:hover {
    background: rgba(91, 35, 51, 0.9);
  }
`;

export const ErrorMessage = styled.span`
  color: #ff4444;
  font-size: 0.85rem;
  margin-top: 0.4rem;
  display: block;
`;

export const SaveButton = styled.button`
  padding: 0.8rem 1.5rem;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.primary},
    ${({ theme }) => theme.colors.accent}
  );
  color: white;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(91, 35, 51, 0.2);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const CancelButton = styled.button`
  padding: 0.8rem 1.5rem;
  background: transparent;
  color: ${({ theme }) => theme.colors.text};
  border: 2px solid ${({ theme }) => theme.colors.glass};
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.glass};
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
  }
`;
