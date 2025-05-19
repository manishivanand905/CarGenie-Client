import styled, { keyframes } from "styled-components";

const countUp = keyframes`
  from {
    transform: translateY(10px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

export const CardWrapper = styled.div`
  background: ${({ theme }) => theme.colors.glass};
  padding: 1.5rem;
  border-radius: 12px;
  transition: all ${({ theme }) => theme.transitions.default};
  position: relative;
  overflow: hidden;
  animation: ${countUp} 0.5s ease-out forwards;
  animation-delay: ${({ delay }) => delay || "0s"};

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${({ theme }) => theme.colors.glassDark};
    opacity: 0;
    transition: opacity ${({ theme }) => theme.transitions.default};
  }

  &:hover {
    transform: translateY(-5px) scale(1.02);
    box-shadow: 0 8px 24px rgba(91, 35, 51, 0.15);

    &:before {
      opacity: 0.1;
    }

    .icon {
      transform: scale(1.1) rotate(5deg);
    }
  }
`;

export const IconWrapper = styled.div`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.5rem;
  margin-bottom: 1rem;
  transition: transform ${({ theme }) => theme.transitions.default};
`;

export const Title = styled.h3`
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.secondary};
`;

export const Value = styled.div`
  font-size: 2rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.accent};
  transition: color ${({ theme }) => theme.transitions.default};
`;
