import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: ${fadeIn} 0.3s ease;
  backdrop-filter: blur(5px);
`;

export const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  max-width: 400px;
  width: 90%;
  position: relative;
  animation: ${fadeIn} 0.3s ease;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);

  @media (max-width: 480px) {
    width: 95%;
    padding: 1.5rem;
  }
`;

export const ModalTitle = styled.h2`
  color: #5b2333;
  text-align: center;
  margin-bottom: 0.5rem;
  font-size: 1.5rem;
  font-weight: 600;
`;

export const Button = styled.button`
  width: 100%;
  padding: 1rem;
  background: #5b2333;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.3s ease;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 1px;

  &:hover:not(:disabled) {
    background: #723344;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(91, 35, 51, 0.2);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    background: #999;
    cursor: not-allowed;
    transform: none;
  }

  @media (max-width: 768px) {
    padding: 0.875rem;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 2rem;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  padding: 0.5rem;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    font-size: 1.25rem;
    transition: transform 0.3s ease;
  }

  &:hover {
    color: #5b2333;

    svg {
      transform: scale(1.1);
    }
  }
`;
