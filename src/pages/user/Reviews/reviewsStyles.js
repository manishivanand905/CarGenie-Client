import styled, { css, keyframes } from "styled-components";
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
    transform: translateX(-30px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const glassEffect = keyframes`
  from {
    backdrop-filter: blur(0px);
    background-color: rgba(91, 35, 51, 0);
  }
  to {
    backdrop-filter: blur(8px);
    background-color: rgba(91, 35, 51, 0.15);
  }
`;

export const ReviewsPageContainer = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1.5rem;
  animation: ${fadeIn} 0.5s ease-in-out;

  h1 {
    color: ${theme.colors.primary};
    margin-bottom: 2rem;
    font-size: 2.5rem;
    font-weight: 600;

    @media (max-width: ${theme.breakpoints.tablet}) {
      font-size: 2rem;
      text-align: center;
    }
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 0 1rem;
    margin: 1rem auto;
  }
`;

export const TabsContainer = styled.div`
  display: flex;
  margin-bottom: 2rem;
  border-bottom: 2px solid ${theme.colors.glassDark};

  @media (max-width: ${theme.breakpoints.mobile}) {
    justify-content: center;
  }
`;

export const Tab = styled.div`
  padding: 1rem 2rem;
  font-weight: 500;
  cursor: pointer;
  position: relative;
  transition: all ${theme.transitions.default};

  ${(props) =>
    props.active &&
    css`
      color: ${theme.colors.primary};
      font-weight: 600;

      &:after {
        content: "";
        position: absolute;
        bottom: -2px;
        left: 0;
        width: 100%;
        height: 3px;
        background-color: ${theme.colors.primary};
        animation: ${slideIn} 0.3s ease-in-out;
      }
    `}

  &:hover {
    color: ${theme.colors.secondary};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 0.75rem 1.25rem;
    font-size: 0.9rem;
  }
`;

export const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  position: relative;

  @media (max-width: ${theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: 1rem;
  }
`;

export const FilterButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  background-color: ${theme.colors.glass};
  color: ${theme.colors.primary};
  border-radius: 8px;
  font-weight: 500;
  transition: all ${theme.transitions.default};

  &:hover {
    background-color: ${theme.colors.glassDark};
    transform: translateY(-2px);
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    width: 100%;
    justify-content: center;
  }
`;

export const FilterDropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  z-index: 10;
  overflow: hidden;
  animation: ${fadeIn} 0.3s ease-in-out;

  div {
    padding: 0.75rem 1.25rem;
    cursor: pointer;
    transition: background ${theme.transitions.default};

    &:hover {
      background-color: ${theme.colors.glass};
    }
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    width: 100%;
  }
`;

export const AddReviewButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background-color: ${theme.colors.primary};
  color: white;
  border-radius: 8px;
  font-weight: 500;
  transition: all ${theme.transitions.default};

  &:hover {
    background-color: ${theme.colors.secondary};
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(91, 35, 51, 0.2);
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    width: 100%;
    justify-content: center;
  }
`;

export const ReviewsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const ReviewCard = styled.div`
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  transition: all ${theme.transitions.default};
  animation: ${fadeIn} 0.5s ease-in-out;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  }
`;

export const ReviewCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem;
  background-color: ${theme.colors.glass};
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);

  @media (max-width: ${theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const Avatar = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: ${theme.colors.glassDark};
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  svg {
    font-size: 1.5rem;
    color: ${theme.colors.secondary};
  }
`;

export const UserName = styled.div`
  font-weight: 600;
  color: ${theme.colors.primary};
`;

export const CarModel = styled.div`
  font-size: 0.9rem;
  color: ${theme.colors.secondary};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.25rem;
`;

export const RatingContainer = styled.div`
  display: flex;
  gap: 0.25rem;

  svg {
    font-size: 1.25rem;
  }
`;

export const ReviewCardContent = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const ReviewContent = styled.div`
  line-height: 1.6;
  color: ${theme.colors.text};
  white-space: pre-line;

  ${(props) =>
    !props.expanded &&
    css`
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    `}

  transition: all ${theme.transitions.slow};
`;

export const ExpandButton = styled.button`
  align-self: flex-start;
  background: none;
  color: ${theme.colors.accent};
  font-weight: 500;
  padding: 0;
  margin-top: -0.5rem;

  &:hover {
    text-decoration: underline;
  }
`;

export const Timestamp = styled.div`
  font-size: 0.85rem;
  color: #777;
  margin-top: 0.5rem;
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;

  @media (max-width: ${theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: 0.75rem;
  }
`;

export const EditButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1.25rem;
  background-color: ${theme.colors.glass};
  color: ${theme.colors.primary};
  border-radius: 6px;
  font-weight: 500;
  transition: all ${theme.transitions.default};

  &:hover {
    background-color: ${theme.colors.glassDark};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    justify-content: center;
  }
`;

export const DeleteButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1.25rem;
  background-color: rgba(220, 53, 69, 0.1);
  color: #dc3545;
  border-radius: 6px;
  font-weight: 500;
  transition: all ${theme.transitions.default};

  &:hover {
    background-color: rgba(220, 53, 69, 0.2);
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    justify-content: center;
  }
`;

