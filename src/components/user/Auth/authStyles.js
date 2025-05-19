import styled, { keyframes } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const slideOut = keyframes`
  from {
    opacity: 1;
    transform: translateX(0);
  }
  to {
    opacity: 0;
    transform: translateX(-100%);
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const glassEffect = keyframes`
  from {
    backdrop-filter: blur(0);
    background: rgba(255, 255, 255, 0);
  }
  to {
    backdrop-filter: blur(10px);
    background: rgba(255, 255, 255, 0.1);
  }
`;

export const AuthContainer = styled.div`
  display: flex;
  min-height: 100vh;
  width: 100%;
  background: #ffffff;
  position: relative;
  overflow: hidden;
`;

export const FormWrapper = styled.div`
  animation: ${(props) => (props.isEntering ? slideIn : slideOut)} 0.5s
    ease-in-out;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  display: flex;
  background: #ffffff;

  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;
`;

export const FormSection = styled.div`
  flex: 1;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  overflow-y: auto;
  max-width: 600px;
  margin: 0 auto;

  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;

  @media (min-width: 1024px) {
    padding: 3rem 4rem;
  }

  @media (max-width: 768px) {
    padding: 2rem 1.5rem;
    width: 100%;
  }
`;

export const ImageSection = styled.div`
  flex: 1;
  background-image: url(${(props) => props.bgImage});
  background-size: cover;
  background-position: center;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(rgba(91, 35, 51, 0.1), rgba(91, 35, 51, 0.2));
  }

  @media (max-width: 1024px) {
    display: none;
  }
`;

export const Form = styled.form`
  width: 100%;
  max-width: 480px;
  margin: 0 auto;
  padding: 1rem;
  padding-top: 2rem;

  @media (min-width: 1024px) {
    padding: 2rem 0;
  }
`;

export const Title = styled.h1`
  color: #5b2333;
  margin-bottom: 2rem;
  font-size: 2rem;
  font-weight: 600;
  text-align: center;
  padding-top: 1rem;

  @media (max-width: 768px) {
    font-size: 1.75rem;
    margin-bottom: 1.5rem;
  }
`;

export const InputGroup = styled.div`
  margin-bottom: 1.5rem;
  position: relative;
  width: 100%;
`;

export const Input = styled.input`
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  border: 2px solid ${(props) => (props.error ? "#ff3333" : "#ddd")};
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: transparent;
  color: #5b2333;

  &:focus {
    border-color: #5b2333;
    box-shadow: 0 0 0 4px rgba(91, 35, 51, 0.1);
    outline: none;
  }

  &:hover {
    border-color: #723344;
  }

  &::placeholder {
    color: #999;
  }

  @media (max-width: 768px) {
    padding: 0.875rem 0.875rem 0.875rem 2.75rem;
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  border: 2px solid ${(props) => (props.error ? "#ff3333" : "#ddd")};
  border-radius: 8px;
  font-size: 1rem;
  background: white;
  cursor: pointer;
  color: #5b2333;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%235b2333' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 1em;

  &:focus {
    border-color: #5b2333;
    box-shadow: 0 0 0 4px rgba(91, 35, 51, 0.1);
    outline: none;
  }

  &:hover {
    border-color: #723344;
  }

  @media (max-width: 768px) {
    padding: 0.875rem 0.875rem 0.875rem 2.75rem;
  }
`;

export const PasswordToggle = styled.button`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #5b2333;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    color: #723344;
  }

  &:focus {
    outline: none;
    color: #8b4355;
  }

  svg {
    font-size: 1.2rem;
    transition: transform 0.3s ease;
  }

  &:hover svg {
    transform: scale(1.1);
  }
`;

export const InputIcon = styled.div`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #5b2333;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  transition: all 0.3s ease;

  svg {
    transition: transform 0.3s ease;
  }

  input:focus + & {
    color: #8b4355;

    svg {
      transform: scale(1.1);
    }
  }
`;

export const Button = styled.button`
  width: 100%;
  padding: 1rem;
  background: #5b2333;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.3s ease;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 1px;

  &:hover:not(:disabled) {
    background: #723344;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(91, 35, 51, 0.2);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    background: #999;
    cursor: not-allowed;
    transform: none;
  }

  @media (max-width: 768px) {
    padding: 0.875rem;
  }
