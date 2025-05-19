import styled from "styled-components";
import { theme } from "../../../styles/theme";

export const ChartContainer = styled.div`
  text-align: center;
  padding: 20px;
`;

export const Chart = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
  margin: 0 auto 20px;
`;

export const Circle = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: conic-gradient(
    ${theme.colors.primary} ${(props) => props.principalPercentage}%,
    ${theme.colors.accent} ${(props) => props.principalPercentage}% 100%
  );
`;

export const Center = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60%;
  height: 60%;
  background: white;
  border-radius: 50%;
`;

export const Legend = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 20px;
`;

export const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const ColorBox = styled.div`
  width: 16px;
  height: 16px;
  background: ${(props) => props.color};
  border-radius: 4px;
`;

export const LegendText = styled.div`
  color: ${theme.colors.text};
  display: flex;
  flex-direction: column;
`;

export const Amount = styled.div`
  font-weight: bold;
`;

export const TotalAmount = styled.div`
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid ${theme.colors.glass};
  text-align: center;

  span {
    display: block;
    &:first-child {
      color: ${theme.colors.secondary};
      font-size: 14px;
      margin-bottom: 4px;
    }
    &:last-child {
      color: ${theme.colors.primary};
      font-weight: bold;
      font-size: 18px;
    }
  }
`;

export const Note = styled.p`
  color: ${theme.colors.secondary};
  font-size: 12px;
  margin-top: 12px;
  font-style: italic;
`;
