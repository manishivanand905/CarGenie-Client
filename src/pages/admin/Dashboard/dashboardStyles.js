import styled, { css, keyframes } from "styled-components";
import { theme } from "../../../styles/theme";

const fadeIn = keyframes`
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
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

export const DashboardWrapper = styled.div`
  flex: 1;
  padding: 2rem;
  animation: ${fadeIn} 0.5s ease-in-out;

  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: 1rem;
  }
`;

export const ContentHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;

  @media (max-width: ${theme.breakpoints.tablet}) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

export const HeaderTitle = styled.div`
  h1 {
    margin-bottom: 0.5rem;
    color: ${theme.colors.primary};
    font-size: 1.75rem;
  }

  p {
    color: ${theme.colors.secondary};
  }
`;

export const HeaderControls = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;

  @media (max-width: ${theme.breakpoints.tablet}) {
    width: 100%;
    justify-content: flex-end;
  }
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  margin-bottom: 2rem;

  @media (max-width: ${theme.breakpoints.desktop}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

export const StatItem = styled.div`
  background: linear-gradient(135deg, white, #f9f9f9);
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: transform ${theme.transitions.default},
    box-shadow ${theme.transitions.default};
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(
      to right,
      ${theme.colors.primary},
      ${theme.colors.secondary}
    );
    border-radius: 4px 4px 0 0;
  }

  svg {
    font-size: 2rem;
    color: ${theme.colors.primary};
    margin-bottom: 1rem;
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);

    svg {
      animation: ${pulse} 1s ease-in-out;
    }
  }
`;

export const StatValue = styled.h3`
  font-size: 1.75rem;
  font-weight: 600;
  color: ${theme.colors.primary};
  margin-bottom: 0.25rem;
`;

export const StatLabel = styled.p`
  color: ${theme.colors.secondary};
  font-size: 0.9rem;
`;

export const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-areas:
    "cars cars"
    "brands users"
    "growth growth";
  gap: 1.5rem;

  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    grid-template-areas:
      "cars"
      "brands"
      "users"
      "growth";
  }
`;

export const Card = styled.section`
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  transition: transform ${theme.transitions.default},
    box-shadow ${theme.transitions.default};
  grid-area: ${({ gridArea }) => gridArea};
  animation: ${fadeIn} 0.5s ease-in-out;
  position: relative;

  &:hover {
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  }
`;

export const CardHeader = styled.div`
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  h2 {
    font-size: 1.25rem;
    color: ${theme.colors.primary};
  }
`;

export const CardContent = styled.div`
  padding: 1.5rem;
`;

export const TableWrapper = styled.div`
  overflow-x: auto;
`;

export const CarTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const TableHeader = styled.th`
  text-align: left;
  padding: 0.75rem 1rem;
  color: ${theme.colors.primary};
  font-weight: 600;
  border-bottom: 2px solid #eee;
  white-space: nowrap;
`;

export const TableRow = styled.tr`
  border-bottom: 1px solid #eee;
  transition: background-color ${theme.transitions.default};

  &:hover {
    background-color: #f9f9f9;
  }
`;

export const TableCell = styled.td`
  padding: 0.75rem 1rem;
  white-space: nowrap;
`;

export const ActionButtonsWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const ActionButton = styled.button`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all ${theme.transitions.default};

  ${({ primary }) =>
    primary
      ? css`
          background-color: ${theme.colors.glass};
          color: ${theme.colors.primary};

          &:hover {
            background-color: ${theme.colors.primary};
            color: white;
          }
        `
      : css`
          background-color: #f8f8f8;
          color: #666;

          &:hover {
            background-color: #ffdbdb;
            color: #d32f2f;
          }
        `}
`;

export const AddButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  background-color: ${theme.colors.primary};
  color: white;
  border-radius: 30px;
  font-weight: 500;
  transition: background-color ${theme.transitions.default},
    transform ${theme.transitions.default};
  white-space: nowrap;

  &:hover {
    background-color: ${theme.colors.secondary};
    transform: translateY(-2px);
  }
