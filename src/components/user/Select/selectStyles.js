import styled from "styled-components";
import { theme } from "../../../styles/theme";

export const SelectWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const SelectButton = styled.button`
  width: 100%;
  padding: 12px;
  background: white;
  border: 1px solid ${theme.colors.glass};
  border-radius: 4px;
  color: ${theme.colors.text};
  text-align: left;
  cursor: pointer;
  transition: all ${theme.transitions.default};

  &:hover {
    border-color: ${theme.colors.primary};
  }
`;

export const DropdownList = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background: white;
  border: 1px solid ${theme.colors.glass};
  border-radius: 4px;
  max-height: 200px;
  overflow-y: auto;
  z-index: 1000;
  display: ${(props) => (props.isOpen ? "block" : "none")};
`;

export const Option = styled.div`
  padding: 10px;
  cursor: pointer;

  &:hover {
    background: ${theme.colors.glass};
  }
`;
