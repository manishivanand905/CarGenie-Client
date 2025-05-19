import styled, { keyframes } from "styled-components";
import { theme } from "../../../styles/theme";
import Select from "react-select";

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideUp = keyframes`
  from { transform: translateY(30px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const fadeInTooltip = keyframes`
  from { opacity: 0; transform: translateY(5px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(91, 35, 51, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
  animation: ${fadeIn} 0.3s ease-in-out;
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  backdrop-filter: blur(3px);

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const ModalContainer = styled.div`
  background-color: ${theme.colors.background};
  border-radius: 12px;
  width: 100%;
  max-width: 800px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 10px 25px ${theme.colors.glassDark};
  animation: ${slideUp} 0.4s ease-in-out;
  position: relative;
  transition: transform ${theme.transitions.default},
    box-shadow ${theme.transitions.default};

  &:hover {
    box-shadow: 0 12px 30px ${theme.colors.glassDark};
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    max-height: 95vh;
    border-radius: 8px;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    max-height: 100vh;
    height: 100%;
    border-radius: 0;
    margin: 0;
  }
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid ${theme.colors.glass};
  background-color: white;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 1rem;
    border-radius: 0;
  }
`;

export const ModalTitle = styled.h3`
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${theme.colors.primary};

  svg {
    color: ${theme.colors.accent};
    transition: transform ${theme.transitions.default};
  }

  &:hover svg {
    transform: scale(1.15);
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 1.1rem;
  }
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.25rem;
  cursor: pointer;
  color: ${theme.colors.accent};
  transition: all ${theme.transitions.default};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;

  &:hover {
    color: ${theme.colors.primary};
    background-color: ${theme.colors.glass};
    transform: rotate(90deg);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${theme.colors.glassDark};
  }
`;

export const ModalBody = styled.div`
  padding: 1.5rem;
  overflow-y: auto;
  max-height: calc(90vh - 140px);
  background-color: white;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 1rem;
    max-height: calc(100vh - 130px);
  }
`;

export const FormSection = styled.div`
  margin-bottom: 1.5rem;
  animation: ${fadeIn} 0.4s ease-in-out;

  &:last-child {
    margin-bottom: 0;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    margin-bottom: 1.25rem;
  }
`;

export const FormSectionTitle = styled.h4`
  margin: 0 0 1.25rem 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: ${theme.colors.primary};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  position: relative;
  padding-left: 0.5rem;

  &:before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 3px;
    background-color: ${theme.colors.accent};
    border-radius: 2px;
  }

  svg {
    color: ${theme.colors.accent};
    transition: transform ${theme.transitions.default};
  }

  &:hover svg {
    transform: scale(1.15);
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 1rem;
    margin-bottom: 1rem;
  }
`;

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(${(props) => props.columns || 2}, 1fr);
  gap: 1.25rem;

  @media (max-width: ${theme.breakpoints.tablet}) {
    gap: 1rem;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }
`;

export const FormDivider = styled.div`
  height: 1px;
  background-color: ${theme.colors.glass};
  margin: 1.75rem 0;

  @media (max-width: ${theme.breakpoints.mobile}) {
    margin: 1.25rem 0;
  }
`;

export const FormGroup = styled.div`
  margin-bottom: 1rem;
  transition: transform ${theme.transitions.default};
  position: relative;
  z-index: ${(props) => (props.isSelect ? 3 : 1)};

  &:last-child {
    margin-bottom: 0;
  }

  &:hover {
    transform: translateY(-2px);
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    margin-bottom: 0.75rem;
  }
`;

export const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  font-weight: 500;
  font-size: 0.95rem;
  color: ${theme.colors.text};
  transition: color ${theme.transitions.default};

  &:hover {
    color: ${theme.colors.primary};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 0.9rem;
    margin-bottom: 0.375rem;
  }
`;

export const RequiredMark = styled.span`
  color: #f44336;
  margin-left: 2px;
`;

export const InfoTooltip = styled.span`
  position: relative;
  display: inline-block;
  width: 16px;
  height: 16px;
  background-color: ${theme.colors.glass};
  color: ${theme.colors.accent};
  border-radius: 50%;
  font-size: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: help;
  margin-left: 4px;
  transition: all ${theme.transitions.default};

  &::before {
    content: "i";
    font-style: italic;
    font-weight: bold;
  }

  &:hover {
    background-color: ${theme.colors.accent};
    color: white;
    transform: scale(1.1);
  }

  &:hover > span {
    visibility: visible;
    opacity: 1;
    transform: translateY(0);
  }
`;

export const TooltipText = styled.span`
  visibility: hidden;
  width: 200px;
  background-color: ${theme.colors.primary};
  color: white;
  text-align: center;
  border-radius: 6px;
  padding: 8px;
  position: absolute;
  z-index: 10;
  bottom: 125%;
  left: 50%;
  transform: translateX(-50%) translateY(5px);
  opacity: 0;
  transition: opacity 0.3s, transform 0.3s;
  font-size: 0.75rem;
  font-weight: normal;
  box-shadow: 0 4px 6px ${theme.colors.glassDark};
  pointer-events: none;
  animation: ${fadeInTooltip} 0.2s ease-in-out;

  &::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: ${theme.colors.primary} transparent transparent transparent;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    width: 150px;
    font-size: 0.7rem;
    padding: 6px;
  }
`;

export const InputWithIcon = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const InputIcon = styled.div`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: ${theme.colors.accent};
  pointer-events: none;
  z-index: 1;
  transition: all ${theme.transitions.default};

  ${InputWithIcon}:hover & {
    color: ${theme.colors.primary};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    left: 10px;
    font-size: 0.9rem;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.75rem 0.75rem 0.75rem 2.25rem;
  border: 1px solid ${theme.colors.glass};
  border-radius: 8px;
  transition: all ${theme.transitions.default};
  font-size: 0.95rem;
  background-color: white;
  color: ${theme.colors.text};

  &:focus {
    border-color: ${theme.colors.accent};
    outline: none;
    background-color: white;
    box-shadow: 0 0 0 3px ${theme.colors.glass};
  }

  &:hover {
    border-color: ${theme.colors.accent};
  }

  &[aria-invalid="true"] {
    border-color: #f44336;
    background-color: #fff6f6;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 0.625rem 0.625rem 0.625rem 2rem;
    font-size: 0.9rem;
  }
`;

export const SelectWrapper = styled.div`
  position: relative;
`;

export const CustomSelect = styled(Select)`
  & .select__control {
    background-color: white;
    border: 1px solid ${theme.colors.glass};
    border-radius: 8px;
    min-height: 42px;
    transition: all ${theme.transitions.default};
    box-shadow: none;
    padding-left: 1.75rem;

    &:hover {
      border-color: ${theme.colors.accent};
    }

    &--is-focused {
      border-color: ${theme.colors.accent};
      box-shadow: 0 0 0 1px ${theme.colors.accent};
      background-color: white;
    }
  }

  & .select__menu {
    background-color: white;
    border-radius: 6px;
    box-shadow: 0 4px 12px ${theme.colors.glassDark};
    z-index: 10;
    margin-top: 4px;
    overflow: hidden;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  & .select__menu-list {
    padding: 5px;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  & .select__option {
    padding: 8px 12px;
    border-radius: 4px;
    margin-bottom: 2px;

    &--is-selected {
      background-color: ${theme.colors.primary};
      color: white;
    }

    &--is-focused:not(.select__option--is-selected) {
      background-color: ${theme.colors.glass};
      color: ${theme.colors.primary};
    }
  }

  & .select__value-container {
    padding: 2px 8px;
  }

  & .select__placeholder {
    color: #9e9e9e;
  }

  & .select__single-value {
    color: ${theme.colors.text};
  }

  & .select__indicator-separator {
    background-color: ${theme.colors.glass};
  }

  & .select__dropdown-indicator {
    color: ${theme.colors.accent};

    &:hover {
      color: ${theme.colors.primary};
    }
  }
`;

export const ErrorMessage = styled.span`
  color: #f44336;
  font-size: 0.8rem;
  margin-top: 0.375rem;
  display: block;
  animation: ${fadeIn} 0.3s ease-in-out;
`;

export const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 1.25rem 1.5rem;
  border-top: 1px solid ${theme.colors.glass};
  gap: 1rem;
  background-color: white;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 1rem;
    gap: 0.75rem;
    position: sticky;
    bottom: 0;
    border-radius: 0;
  }
`;

export const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all ${theme.transitions.default};
  display: flex;
  align-items: center;
  justify-content: center;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 0.625rem 1.25rem;
    font-size: 0.9rem;
  }
`;

export const CancelButton = styled(Button)`
  background-color: ${theme.colors.glass};
  color: ${theme.colors.text};
  border: none;

  &:hover:not(:disabled) {
    background-color: ${theme.colors.glassDark};
    transform: translateY(-2px);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
  }
`;

export const SubmitButton = styled(Button)`
  background-color: ${theme.colors.primary};
  color: white;
  border: none;
  min-width: 120px;
  position: relative;
  overflow: hidden;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to right,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: all 0.5s;
  }

  &:hover:not(:disabled) {
    background-color: ${theme.colors.secondary};
    transform: translateY(-2px);
    box-shadow: 0 4px 12px ${theme.colors.glassDark};

    &:before {
      left: 100%;
    }
  }

  &:active:not(:disabled) {
    transform: translateY(0);
    box-shadow: none;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px ${theme.colors.glassDark};
  }

  &:disabled {
    background-color: ${theme.colors.glassDark};
  }
`;
