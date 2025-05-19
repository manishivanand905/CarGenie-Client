import styled, { keyframes, css } from "styled-components";
import { theme } from "../../../styles/theme";

export const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

export const slideUp = keyframes`
  from { transform: translateY(50px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

export const slideInLeft = keyframes`
  from { transform: translateX(-50px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;

export const slideInRight = keyframes`
  from { transform: translateX(50px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;

export const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

export const shimmer = keyframes`
  0% { background-position: -1000px 0; }
  100% { background-position: 1000px 0; }
`;

const cardHoverEffect = css`
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 15px 35px rgba(91, 35, 51, 0.15);
  }
`;

// Enhance container
export const BrandDetailsContainer = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 2.5rem 2rem;
  animation: ${fadeIn} 0.6s ease-in-out;
  background: ${({ theme }) => theme.colors.background || "#f9f9f9"};
  border-radius: 1.5rem;

  @media (max-width: 768px) {
    padding: 2rem 1.5rem;
  }
`;

// Enhance header
export const BrandHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  margin-bottom: 3rem;

  @media (min-width: 992px) {
    flex-direction: row;
    align-items: flex-start;
  }
`;
export const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
  border-radius: 1.5rem;
  box-shadow: 0 15px 35px rgba(91, 35, 51, 0.12);
  padding: 2.5rem;
  width: 100%;
  max-width: 300px;
  height: 220px;
  margin: 0 auto;
  animation: ${slideInLeft} 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
  overflow: hidden;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      45deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transform: translateX(-100%);
    transition: transform 0.6s ease;
  }

  &:hover {
    transform: translateY(-10px) scale(1.05);
    box-shadow: 0 20px 45px rgba(91, 35, 51, 0.18);

    &:before {
      transform: translateX(100%);
    }
  }

  @media (min-width: 992px) {
    margin: 0;
  }
`;

export const BrandLogo = styled.img`
  max-width: 220px;
  max-height: 170px;
  object-fit: contain;
  transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  filter: drop-shadow(0 5px 10px rgba(0, 0, 0, 0.1));

  ${LogoContainer}:hover & {
    transform: scale(1.15) rotate(2deg);
  }
`;

export const BrandInfo = styled.div`
  flex: 1;
  animation: ${slideInRight} 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
`;

export const BrandName = styled.h1`
  font-size: clamp(2.2rem, 6vw, 3.5rem);
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 1.2rem;
  position: relative;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.05);
  letter-spacing: -0.5px;

  &:after {
    content: "";
    position: absolute;
    bottom: -12px;
    left: 0;
    width: 100px;
    height: 5px;
    background: ${({ theme }) =>
      `inear-gradient(to right, ${theme.colors.accent}, ${theme.colors.primary}80)`};
    border-radius: 2.5px;
    transition: width 0.3s ease;
  }

  &:hover:after {
    width: 150px;
  }
`;

export const BrandDescription = styled.p`
  font-size: clamp(1.1rem, 3vw, 1.35rem);
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 2rem;
  text-shadow: 0.5px 0.5px 1px rgba(0, 0, 0, 0.03);
  max-width: 95%;
  white-space: pre-line;
`;

export const BrandDetailsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.8rem;
  margin-bottom: 4rem;
  animation: ${fadeIn} 0.9s ease-in-out;
`;

export const DetailCard = styled.div`
  background: white;
  border-radius: 1rem;
  padding: 1.8rem;
  box-shadow: 0 8px 20px rgba(91, 35, 51, 0.08);
  ${cardHoverEffect}
  position: relative;
  overflow: hidden;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 0;
    background: ${({ theme }) => theme.colors.accent};
    transition: height 0.3s ease;
  }

  &:hover:before {
    height: 100%;
  }
`;

export const DetailLabel = styled.span`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textLight || theme.colors.text + "80"};
  text-transform: uppercase;
  letter-spacing: 1.2px;
  display: block;
  margin-bottom: 0.7rem;
  font-weight: 500;
`;

export const DetailValue = styled.span`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.text};
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  svg {
    color: ${({ theme }) => theme.colors.primary};
    transition: transform 0.3s ease;
  }

  &:hover svg {
    transform: scale(1.2);
  }

  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
      color: ${({ theme }) => theme.colors.accent};
      text-decoration: underline;
    }
  }
