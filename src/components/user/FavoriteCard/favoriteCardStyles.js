import styled, { keyframes } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Animations
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideIn = keyframes`
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
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

// Page containers and elements
export const FavoritesPageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  animation: ${fadeIn} 0.5s ease-in-out;
`;

export const PageHeader = styled.div`
  margin-bottom: 30px;
  padding-bottom: 15px;
  border-bottom: 1px solid #eaeaea;
`;

export const PageTitle = styled.h1`
  font-size: 28px;
  font-weight: 600;
  color: #333;
`;

export const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
  margin-top: 20px;
`;

// Empty state components
export const EmptyStateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  margin: 40px auto;
  max-width: 600px;
  text-align: center;
  animation: ${slideIn} 0.5s ease-in-out;
`;

export const EmptyStateIcon = styled.div`
  color: #d1d5db;
  margin-bottom: 24px;
`;

export const EmptyStateText = styled.p`
  font-size: 18px;
  color: #6b7280;
  margin-bottom: 24px;
`;

export const EmptyStateButton = styled.button`
  background-color: #3b82f6;
  color: white;
  font-weight: 500;
  padding: 12px 24px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out, transform 0.2s ease-in-out;

  &:hover {
    background-color: #2563eb;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

// Card components
export const CardContainer = styled.div`
  background-color: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  animation: ${slideIn} 0.5s ease-in-out;
  position: relative;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  }
`;

export const CardHeader = styled.div`
  position: relative;
  width: 100%;
  height: 180px;
  overflow: hidden;
`;

export const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;

  ${CardContainer}:hover & {
    transform: scale(1.05);
  }
`;

export const CardImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.1),
    rgba(0, 0, 0, 0.3)
  );
  opacity: 0;
  transition: opacity 0.3s ease;

  ${CardContainer}:hover & {
    opacity: 1;
  }
`;

export const RemoveButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: rgba(255, 255, 255, 0.9);
  color: #ef4444;
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: 0;
  transform: translateY(-5px);
  transition: opacity 0.3s ease, transform 0.3s ease, background-color 0.2s ease;
  z-index: 2;

  ${CardContainer}:hover & {
    opacity: 1;
    transform: translateY(0);
  }

  &:hover {
    background-color: rgba(255, 255, 255, 1);
    animation: ${pulse} 0.3s ease-in-out;
  }
`;

export const CardContent = styled.div`
  padding: 16px;
`;

export const CardTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin-bottom: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  font-size: 14px;
`;

export const RatingStar = styled(FontAwesomeIcon)`
  color: #f59e0b;
  margin-right: 5px;
`;

export const ReviewCount = styled.span`
  color: #6b7280;
  margin-left: 5px;
`;

export const PriceTag = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #10b981;
  margin-bottom: 10px;
`;

export const LocationText = styled.div`
  font-size: 14px;
  color: #6b7280;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const ActionButton = styled.button`
  width: 100%;
  padding: 10px 0;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #2563eb;
  }
`;
