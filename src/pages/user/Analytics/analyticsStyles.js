import styled, { keyframes } from "styled-components";

export const AnalyticsContainer = styled.div`
  padding: 1rem;
  max-width: 1440px;
  margin: 0 auto;
`;

export const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  margin-bottom: 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
  }
`;

export const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1.5rem;
  margin-bottom: 1.5rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

export const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: stretch;
    gap: 0.5rem;
  }
`;

export const FilterSelect = styled.select`
  padding: 0.75rem 1rem;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.glass};
  color: ${({ theme }) => theme.colors.primary};
  border: 1px solid ${({ theme }) => theme.colors.glass};
  font-size: 1rem;
  cursor: pointer;
  min-width: 150px;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const DateInputsWrapper = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  flex: 1;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

export const DateInput = styled.input`
  padding: 0.75rem 1rem;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.glass};
  color: ${({ theme }) => theme.colors.primary};
  border: 1px solid ${({ theme }) => theme.colors.glass};
  font-size: 1rem;
  width: 100%;
  max-width: 160px;

  &:hover,
  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    outline: none;
  }

  &::-webkit-calendar-picker-indicator {
    cursor: pointer;
    filter: invert(0.5);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    max-width: 100%;
  }
`;

export const ApplyButton = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  font-size: 1rem;
  transition: all ${({ theme }) => theme.transitions.default};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px ${({ theme }) => theme.colors.glass};
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const LoadingSpinner = styled.div`
  width: 50px;
  height: 50px;
  border: 4px solid ${({ theme }) => theme.colors.glass};
  border-top: 4px solid ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  margin: 2rem auto;
`;

// Add NoDataMessage component
export const NoDataMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 300px;
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.glass};
  border-radius: 8px;
  padding: 1rem;
  text-align: center;
  font-size: 1rem;
  opacity: 0.8;
`;
