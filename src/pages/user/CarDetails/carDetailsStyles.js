import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideUp = keyframes`
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

export const DetailPageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.5rem;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  position: relative;
  animation: ${fadeIn} 0.5s ease-in-out;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 1rem;
  }
`;

export const CarDetailsHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-top: 3rem;
  margin-bottom: 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

export const GalleryContainer = styled.div`
  position: relative;
  width: 100%;
  animation: ${slideUp} 0.6s ease-in-out;
`;

export const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  transition: ${({ theme }) => theme.transitions.default};

  &:hover {
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    height: 300px;
  }
`;

export const CarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: ${({ theme }) => theme.transitions.default};

  &:hover {
    transform: scale(1.03);
  }
`;

export const CarouselCounter = styled.div`
  position: absolute;
  bottom: 12px;
  right: 12px;
  background-color: ${({ theme }) => theme.colors.glassDark};
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  transition: ${({ theme }) => theme.transitions.default};

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const ArrowButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: ${({ theme }) => theme.colors.glass};
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  opacity: 0.7;
  transition: ${({ theme }) => theme.transitions.default};
  z-index: 2;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    opacity: 1;
    transform: translateY(-50%) scale(1.1);
  }

  &.left {
    left: 10px;
  }

  &.right {
    right: 10px;
  }
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  animation: ${slideUp} 0.8s ease-in-out;
`;

export const CarNameContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

export const CarBrand = styled.h3`
  font-size: 1.2rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.accent};
  margin: 0;
  animation: ${fadeIn} 0.5s ease-in-out;
`;

export const CarTitle = styled.h1`
  font-size: 2.2rem;
  font-weight: 700;
  margin: 0.2rem 0 0;
  color: ${({ theme }) => theme.colors.primary};
  animation: ${fadeIn} 0.7s ease-in-out;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 1.8rem;
  }
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 0.8rem;
`;

export const IconButton = styled.button`
  background-color: ${({ active, theme }) =>
    active ? theme.colors.primary : theme.colors.glass};
  color: ${({ active, theme }) => (active ? "white" : theme.colors.primary)};
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.default};

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    color: white;
    transform: translateY(-3px);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  margin-top: 0.5rem;
`;

export const RatingStar = styled.div`
  color: gold;
  display: flex;
  align-items: center;
`;

export const ReviewCount = styled.span`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.secondary};
  margin-left: 0.5rem;
  font-weight: normal;
`;

export const PriceContainer = styled.div`
  margin: 0.5rem 0;
`;

export const PriceTag = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
`;

export const Asterisk = styled.sup`
  font-size: 0.9rem;
  margin-left: 0.2rem;
`;

export const PriceNote = styled.div`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.secondary};
  margin-top: 0.3rem;
`;

export const LocationLink = styled.a`
  color: ${({ theme }) => theme.colors.accent};
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  font-weight: 500;
  transition: ${({ theme }) => theme.transitions.default};

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: underline;
  }
`;

export const ActionButton = styled.a`
  display: inline-block;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  font-weight: 600;
  padding: 0.8rem 1.2rem;
  margin-top: 0.5rem;
  border-radius: 8px;
  text-align: center;
  text-decoration: none;
  transition: ${({ theme }) => theme.transitions.default};
  border: 2px solid ${({ theme }) => theme.colors.primary};

  &:hover {
    background-color: transparent;
    color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(91, 35, 51, 0.2);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const TabsContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.glass};
  padding-bottom: 0.5rem;
  overflow-x: auto;
  scrollbar-width: thin;

  &::-webkit-scrollbar {
    height: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.glassDark};
    border-radius: 10px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    gap: 0.2rem;
  }
`;

export const Tab = styled.button`
  padding: 0.8rem 1.2rem;
  background-color: ${({ active, theme }) =>
    active ? theme.colors.primary : "transparent"};
  color: ${({ active, theme }) => (active ? "white" : theme.colors.text)};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: ${({ theme }) => theme.transitions.default};
  white-space: nowrap;
  flex-shrink: 0;

  &:hover {
    background-color: ${({ active, theme }) =>
      active ? theme.colors.primary : theme.colors.glass};
    transform: translateY(-2px);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 0.6rem 0.8rem;
    font-size: 0.85rem;
  }
`;

export const ContentSection = styled.div`
  margin-bottom: 2rem;
  animation: ${fadeIn} 0.8s ease-in-out;
`;

export const SectionContainer = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  animation: ${slideUp} 0.5s ease-in-out;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 1rem;
  }
`;

export const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-bottom: 1.5rem;
`;

export const SectionIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.glass};
  color: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
`;

export const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  margin: 1rem 0 1rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 1.3rem;
  }
