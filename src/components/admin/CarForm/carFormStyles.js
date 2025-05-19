import styled, { keyframes } from "styled-components";
import { theme } from "../../../styles/theme";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideIn = keyframes`
  from {
    transform: translateX(-50%) translateY(-30%);
    opacity: 0;
  }
  to {
    transform: translateX(-50%) translateY(-50%);
    opacity: 1;
  }
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(91, 35, 51, 0.7);
  }
  
  70% {
    transform: scale(1.05);
    box-shadow: 0 0 0 10px rgba(91, 35, 51, 0);
  }
  
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(91, 35, 51, 0);
  }
`;

const slideRight = keyframes`
  from {
    transform: translateX(-20px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
  animation: ${fadeIn} 0.3s ease-in-out;
`;

export const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  border-radius: 12px;
  padding: 2rem;
  width: 90%;
  max-width: 700px;
  max-height: 90vh;
  overflow-y: auto;
  z-index: 1001;
  box-shadow: 0 15px 40px rgba(91, 35, 51, 0.25);
  animation: ${slideIn} 0.3s ease-in-out;
  scrollbar-width: none; /* Firefox */

  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Edge */
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    width: 95%;
    padding: 1.5rem 1rem;
    max-height: 85vh;
  }
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid ${theme.colors.glass};
  padding-bottom: 1rem;
`;

export const ModalTitle = styled.h2`
  color: ${theme.colors.primary};
  font-size: 1.5rem;
  font-weight: 600;
`;

export const CloseButton = styled.button`
  background: none;
  font-size: 1.5rem;
  color: ${theme.colors.primary};
  cursor: pointer;
  transition: all ${theme.transitions.default};

  &:hover {
    color: ${theme.colors.secondary};
    transform: rotate(90deg);
  }
`;

export const TabContainer = styled.div`
  display: flex;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid ${theme.colors.glass};
  overflow-x: auto;
  scrollbar-width: none; /* Firefox */

  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Edge */
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    padding-bottom: 0.25rem;
  }
`;

export const TabButton = styled.button`
  padding: 0.75rem 1rem;
  background: none;
  color: ${(props) =>
    props.active ? theme.colors.primary : theme.colors.glassDark};
  border-bottom: 2px solid
    ${(props) => (props.active ? theme.colors.primary : "transparent")};
  font-weight: ${(props) => (props.active ? "600" : "400")};
  white-space: nowrap;
  transition: all ${theme.transitions.default};

  &:hover {
    color: ${theme.colors.primary};
  }
`;

export const TabContent = styled.div`
  display: ${(props) => (props.active ? "block" : "none")};
  animation: ${(props) => (props.active ? slideRight : "none")} 0.3s ease-in-out;
`;

export const FormGroup = styled.div`
  margin-bottom: 1.5rem;
  position: relative;
  flex: 1;

  span {
    color: #e74c3c;
    font-size: 0.85rem;
    margin-top: 0.3rem;
    display: block;
    animation: ${fadeIn} 0.3s ease-in-out;
  }
`;

export const FormRow = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 0.5rem;

  @media (max-width: ${theme.breakpoints.tablet}) {
    flex-direction: column;
    gap: 0;
  }
`;

export const DimensionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-bottom: 1rem;

  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: ${theme.colors.primary};
  font-weight: 500;
`;

export const FormHint = styled.p`
  color: ${theme.colors.accent};
  font-size: 0.75rem;
  margin-top: 0.3rem;
  font-style: italic;
`;

export const FieldIcon = styled.div`
  position: relative;

  svg {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    color: ${theme.colors.primary};
    font-size: 1rem;
    z-index: 1;
  }

  input,
  select {
    padding-left: 35px;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid
    ${(props) => (props.error ? "#e74c3c" : theme.colors.glassDark)};
  border-radius: 8px;
  font-family: "Poppins", sans-serif;
  background-color: white;
  transition: all ${theme.transitions.default};
  color: ${theme.colors.text};

  &:focus {
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 2px ${theme.colors.glass};
    outline: none;
  }

  &:hover:not(:focus) {
    border-color: ${theme.colors.secondary};
  }

  &[type="file"] {
    padding: 8px;
    background: ${theme.colors.glass};
    cursor: pointer;
  }

  &:disabled {
    background-color: ${theme.colors.glass};
    cursor: not-allowed;
  }
`;

export const SelectInput = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid
    ${(props) => (props.error ? "#e74c3c" : theme.colors.glassDark)};
  border-radius: 8px;
  font-family: "Poppins", sans-serif;
  background-color: white;
  transition: all ${theme.transitions.default};
  color: ${theme.colors.text};
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%235b2333' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 16px;
  padding-right: 35px;

  &:focus {
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 2px ${theme.colors.glass};
    outline: none;
  }

  &:hover:not(:focus) {
    border-color: ${theme.colors.secondary};
  }

  &:disabled {
    background-color: ${theme.colors.glass};
    cursor: not-allowed;
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid
    ${(props) => (props.error ? "#e74c3c" : theme.colors.glassDark)};
  border-radius: 8px;
  font-family: "Poppins", sans-serif;
  resize: vertical;
  min-height: 100px;
  transition: all ${theme.transitions.default};
  color: ${theme.colors.text};
  scrollbar-width: none; /* Firefox */

  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Edge */
  }

  &:focus {
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 2px ${theme.colors.glass};
    outline: none;
  }

  &:hover:not(:focus) {
    border-color: ${theme.colors.secondary};
  }
`;

export const ImageGallery = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 15px;
  margin-top: 15px;
`;

export const ImageContainer = styled.div`
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  transition: all ${theme.transitions.default};

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
`;

export const ImageActions = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  padding: 5px;
  opacity: 0;
  transition: opacity ${theme.transitions.default};

  ${ImageContainer}:hover & {
    opacity: 1;
  }
`;

export const ImagePreview = styled.img`
  display: block;
  width: 100%;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
  transition: transform ${theme.transitions.default};
`;

export const ProConsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 10px;
  max-height: 200px;
  overflow-y: auto;
  scrollbar-width: none; /* Firefox */

  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Edge */
  }