`;

export const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  margin-bottom: 2rem;
  padding: 0.5rem 0;
  transition: all 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
    transform: translateX(-5px);
  }

  svg {
    transition: transform 0.2s ease;
  }

  &:hover svg {
    transform: translateX(-3px);
  }
`;

export const SectionTitle = styled.h2`
  font-size: clamp(1.6rem, 4vw, 2.2rem);
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 2rem;
  position: relative;
  display: inline-block;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.05);

  &:after {
    content: "";
    position: absolute;
    bottom: -12px;
    left: 0;
    width: 70px;
    height: 4px;
    background: ${({ theme }) =>
      `linear-gradient(to right, ${theme.colors.accent}, ${theme.colors.primary}50)`};
    border-radius: 2px;
    transition: width 0.3s ease, transform 0.3s ease;
  }

  &:hover:after {
    width: 100%;
    transform: translateX(5px);
  }
`;

export const CarSectionContainer = styled.div`
  margin-top: 5rem;
  animation: ${slideUp} 1.1s ease-in-out;
  padding: 2rem;
  background: ${({ theme }) =>
    `linear-gradient(135deg, ${theme.colors.primary}05, ${theme.colors.accent}10)`};
  border-radius: 1.5rem;
  box-shadow: 0 10px 30px rgba(91, 35, 51, 0.05);
`;

export const CarsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2.5rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

export const CarCard = styled.div`
  background: white;
  border-radius: 1.2rem;
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(91, 35, 51, 0.1);
  transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  animation: ${fadeIn} 1.2s ease-in-out;
  animation-fill-mode: both;
  animation-delay: ${(props) => props.index * 0.15}s;
  position: relative;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 5px;
    background: ${({ theme }) =>
      `linear-gradient(to right, ${theme.colors.primary}, ${theme.colors.accent})`};
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 1;
  }

  &:hover {
    transform: translateY(-15px) scale(1.03);
    box-shadow: 0 20px 40px rgba(91, 35, 51, 0.18);

    &:before {
      opacity: 1;
    }
  }
`;

export const CarImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 220px;
  overflow: hidden;

  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 50%;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.3), transparent);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  ${CarCard}:hover &:after {
    opacity: 1;
  }
`;

export const CarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.7s cubic-bezier(0.33, 1, 0.68, 1);

  ${CarCard}:hover & {
    transform: scale(1.15);
  }
`;

export const CarInfo = styled.div`
  padding: 1.8rem;
  position: relative;
`;

export const CarModel = styled.h3`
  font-size: 1.4rem;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 0.7rem;
  transition: color 0.3s ease;
  position: relative;
  display: inline-block;

  &:after {
    content: "";
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 2px;
    background: ${({ theme }) => theme.colors.accent};
    transition: width 0.3s ease;
  }

  ${CarCard}:hover &:after {
    width: 100%;
  }
`;

export const CarYearPrice = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.2rem;
  padding-bottom: 0.8rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border || "#eee"};
`;

export const CarYear = styled.span`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.text};
  font-weight: 500;
  background: ${({ theme }) => theme.colors.primary + "10"};
  padding: 0.3rem 0.8rem;
  border-radius: 1rem;
  transition: all 0.3s ease;

  ${CarCard}:hover & {
    background: ${({ theme }) => theme.colors.primary + "20"};
  }
`;

export const CarPrice = styled.span`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.accent};
  font-weight: 700;
  background: ${({ theme }) => theme.colors.accent + "15"};
  padding: 0.3rem 0.8rem;
  border-radius: 1rem;
  transition: all 0.3s ease;

  ${CarCard}:hover & {
    background: ${({ theme }) => theme.colors.accent + "25"};
    transform: scale(1.05);
  }
`;

export const CarDetails = styled.div`
  margin-top: 1.2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;

export const CarDetail = styled.div`
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-3px);
  }
`;

export const CarDetailLabel = styled.span`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textLight || theme.colors.text + "80"};
  margin-bottom: 0.3rem;
  font-weight: 500;
`;

export const CarDetailValue = styled.span`
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.text};
  font-weight: 600;
  position: relative;
  display: inline-block;

  &:after {
    content: "";
    position: absolute;
    bottom: -3px;
    left: 0;
    width: 0;
    height: 1px;
    background: ${({ theme }) => theme.colors.accent};
    transition: width 0.3s ease;
  }

  ${CarDetail}:hover &:after {
    width: 100%;
  }
`;

