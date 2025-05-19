import styled, { keyframes, css } from "styled-components";
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

const pulseAnimation = keyframes`
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(91, 35, 51, 0.7);
  }
  
  70% {
    transform: scale(1);
    box-shadow: 0 0 0 10px rgba(91, 35, 51, 0);
  }
  
  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(91, 35, 51, 0);
  }
`;

const rotateAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
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

export const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  animation: ${fadeIn} 0.5s ease-in-out;
  position: relative;

  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: 15px;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 10px;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  position: relative;

  &:after {
    content: "";
    position: absolute;
    bottom: -10px;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(
      to right,
      transparent,
      ${theme.colors.primary},
      transparent
    );
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: 15px;
  }
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 15px;
`;

export const AddButton = styled.button`
  background-color: ${theme.colors.primary};
  color: white;
  border-radius: 5px;
  padding: 10px 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  font-weight: 500;
  transition: all ${theme.transitions.default};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
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
    transition: all 0.6s ease;
  }

  &:hover {
    background-color: ${theme.colors.secondary};
    transform: translateY(-3px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);

    &:before {
      left: 100%;
    }

    svg {
      animation: ${rotateAnimation} 1s ease;
    }
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

export const ViewToggleContainer = styled.div`
  display: flex;
  gap: 5px;
  background-color: ${theme.colors.glass};
  border-radius: 8px;
  padding: 5px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  transition: all ${theme.transitions.default};

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

export const ViewToggleButton = styled.button`
  background-color: ${({ active }) => (active ? "white" : "transparent")};
  color: ${({ active }) => (active ? theme.colors.primary : theme.colors.text)};
  width: 40px;
  height: 40px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all ${theme.transitions.default};
  position: relative;
  overflow: hidden;

  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
      circle at center,
      ${theme.colors.glassDark} 0%,
      transparent 70%
    );
    opacity: 0;
    transition: opacity ${theme.transitions.default};
  }

  &:hover {
    background-color: ${({ active }) =>
      active ? "white" : theme.colors.glassDark};
    transform: ${({ active }) => (active ? "none" : "translateY(-2px)")};

    &:after {
      opacity: 0.4;
    }

    svg {
      transform: scale(1.2);
    }
  }

  svg {
    position: relative;
    z-index: 2;
    transition: transform ${theme.transitions.default};
  }
`;

export const SearchFilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
  gap: 15px;

  @media (max-width: ${theme.breakpoints.mobile}) {
    flex-direction: column;
  }
`;

export const SearchBar = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: white;
  border-radius: 8px;
  padding: 0 15px;
  flex-grow: 1;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  border: 1px solid ${theme.colors.glass};
  transition: all ${theme.transitions.default};

  svg {
    color: ${theme.colors.primary};
    transition: transform ${theme.transitions.default};
  }

  &:focus-within {
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 3px ${theme.colors.glass};
    transform: translateY(-2px);

    svg {
      transform: scale(1.1) rotate(-15deg);
    }
  }

  &:hover {
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }
`;

export const SearchInput = styled.input`
  padding: 12px 0;
  border: none;
  outline: none;
  width: 100%;
  font-size: 16px;
  transition: all ${theme.transitions.default};

  &::placeholder {
    color: #aaa;
    transition: color ${theme.transitions.default};
  }

  &:focus::placeholder {
    color: ${theme.colors.glassDark};
  }
`;

export const SortButton = styled.button`
  background-color: white;
  color: ${theme.colors.text};
  border-radius: 8px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: all ${theme.transitions.default};
  border: 1px solid ${theme.colors.glass};
  position: relative;
  overflow: hidden;

  &:before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background: radial-gradient(
      circle,
      rgba(91, 35, 51, 0.2) 0%,
      transparent 70%
    );
    opacity: 0;
    transition: opacity ${theme.transitions.default};
  }

  &:hover {
    background-color: ${theme.colors.glass};
    color: ${theme.colors.primary};
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);

    &:before {
      opacity: 1;
    }

    svg {
      transform: scale(1.2);
    }
  }

  svg {
    position: relative;
    z-index: 1;
    transition: transform ${theme.transitions.default};
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  }
`;

export const BrandListContainer = styled.div`
  min-height: 400px;
  margin-bottom: 30px;
  position: relative;
