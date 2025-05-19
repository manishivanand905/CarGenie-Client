import styled, { keyframes, css } from "styled-components";
import { theme } from "../../../styles/theme";

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideUp = keyframes`
  from { transform: translateY(30px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
  100% { transform: translateY(0px); }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(91, 35, 51, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
  animation: ${fadeIn} 0.3s ease-in-out;
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  backdrop-filter: blur(3px);

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const ModalContainer = styled.div`
  background-color: ${theme.colors.background};
  border-radius: 12px;
  width: 100%;
  max-width: 800px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 10px 25px ${theme.colors.glassDark};
  animation: ${slideUp} 0.4s ease-in-out;
  position: relative;
  transition: transform ${theme.transitions.default},
    box-shadow ${theme.transitions.default};

  &:hover {
    box-shadow: 0 12px 30px ${theme.colors.glassDark};
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    max-height: 95vh;
    border-radius: 8px;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    max-height: 100vh;
    height: 100%;
    border-radius: 0;
    margin: 0;
  }
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid ${theme.colors.glass};
  background-color: white;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 1rem;
    border-radius: 0;
  }
`;

export const ModalTitle = styled.h3`
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${theme.colors.primary};

  svg {
    color: ${theme.colors.accent};
    transition: transform ${theme.transitions.default};
  }

  &:hover svg {
    transform: scale(1.15);
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 1.1rem;
  }
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.25rem;
  cursor: pointer;
  color: ${theme.colors.accent};
  transition: all ${theme.transitions.default};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;

  &:hover:not(:disabled) {
    color: ${theme.colors.primary};
    background-color: ${theme.colors.glass};
    transform: rotate(90deg);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${theme.colors.glassDark};
  }
`;

export const ModalBody = styled.div`
  padding: 1.5rem;
  overflow-y: auto;
  max-height: calc(90vh - 140px);
  background-color: white;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 1rem;
    max-height: calc(100vh - 130px);
  }
`;

export const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 1.25rem 1.5rem;
  border-top: 1px solid ${theme.colors.glass};
  gap: 1rem;
  background-color: white;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 1rem;
    gap: 0.75rem;
    position: sticky;
    bottom: 0;
    border-radius: 0;
  }
`;

export const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all ${theme.transitions.default};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 0.625rem 1.25rem;
    font-size: 0.9rem;
  }
`;

export const CancelButton = styled(Button)`
  background-color: ${theme.colors.glass};
  color: ${theme.colors.text};
  border: none;

  &:hover:not(:disabled) {
    background-color: ${theme.colors.glassDark};
    transform: translateY(-2px);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
  }
`;

export const SubmitButton = styled(Button)`
  background-color: ${theme.colors.primary};
  color: white;
  border: none;
  min-width: 140px;
  position: relative;
  overflow: hidden;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to right,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: all 0.5s;
  }

  &:hover:not(:disabled) {
    background-color: ${theme.colors.secondary};
    transform: translateY(-2px);
    box-shadow: 0 4px 12px ${theme.colors.glassDark};

    &:before {
      left: 100%;
    }
  }

  &:active:not(:disabled) {
    transform: translateY(0);
    box-shadow: none;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px ${theme.colors.glassDark};
  }

  &:disabled {
    background-color: ${theme.colors.glassDark};
  }
`;

export const CurrentImagesContainer = styled.div`
  margin-bottom: 1.5rem;
  animation: ${fadeIn} 0.4s ease-in-out;
`;

export const CurrentImagesTitle = styled.h4`
  margin: 0 0 1rem 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: ${theme.colors.primary};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  position: relative;
  padding-left: 0.5rem;

  &:before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 3px;
    background-color: ${theme.colors.accent};
    border-radius: 2px;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 1rem;
  }
`;

export const CurrentImagesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;

  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

export const CurrentImageItem = styled.div`
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 3px 6px ${theme.colors.glass};
  transition: all ${theme.transitions.default};

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 12px ${theme.colors.glassDark};
  }
`;

export const DeleteImageButton = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background-color: rgba(91, 35, 51, 0.8);
  color: white;
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all ${theme.transitions.default};
  opacity: 0;

  ${CurrentImageItem}:hover & {
    opacity: 1;
  }

  &:hover {
    background-color: #f44336;
    transform: scale(1.1);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const NoImagesMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background-color: white;
  border-radius: 8px;
  border: 2px dashed ${theme.colors.glass};
  color: ${theme.colors.accent};
  transition: all ${theme.transitions.default};

  &:hover {
    border-color: ${theme.colors.accent};
    box-shadow: 0 4px 8px ${theme.colors.glass};
  }

  svg {
    font-size: 2rem;
    margin-bottom: 0.5rem;
    opacity: 0.8;
    animation: ${float} 2s ease-in-out infinite;
  }
`;

