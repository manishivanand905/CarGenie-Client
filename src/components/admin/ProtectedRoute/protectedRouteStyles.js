import styled, { keyframes } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

export const AuthCheckContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.background} 0%,
    ${({ theme }) => theme.colors.glass} 100%
  );
  animation: ${slideUp} ${({ theme }) => theme.transitions.default};
`;

export const AuthErrorContainer = styled(AuthCheckContainer)`
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.background} 0%,
    ${({ theme }) => theme.colors.glassDark} 100%
  );
`;

export const LoadingIcon = styled(FontAwesomeIcon)`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 1rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 3rem;
  }
`;

export const SecurityIcon = styled(FontAwesomeIcon)`
  font-size: 3rem;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 1rem;
  animation: ${pulse} 2s infinite;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 3.5rem;
  }
`;

export const LoadingText = styled.p`
  font-size: 1.1rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.secondary};
  letter-spacing: 0.5px;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 1.3rem;
  }
`;

export const ErrorText = styled(LoadingText)`
  color: ${({ theme }) => theme.colors.accent};
  font-weight: 600;
`;