`;

export const ErrorMessage = styled.span`
  color: ${(props) => (props.success ? "#4CAF50" : "#ff3333")};
  font-size: 0.875rem;
  margin-top: 0.25rem;
  display: block;
  font-weight: 500;
  animation: ${fadeIn} 0.3s ease;
`;

export const SwitchText = styled.p`
  text-align: center;
  margin-top: 1.5rem;
  color: #5b2333;
  font-size: 0.9rem;
`;

export const SwitchLink = styled.span`
  color: #723344;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;

  &:hover {
    color: #8b4355;
    text-decoration: underline;
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: ${fadeIn} 0.3s ease;
  backdrop-filter: blur(5px);
`;

export const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  max-width: 400px;
  width: 90%;
  position: relative;
  animation: ${fadeIn} 0.3s ease;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);

  @media (max-width: 480px) {
    width: 95%;
    padding: 1.5rem;
  }
`;

export const OTPContainer = styled.div`
  display: flex;
  gap: 0.8rem;
  justify-content: center;
  margin: 2rem 0;

  @media (max-width: 480px) {
    gap: 0.5rem;
  }
`;

export const OTPInput = styled.input`
  width: 3rem;
  height: 3rem;
  text-align: center;
  font-size: 1.25rem;
  font-weight: 600;
  border: 2px solid ${(props) => (props.filled ? "#5b2333" : "#ddd")};
  border-radius: 8px;
  background: ${(props) => (props.filled ? "rgba(91, 35, 51, 0.1)" : "white")};
  color: #5b2333;
  transition: all 0.3s ease;
  animation: ${(props) => (props.filled ? glassEffect : "none")} 0.3s forwards;

  &:focus {
    border-color: #5b2333;
    outline: none;
    box-shadow: 0 0 0 4px rgba(91, 35, 51, 0.1);
  }

  &:hover {
    border-color: #723344;
  }

  @media (max-width: 480px) {
    width: 2.5rem;
    height: 2.5rem;
    font-size: 1rem;
  }
`;

export const ModalTitle = styled.h2`
  color: #5b2333;
  text-align: center;
  margin-bottom: 0.5rem;
  font-size: 1.5rem;
  font-weight: 600;
`;

export const ModalSubtitle = styled.p`
  color: #666;
  text-align: center;
  margin-bottom: 2rem;
  font-size: 0.9rem;
`;

export const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 2rem;
`;

export const ResendButton = styled.button`
  background: none;
  border: 2px solid #5b2333;
  border-radius: 8px;
  color: #5b2333;
  font-size: 0.9rem;
  font-weight: 600;
  padding: 0.75rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover:not(:disabled) {
    background: rgba(91, 35, 51, 0.1);
    transform: translateY(-2px);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    border-color: #999;
    color: #999;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  padding: 0.5rem;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    font-size: 1.25rem;
    transition: transform 0.3s ease;
  }

  &:hover {
    color: #5b2333;

    svg {
      transform: scale(1.1);
    }
  }
`;

export const LoadingSpinner = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  svg {
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

export const ForgotPassword = styled.span`
  color: #5b2333;
  font-size: 0.9rem;
  text-align: right;
  display: block;
  margin: -0.5rem 0 1rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    color: #723344;
    text-decoration: underline;
  }
`;

export const GoogleButton = styled(Button)`
  background: white;
  color: #5b2333;
  border: 2px solid #5b2333;
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover:not(:disabled) {
    background: rgba(91, 35, 51, 0.1);
    color: #5b2333;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(91, 35, 51, 0.1);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    border-color: #999;
    color: #999;
    background: white;
  }
`;

export const StyledIcon = styled(FontAwesomeIcon)`
  font-size: 1.2rem;
  transition: transform 0.3s ease;

  ${GoogleButton}:hover & {
    transform: scale(1.1);
  }
`;

export const VerifyButton = styled(Button)`
  background: #5b2333;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;

  &:hover:not(:disabled) {
    background: #723344;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(91, 35, 51, 0.2);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    background: #999;
    cursor: not-allowed;
  }
`;
