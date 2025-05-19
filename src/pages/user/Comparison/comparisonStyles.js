import styled, { keyframes } from "styled-components";
import { theme } from "../../../styles/theme";

const slideInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const slideInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

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

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const scaleIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.02); }
  100% { transform: scale(1); }
`;

export const ComparisonWrapper = styled.div`
  min-height: 100vh;
  background: ${theme.colors.background};
`;

export const MainContent = styled.main`
  max-width: 1440px;
  margin: 0 auto;
  padding: 2rem;
  animation: ${fadeIn} 0.5s ease-out;

  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: 1rem;
  }
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  margin-bottom: 2rem;
  animation: ${slideUp} 0.7s ease-out;

  @media (max-width: ${theme.breakpoints.tablet}) {
    display: block;
    overflow-x: auto;
    white-space: nowrap;
  }
`;

export const TableHeader = styled.th`
  padding: 1.5rem;
  text-align: left;
  border-bottom: 1px solid ${({ theme }) => theme.colors.glass};
  background: ${({ isFeature }) =>
    isFeature
      ? ({ theme }) => theme.colors.primary
      : ({ theme }) => theme.colors.glass};
  color: ${({ isFeature }) =>
    isFeature ? "white" : ({ theme }) => theme.colors.primary};
  font-size: ${({ isFeature }) => (isFeature ? "1.2rem" : "1.1rem")};
  font-weight: 600;
  animation: ${slideInLeft} 0.5s ease-out;
`;

export const TableCell = styled.td`
  padding: 1.5rem;
  text-align: left;
  border-bottom: 1px solid ${({ theme }) => theme.colors.glass};
  animation: ${fadeIn} 0.5s ease-out;
`;

export const SectionHeader = styled(TableCell)`
  background: ${({ theme }) => `${theme.colors.primary}10`};
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 600;
  font-size: 1.1rem;
  padding: 1rem 1.5rem;
  animation: ${slideInLeft} 0.5s ease-out;

  svg {
    margin-right: 1rem;
    color: ${({ theme }) => theme.colors.accent};
  }
`;

export const MetricContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  animation: ${slideInRight} 0.5s ease-out;
`;

export const MetricValue = styled.span`
  font-weight: 600;
  padding-left: 0.5rem;
  color: ${({ theme, highlight }) =>
    highlight ? theme.colors.accent : theme.colors.primary};
  animation: ${slideUp} 0.5s ease-out;
`;

export const SubText = styled.span`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.secondary};
  opacity: 0.8;
  animation: ${slideUp} 0.6s ease-out;
`;

export const BarContainer = styled.div`
  height: 8px;
  background: ${({ theme }) => theme.colors.glass};
  border-radius: 4px;
  overflow: hidden;
  animation: ${slideInRight} 0.6s ease-out;
`;

export const BarFill = styled.div`
  height: 100%;
  width: ${({ value }) => value}%;
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.primary},
    ${({ theme }) => theme.colors.accent}
  );
  transition: width 0.8s ease-out;
`;

export const Badge = styled.div`
  display: inline-flex;
  align-items: center;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
  animation: ${scaleIn} 0.5s ease-out;

  ${({ fuelType }) => {
    switch (fuelType.toLowerCase()) {
      case "electric":
        return "background: #e8f5e9; color: #2e7d32;";
      case "hybrid":
        return "background: #e3f2fd; color: #1565c0;";
      case "petrol":
        return "background: #fff3e0; color: #ef6c00;";
      default:
        return "";
    }
  }}
`;

export const StarRating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  animation: ${slideInRight} 0.5s ease-out;

  svg {
    color: #d1d1d1;
    font-size: 1.2rem;
    transition: color 0.3s ease;

    &.filled {
      color: #ffd700;
    }

    &.partial {
      position: relative;
      color: #d1d1d1;

      &:before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 50%;
        height: 100%;
        background: #ffd700;
        mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 576 512'%3E%3Cpath d='M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z'/%3E%3C/svg%3E")
          center/contain no-repeat;
        -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 576 512'%3E%3Cpath d='M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z'/%3E%3C/svg%3E")
          center/contain no-repeat;
      }
    }
  }
`;

export const RatingText = styled.span`
  margin-left: 0.5rem;
  color: ${({ theme }) => theme.colors.secondary};
  font-weight: 500;
  animation: ${slideInRight} 0.6s ease-out;
`;

export const AirbagCount = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  animation: ${slideInRight} 0.5s ease-out;
`;

