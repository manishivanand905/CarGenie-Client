import styled, { keyframes } from "styled-components";
import { theme } from "../../../styles/theme";

const pulseAnimation = keyframes`
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(91, 35, 51, 0.4);
  }
  
  70% {
    transform: scale(1.05);
    box-shadow: 0 0 0 10px rgba(91, 35, 51, 0);
  }
  
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(91, 35, 51, 0);
  }
`;

const fadeInAnimation = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const ScrollToTopWrapper = styled.div`
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 999;
  display: ${({ isVisible }) => (isVisible ? "block" : "none")};
  animation: ${fadeInAnimation} 0.5s ease-in-out;

  @media (max-width: ${theme.breakpoints.mobile}) {
    bottom: 20px;
    right: 20px;
  }
`;

export const ScrollButton = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: ${theme.colors.glassDark};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  transition: ${theme.transitions.default};
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px 0 rgba(91, 35, 51, 0.2);
  animation: ${pulseAnimation} 2s infinite;

  &:hover {
    background: ${theme.colors.primary};
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(91, 35, 51, 0.3);
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    width: 40px;
    height: 40px;
    font-size: 1rem;
  }
`;
