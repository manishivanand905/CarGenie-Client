import styled from "styled-components";
import { theme } from "../../../styles/theme";

export const TableContainer = styled.div`
  overflow-x: auto;
  margin-top: 20px;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
`;

export const Th = styled.th`
  background: ${theme.colors.glass};
  color: ${theme.colors.text};
  padding: 12px;
  text-align: left;
  font-weight: 600;
  border-bottom: 2px solid ${theme.colors.glassDark};

  &:not(:first-child) {
    text-align: right;
  }
`;

export const Td = styled.td`
  padding: 12px;
  border-bottom: 1px solid ${theme.colors.glass};
  color: ${theme.colors.text};

  &:not(:first-child) {
    text-align: right;
  }
`;

export const Tr = styled.tr`
  &:hover {
    background: ${theme.colors.glass};
  }
`;