export const EmptyReviews = styled.div`
  text-align: center;
  padding: 3rem 1rem;
  color: #777;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 12px;
  border: 1px dashed ${theme.colors.glassDark};
`;

export const LoadingSpinner = styled.div`
  width: 48px;
  height: 48px;
  border: 5px solid ${theme.colors.glass};
  border-bottom-color: ${theme.colors.primary};
  border-radius: 50%;
  margin: 3rem auto;
  animation: ${spin} 1s linear infinite;
`;

export const ReviewFormOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  backdrop-filter: blur(8px);
  background-color: rgba(0, 0, 0, 0.5);
  animation: 0.3s ease-in-out;
`;

export const ReviewFormContainer = styled.div`
  background-color: white;
  width: 90%;
  max-width: 600px;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  animation: ${fadeIn} 0.4s ease-in-out;

  @media (max-width: ${theme.breakpoints.mobile}) {
    width: 95%;
    max-height: 90vh;
    overflow-y: auto;
  }
`;

export const ReviewForm = styled.form`
  display: flex;
  flex-direction: column;

  .error {
    color: #dc3545;
    font-size: 0.85rem;
    margin-top: 0.25rem;
  }
`;

export const FormHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem;
  background-color: ${theme.colors.glass};
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);

  h2 {
    color: ${theme.colors.primary};
    font-size: 1.5rem;
    font-weight: 600;
  }
`;

export const CloseButton = styled.button`
  background: none;
  color: #777;
  font-size: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  transition: all ${theme.transitions.default};

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
    color: ${theme.colors.primary};
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.25rem;

  &:not(:last-of-type) {
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  }
`;

export const Label = styled.label`
  font-weight: 500;
  color: ${theme.colors.primary};
  margin-bottom: 0.75rem;
`;

export const TextArea = styled.textarea`
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 1rem;
  font-family: "Poppins", sans-serif;
  resize: vertical;
  min-height: 120px;
  transition: border-color ${theme.transitions.default};

  &:focus {
    outline: none;
    border-color: ${theme.colors.accent};
    box-shadow: 0 0 0 3px ${theme.colors.glass};
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

export const RatingSelector = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: flex-end;
  gap: 0.5rem;
`;

export const RatingOption = styled.div`
  input {
    display: none;
  }

  label {
    cursor: pointer;
    font-size: 1.75rem;
    color: #ccc;
    transition: color ${theme.transitions.default};
  }

  &:hover label,
  &:hover ~ div label,
  input:checked ~ label,
  input:checked ~ div label {
    color: ${theme.colors.accent};
  }

  &:hover label {
    transform: scale(1.2);
    transition: transform 0.2s ease;
  }
`;

export const SubmitButton = styled.button`
  background-color: ${theme.colors.primary};
  color: white;
  padding: 1rem;
  margin: 1.25rem;
  border-radius: 8px;
  font-weight: 600;
  transition: all ${theme.transitions.default};

  &:hover {
    background-color: ${theme.colors.secondary};
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(91, 35, 51, 0.2);
    animation: ${pulse} 0.8s ease-in-out;
  }
`;

export const ConfirmationModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  backdrop-filter: blur(8px);
  background-color: rgba(91, 35, 51, 0.15);
  animation: ${glassEffect} 0.3s ease-in-out;
`;

export const ModalContent = styled.div`
  background-color: white;
  width: 90%;
  max-width: 450px;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 0.4s ease-in-out;

  h3 {
    color: ${theme.colors.primary};
    margin-bottom: 1rem;
    font-size: 1.5rem;
  }

  p {
    color: ${theme.colors.text};
    margin-bottom: 1.5rem;
    line-height: 1.6;
  }
`;

export const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;

  @media (max-width: ${theme.breakpoints.mobile}) {
    flex-direction: column-reverse;
  }
`;

export const ModalButton = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  font-weight: 500;
  transition: all ${theme.transitions.default};

  ${(props) =>
    props.secondary &&
    css`
      background-color: #f0f0f0;
      color: #333;

      &:hover {
        background-color: #e0e0e0;
      }
    `}

  ${(props) =>
    props.danger &&
    css`
      background-color: #dc3545;
      color: white;

      &:hover {
        background-color: #c82333;
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(220, 53, 69, 0.2);
      }
    `}
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    width: 100%;
  }
`;

export const Input = styled.input`
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 0.75rem 1rem;
  font-family: "Poppins", sans-serif;
  width: 100%;
  transition: border-color ${theme.transitions.default};

  &:focus {
    outline: none;
    border-color: ${theme.colors.accent};
    box-shadow: 0 0 0 3px ${theme.colors.glass};
  }

  &::placeholder {
    color: #aaa;
  }

  &:disabled {
    background-color: #f5f5f5;
    cursor: not-allowed;
  }

  &.error {
    border-color: #dc3545;

    &:focus {
      box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.1);
    }
  }
`;
