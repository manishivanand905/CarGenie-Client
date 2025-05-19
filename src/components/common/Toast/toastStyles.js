import styled, { keyframes } from "styled-components";

const slideIn = keyframes`
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

export const ToastContainer = styled.div`
  position: fixed;
  bottom: 24px;
  right: 24px;
  padding: 16px 24px;
  border-radius: 12px;
  background: ${({ type }) =>
    type === "success"
      ? "linear-gradient(135deg, #059669, #10B981)"
      : type === "error"
      ? "linear-gradient(135deg, #DC2626, #EF4444)"
      : "linear-gradient(135deg, #2563eb, #3b82f6)"};
  color: white;
  font-size: 14px;
  font-weight: 500;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  animation: ${slideIn} 0.3s ease;

  @media (max-width: 768px) {
    bottom: 16px;
    right: 16px;
    left: 16px;
    text-align: center;
  }
`;
