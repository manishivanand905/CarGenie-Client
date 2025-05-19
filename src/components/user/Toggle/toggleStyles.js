import styled from "styled-components";
import { theme } from "../../../styles/theme";

export const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

export const ToggleSwitch = styled.button`
  background: ${(props) =>
    props.active ? theme.colors.primary : theme.colors.glass};
  color: ${(props) => (props.active ? "white" : theme.colors.text)};
  padding: 8px 16px;
  border: none;
  cursor: pointer;
  transition: all ${theme.transitions.default};

  &:first-child {
    border-radius: 4px 0 0 4px;
  }

  &:last-child {
    border-radius: 0 4px 4px 0;
  }
`;
