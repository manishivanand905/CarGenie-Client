import React, { useState } from "react";
import {
  SelectWrapper,
  SelectButton,
  DropdownList,
  Option,
} from "./selectStyles";

const Select = ({ options, value, onChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <SelectWrapper>
      <SelectButton onClick={() => setIsOpen(!isOpen)}>
        {value ? value.label : placeholder}
      </SelectButton>
      <DropdownList isOpen={isOpen}>
        {options.map((option) => (
          <Option key={option.value} onClick={() => handleSelect(option)}>
            {option.label}
          </Option>
        ))}
      </DropdownList>
    </SelectWrapper>
  );
};

export default Select;