`;

export const ListItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  background-color: ${theme.colors.glass};
  border-radius: 6px;
  animation: ${fadeIn} 0.3s ease-in-out;
`;

export const AddButton = styled.button`
  background: ${theme.colors.primary};
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all ${theme.transitions.default};
  flex-shrink: 0;
  margin-left: 10px;

  &:hover {
    background: ${theme.colors.secondary};
    transform: scale(1.05);
  }
`;

export const RemoveButton = styled.button`
  background: none;
  color: ${theme.colors.primary};
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all ${theme.transitions.default};
  flex-shrink: 0;

  &:hover {
    color: #e74c3c;
    transform: scale(1.1);
  }
`;

export const ColorPickerContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 10px;
`;

export const ColorOption = styled.button`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  border: 2px solid
    ${(props) => (props.selected ? theme.colors.primary : "transparent")};
  cursor: pointer;
  transition: all ${theme.transitions.default};

  &:hover {
    transform: scale(1.15);
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  }

  ${(props) =>
    props.selected &&
    `
    animation: ${pulse} 1s;
  `}
`;

export const ColorValue = styled.div`
  font-size: 0.85rem;
  color: ${theme.colors.secondary};
  margin-bottom: 10px;
  font-weight: 500;
`;

export const BrandLogo = styled.img`
  width: 40px;
  height: 40px;
  object-fit: contain;
  position: absolute;
  right: 10px;
  top: 30px;
  border-radius: 4px;
  animation: ${fadeIn} 0.3s ease-in-out;
`;

export const SubmitButton = styled.button`
  background: ${theme.colors.primary};
  color: white;
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  transition: all ${theme.transitions.default};
  width: 100%;
  position: relative;
  overflow: hidden;
  margin-top: 1rem;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: all 0.6s;
  }

  &:hover {
    background: ${theme.colors.secondary};
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(91, 35, 51, 0.25);

    &:before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(91, 35, 51, 0.25);
  }

  &:disabled {
    background: ${theme.colors.glassDark};
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

export const ReactSelectContainer = styled.div`
  position: relative;
  width: 100%;
  ${(props) =>
    props.withIcon &&
    `
    padding-left: 25px;
  `}
`;

// Simplified BrandOptionContainer without the image
export const BrandOptionContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 12px;
  background: ${(props) =>
    props.isSelected ? "rgba(91, 35, 51, 0.1)" : "transparent"};
  cursor: pointer;
`;

export const ColorOptionContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 12px;
  background: ${(props) =>
    props.isSelected ? "rgba(91, 35, 51, 0.1)" : "transparent"};
  cursor: pointer;
`;

export const ColorSwatch = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  border: 1px solid #ddd;
  margin-right: 10px;
`;

export const ColorInput = styled.input`
  width: 60px;
  padding: 0;
  margin-left: 8px;
  height: 42px;
  cursor: pointer;
  -webkit-appearance: none;
  appearance: none;
  background-color: transparent;
  border: none;

  &::-webkit-color-swatch-wrapper {
    padding: 0;
  }

  &::-webkit-color-swatch {
    border: 1px solid #ddd;
    border-radius: 4px;
  }
`;

export const customSelectStyles = {
  control: (provided, state) => ({
    ...provided,
    border: state.isFocused
      ? "1px solid #5b2333"
      : "1px solid rgba(91, 35, 51, 0.25)",
    boxShadow: state.isFocused ? "0 0 0 2px rgba(91, 35, 51, 0.1)" : "none",
    borderRadius: "8px",
    "&:hover": {
      border: "1px solid #723344",
    },
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? "rgba(91, 35, 51, 0.1)"
      : state.isFocused
      ? "rgba(91, 35, 51, 0.05)"
      : "white",
    color: "#5b2333",
    "&:active": {
      backgroundColor: "rgba(91, 35, 51, 0.2)",
    },
  }),
  menu: (provided) => ({
    ...provided,
    borderRadius: "8px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
    overflow: "hidden",
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: "rgba(91, 35, 51, 0.1)",
    borderRadius: "4px",
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: "#5b2333",
    fontSize: "0.85rem",
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    color: "#5b2333",
    "&:hover": {
      backgroundColor: "rgba(91, 35, 51, 0.2)",
      color: "white",
    },
  }),
  menuList: (provided) => ({
    ...provided,
    scrollbarWidth: "none",
    "::-webkit-scrollbar": {
      display: "none",
    },
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#999",
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "#5b2333",
  }),
  input: (provided) => ({
    ...provided,
    color: "#5b2333",
  }),
  indicatorSeparator: (provided) => ({
    ...provided,
    backgroundColor: "rgba(91, 35, 51, 0.2)",
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    color: "#5b2333",
  }),
};