`;

export const GridView = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  animation: ${fadeIn} 0.5s ease-in-out;

  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

export const BrandCard = styled.div`
  background-color: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.08);
  transition: all ${theme.transitions.slow};
  cursor: pointer;
  position: relative;
  animation: ${fadeIn} 0.3s ease-in-out;
  animation-fill-mode: both;
  animation-delay: ${(props) => props.index * 0.05}s;

  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);

    &::after {
      opacity: 1;
      height: 5px;
    }
  }

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 0;
    background: linear-gradient(
      to right,
      ${theme.colors.primary},
      ${theme.colors.secondary}
    );
    opacity: 0;
    transition: all ${theme.transitions.default};
  }
`;

export const BrandLogo = styled.img`
  width: 100%;
  height: ${({ small }) => (small ? "60px" : "150px")};
  object-fit: contain;
  background-color: #f9f9f9;
  padding: ${({ small }) => (small ? "0" : "20px")};
  transition: all ${theme.transitions.default};

  ${BrandCard}:hover & {
    transform: scale(1.08);
    filter: drop-shadow(0 5px 15px rgba(0, 0, 0, 0.1));
  }

  ${({ small }) =>
    small &&
    css`
      display: block;
      width: auto;
      min-width: 60px;
      height: 60px;
    `}
`;

export const LogoPlaceholder = styled.div`
  width: 100%;
  height: ${({ small }) => (small ? "60px" : "150px")};
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f9f9f9;
  color: #cccccc;
  font-size: ${({ small }) => (small ? "24px" : "48px")};
  transition: all ${theme.transitions.default};

  ${({ small }) =>
    small &&
    css`
      min-width: 60px;
    `}

  svg {
    transition: transform ${theme.transitions.default};
  }

  ${BrandCard}:hover & {
    color: ${theme.colors.glassDark};

    svg {
      transform: scale(1.2) rotate(15deg);
    }
  }
`;

export const BrandName = styled.h3`
  padding: 15px;
  margin: 0;
  text-align: center;
  color: ${theme.colors.primary};
  font-weight: 600;
  border-bottom: 1px solid #f0f0f0;
  position: relative;
  transition: all ${theme.transitions.default};

  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 2px;
    background: linear-gradient(
      to right,
      ${theme.colors.primary},
      ${theme.colors.secondary}
    );
    transform: translateX(-50%);
    transition: width ${theme.transitions.slow};
  }

  ${BrandCard}:hover & {
    color: ${theme.colors.secondary};

    &:after {
      width: 60%;
    }
  }
`;

export const BrandCardDetails = styled.div`
  padding: 15px;
  transition: all ${theme.transitions.default};

  ${BrandCard}:hover & {
    background-color: ${theme.colors.glass};
  }
`;

export const BrandDescription = styled.p`
  margin: 0 0 10px 0;
  color: #666;
  font-size: 14px;
  line-height: 1.6;
  transition: color ${theme.transitions.default};

  ${BrandCard}:hover & {
    color: ${theme.colors.text};
  }
`;

export const BrandCountry = styled.p`
  margin: 0;
  color: ${theme.colors.secondary};
  font-weight: 500;
  font-size: 14px;
  display: inline-block;
  padding: 4px 10px;
  background-color: ${theme.colors.glass};
  border-radius: 20px;
  transition: all ${theme.transitions.default};

  ${BrandCard}:hover & {
    background-color: ${theme.colors.glassDark};
    color: white;
    transform: translateY(-2px);
  }
`;

export const BrandActions = styled.div`
  display: flex;
  justify-content: ${({ inline }) => (inline ? "center" : "space-between")};
  padding: 12px 15px;
  border-top: 1px solid #f0f0f0;
  gap: 10px;
  transition: all ${theme.transitions.default};

  ${BrandCard}:hover & {
    background-color: ${theme.colors.glass};
  }