export const AirbagBadge = styled.div`
  background: ${({ theme }) => theme.colors.glass};
  color: ${({ theme }) => theme.colors.secondary};
  padding: 0.4rem 0.8rem;
  border-radius: 12px;
  font-size: 0.85rem;
  font-weight: 500;
  transition: all 0.3s ease;
  animation: ${slideInRight} 0.6s ease-out;

  &:hover {
    background: ${({ theme }) => theme.colors.primary}10;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const DimensionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  animation: ${slideUp} 0.5s ease-out;

  div {
    padding: 0.5rem;
    background: ${({ theme }) => theme.colors.glass};
    border-radius: 8px;
    transition: all 0.3s ease;

    &:hover {
      background: white;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
  }
`;

export const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 0.8rem;
  padding: 0.5rem;
  animation: ${slideUp} 0.5s ease-out;
`;

export const FeatureTag = styled.div`
  padding: 0.8rem 1rem;
  background: ${({ theme }) => theme.colors.glass};
  border-radius: 10px;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.primary};
  transition: all 0.3s ease;
  text-align: center;
  animation: ${slideUp} 0.5s ease-out;
  animation-delay: ${({ index }) => index * 0.1}s;
  animation-fill-mode: both;

  &:hover {
    background: white;
    box-shadow: 0 4px 12px rgba(91, 35, 51, 0.1);
    transform: translateY(-2px);
  }
`;

export const ProConSection = styled.div`
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin: 2rem 0;
  animation: ${slideUp} 0.5s ease-out;

  .pro-con-card {
    background: white;
    border-radius: 20px;
    padding: 2rem;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
    animation: ${scaleIn} 0.5s ease-out;

    h5 {
      color: ${({ theme }) => theme.colors.primary};
      font-size: 1.2rem;
      margin-bottom: 1.5rem;
      text-align: center;
      animation: ${slideUp} 0.6s ease-out;
    }

    .lists {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2rem;

      @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        grid-template-columns: 1fr;
        gap: 1rem;
      }
    }

    .pros,
    .cons {
      h6 {
        color: ${({ theme }) => theme.colors.secondary};
        font-size: 1rem;
        margin-bottom: 1rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        animation: ${slideInLeft} 0.5s ease-out;
      }

      ul {
        list-style: none;
        padding: 0;
        margin: 0;

        li {
          display: flex;
          align-items: flex-start;
          gap: 0.8rem;
          padding: 0.8rem;
          background: ${({ theme }) => theme.colors.glass};
          border-radius: 10px;
          margin-bottom: 0.8rem;
          font-size: 0.9rem;
          color: ${({ theme }) => theme.colors.primary};
          animation: ${slideInRight} 0.5s ease-out;
          animation-delay: ${({ index }) => index * 0.1}s;
          animation-fill-mode: both;
          transition: all 0.3s ease;

          &:hover {
            transform: translateX(5px);
            background: white;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
          }

          svg {
            color: #2ecc71;
            margin-top: 2px;

            &.con {
              color: #e74c3c;
            }
          }
        }
      }
    }
  }
`;

export const CompareButton = styled.button`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 3rem auto;
  padding: 1.2rem 2.5rem;
  background: linear-gradient(
    45deg,
    ${({ theme }) => theme.colors.primary},
    ${({ theme }) => theme.colors.accent}
  );
  color: white;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 500;
  transition: all 0.3s ease;
  animation: ${slideUp} 0.7s ease-out;
  position: relative;
  overflow: hidden;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to right,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: 0.5s;
  }

  svg {
    transition: transform 0.3s ease;
  }

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px ${({ theme }) => `${theme.colors.primary}40`};

    &:before {
      left: 100%;
    }

    svg {
      transform: translateX(5px);
    }
  }

  &:active {
    transform: translateY(-1px);
  }
`;

export const SubSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  animation: ${slideUp} 0.5s ease-out;
`;

export const LoadingPlaceholder = styled.div`
  background: ${({ theme }) => theme.colors.glass};
  height: ${({ height }) => height || "20px"};
  width: ${({ width }) => width || "100%"};
  border-radius: 8px;
  animation: ${pulse} 1.5s infinite;
`;

export const ErrorMessage = styled.div`
  color: #e74c3c;
  padding: 1rem;
  background: #ffd5d5;
  border-radius: 10px;
  margin: 1rem 0;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  animation: ${slideInRight} 0.5s ease-out;

  svg {
    color: #e74c3c;
  }
`;
