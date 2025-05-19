import styled, { keyframes } from "styled-components";
import { theme } from "../../../styles/theme";

const slideInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const scaleIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.02); }
  100% { transform: scale(1); }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const CarComparisonCard = styled.div`
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  position: relative;
  height: 430px;
  box-sizing: border-box;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  animation: ${slideUp} 0.5s ease-out;
  animation-delay: ${({ index }) => index * 0.1}s;
  animation-fill-mode: both;

  &:hover {
    transform: ${({ isMobile }) =>
      isMobile ? "translateY(-2px)" : "translateY(-5px)"};
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  }
`;

export const AddCarSlot = styled.div`
  background: white;
  border-radius: 20px;
  border: 2px dashed ${theme.colors.accent}40;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-sizing: border-box;
  height: 430px;
  animation: ${scaleIn} 0.5s ease-out;

  svg {
    font-size: 2.5rem;
    color: ${theme.colors.accent};
    animation: ${pulse} 2s infinite;
  }

  span {
    color: ${theme.colors.primary};
    font-size: 1.2rem;
    font-weight: 500;
    animation: ${slideUp} 0.5s ease-out;
    text-align: center;
  }

  p {
    color: ${theme.colors.secondary};
    font-size: 0.9rem;
    animation: ${slideUp} 0.6s ease-out;
    text-align: center;
  }

  &:hover {
    border-color: ${theme.colors.accent};
    background: ${theme.colors.glass};
    transform: ${({ isMobile }) =>
      isMobile ? "translateY(-2px)" : "translateY(-5px)"};
  }
`;

export const HorizontalScrollContainer = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 1rem;
  padding: 0.5rem 0.5rem 1.5rem 0.5rem;
  margin: 0 -1rem 2rem -1rem;
  scroll-snap-type: x mandatory;
  scroll-padding: 1rem;
  -webkit-overflow-scrolling: touch;

  /* Hide scrollbar but keep functionality */
  &::-webkit-scrollbar {
    height: 4px;
  }

  &::-webkit-scrollbar-track {
    background: ${theme.colors.glass};
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${theme.colors.glassDark};
    border-radius: 10px;
  }

  & > ${CarComparisonCard}, & > ${AddCarSlot} {
    min-width: 300px;
    width: 300px;
    flex: 0 0 auto;
    scroll-snap-align: start;
  }

  &:after {
    content: "";
    min-width: 1rem;
  }

  @media (min-width: ${theme.breakpoints.mobile}) and (max-width: ${theme
      .breakpoints.tablet}) {
    & > ${CarComparisonCard}, & > ${AddCarSlot} {
      min-width: 320px;
      width: 320px;
    }
  }
`;

export const SelectedCarsSection = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
  width: 100%;
  flex-wrap: warp;

  @media (min-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  }

  @media (min-width: ${theme.breakpoints.desktop}) {
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  }
`;

export const CarImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  transition: transform 0.3s ease;

  ${CarComparisonCard}:hover & {
    transform: scale(1.05);
  }
`;

export const CarDetails = styled.div`
  padding: 1.5rem;
  animation: ${slideUp} 0.5s ease-out;

  h3 {
    color: ${theme.colors.primary};
    font-size: 1.4rem;
    margin-bottom: 0.8rem;
  }

  .price {
    color: ${theme.colors.accent};
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    animation: ${slideInRight} 0.5s ease-out;
  }

  .brand {
    color: ${theme.colors.secondary};
    font-size: 1rem;
    margin-bottom: 0.5rem;
    animation: ${slideInRight} 0.6s ease-out;
  }

  .engine {
    color: ${theme.colors.secondary};
    font-size: 0.9rem;
    opacity: 0.8;
    animation: ${slideInRight} 0.7s ease-out;
  }
`;

export const DetailText = styled.p`
  color: ${theme.colors.secondary};
  font-size: 0.9rem;
  line-height: 1.5;
  margin-top: 1rem;
  animation: ${slideUp} 0.7s ease-out;

  @media (max-width: ${theme.breakpoints.mobile}) {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;

export const RemoveButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(255, 255, 255, 0.9);
  color: ${theme.colors.primary};
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  opacity: 0;
  transform: translateY(-10px);
  z-index: 5;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);

  @media (max-width: ${theme.breakpoints.mobile}) {
    opacity: 1;
    transform: translateY(0);
    width: 40px;
    height: 40px;
  }

  ${CarComparisonCard}:hover & {
    opacity: 1;
    transform: translateY(0);
  }

  &:hover {
    background: ${theme.colors.primary};
    color: white;
    transform: rotate(90deg);
  }
`;

export const EmptyStateMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 3rem 1rem;
  gap: 1.5rem;
  animation: ${fadeIn} 0.5s ease-out;
  width: 100%;
  min-height: 430px;

  svg {
    color: ${theme.colors.accent}80;
  }

  h3 {
    color: ${theme.colors.primary};
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  p {
    color: ${theme.colors.secondary};
    font-size: 1rem;
    max-width: 300px;
    margin: 0 auto;
    line-height: 1.5;
  }
`;

export const EmptyStateAddCar = styled(AddCarSlot)`
  margin: 0 auto;
  max-width: 90%;
  height: 150px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
`;
