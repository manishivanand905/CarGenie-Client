import styled, { keyframes } from "styled-components";

const burstIn = keyframes`
  from {
    opacity: 0;
    transform: scale(1.2);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const burstOut = keyframes`
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(0.8);
  }
`;

export const CarouselWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  cursor: pointer;
  background: #000;

  @media (max-width: 768px) {
    height: 60vh;
  }
`;

export const Slide = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: ${({ active }) => (active ? 1 : 0)};
  visibility: ${({ active }) => (active ? "visible" : "hidden")};
  animation: ${({ active }) => (active ? burstIn : burstOut)} 0.8s ease-out
    forwards;
  transform-origin: center center;
  will-change: transform, opacity;
`;

export const SlideImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;

  ${Slide}:hover & {
    transform: scale(1.02);
  }
`;

export const SlideOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.1),
    rgba(0, 0, 0, 0.3)
  );
`;

export const SlideContent = styled.div`
  position: absolute;
  bottom: 0rem;
  left: 0rem;
  background: rgba(91, 35, 51, 0.85);
  backdrop-filter: blur(10px);
  padding: 2rem;
  max-width: 850px;
  border-radius: 20px 100px 100px 20px;
  color: #f7f4f3;
  transition: all 0.3s ease;
  cursor: default;

  @media (min-width: 769px) {
    opacity: 0;
    transform: translateX(-20px);

    ${Slide}:hover & {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @media (max-width: 768px) {
    opacity: ${({ active }) => (active ? 1 : 0)};
    transform: translateX(${({ active }) => (active ? 0 : "-20px")});
    left: 0rem;
    right: 0rem;
    bottom: 1rem;
    max-width: calc(100% - 2rem);
    padding: 1.5rem;
    border-radius: 15px 50px 50px 15px;
  }

  h2 {
    font-size: clamp(1.5rem, 4vw, 2rem);
    margin-bottom: 1rem;
  }

  p {
    font-size: clamp(1rem, 2vw, 1.1rem);
    line-height: 1.6;
  }
`;