`;

export const ActionButton = styled.button`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all ${theme.transitions.default};
  background-color: white;
  color: ${theme.colors.text};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
      rgba(255, 255, 255, 0.3),
      transparent
    );
    transition: all 0.6s ease;
  }

  &:hover {
    background-color: ${theme.colors.primary};
    color: white;
    transform: translateY(-4px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.15);

    &:before {
      left: 100%;
    }

    svg {
      animation: ${popIn} 0.3s ease-out;
    }
  }

  &:active {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

export const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  animation: ${fadeIn} 0.5s ease-in-out;

  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
    width: 0;
    height: 0;
  }

  -webkit-overflow-scrolling: touch;

  @media (max-width: ${theme.breakpoints.tablet}) {
    padding-bottom: 5px;
    margin-bottom: -5px;
  }
`;

export const TableView = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  background-color: white;
  border-radius: 12px;
  overflow: hidden;

  min-width: 800px;

  table-layout: fixed;

  th,
  td {
    &:nth-child(1) {
      width: 100px;
    }
    &:nth-child(2) {
      width: 150px;
    }
    &:nth-child(3) {
      width: auto;
    }
    &:nth-child(4) {
      width: 120px;
    }
    &:nth-child(5) {
      width: 120px;
    }
  }
`;

export const TableHeader = styled.thead`
  background: linear-gradient(
    to right,
    ${theme.colors.primary},
    ${theme.colors.secondary}
  );
  color: white;

  th {
    padding: 15px;
    text-align: left;
    font-weight: 500;
    letter-spacing: 0.5px;
    position: sticky;
    top: 0;
    z-index: 10;
  }
`;

export const TableRow = styled.tr`
  cursor: pointer;
  transition: all ${theme.transitions.default};

  &:nth-child(even) {
    background-color: #f9f9f9;
  }

  &:hover {
    background-color: ${theme.colors.glass};
    transform: translateX(5px);
    box-shadow: -5px 0 15px rgba(0, 0, 0, 0.05);
    position: relative;
    z-index: 1;
  }
`;

export const TableCell = styled.td`
  padding: 15px;
  border-bottom: 1px solid #f0f0f0;
  transition: all ${theme.transitions.default};
  white-space: ${(props) => (props.nowrap ? "nowrap" : "normal")};
  overflow: ${(props) => (props.truncate ? "hidden" : "visible")};
  text-overflow: ${(props) => (props.truncate ? "ellipsis" : "clip")};

  ${TableRow}:hover & {
    color: ${theme.colors.primary};
  }
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  gap: 15px;
  animation: ${fadeIn} 0.5s ease-in-out;
  position: relative;
  overflow: hidden;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 5px;
    background: linear-gradient(
      to right,
      ${theme.colors.primary},
      ${theme.colors.secondary}
    );
  }

  svg {
    font-size: 64px;
    color: #e0e0e0;
    margin-bottom: 15px;
    transition: all ${theme.transitions.default};
    animation: ${pulseAnimation} 3s infinite;
  }

  h3 {
    margin: 0;
    color: ${theme.colors.text};
    font-size: 24px;
  }

  p {
    margin: 0;
    color: #666;
    margin-bottom: 20px;
  }
`;

export const LoadingIndicator = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px;

  svg {
    font-size: 48px;
    color: ${theme.colors.primary};
    animation: ${rotateAnimation} 1.5s infinite linear;
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

  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  border-radius: 6px;
  overflow: hidden;
  max-width: 400px;
  width: calc(100% - 40px);
`;

export const NotificationContent = styled.div`
  display: flex;
  align-items: center;
  padding: 15px;
`;

export const NotificationIcon = styled.div`
  margin-right: 15px;

  svg {
    font-size: 24px;
    color: ${({ type }) => (type === "error" ? "#f44336" : "#4caf50")};
    animation: ${popIn} 0.3s ease-out;
  }
`;

export const NotificationMessage = styled.p`
  margin: 0;
  flex-grow: 1;
  font-size: 14px;
  color: ${theme.colors.text};
  line-height: 1.4;
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

  &:hover {
    background-color: rgba(0, 0, 0, 0.08);
    color: ${theme.colors.text};
    transform: rotate(90deg);
  }
`;
