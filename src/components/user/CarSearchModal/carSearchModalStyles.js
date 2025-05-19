import styled, { keyframes, css } from "styled-components";
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
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
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

const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 ${theme.colors.glassDark};
  }
  70% {
    box-shadow: 0 0 0 10px rgba(91, 35, 51, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(91, 35, 51, 0);
  }
`;

export const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
  animation: ${fadeIn} 0.3s ease;

  @media (max-width: ${theme.breakpoints.mobile}) {
    align-items: flex-start;
  }
`;

export const PopupContainer = styled.div`
  background-color: ${theme.colors.background};
  width: 95%;
  max-width: 1200px;
  max-height: 90vh;
  border-radius: 20px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  animation: ${slideUp} 0.4s ease;
  overflow: hidden;
  position: relative;

  @media (max-width: ${theme.breakpoints.mobile}) {
    width: 100%;
    height: 100%;
    max-height: 100%;
    border-radius: 0;
  }

  @media (min-width: ${theme.breakpoints.tablet}) {
    width: 85%;
    max-height: 90vh;
  }
`;

export const PopupHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 2rem;
  border-bottom: 1px solid ${theme.colors.glass};

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 1.2rem 1.5rem;
  }
`;

export const PopupTitle = styled.h2`
  color: ${theme.colors.primary};
  font-size: 1.6rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.8rem;

  svg {
    color: ${theme.colors.accent};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 1.4rem;
  }

  @media (min-width: ${theme.breakpoints.tablet}) {
    font-size: 1.8rem;
  }
`;

export const CloseButton = styled.button`
  background: transparent;
  color: ${theme.colors.secondary};
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all ${theme.transitions.default};
  font-size: 1.2rem;

  &:hover {
    background: ${theme.colors.glass};
    color: ${theme.colors.primary};
    transform: rotate(90deg);
  }
`;

export const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 1.5rem 2rem;
  position: relative;
  gap: 1rem;

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 1rem;
    flex-direction: column;
    align-items: stretch;
  }
`;

export const SearchIcon = styled.div`
  position: absolute;
  left: 3rem;
  top: 50%;
  transform: translateY(-50%);
  color: ${theme.colors.secondary};
  font-size: 1.2rem;
  pointer-events: none;

  @media (max-width: ${theme.breakpoints.mobile}) {
    left: 1.5rem;
    top: 1.6rem;
    transform: none;
  }
`;

export const SearchInput = styled.input`
  flex: 1;
  height: 50px;
  border-radius: 25px;
  padding: 0 1.5rem 0 3.5rem;
  border: none;
  background-color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  font-size: 1rem;
  transition: all ${theme.transitions.default};
  color: ${theme.colors.primary};

  @media (max-width: ${theme.breakpoints.mobile}) {
    width: 100%;
    margin-bottom: 1rem;
  }

  &:focus {
    outline: none;
    box-shadow: 0 4px 15px rgba(91, 35, 51, 0.15);
  }

  &::placeholder {
    color: ${theme.colors.glassDark};

    @media (max-width: ${theme.breakpoints.mobile}) {
      font-size: 0.9rem;
    }
  }
`;

export const FilterContainer = styled.div`
  position: relative;

  @media (max-width: ${theme.breakpoints.mobile}) {
    width: 100%;
  }
`;

export const FilterButton = styled.button`
  height: 50px;
  border-radius: 25px;
  padding: 0 1.5rem;
  background-color: ${({ $isActive }) =>
    $isActive ? theme.colors.primary : "white"};
  color: ${({ $isActive }) => ($isActive ? "white" : theme.colors.secondary)};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  gap: 0.8rem;
  transition: all ${theme.transitions.default};
  font-weight: 500;
  animation: ${({ $isActive }) =>
    $isActive
      ? css`
          ${pulse} 2s infinite
        `
      : "none"};

  @media (max-width: ${theme.breakpoints.mobile}) {
    width: 100%;
    justify-content: center;
  }

  &:hover {
    background-color: ${({ $isActive }) =>
      $isActive ? theme.colors.primary : theme.colors.glass};
    transform: translateY(-2px);
  }

  .count {
    background: white;
    color: ${theme.colors.primary};
    width: 20px;
    height: 20px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.75rem;
    font-weight: 600;
  }

  .chevron {
    font-size: 0.75rem;
    transition: transform ${theme.transitions.default};
    transform: ${({ $isActive }) =>
      $isActive ? "rotate(180deg)" : "rotate(0)"};
  }
`;

export const FilterDropdown = styled.div`
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  background: white;
  border-radius: 15px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  width: 280px;
  padding: 1.5rem;
  animation: ${fadeIn} 0.3s ease;
  z-index: 5;
  max-height: 500px;
  overflow-y: auto;

  @media (max-width: ${theme.breakpoints.mobile}) {
    width: 100%;
    left: 0;
    right: 0;
    border-radius: 12px;
    padding: 1.2rem;
  }

  h4 {
    color: ${theme.colors.primary};
    margin: 0 0 0.8rem 0;
    font-size: 1rem;

    &:not(:first-child) {
      margin-top: 1.5rem;
    }
  }

  .filter-options {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  @media (min-width: ${theme.breakpoints.tablet}) {
    width: 320px;
  }
`;

