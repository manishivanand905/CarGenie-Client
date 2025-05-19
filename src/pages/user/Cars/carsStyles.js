import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideIn = keyframes`
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

export const Container = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 2rem;
  background-color: ${(props) => props.theme.colors.background};
`;

export const CarouselWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 500px;
  margin-bottom: 3rem;
  overflow: hidden;
  border-radius: 20px;

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    height: 400px;
  }
`;

export const CarouselSlide = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: ${(props) => (props.active ? 1 : 0)};
  transition: ${(props) => props.theme.transitions.slow};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const CarouselContent = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 2rem;
  background: linear-gradient(
    transparent,
    ${(props) => props.theme.colors.glassDark}
  );
  color: white;
  animation: ${fadeIn} 0.5s ease-in-out;
`;

export const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  animation: ${slideIn} 0.5s ease-in-out;
`;

export const CarCard = styled.div`
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 15px ${(props) => props.theme.colors.glass};
  transition: ${(props) => props.theme.transitions.default};

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px ${(props) => props.theme.colors.glassDark};
  }
`;

export const CarImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

export const CarInfo = styled.div`
  padding: 1.5rem;
`;

export const CarTitle = styled.h3`
  color: ${(props) => props.theme.colors.text};
  margin: 0 0 0.5rem;
  font-size: 1.25rem;
`;

export const CarPrice = styled.div`
  color: ${(props) => props.theme.colors.primary};
  font-weight: bold;
  font-size: 1.1rem;
  margin-bottom: 1rem;
`;

export const CarSpecs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

export const SpecItem = styled.div`
  display: flex;
  align-items: center;
  color: ${(props) => props.theme.colors.secondary};
  font-size: 0.9rem;

  svg {
    margin-right: 0.5rem;
  }
`;

export const ViewButton = styled.button`
  width: 100%;
  padding: 0.8rem;
  background-color: ${(props) => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: ${(props) => props.theme.transitions.default};

  &:hover {
    background-color: ${(props) => props.theme.colors.accent};
  }
`;
