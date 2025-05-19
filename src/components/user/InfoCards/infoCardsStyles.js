import styled from "styled-components";
import { theme } from "../../../styles/theme";

export const InfoCardsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto 60px;
  padding: 0 20px;

  @media (max-width: ${theme.breakpoints.tablet}) {
    justify-content: center;
    gap: 20px;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: center;
  }
`;

export const CardWrapper = styled.div`
  flex: 1;
  min-width: 220px;
  max-width: 280px;
  margin: 0 10px;

  @media (max-width: ${theme.breakpoints.tablet}) {
    flex: 0 0 calc(50% - 20px);
    max-width: calc(50% - 20px);
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    flex: 0 0 100%;
    max-width: 100%;
    margin: 0 0 16px 0;
  }
`;

export const Card = styled.div`
  display: flex;
  align-items: center;
  padding: 16px;
  background-color: ${theme.colors.background};
  border-radius: 12px;
  transition: all ${theme.transitions.default};
  border: 1px solid ${theme.colors.glass};

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 24px rgba(91, 35, 51, 0.15);
    border-color: ${theme.colors.primary}40;
  }
`;

export const IconContainer = styled.div`
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 16px;
  flex-shrink: 0;
`;

export const CardIcon = styled.i`
  font-size: 24px;
  color: ${theme.colors.primary};
`;

export const CardContent = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CardTitle = styled.h3`
  margin: 0 0 4px 0;
  font-size: 18px;
  font-weight: 600;
  color: ${theme.colors.text};

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 16px;
  }
`;

export const CardSubtitle = styled.p`
  margin: 0;
  font-size: 14px;
  color: ${theme.colors.text};
  opacity: 0.7;

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 12px;
  }
`;