export const FilterOption = styled.div`
  padding: 0.5rem 1rem;
  border-radius: 20px;
  background: ${({ $isSelected }) =>
    $isSelected ? theme.colors.primary : theme.colors.glass};
  color: ${({ $isSelected }) => ($isSelected ? "white" : theme.colors.primary)};
  font-size: 0.9rem;
  cursor: pointer;
  transition: all ${theme.transitions.default};

  &:hover {
    background: ${({ $isSelected }) =>
      $isSelected ? theme.colors.primary : theme.colors.glassDark};
    transform: translateY(-2px);
  }
`;

export const SelectedFilters = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  padding: 0 2rem 1.5rem;
  animation: ${fadeIn} 0.4s ease;

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 0 1rem 1rem;
  }
`;

export const FilterTag = styled.div`
  display: flex;
  align-items: center;
  background-color: ${theme.colors.glass};
  border-radius: 20px;
  padding: 0.5rem 0.8rem;
  transition: all ${theme.transitions.default};

  &:hover {
    background-color: ${theme.colors.glassDark};
  }
`;

export const FilterTagText = styled.span`
  color: ${theme.colors.primary};
  font-size: 0.9rem;
  font-weight: 500;
`;

export const FilterTagClose = styled.button`
  background: transparent;
  color: ${theme.colors.secondary};
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 0.5rem;
  font-size: 0.7rem;
  transition: all ${theme.transitions.default};

  &:hover {
    background-color: ${theme.colors.primary};
    color: white;
    transform: rotate(90deg);
  }
`;

export const CarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  padding: 0 2rem 2rem;
  overflow-y: auto;
  max-height: calc(85vh - 200px);

  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    padding: 0 1rem 1.5rem;
    gap: 1.2rem;
    max-height: calc(100vh - 200px);
  }

  @media (min-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }

  @media (min-width: ${theme.breakpoints.desktop}) {
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  }

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: ${theme.colors.glass};
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${theme.colors.glassDark};
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${theme.colors.accent};
  }
`;

export const CarCard = styled.div`
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.06);
  transition: all ${theme.transitions.default};
  position: relative;
  display: flex;
  flex-direction: column;
  animation: ${slideUp} 0.5s ease backwards;
  animation-delay: ${({ $index }) => ($index || 0) * 0.05}s;
  height: 100%;

  @media (max-width: ${theme.breakpoints.mobile}) {
    border-radius: 12px;
    margin-bottom: 0;
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  }
`;

export const CarImage = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
  transition: transform 0.5s ease;
  cursor: pointer;

  @media (max-width: ${theme.breakpoints.mobile}) {
    height: 160px;
  }

  ${CarCard}:hover & {
    transform: scale(1.05);
  }
`;

export const CarInfo = styled.div`
  padding: 1.2rem;
  flex: 1;
`;

export const CarName = styled.h3`
  color: ${theme.colors.primary};
  font-size: 1.2rem;
  margin-bottom: 0.3rem;
  transition: color ${theme.transitions.default};
  cursor: pointer;

  ${CarCard}:hover & {
    color: ${theme.colors.accent};
  }

  &:hover {
    text-decoration: underline;
  }
`;

export const CarBrand = styled.div`
  color: ${theme.colors.secondary};
  font-size: 0.9rem;
  margin-bottom: 1rem;
  font-weight: 500;
`;

export const CarSpecsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin-bottom: 1rem;
`;

export const CarSpec = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: ${theme.colors.secondary};

  svg {
    color: ${theme.colors.accent};
  }
`;

export const CarPrice = styled.div`
  color: ${theme.colors.primary};
  font-size: 1.2rem;
  font-weight: 600;
  margin-top: auto;
`;

export const AddCarButton = styled.button`
  background: ${theme.colors.primary};
  color: white;
  padding: 1rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  transition: all ${theme.transitions.default};
  margin-top: auto;
  font-size: 0.95rem;

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 0.9rem;
    position: relative;
    z-index: 2;
    font-size: 0.9rem;
  }

  &:hover {
    background: ${theme.colors.accent};
  }

  svg {
    transition: transform ${theme.transitions.default};
  }

  &:hover svg {
    transform: rotate(90deg);
  }
`;

export const EmptyResults = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  text-align: center;
  animation: ${fadeIn} 0.5s ease;
  flex: 1;

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 3rem 1.5rem;
  }

  svg {
    font-size: 3rem;
    color: ${theme.colors.glassDark};
    margin-bottom: 1.5rem;
  }

  h3 {
    color: ${theme.colors.primary};
    font-size: 1.5rem;
    margin-bottom: 0.8rem;
  }

  p {
    color: ${theme.colors.secondary};
    font-size: 1rem;
  }
`;

export const LoaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  animation: ${fadeIn} 0.3s ease;
  flex: 1;

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 3rem 1.5rem;
  }

  .spinner {
    width: 60px;
    height: 60px;
    border: 4px solid ${theme.colors.glass};
    border-top: 4px solid ${theme.colors.primary};
    border-radius: 50%;
    animation: ${spin} 1s linear infinite;
    margin-bottom: 1.5rem;
  }

  p {
    color: ${theme.colors.secondary};
    font-size: 1rem;
  }
`;

export const RemoveButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(255, 255, 255, 0.9);
  color: #ff4444;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 5;

  @media (max-width: ${theme.breakpoints.mobile}) {
    opacity: 1;
    transform: translateY(0);
    background: rgba(255, 255, 255, 0.95);
    width: 40px;
    height: 40px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }

  &:hover {
    background: #ff4444;
    color: white;
    transform: rotate(90deg);
  }
`;
