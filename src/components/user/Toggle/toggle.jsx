import React from "react";
import { ToggleContainer, ToggleSwitch } from "./toggleStyles";

const Toggle = ({ leftLabel, rightLabel, value, onChange }) => (
  <ToggleContainer>
    <ToggleSwitch active={!value} onClick={() => onChange(false)}>
      {leftLabel}
    </ToggleSwitch>
    <ToggleSwitch active={value} onClick={() => onChange(true)}>
      {rightLabel}
    </ToggleSwitch>
  </ToggleContainer>
);

export default Toggle;