export const UploadContainer = styled.div`
  margin-top: 2rem;
  animation: ${fadeIn} 0.4s ease-in-out;
`;

export const UploadArea = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2.5rem 1.5rem;
  border: 2px dashed
    ${(props) => (props.isDragging ? theme.colors.accent : theme.colors.glass)};
  border-radius: 8px;
  background-color: ${(props) =>
    props.isDragging ? theme.colors.glass : "white"};
  transition: all ${theme.transitions.default};
  cursor: ${(props) => (props.isUploading ? "default" : "pointer")};
  margin-bottom: 1rem;

  ${(props) =>
    props.isDragging &&
    css`
      transform: scale(1.01);
    `}

  &:hover:not([disabled]) {
    border-color: ${(props) =>
      props.isUploading ? theme.colors.glass : theme.colors.accent};
    background-color: ${(props) =>
      props.isUploading ? "white" : theme.colors.glass};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 1.5rem 1rem;
  }
`;

export const DropActiveOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${theme.colors.glass};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.primary};
  font-weight: 500;
  animation: ${pulse} 1s infinite;

  svg {
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }
`;

export const UploadIcon = styled.div`
  font-size: 2rem;
  color: ${theme.colors.accent};
  margin-bottom: 1rem;
  animation: ${float} 2s ease-in-out infinite;

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }
`;

export const UploadText = styled.div`
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  color: ${theme.colors.text};
  text-align: center;

  span {
    color: ${theme.colors.primary};
    font-weight: 500;
    text-decoration: underline;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 1rem;
  }
`;

export const UploadInstructions = styled.div`
  font-size: 0.85rem;
  color: ${theme.colors.accent};
  margin-bottom: 0.5rem;
  text-align: center;

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 0.8rem;
  }
`;

export const UploadRequirements = styled.div`
  font-size: 0.85rem;
  color: ${theme.colors.accent};
  text-align: center;

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 0.8rem;
  }
`;

export const UploadInput = styled.input`
  display: none;
`;

export const PreviewsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 1.5rem;
`;

export const PreviewItem = styled.div`
  display: flex;
  align-items: center;
  background-color: white;
  border-radius: 8px;
  padding: 0.75rem;
  border: 1px solid ${theme.colors.glass};
  transition: all ${theme.transitions.default};

  &:hover {
    border-color: ${theme.colors.accent};
    box-shadow: 0 4px 8px ${theme.colors.glass};
    transform: translateY(-2px);
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
`;

export const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  aspect-ratio: 16/9;
  border-radius: 6px;
  transition: transform ${theme.transitions.default};

  &:hover {
    transform: scale(1.02);
  }
`;

export const PreviewInfo = styled.div`
  flex: 1;
  margin-left: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  span:last-child {
    font-size: 0.85rem;
    color: ${theme.colors.accent};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    margin-left: 0;
    width: 100%;
  }
`;

export const PreviewName = styled.span`
  font-weight: 500;
  color: ${theme.colors.text};
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 250px;

  @media (max-width: ${theme.breakpoints.mobile}) {
    max-width: 100%;
  }
`;

export const RemovePreviewButton = styled.button`
  background-color: ${theme.colors.glass};
  color: ${theme.colors.text};
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all ${theme.transitions.default};
  margin-left: 0.5rem;

  &:hover:not(:disabled) {
    background-color: #ffebee;
    color: #f44336;
    transform: scale(1.1);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    align-self: flex-end;
    margin-top: -2.5rem;
    margin-left: 0;
    margin-right: 0.5rem;
    background-color: rgba(255, 255, 255, 0.8);
  }
`;

export const UploadProgress = styled.div`
  margin-top: 1rem;
`;

export const ProgressBar = styled.div`
  height: 8px;
  background-color: ${theme.colors.glass};
  border-radius: 4px;
  overflow: hidden;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: ${(props) => props.progress}%;
    background-color: ${theme.colors.primary};
    transition: width 0.3s ease;
  }
`;

export const ProgressText = styled.div`
  font-size: 0.85rem;
  color: ${theme.colors.accent};
  margin-top: 0.5rem;
  text-align: center;
`;

export const ErrorMessage = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background-color: #ffebee;
  border-left: 4px solid #f44336;
  border-radius: 4px;
  color: #d32f2f;
  margin-top: 0.75rem;
  animation: ${fadeIn} 0.3s ease-in-out;
  font-size: 0.9rem;

  svg {
    color: #f44336;
    font-size: 1rem;
  }
`;

export const LimitWarning = styled.div`
  font-size: 0.9rem;
  color: ${theme.colors.accent};
  margin-top: 0.75rem;
  padding: 0.5rem;
  text-align: center;
  background-color: ${theme.colors.glass};
  border-radius: 4px;
  animation: ${fadeIn} 0.3s ease-in-out;

  span {
    font-weight: 500;
    color: ${theme.colors.primary};
  }
`;