`;

export const DescriptionSection = styled.div`
  margin-top: 1.5rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1rem;
`;

export const SpecsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.2rem;
  margin-bottom: 1.5rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
`;

export const SpecItem = styled.div`
  transition: ${({ theme }) => theme.transitions.default};

  &:hover {
    transform: translateY(-3px);
  }
`;

export const SpecTitle = styled.h4`
  font-size: 0.9rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.secondary};
  margin: 0 0 0.3rem;
`;

export const SpecValue = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

export const FeaturesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 1.5rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 0.8rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

export const FeatureItem = styled.li`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  border-radius: 6px;
  transition: ${({ theme }) => theme.transitions.default};

  &:hover {
    background-color: ${({ theme }) => theme.colors.glass};
    transform: translateX(5px);
  }
`;

export const FeatureIcon = styled.span`
  color: ${({ theme }) => theme.colors.accent};
  display: flex;
  align-items: center;
`;

export const ColorOptionsContainer = styled.div`
  margin-top: 2rem;
`;

export const ColorOptionsTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
  margin: 0 0 1rem;
`;

export const ColorsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    gap: 0.8rem;
  }
`;

export const ColorItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.default};

  &:hover {
    transform: translateY(-5px);
  }
`;

export const ColorCircle = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${({ color }) => color};
  border: 3px solid
    ${({ selected, theme, color }) =>
      selected ? theme.colors.primary : "transparent"};
  transition: ${({ theme }) => theme.transitions.default};
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);

  &:hover {
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }
`;

export const ColorName = styled.span`
  font-size: 0.85rem;
  font-weight: ${({ selected }) => (selected ? "600" : "500")};
  color: ${({ selected, theme }) =>
    selected ? theme.colors.primary : theme.colors.text};
  transition: ${({ theme }) => theme.transitions.default};
`;

export const ProConList = styled.ul`
  list-style: none;
  padding: 1rem;
  margin: 0;
  background-color: ${({ theme }) => theme.colors.glass};
  border-radius: 8px;
  flex: 1;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    margin-bottom: 1rem;
  }
`;

export const ProConHeader = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0 0 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.colors.primary};
`;

export const ProConItem = styled.li`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.8rem;
  padding: 0.3rem 0;
  transition: ${({ theme }) => theme.transitions.default};

  &:hover {
    transform: translateX(5px);
  }
`;

export const BackButton = styled.button`
  position: absolute;
  top: 1rem;
  left: 1rem;
  margin-botton: 0.5rem;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  z-index: 10;
  transition: ${({ theme }) => theme.transitions.default};

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    color: #fff;
    transform: scale(1.05);
  }
`;

export const SharePopup = styled.div`
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
  width: 200px;
  z-index: 100;
  padding: 0.5rem;
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  animation: ${slideUp} 0.3s ease-in-out;
`;

export const ShareOption = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.7rem 1rem;
  cursor: pointer;
  border-radius: 6px;
  transition: ${({ theme }) => theme.transitions.default};

  &:hover {
    background-color: ${({ theme }) => theme.colors.glass};
  }
`;

export const ShareOptionIcon = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  width: 20px;
  display: flex;
  justify-content: center;
`;

export const ShareOptionText = styled.span`
  font-size: 0.9rem;
`;

export const ShareModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: ${fadeIn} 0.3s ease-in-out;
`;

export const ModalContent = styled.div`
  background-color: white;
  border-radius: 12px;
  width: 90%;
  max-width: 500px;
  padding: 1.5rem;
  animation: ${slideUp} 0.5s ease-in-out;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

export const ModalTitle = styled.h3`
  font-size: 1.3rem;
  margin: 0;
  color: ${({ theme }) => theme.colors.primary};
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text};
  transition: ${({ theme }) => theme.transitions.default};

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    transform: rotate(90deg);
  }
`;

export const FormField = styled.div`
  margin-bottom: 1.2rem;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors.secondary};
  font-weight: 500;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid ${({ theme }) => theme.colors.glass};
  border-radius: 8px;
  font-size: 1rem;
  transition: ${({ theme }) => theme.transitions.default};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.glass};
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid ${({ theme }) => theme.colors.glass};
  border-radius: 8px;
  font-size: 1rem;
  min-height: 100px;
  transition: ${({ theme }) => theme.transitions.default};
  resize: vertical;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.glass};
  }
`;

export const SubmitButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.default};
  display: block;
  width: 100%;

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(91, 35, 51, 0.2);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const CopyNotification = styled.div`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  opacity: ${({ isVisible }) => (isVisible ? "1" : "0")};
  visibility: ${({ isVisible }) => (isVisible ? "visible" : "hidden")};
  transition: opacity 0.3s, visibility 0.3s;
  animation: ${pulse} 1s ease-in-out;
`;