export const ViewMoreDetails = styled.button`
  width: 100%;
  padding: 0.9rem;
  margin-top: 1.5rem;
  background: ${({ theme }) => theme.colors.primary + "15"};
  color: ${({ theme }) => theme.colors.primary};
  border: none;
  border-radius: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
  overflow: hidden;
  z-index: 1;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 100%;
    background: ${({ theme }) => theme.colors.primary};
    transition: width 0.4s ease;
    z-index: -1;
  }

  &:hover {
    color: white;
    transform: translateY(-3px);
    box-shadow: 0 5px 15px ${({ theme }) => theme.colors.primary + "40"};

    &:before {
      width: 100%;
    }
  }
`;

export const CarModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1.5rem;
  animation: ${fadeIn} 0.4s ease;
`;

export const CarModal = styled.div`
  background: white;
  border-radius: 1.5rem;
  width: 100%;
  max-width: 950px;
  max-height: 90vh;
  overflow-y: auto;
  animation: ${slideUp} 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);

  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.primary + "50"};
    border-radius: 10px;

    &:hover {
      background: ${({ theme }) => theme.colors.primary};
    }
  }
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.8rem 2rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border || "#eee"};
  position: sticky;
  top: 0;
  background: white;
  z-index: 1;
  border-top-left-radius: 1.5rem;
  border-top-right-radius: 1.5rem;

  h3 {
    margin: 0;
    font-size: clamp(1.3rem, 3vw, 1.7rem);
    color: ${({ theme }) => theme.colors.primary};
    position: relative;
    display: inline-block;

    &:after {
      content: "";
      position: absolute;
      bottom: -8px;
      left: 0;
      width: 50px;
      height: 3px;
      background: ${({ theme }) => theme.colors.accent};
      border-radius: 1.5px;
      transition: width 0.3s ease;
    }

    &:hover:after {
      width: 100%;
    }
  }
`;

export const ModalContent = styled.div`
  padding: 2rem;
`;

export const CarModalInfo = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2.5rem;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

export const CarModalImage = styled.img`
  width: 100%;
  height: 350px;
  object-fit: cover;
  border-radius: 1rem;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  transition: all 0.5s ease;

  &:hover {
    transform: scale(1.03);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
  }
`;

export const CarModalDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const CarModalDetailGroup = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.border || "#eee"};
  padding-bottom: 1rem;
  transition: transform 0.3s ease;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    transform: translateX(8px);
  }
`;

export const CarModalDetailLabel = styled.span`
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.textLight || theme.colors.text + "80"};
  display: block;
  margin-bottom: 0.4rem;
  font-weight: 500;
  letter-spacing: 0.5px;
`;

export const CarModalDetailValue = styled.span`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.text};
  font-weight: 600;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  div {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    transition: transform 0.3s ease;

    &:hover {
      transform: translateX(5px);
    }

    svg {
      color: ${({ theme }) => theme.colors.accent};
      font-size: 1.2rem;
    }
  }
`;

export const FeaturesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0.5rem 0 0 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.8rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const FeatureItem = styled.li`
  display: flex;
  align-items: center;
  gap: 0.7rem;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text};
  padding: 0.5rem 0;
  transition: all 0.3s ease;
  border-radius: 0.5rem;

  &:hover {
    transform: translateX(5px);
    padding-left: 0.5rem;
    background: ${({ theme }) => theme.colors.background || "#f9f9f9"};
  }

  svg {
    color: ${({ theme }) => theme.colors.accent};
    font-size: 1.1rem;
    transition: transform 0.3s ease;
  }

  &:hover svg {
    transform: scale(1.2);
  }
`;

export const CloseButton = styled.button`
  background: ${({ theme }) => theme.colors.background || "#f9f9f9"};
  border: none;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  width: 40px;
  height: 40px;
  font-size: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: white;
    transform: rotate(90deg);
  }
`;

export const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 1.8rem;
  margin: 2.5rem 0;
`;

export const StatCard = styled.div`
  background: white;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 8px 20px rgba(91, 35, 51, 0.1);
  text-align: center;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  animation: ${fadeIn} 0.9s ease-in-out;
  animation-delay: ${(props) => props.index * 0.15}s;
  animation-fill-mode: both;
  position: relative;
  overflow: hidden;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 0;
    background: ${({ theme }) =>
      `linear-gradient(to bottom, ${theme.colors.primary}20, transparent)`};
    transition: height 0.3s ease;
    z-index: 0;
  }

  &:hover {
    transform: translateY(-8px) scale(1.05);
    box-shadow: 0 15px 30px rgba(91, 35, 51, 0.15);

    &:before {
      height: 100%;
    }
  }