`;

export const TableActionsBar = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const DownloadButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: #f5f5f5;
  border-radius: 30px;
  font-size: 0.9rem;
  transition: background-color ${theme.transitions.default};

  &:hover {
    background-color: #e9e9e9;
  }

  svg {
    font-size: 0.8rem;
  }
`;

export const PaginationControls = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 1.5rem;

  button {
    padding: 0.5rem 1rem;
    background-color: white;
    border: 1px solid #ddd;
    border-radius: 4px;
    transition: all ${theme.transitions.default};

    &:hover:not(:disabled) {
      background-color: ${theme.colors.glass};
      border-color: ${theme.colors.primary};
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  span {
    font-size: 0.9rem;
    color: #666;
  }
`;

export const BrandGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;

  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

export const BrandCard = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border-radius: 8px;
  background-color: #f9f9f9;
  transition: transform ${theme.transitions.default},
    box-shadow ${theme.transitions.default};

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
  }
`;

export const BrandLogo = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(
    135deg,
    ${theme.colors.primary},
    ${theme.colors.secondary}
  );
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 600;
`;

export const BrandInfo = styled.div`
  h3 {
    font-size: 1rem;
    margin-bottom: 0.25rem;
    color: ${theme.colors.primary};
  }

  p {
    font-size: 0.9rem;
    color: #666;
  }
`;

export const UserGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;

  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

export const UserCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-radius: 8px;
  background-color: #f9f9f9;
  transition: transform ${theme.transitions.default},
    box-shadow ${theme.transitions.default};

  .user-info {
    h3 {
      font-size: 1rem;
      margin-bottom: 0.25rem;
      color: ${theme.colors.primary};
    }

    p {
      font-size: 0.8rem;
      color: #666;
      margin-bottom: 0.25rem;
    }

    .car-count {
      font-size: 0.75rem;
      color: #666;
      display: block;
    }
  }

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
  }
`;

export const GrowthSection = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;

  .growth-highlights {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;

    .highlight {
      background-color: #f9f9f9;
      padding: 1rem;
      border-radius: 8px;

      h4 {
        color: ${theme.colors.primary};
        margin-bottom: 0.5rem;
        font-size: 1rem;
      }

      p {
        color: #2e7d32;
        font-weight: 500;
        font-size: 0.9rem;
      }
    }

    @media (max-width: ${theme.breakpoints.mobile}) {
      grid-template-columns: 1fr;
    }
  }
`;

export const ChartContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

  .chart-placeholder {
    height: 250px;
    position: relative;
    display: flex;
    flex-direction: column;

    .chart-bars {
      flex: 1;
      display: flex;
      align-items: flex-end;
      justify-content: space-around;
      padding-bottom: 30px;
      height: 200px;

      .chart-bar-group {
        display: flex;
        flex-direction: row;
        align-items: flex-end;
        justify-content: center;
        position: relative;
        height: 100%;
        width: 100%;

        .chart-bar {
          width: 20px;
          border-radius: 4px 4px 0 0;
          position: relative;
          transition: height 0.5s ease-in-out;

          &::after {
            content: attr(data-value);
            position: absolute;
            top: -20px;
            left: 50%;
            transform: translateX(-50%);
            font-size: 0.7rem;
            white-space: nowrap;
            color: #666;
          }

          &.users {
            background: linear-gradient(
              to top,
              ${theme.colors.primary},
              ${theme.colors.secondary}
            );
            margin-right: 5px;
          }

          &.listings {
            background: linear-gradient(to top, #4e8bd0, #6fa5e0);
          }
        }

        .period-label {
          position: absolute;
          bottom: -25px;
          font-size: 0.8rem;
          color: #666;
        }
      }
    }

    .chart-legend {
      display: flex;
      justify-content: center;
      gap: 2rem;
      margin-top: 1rem;

      .legend-item {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 0.8rem;

        .legend-color {
          width: 12px;
          height: 12px;
          border-radius: 2px;

          &.users {
            background: linear-gradient(
              to right,
              ${theme.colors.primary},
              ${theme.colors.secondary}
            );
          }

          &.listings {
            background: linear-gradient(to right, #4e8bd0, #6fa5e0);
          }
        }
      }
    }
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    .chart-placeholder {
      height: 200px;

      .chart-bars {
        height: 150px;
      }
    }
  }
`;
