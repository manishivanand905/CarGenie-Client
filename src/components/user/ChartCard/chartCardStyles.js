import styled from "styled-components";

export const ChartWrapper = styled.div`
  background: white;
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px ${({ theme }) => theme.colors.glass};
  transition: all ${({ theme }) => theme.transitions.default};
`;

export const ChartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

export const ChartTitle = styled.h3`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.2rem;
`;

export const ChartControls = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const ControlButton = styled.button`
  background: ${({ theme }) => theme.colors.glass};
  color: ${({ theme }) => theme.colors.primary};
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all ${({ theme }) => theme.transitions.default};

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: white;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const ExpandedChartContainer = styled.div`
  width: 100%;
  height: 70vh;
  margin: 1rem 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    height: 50vh;
  }
`;
