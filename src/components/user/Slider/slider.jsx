import React from "react";
import { SliderContainer, StyledSlider } from "./sliderStyles";

const Slider = ({ min, max, value, onChange }) => (
  <SliderContainer>
    <StyledSlider
      type="range"
      min={min}
      max={max}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
    />
  </SliderContainer>
);

export default Slider;
