import styled from "styled-components";
import { theme } from "../../../styles/theme";

export const SliderContainer = styled.div`
  width: 100%;
  padding: 10px 0;
`;

export const StyledSlider = styled.input`
  width: 100%;
  height: 4px;
  background: ${theme.colors.glass};
  border-radius: 2px;
  outline: none;

  &::-webkit-slider-thumb {
    appearance: none;
    width: 20px;
    height: 20px;
    background: ${theme.colors.primary};
    border-radius: 50%;
    cursor: pointer;
    transition: all ${theme.transitions.default};

    &:hover {
      transform: scale(1.1);
    }
  }
`;
