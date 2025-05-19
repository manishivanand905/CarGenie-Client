import styled, { keyframes } from "styled-components";

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const SpinnerContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.9);
  z-index: 1000;
`;

export const SpinnerElement = styled.div`
  width: 50px;
  height: 50px;
  border: 3px solid #f3f4f6;
  border-radius: 50%;
  border-top: 3px solid #2563eb;
  animation: ${spin} 1s linear infinite;
`;
