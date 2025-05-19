import styled, { keyframes } from "styled-components";
import { theme } from "../../../styles/theme";

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideUp = keyframes`
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const float = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
  100% { transform: translateY(0); }
`;

const pulse = keyframes`
  0% { transform: scale(1); box-shadow: 0 2px 8px ${theme.colors.glass}; }
  50% { transform: scale(1.05); box-shadow: 0 4px 12px ${theme.colors.glassDark}; }
  100% { transform: scale(1); box-shadow: 0 2px 8px ${theme.colors.glass}; }
`;

export const DetailContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background-color: ${theme.colors.background};
  min-height: 100vh;
  color: ${theme.colors.text};
  transition: padding ${theme.transitions.default};

  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: 1.5rem;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 1rem;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  transition: all ${theme.transitions.default};

  @media (max-width: ${theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

export const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  background-color: white;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all ${theme.transitions.default};
  box-shadow: 0 2px 5px ${theme.colors.glass};
  color: ${theme.colors.primary};

  &:hover {
    background-color: ${theme.colors.glass};
    transform: translateY(-3px);
    box-shadow: 0 4px 12px ${theme.colors.glassDark};
  }

  &:active {
    transform: translateY(-1px);
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    width: 100%;
    justify-content: center;
  }
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;

  @media (max-width: ${theme.breakpoints.mobile}) {
    width: 100%;
  }
`;

export const DeleteButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all ${theme.transitions.default};

  &:hover {
    background-color: #d32f2f;
    transform: translateY(-3px);
    box-shadow: 0 4px 12px rgba(211, 47, 47, 0.3);
  }

  &:active {
    transform: translateY(-1px);
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    flex: 1;
  }
`;

export const CarDetailGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 2rem;
  margin-bottom: 2rem;
  animation: ${fadeIn} 0.6s ease-in-out;

  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

export const ImageSection = styled.div`
  background-color: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 10px ${theme.colors.glass};
  height: fit-content;
  transition: all ${theme.transitions.default};

  &:hover {
    box-shadow: 0 8px 16px ${theme.colors.glassDark};
    transform: translateY(-5px);
  }

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 3rem 1rem;
    color: ${theme.colors.accent};
    text-align: center;

    svg {
      font-size: 3rem;
      margin-bottom: 1rem;
      animation: ${float} 3s ease-in-out infinite;
    }
  }
`;

export const CarImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
  aspect-ratio: 16/9;
  transition: transform ${theme.transitions.slow};

  &:hover {
    transform: scale(1.03);
  }
`;

export const InfoSection = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 10px ${theme.colors.glass};
  transition: all ${theme.transitions.default};

  &:hover {
    box-shadow: 0 8px 16px ${theme.colors.glassDark};
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: 1.5rem;
  }
`;

export const CarBrand = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.2rem;
  color: ${theme.colors.accent};
  margin-bottom: 0.5rem;
`;

export const BrandLogo = styled.img`
  width: 32px;
  height: 32px;
  object-fit: contain;
  transition: transform ${theme.transitions.default};

  &:hover {
    transform: scale(1.15);
  }
`;

export const CarTitle = styled.h1`
  font-size: 2.5rem;
  margin: 0 0 1.5rem 0;
  color: ${theme.colors.primary};
  font-weight: 700;
  transition: color ${theme.transitions.default};

  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: 2rem;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 1.75rem;
  }
`;

export const Description = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: ${theme.colors.text};
  margin: 0;
  white-space: pre-line;
`;

export const SectionContainer = styled.section`
  background-color: white;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 10px ${theme.colors.glass};
  animation: ${fadeIn} 0.5s ease-in-out;
  transition: all ${theme.transitions.default};

  &:hover {
    box-shadow: 0 8px 16px ${theme.colors.glassDark};
    transform: translateY(-3px);
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: 1.25rem;
  }
`;

export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid ${theme.colors.glass};
`;

export const SectionTitle = styled.h2`
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0;
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
`;

export const SectionEditButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: ${theme.colors.glass};
  border: none;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all ${theme.transitions.default};
  color: ${theme.colors.primary};

  svg {
    color: ${theme.colors.accent};
  }

  &:hover {
    background-color: ${theme.colors.glassDark};
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const SectionContent = styled.div`
  animation: ${slideUp} 0.5s ease-in-out;
`;

export const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(${(props) => props.columns || 2}, 1fr);
  gap: 1.5rem;

  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

export const InfoItem = styled.div`
  margin-bottom: 0.75rem;
  transition: transform ${theme.transitions.default};

  &:hover {
    transform: translateY(-2px);
  }
`;

export const InfoLabel = styled.span`
  display: block;
  font-size: 0.85rem;
  font-weight: 500;
  color: ${theme.colors.accent};
  margin-bottom: 0.25rem;
`;

export const InfoValue = styled.span`
  display: block;
  font-size: 1.1rem;
  color: ${theme.colors.text};
  transition: color ${theme.transitions.default};

  &:hover {
    color: ${theme.colors.primary};
  }
`;

export const DescriptionContainer = styled.div`
  margin-top: 1.5rem;

  p {
    margin: 0.5rem 0 0 0;
    line-height: 1.6;
    transition: color ${theme.transitions.default};

    &:hover {
      color: ${theme.colors.primary};
    }
  }
`;

export const SafetyRatings = styled.div`
  display: flex;
  gap: 3rem;
  margin-bottom: 1.5rem;

  @media (max-width: ${theme.breakpoints.tablet}) {
    gap: 1.5rem;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: 1rem;
  }
`;

export const FeaturesList = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
  list-style: none;
  padding: 0;
  margin: 0 0 1.5rem 0;

  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

export const FeatureItem = styled.li`
  display: flex;
  align-items: center;
  padding: 0.75rem;
  background-color: ${theme.colors.glass};
  border-radius: 6px;
  gap: 0.75rem;
  transition: all ${theme.transitions.default};

  &:hover {
    background-color: ${theme.colors.glassDark};
    transform: translateY(-2px);
    box-shadow: 0 4px 8px ${theme.colors.glassDark};
  }
`;

export const FeatureIcon = styled.span`
  color: #4caf50;
  display: flex;
  align-items: center;
  transition: transform ${theme.transitions.default};

  &:hover {
    transform: scale(1.1);
  }
`;

export const ProConContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;

  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

export const ProsContainer = styled.div`
  h4 {
    margin: 0 0 1rem 0;
    color: #4caf50;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

export const ConsContainer = styled.div`
  h4 {
    margin: 0 0 1rem 0;
    color: #f44336;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

export const ProsList = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
`;

export const ConsList = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
`;

export const ProItem = styled.li`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background-color: rgba(76, 175, 80, 0.1);
  border-radius: 6px;
  margin-bottom: 0.75rem;
  transition: all ${theme.transitions.default};

  &:hover {
    background-color: rgba(76, 175, 80, 0.2);
    transform: translateY(-2px);
    box-shadow: 0 3px 6px rgba(76, 175, 80, 0.15);
  }
`;

export const ConItem = styled.li`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background-color: rgba(244, 67, 54, 0.1);
  border-radius: 6px;
  margin-bottom: 0.75rem;
  transition: all ${theme.transitions.default};

  &:hover {
    background-color: rgba(244, 67, 54, 0.2);
    transform: translateY(-2px);
    box-shadow: 0 3px 6px rgba(244, 67, 54, 0.15);
  }
`;

export const ProIcon = styled.span`
  color: #4caf50;
  transition: transform ${theme.transitions.default};

  &:hover {
    transform: scale(1.2);
  }
`;

export const ConIcon = styled.span`
  color: #f44336;
  transition: transform ${theme.transitions.default};

  &:hover {
    transform: scale(1.2);
  }
`;

export const ColorsContainer = styled.div`
  margin-top: 1.5rem;

  h4 {
    margin: 0 0 1rem 0;
    font-size: 1.1rem;
    color: ${theme.colors.primary};
  }
`;

export const ColorsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.25rem;

  @media (max-width: ${theme.breakpoints.mobile}) {
    gap: 1rem;
  }
`;

export const ColorItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  transition: transform ${theme.transitions.default};

  &:hover {
    transform: translateY(-3px);
  }
`;

export const ColorCircle = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  border: 2px solid #e0e0e0;
  box-shadow: 0 2px 4px ${theme.colors.glass};
  transition: all ${theme.transitions.default};

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 4px 8px ${theme.colors.glassDark};
  }
`;

export const ColorName = styled.span`
  font-size: 0.85rem;
  color: ${theme.colors.text};
  transition: color ${theme.transitions.default};

  &:hover {
    color: ${theme.colors.primary};
  }
`;

export const ImagesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;

  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }

  p {
    grid-column: 1 / -1;
    text-align: center;
    color: ${theme.colors.accent};
    padding: 2rem;
  }
`;

export const ImageContainer = styled.div`
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 6px ${theme.colors.glass};
  transition: all ${theme.transitions.default};

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px ${theme.colors.glassDark};
  }

  &:hover button {
    opacity: 1;
  }
