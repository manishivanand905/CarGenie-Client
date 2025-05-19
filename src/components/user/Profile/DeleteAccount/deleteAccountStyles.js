import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideUp = keyframes`
  from { transform: translateY(50px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const shake = keyframes`
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
  20%, 40%, 60%, 80% { transform: translateX(5px); }
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
`;

export const ModalContainer = styled.div`
  position: relative;
  background: white;
  border-radius: 20px;
  padding: 2rem;
  width: 90%;
  max-width: 600px;
  animation: ${slideUp} 0.4s ease-out;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 1.5rem;
    width: 95%;
  }
`;

export const Title = styled.h2`
  color: #dc3545;
  font-size: 1.75rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid ${({ theme }) => theme.colors.glass};
`;

export const WarningIcon = styled.span`
  color: #dc3545;
  font-size: 1.5em;
  animation: ${shake} 1s ease-in-out;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  p {
    color: ${({ theme }) => theme.colors.text};
    line-height: 1.6;
    font-size: 1.1rem;
    margin-bottom: 1rem;
  }
`;

export const CheckboxContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  margin-bottom: 1rem;
`;

export const StyledCheckbox = styled.input`
  width: 20px;
  height: 20px;
  margin-top: 0.25rem;
  accent-color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
`;

export const CheckboxLabel = styled.label`
  color: ${({ theme }) => theme.colors.text};
  font-size: 1rem;
  line-height: 1.5;
  cursor: pointer;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
  }
`;

export const CancelButton = styled.button`
  flex: 1;
  padding: 1rem;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  background: ${({ theme }) => theme.colors.glass};
  color: ${({ theme }) => theme.colors.primary};
  transition: all ${({ theme }) => theme.transitions.default};

  &:hover {
    background: ${({ theme }) => theme.colors.glassDark};
  }
`;

export const DeleteButton = styled.button`
  flex: 1;
  padding: 1rem;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  background: #dc3545;
  color: white;
  transition: all ${({ theme }) => theme.transitions.default};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover {
    background: #c82333;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const PasswordInput = styled.input`
  width: 100%;
  padding: 1rem;
  border: 2px solid ${({ theme }) => theme.colors.glass};
  border-radius: 10px;
  font-size: 1rem;
  margin-top: 1rem;
  transition: all ${({ theme }) => theme.transitions.default};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.glass};
  }
`;

export const ErrorText = styled.p`
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: 0.5rem;
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
  font-size: 1.5rem;
  transition: all ${({ theme }) => theme.transitions.default};

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: white;
    transform: rotate(90deg);
  }
`;
