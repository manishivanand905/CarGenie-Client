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

export const NotFoundWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.background};
  padding: 2rem;
`;

export const NotFoundContent = styled.div`
  text-align: center;
  max-width: 600px;
  animation: ${fadeIn} 0.5s ease-out;
`;

export const ErrorCode = styled.h1`
  font-size: 8rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  margin: 0;
  line-height: 1;
  opacity: 0.8;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 6rem;
  }
`;

export const Title = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin: 1rem 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 1.5rem;
  }
`;

export const Description = styled.p`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.8;
  margin-bottom: 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 1rem;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
`;

export const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.default};
  border: 2px solid ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  gap: 0.5rem;

  background-color: ${({ theme, primary }) =>
    primary ? theme.colors.primary : "transparent"};
  color: ${({ theme, primary }) => (primary ? "#fff" : theme.colors.primary)};

  &:hover {
    transform: translateY(-2px);
    background-color: ${({ theme, primary }) =>
      primary ? theme.colors.secondary : theme.colors.glass};
    border-color: ${({ theme, primary }) =>
      primary ? theme.colors.secondary : theme.colors.primary};
  }

  &:active {
    transform: translateY(0);
  }

  svg {
    font-size: 1.1rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 0.6rem 1.2rem;
    font-size: 0.9rem;
  }
`;
