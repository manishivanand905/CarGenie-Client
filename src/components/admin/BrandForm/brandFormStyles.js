import styled, { keyframes } from "styled-components";
import { theme } from "../../../styles/theme";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideUp = keyframes`
  from {
    transform: translateY(50px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(91, 35, 51, 0.4);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(91, 35, 51, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(91, 35, 51, 0);
  }
`;

const shine = keyframes`
  from {
    background-position: -200px 0;
  }
  to {
    background-position: calc(200px + 100%) 0;
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: ${fadeIn} 0.3s ease-out;
  padding: 20px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }

  scrollbar-width: none;
  -ms-overflow-style: none;
`;

export const ModalContainer = styled.div`
  background-color: white;
  border-radius: 12px;
  width: 100%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.25);
  animation: ${slideUp} 0.4s ease-out;

  &::-webkit-scrollbar {
    display: none;
  }

  scrollbar-width: none;
  -ms-overflow-style: none;

  @media (max-width: ${theme.breakpoints.tablet}) {
    width: 95%;
  }

  form {
    padding: 0 30px 30px;

    @media (max-width: ${theme.breakpoints.mobile}) {
      padding: 0 20px 20px;
    }
  }
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 22px 30px;
  border-bottom: 1px solid #eee;
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 10;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 18px 20px;
  }
`;

export const ModalTitle = styled.h2`
  margin: 0;
  color: ${theme.colors.primary};
  font-size: 26px;
  font-weight: 600;
  position: relative;

  &:after {
    content: "";
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 40px;
    height: 3px;
    background-color: ${theme.colors.secondary};
    border-radius: 3px;
    transition: width ${theme.transitions.default};
  }

  ${ModalContainer}:hover & {
    &:after {
      width: 60px;
    }
  }
`;

export const CloseButton = styled.button`
  background: transparent;
  border: none;
  color: #777;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: ${theme.colors.glass};
    color: ${theme.colors.primary};
    transform: rotate(90deg);
  }

  &:active {
    transform: rotate(90deg) scale(0.9);
  }
`;

export const FormRow = styled.div`
  display: flex;
  gap: 24px;

  @media (max-width: ${theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: 0;
  }
`;

export const FormGroup = styled.div`
  margin-bottom: 22px;
  flex: 1;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: ${theme.colors.text};
  transition: color ${theme.transitions.default};
  letter-spacing: 0.2px;

  ${FormGroup}:hover & {
    color: ${theme.colors.primary};
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 14px 16px;
  border: 1px solid ${({ error }) => (error ? "#f44336" : "#ddd")};
  border-radius: 8px;
  font-size: 16px;
  transition: all ${theme.transitions.default};
  background-color: ${({ error }) => (error ? "#ffebee" : "white")};

  &:focus {
    outline: none;
    border-color: ${({ error }) => (error ? "#f44336" : theme.colors.primary)};
    box-shadow: 0 0 0 3px
      ${({ error }) => (error ? "rgba(244, 67, 54, 0.2)" : theme.colors.glass)};
    transform: translateY(-2px);
  }

  &:hover {
    border-color: ${({ error }) =>
      error ? "#f44336" : theme.colors.secondary};
  }

  &::placeholder {
    color: #aaa;
  }
`;

export const FileInputWrapper = styled.div`
  position: relative;
  margin-bottom: 15px;
`;

export const FileInput = styled.input`
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
  width: 0.1px;
  height: 0.1px;
  overflow: hidden;
`;

export const FileInputLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 18px;
  background-color: ${theme.colors.glass};
  color: ${theme.colors.text};
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  transition: all ${theme.transitions.default};
  border: 1px dashed ${theme.colors.secondary};
  position: relative;
  overflow: hidden;

  svg {
    color: ${theme.colors.secondary};
    transition: transform ${theme.transitions.default};
  }

  &:hover {
    background-color: ${theme.colors.glassDark};
    border-color: ${theme.colors.primary};
    transform: translateY(-2px);

    svg {
      transform: scale(1.2);
    }
  }

  &:active {
    transform: translateY(0);
  }

  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 200px;
    height: 100%;
    background: linear-gradient(
      to right,
      transparent,
      rgba(255, 255, 255, 0.3),
      transparent
    );
    transform: skewX(-20deg);
    animation: ${shine} 2s infinite;
    animation-delay: 1s;
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: 14px 16px;
  border: 1px solid ${({ error }) => (error ? "#f44336" : "#ddd")};
  border-radius: 8px;
  font-size: 16px;
  resize: vertical;
  min-height: 140px;
  transition: all ${theme.transitions.default};
  background-color: ${({ error }) => (error ? "#ffebee" : "white")};
  font-family: inherit;
  overflow-y: auto;

  &:focus {
    outline: none;
    border-color: ${({ error }) => (error ? "#f44336" : theme.colors.primary)};
    box-shadow: 0 0 0 3px
      ${({ error }) => (error ? "rgba(244, 67, 54, 0.2)" : theme.colors.glass)};
    transform: translateY(-2px);
  }

  &:hover {
    border-color: ${({ error }) =>
      error ? "#f44336" : theme.colors.secondary};
  }

  &::placeholder {
    color: #aaa;
  }

  &::-webkit-scrollbar {
    display: none;
  }

  scrollbar-width: none;
  -ms-overflow-style: none;
`;

export const ImagePreview = styled.img`
  max-width: 100%;
  max-height: 200px;
  object-fit: contain;
  border-radius: 8px;
  margin-bottom: 15px;
  border: 1px solid #eee;
  background-color: #f9f9f9;
  padding: 12px;
  transition: all ${theme.transitions.slow};
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);

  &:hover {
    transform: scale(1.04);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
    border-color: ${theme.colors.secondary};
  }
`;

export const SubmitButton = styled.button`
  background-color: ${theme.colors.primary};
  color: white;
  width: 100%;
  padding: 16px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  transition: all ${theme.transitions.default};
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  margin-top: 15px;
  letter-spacing: 0.5px;
  position: relative;
  overflow: hidden;
  z-index: 1;

  &:hover:not(:disabled) {
    background-color: ${theme.colors.secondary};
    transform: translateY(-3px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.15);
    animation: ${pulse} 1.5s infinite;
  }

  &:active:not(:disabled) {
    transform: translateY(0);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
    opacity: 0.7;
  }

  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.1);
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 0.5s ease-out;
    z-index: -1;
  }

  &:hover:not(:disabled):after {
    transform: scaleX(1);
    transform-origin: left;
  }
`;

export const ErrorMessage = styled.div`
  color: #f44336;
  font-size: 13px;
  margin-top: 6px;
  display: flex;
  align-items: center;
  gap: 6px;
  animation: ${fadeIn} 0.3s ease-out;

  svg {
    font-size: 14px;
    animation: ${pulse} 1.5s infinite;
  }
`;
