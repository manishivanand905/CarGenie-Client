import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideUp = keyframes`
  from { transform: translateY(50px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

export const BrandsContainer = styled.section`
  padding: 2rem 1rem;
  max-width: 1440px;
  margin: 0 auto;

  h2 {
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: 1.5rem;
    text-align: center;
    font-size: clamp(1.5rem, 4vw, 2rem);
  }
`;

export const BrandsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1.5rem;
  padding: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 1rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 0.75rem;
  }
`;

export const BrandCard = styled.div`
  background: white;
  border-radius: 0.75rem;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid transparent;

  &:hover,
  &:focus {
    transform: translateY(-5px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
    border-color: ${({ theme }) => theme.colors.primary}20;
  }

  &:active {
    transform: translateY(-2px);
  }
`;

export const BrandLogo = styled.img`
  width: clamp(60px, 15vw, 80px);
  height: clamp(60px, 15vw, 80px);
  object-fit: contain;
  transition: transform 0.3s ease;

  ${BrandCard}:hover & {
    transform: scale(1.05);
  }
`;

export const BrandName = styled.span`
  color: ${({ theme }) => theme.colors.text};
  font-weight: 500;
  text-align: center;
  font-size: clamp(0.875rem, 2vw, 1rem);
`;

export const ViewMoreButton = styled.button`
  margin: 2rem auto 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border: 2px solid ${({ theme }) => theme.colors.primary};
  background: transparent;
  color: ${({ theme }) => theme.colors.primary};
  border-radius: 0.5rem;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: white;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
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
  padding: 1rem;
  animation: ${fadeIn} 0.3s ease;
`;

export const BrandModal = styled.div`
  background: white;
  border-radius: 1rem;
  width: 100%;
  max-width: 900px;
  max-height: 90vh;
  overflow-y: auto;
  animation: ${slideUp} 0.3s ease;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  position: sticky;
  top: 0;
  background: white;
  z-index: 1;

  h3 {
    margin: 0;
    font-size: clamp(1.25rem, 3vw, 1.5rem);
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const ModalContent = styled.div`
  padding: 1.5rem;
`;

export const CarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 1rem;
  }
`;

export const CarCard = styled.div`
  background: white;
  border-radius: 0.75rem;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-4px);
  }

  img {
    width: 100%;
    aspect-ratio: 16/9;
    object-fit: cover;
  }

  h4 {
    margin: 0.75rem 1rem;
    font-size: clamp(1rem, 2vw, 1.125rem);
    color: ${({ theme }) => theme.colors.text};
  }

  p {
    margin: 0 1rem 0.75rem;
    color: ${({ theme }) => theme.colors.textLight};
    font-size: clamp(0.875rem, 1.5vw, 1rem);
  }
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  padding: 0.5rem;
  font-size: 1.25rem;
  transition: all 0.2s ease;
  border-radius: 50%;

  &:hover {
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.primary};
  }
`;