`;

export const GalleryImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
  aspect-ratio: 16/9;
  object-fit: cover;
  transition: transform ${theme.transitions.slow};

  &:hover {
    transform: scale(1.05);
  }
`;

export const DeleteImageButton = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  border: none;
  cursor: pointer;
  opacity: 0;
  transition: all ${theme.transitions.default};

  &:hover {
    background-color: #f44336;
    transform: scale(1.1);
  }
`;

export const LoadingIndicator = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50vh;
  color: ${theme.colors.accent};

  svg {
    font-size: 3rem;
    margin-bottom: 1rem;
    color: ${theme.colors.primary};
    animation: ${pulse} 1.5s infinite;
  }
`;

export const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  text-align: center;
  animation: ${fadeIn} 0.5s ease-in-out;

  h2 {
    margin: 1rem 0 0.5rem;
    color: #d32f2f;
  }

  p {
    color: ${theme.colors.accent};
    max-width: 500px;
  }
`;

export const ErrorIcon = styled.div`
  font-size: 4rem;
  color: #f44336;
  margin-bottom: 1rem;
  animation: ${float} 3s ease-in-out infinite;
`;

export const NotificationWrapper = styled.div`
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 1000;
  width: 350px;

  @media (max-width: ${theme.breakpoints.mobile}) {
    width: calc(100% - 2rem);
    right: 1rem;
  }
