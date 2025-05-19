import styled from "styled-components";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background: white;
  border-radius: 15px;
  padding: 25px;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  animation: slideIn 0.3s ease-out;

  @keyframes slideIn {
    from {
      transform: translateY(-20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.glass};

  h2 {
    margin: 0;
    color: ${({ theme }) => theme.colors.primary};
  }

  button {
    background: none;
    border: none;
    font-size: 1.2rem;
    color: ${({ theme }) => theme.colors.secondary};
    cursor: pointer;
    transition: ${({ theme }) => theme.transitions.default};

    &:hover {
      color: ${({ theme }) => theme.colors.primary};
      transform: rotate(90deg);
    }
  }
`;

export const ModalForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  label {
    font-weight: 500;
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const Input = styled.input`
  padding: 10px 15px;
  border: 2px solid ${({ theme }) => theme.colors.glass};
  border-radius: 8px;
  font-size: 1rem;
  transition: ${({ theme }) => theme.transitions.default};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }

  &[type="file"] {
    padding: 8px;
  }
`;

export const TextArea = styled.textarea`
  padding: 10px 15px;
  border: 2px solid ${({ theme }) => theme.colors.glass};
  border-radius: 8px;
  font-size: 1rem;
  resize: vertical;
  min-height: 100px;
  transition: ${({ theme }) => theme.transitions.default};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const Button = styled.button`
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.default};

  ${({ primary, theme }) =>
    primary
      ? `
    background: ${theme.colors.primary};
    color: white;
    
    &:hover {
      background: ${theme.colors.secondary};
      transform: translateY(-2px);
    }
  `
      : `
    background: ${theme.colors.glass};
    color: ${theme.colors.text};
    
    &:hover {
      background: ${theme.colors.glassDark};
    }
  `}
`;

export const ErrorMessage = styled.span`
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: 4px;
`;