`;

export const StatValue = styled.div`
  font-size: 1.9rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 0.7rem;
  position: relative;
  z-index: 1;
  transition: transform 0.3s ease;

  ${StatCard}:hover & {
    transform: scale(1.1);
  }
`;

export const StatLabel = styled.div`
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.textLight || theme.colors.text + "80"};
  position: relative;
  z-index: 1;
  font-weight: 500;
  letter-spacing: 0.5px;
  transition: color 0.3s ease;

  ${StatCard}:hover & {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const ActionButton = styled.button`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: none;
  background: ${theme.colors.primary};
  color: white;
  cursor: pointer;
  transition: all ${theme.transitions.default};
  box-shadow: 0 2px 8px rgba(91, 35, 51, 0.2);

  &:hover {
    background: ${theme.colors.secondary};
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(91, 35, 51, 0.25);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    width: 38px;
    height: 38px;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    width: 36px;
    height: 36px;
    font-size: 0.9rem;
  }

  @media (max-width: 400px) {
    width: 32px;
    height: 32px;
    font-size: 0.8rem;
  }
`;
const fadeInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const popIn = keyframes`
  0% {
    transform: scale(0.8);
    opacity: 0;
  }
  70% {
    transform: scale(1.1);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

const slideInNotification = keyframes`
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

export const NotificationWrapper = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
  animation: ${slideInNotification} 0.3s ease-out forwards;

  ${({ type }) =>
    type === "error"
      ? css`
          background-color: #ffebee;
          border-left: 4px solid #f44336;
        `
      : css`
          background-color: #e8f5e9;
          border-left: 4px solid #4caf50;
        `}

  box-shadow: 0 8px 20px rgba(91, 35, 51, 0.15);
  border-radius: 6px;
  overflow: hidden;
  max-width: 400px;
  width: calc(100% - 40px);

  @media (max-width: ${theme.breakpoints.mobile}) {
    right: 10px;
    top: 10px;
    max-width: calc(100% - 20px);
  }
`;

export const NotificationContent = styled.div`
  display: flex;
  align-items: center;
  padding: 15px;

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 12px;
  }

  @media (max-width: 400px) {
    padding: 10px;
  }
`;

export const NotificationIcon = styled.div`
  margin-right: 15px;

  svg {
    font-size: 24px;
    color: ${({ type }) => (type === "error" ? "#f44336" : "#4caf50")};
    animation: ${popIn} 0.3s ease-out;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    margin-right: 12px;

    svg {
      font-size: 22px;
    }
  }

  @media (max-width: 400px) {
    margin-right: 10px;

    svg {
      font-size: 20px;
    }
  }
`;

export const NotificationMessage = styled.p`
  margin: 0;
  flex-grow: 1;
  font-size: 14px;
  color: ${theme.colors.text};
  line-height: 1.4;

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 13px;
  }

  @media (max-width: 400px) {
    font-size: 12px;
    line-height: 1.3;
  }
`;

export const NotificationCloseButton = styled.button`
  background: transparent;
  border: none;
  color: #999;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  transition: all ${theme.transitions.default};
  margin-left: 10px;

  &:hover {
    background-color: rgba(91, 35, 51, 0.08);
    color: ${theme.colors.text};
    transform: rotate(90deg);
  }

  @media (max-width: 400px) {
    width: 20px;
    height: 20px;
  }
`;

export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  gap: 1rem;
  color: ${theme.colors.primary};

  svg {
    animation: ${pulse} 1.5s infinite ease-in-out;
  }

  @media (max-width: ${theme.breakpoints.desktop}) {
    min-height: 350px;
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    min-height: 300px;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    min-height: 250px;
  }
`;

export const HeaderActions = styled.div`
  display: flex;
  gap: 0.75rem;
  animation: ${fadeInRight} 0.4s ease-out;

  @media (max-width: ${theme.breakpoints.mobile}) {
    position: absolute;
    top: 0.75rem;
    right: 0.75rem;
    gap: 0.5rem;
  }
`;