`;

export const Notification = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  border-radius: 8px;
  background-color: ${(props) =>
    props.type === "error" ? "#fef2f2" : "#f0f9ff"};
  border-left: 4px solid
    ${(props) => (props.type === "error" ? "#f44336" : "#4caf50")};
  box-shadow: 0 4px 12px ${theme.colors.glassDark};
  animation: ${slideUp} 0.3s ease-in-out;
`;

export const NotificationIcon = styled.div`
  margin-right: 1rem;
  color: ${(props) => (props.type === "error" ? "#f44336" : "#4caf50")};
  font-size: 1.25rem;
`;

export const NotificationMessage = styled.div`
  flex: 1;
  color: ${theme.colors.text};
`;

export const NotificationClose = styled.button`
  background: none;
  border: none;
  color: ${theme.colors.accent};
  font-size: 1rem;
  cursor: pointer;
  margin-left: 0.5rem;
  transition: color ${theme.transitions.default};

  &:hover {
    color: ${theme.colors.primary};
  }
`;

export const SpinnerStyles = {
  SpinnerContainer: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    min-height: 300px;
  `,

  SpinnerElement: styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 3px solid ${theme.colors.glass};
    border-top-color: ${theme.colors.primary};
    animation: spin 1s linear infinite;

    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }
  `,
};

export const ErrorStyles = {
  StyledErrorContainer: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    text-align: center;
    background-color: white;
    border-radius: 12px;
    box-shadow: 0 4px 10px ${theme.colors.glass};
    margin: 2rem 0;
    animation: ${fadeIn} 0.5s ease-in-out;

    svg {
      font-size: 3rem;
      color: #f44336;
      margin-bottom: 1rem;
      animation: ${float} 3s ease-in-out infinite;
    }
  `,

  ErrorText: styled.p`
    color: ${theme.colors.text};
    margin-bottom: 1.5rem;
    font-size: 1.1rem;
  `,

  RetryButton: styled.button`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.25rem;
    background-color: ${theme.colors.primary};
    color: white;
    border: none;
    border-radius: 8px;
    font-weight: 500;
    cursor: pointer;
    transition: all ${theme.transitions.default};

    &:hover {
      background-color: ${theme.colors.secondary};
      transform: translateY(-2px);
      box-shadow: 0 4px 12px ${theme.colors.glassDark};
    }

    &:active {
      transform: translateY(0);
    }
  `,
};

export const ToastStyles = {
  ToastContainer: styled.div`
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    padding: 1rem 1.5rem;
    background-color: ${(props) =>
      props.type === "success"
        ? "#4caf50"
        : props.type === "error"
        ? "#f44336"
        : "#2196f3"};
    color: white;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    z-index: 1000;
    animation: ${slideUp} 0.3s ease-in-out;
    max-width: 350px;

    @media (max-width: ${theme.breakpoints.mobile}) {
      right: 1rem;
      left: 1rem;
      max-width: calc(100% - 2rem);
    }
  `,
};
