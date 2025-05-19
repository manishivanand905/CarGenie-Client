// import styled from "styled-components";

// export const Card = styled.div`
//   background: white;
//   border-radius: 12px;
//   overflow: hidden;
//   transition: ${({ theme }) => theme.transitions.default};

//   @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
//     display: flex;
//     border-radius: 8px;
//     box-shadow: 0 2px 4px ${({ theme }) => theme.colors.glass};
//   }

//   &:hover {
//     transform: translateY(-4px);
//     box-shadow: 0 8px 16px ${({ theme }) => theme.colors.glassDark};

//     img {
//       transform: scale(1.05);
//     }

//     @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
//       transform: none;
//     }
//   }
// `;

// export const ImageContainer = styled.div`
//   position: relative;
//   aspect-ratio: 16/9;
//   overflow: hidden;

//   @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
//     width: 140px;
//     min-width: 140px;
//     aspect-ratio: 3/4;
//   }

//   img {
//     width: 100%;
//     height: 100%;
//     object-fit: cover;
//     transition: ${({ theme }) => theme.transitions.slow};
//   }
// `;

// export const Badge = styled.span`
//   position: absolute;
//   top: 0.5rem;
//   right: 0.5rem;
//   background: ${({ theme }) => theme.colors.accent};
//   color: white;
//   padding: 0.25rem 0.75rem;
//   border-radius: 20px;
//   font-size: 0.75rem;

//   @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
//     top: 0.25rem;
//     right: 0.25rem;
//     padding: 0.2rem 0.5rem;
//   }
// `;

// export const Content = styled.div`
//   padding: 1rem;

//   @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
//     flex: 1;
//     display: flex;
//     flex-direction: column;
//     justify-content: space-between;
//   }
// `;

// export const CarName = styled.h3`
//   color: ${({ theme }) => theme.colors.text};
//   margin-bottom: 0.5rem;
//   font-size: 1.25rem;

//   @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
//     font-size: 1rem;
//     margin-bottom: 0.25rem;
//   }
// `;

// export const Price = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 0.25rem;
//   color: ${({ theme }) => theme.colors.primary};
//   font-weight: 600;
//   margin-bottom: 0.5rem;

//   i {
//     font-size: 0.875rem;
//   }

//   span {
//     color: ${({ theme }) => theme.colors.text};
//     font-weight: 400;
//     font-size: 0.875rem;
//   }

//   @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
//     font-size: 0.875rem;
//     margin-bottom: 0.25rem;
//   }
// `;

// export const Button = styled.button`
//   width: 100%;
//   padding: 0.75rem;
//   background: transparent;
//   border: 2px solid ${({ theme }) => theme.colors.primary};
//   color: ${({ theme }) => theme.colors.primary};
//   border-radius: 6px;
//   font-weight: 600;
//   cursor: pointer;
//   transition: ${({ theme }) => theme.transitions.default};

//   @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
//     padding: 0.5rem;
//     font-size: 0.875rem;
//     border-width: 1px;
//   }

//   &:hover {
//     background: ${({ theme }) => theme.colors.primary};
//     color: white;
//   }

//   i {
//     margin-right: 0.5rem;
//   }
// `;
// carCardStyles.jsx
import styled, { keyframes } from "styled-components";

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

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const Card = styled.div`
  background: white;
  border-radius: 16px;
  overflow: hidden;
  transition: ${({ theme }) => theme.transitions.default};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  height: 100%;
  display: flex;
  flex-direction: column;
  animation: ${fadeIn} ${({ theme }) => theme.transitions.default};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: flex;
    flex-direction: row;
    border-radius: 12px;
    max-height: 140px;
  }

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);

    img {
      transform: scale(1.08);
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
      transform: translateY(-4px);
    }
  }
`;

export const ImageContainer = styled.div`
  position: relative;
  aspect-ratio: 16/9;
  overflow: hidden;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 140px;
    min-width: 140px;
    aspect-ratio: 1/1;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: ${({ theme }) => theme.transitions.slow};
  }

  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to bottom,
      transparent 70%,
      rgba(0, 0, 0, 0.4) 100%
    );
  }
`;

export const ActionBar = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  display: flex;
  gap: 8px;
  z-index: 2;
  opacity: 0;
  transition: opacity 0.3s ease;

  ${Card}:hover & {
    opacity: 1;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: none;
  }
`;

export const LikeButton = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.accent};
  font-size: 14px;
  transition: all 0.2s ease;

  &:hover {
    background: white;
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }
`;

export const CompareButton = styled(LikeButton)`
  color: ${({ theme }) => theme.colors.primary};
`;

export const Badge = styled.span`
  position: absolute;
  top: 10px;
  left: 10px;
  background: ${({ theme }) => theme.colors.accent};
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: bold;
  z-index: 2;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    top: 5px;
    left: 5px;
    padding: 3px 8px;
    font-size: 0.7rem;
  }
`;

export const PromoBadge = styled.span`
  position: absolute;
  top: 10px;
  right: 10px;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: bold;
  z-index: 2;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    top: 5px;
    right: 5px;
    padding: 3px 8px;
    font-size: 0.7rem;
  }
`;

export const PriceDropBadge = styled.div`
  position: absolute;
  top: 50px;
  left: -30px;
  background: linear-gradient(to right, #ff416c, #ff4b2b);
  color: white;
  padding: 4px 30px;
  font-size: 0.75rem;
  font-weight: bold;
  z-index: 3;
  transform: rotate(-45deg);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  animation: ${pulse} 2s infinite;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: none;
  }
`;

export const Content = styled.div`
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 0.75rem;
    min-width: 0;
  }
`;

export const CarName = styled.h3`
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 0.75rem;
  font-size: 1.25rem;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 1rem;
    margin-bottom: 0.35rem;
    flex-direction: column;
  }
`;

export const RatingContainer = styled.div`
  display: flex;
  gap: 2px;
  font-size: 0.75rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin-top: 3px;
    font-size: 0.7rem;
  }
`;

export const RatingStar = styled.i`
  color: #ffc107;
`;

export const Price = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.25rem;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 600;
  margin-bottom: 1rem;
  font-size: 1.125rem;

  i {
    font-size: 0.875rem;
  }

  span {
    color: ${({ theme }) => theme.colors.text};
    font-weight: 400;
    font-size: 0.875rem;
  }

  .old-price {
    text-decoration: line-through;
    color: #999;
    margin-left: 8px;
    font-size: 0.8rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 0.875rem;
    margin-bottom: 0.5rem;

    .old-price {
      display: none;
    }
  }
`;

export const SpecsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 1.25rem;
  font-size: 0.875rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: none;
  }
`;

export const SpecItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  color: ${({ theme }) => theme.colors.text};
`;

export const Divider = styled.div`
  width: 1px;
  height: 16px;
  background-color: ${({ theme }) => theme.colors.glass};
`;

export const EngineIcon = styled.i`
  color: #ff6b6b;
`;

export const FuelIcon = styled.i`
  color: #339af0;
`;

export const SpeedIcon = styled.i`
  color: #20c997;
`;

export const Button = styled.button`
  width: 100%;
  padding: 0.85rem;
  background: transparent;
  border: 2px solid ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.primary};
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.default};

  span {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }

  i {
    opacity: 0;
    transition: ${({ theme }) => theme.transitions.default};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 0.5rem;
    font-size: 0.875rem;
    border-width: 1px;
    margin-top: auto;

    i {
      display: none;
    }
  }

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: white;
    box-shadow: 0 4px 12px ${({ theme }) => theme.colors.glassDark};

    i {
      opacity: 1;
      transform: translateX(3px);
    }
  }
`;
