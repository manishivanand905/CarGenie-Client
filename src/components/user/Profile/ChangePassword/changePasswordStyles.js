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
`;

export const ModalContainer = styled.div`
  position: relative;
  background: white;
  border-radius: 20px;
  padding: 2rem;
  width: 90%;
  max-width: 500px;
  animation: ${slideUp} 0.4s ease-out;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 1.5rem;
    width: 95%;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const FormTitle = styled.h2`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.75rem;
  text-align: center;
  margin-bottom: 1rem;

  svg {
    margin-right: 0.5rem;
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const Input = styled.input`
  width: 100%;
  padding: 1rem;
  border: 2px solid ${({ theme }) => theme.colors.glass};
  border-radius: 10px;
  font-size: 1rem;
  transition: all ${({ theme }) => theme.transitions.default};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.glass};
  }
`;

export const TogglePasswordButton = styled.button`
  position: absolute;
  right: 1rem;
  background: none;
  color: ${({ theme }) => theme.colors.secondary};
  transition: color ${({ theme }) => theme.transitions.default};

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const ErrorText = styled.p`
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: -0.5rem;
`;

export const InfoText = styled.p`
  color: ${({ theme }) => theme.colors.secondary};
  font-size: 0.875rem;
  text-align: center;
  line-height: 1.4;
`;

export const SubmitButton = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 1rem;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  transition: all ${({ theme }) => theme.transitions.default};

  &:hover {
    background: ${({ theme }) => theme.colors.secondary};
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
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
  font-size: 1.5rem;
  transition: all ${({ theme }) => theme.transitions.default};

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: white;
    transform: rotate(90deg);
  }
`;
