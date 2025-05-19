// import styled, { keyframes } from "styled-components";
// import { theme } from "../../../styles/theme";

// const fadeIn = keyframes`
//   from {
//     opacity: 0;
//     transform: translateY(10px);
//   }
//   to {
//     opacity: 1;
//     transform: translateY(0);
//   }
// `;

// export const ExplorerContainer = styled.div`
//   width: 100%;
//   max-width: 1200px;
//   margin: 0 auto;
//   padding: 20px;
//   background-color: ${theme.colors.background};
// `;

// export const Section = styled.section`
//   margin-bottom: 40px;
//   animation: ${fadeIn} ${theme.transitions.default};
// `;

// export const TabContainer = styled.div`
//   display: flex;
//   gap: 20px;
//   margin-bottom: 30px;
//   overflow-x: auto;
//   padding-bottom: 10px;

//   @media (max-width: ${theme.breakpoints.mobile}) {
//     gap: 10px;
//   }
// `;

// export const Tab = styled.button`
//   position: relative;
//   display: flex;
//   align-items: center;
//   gap: 8px;
//   padding: 12px 24px;
//   background: ${({ active }) =>
//     active ? theme.colors.glassDark : theme.colors.glass};
//   border: none;
//   border-radius: 8px;
//   color: ${({ active }) =>
//     active ? theme.colors.background : theme.colors.primary};
//   cursor: pointer;
//   transition: all ${theme.transitions.default};
//   white-space: nowrap;

//   &:hover {
//     background: ${theme.colors.glassDark};
//     transform: translateY(-2px);
//   }

//   @media (max-width: ${theme.breakpoints.mobile}) {
//     padding: 8px 16px;
//     font-size: 14px;
//   }
// `;

// export const CarGrid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
//   gap: 24px;
//   animation: ${fadeIn} ${theme.transitions.default};

//   @media (max-width: ${theme.breakpoints.tablet}) {
//     grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
//     gap: 16px;
//   }

//   @media (max-width: ${theme.breakpoints.mobile}) {
//     grid-template-columns: 1fr;
//   }
// `;

// export const Title = styled.h2`
//   display: flex;
//   align-items: center;
//   gap: 12px;
//   color: ${theme.colors.text};
//   margin-bottom: 24px;
//   font-size: 24px;

//   @media (max-width: ${theme.breakpoints.mobile}) {
//     font-size: 20px;
//   }
// `;

// export const ActiveIndicator = styled.div`
//   position: absolute;
//   bottom: -2px;
//   left: 0;
//   width: 100%;
//   height: 3px;
//   background: ${theme.colors.accent};
//   border-radius: 3px;
//   animation: ${fadeIn} ${theme.transitions.default};
// `;

// export const Icon = styled.i`
//   color: inherit;
//   font-size: 1.2em;
// `;
// explorerStyles.jsx
// explorerStyles.jsx
import styled, { keyframes, css } from "styled-components";
import { theme } from "../../../styles/theme";

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

const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

export const ExplorerContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: ${theme.colors.background};
`;

export const Section = styled.section`
  margin-bottom: 60px;
  animation: ${fadeIn} ${theme.transitions.default};
  position: relative;

  &:after {
    content: "";
    position: absolute;
    bottom: -30px;
    left: 10%;
    width: 80%;
    height: 1px;
    background: linear-gradient(
      to right,
      transparent,
      ${theme.colors.glassDark},
      transparent
    );
  }

  &:last-child:after {
    display: none;
  }
`;

export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;

  @media (max-width: ${theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
`;

export const TabContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
  overflow-x: auto;
  padding-bottom: 10px;
  position: relative;
  -webkit-overflow-scrolling: touch;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    height: 4px;
  }

  &::-webkit-scrollbar-track {
    background: ${theme.colors.glass};
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${theme.colors.primary};
    border-radius: 10px;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    gap: 10px;
  }
`;

export const TabHighlight = styled.div`
  position: absolute;
  height: 3px;
  bottom: 0;
  background: linear-gradient(
    to right,
    ${theme.colors.accent},
    ${theme.colors.primary}
  );
  border-radius: 3px;
  transition: all 0.3s ease;

  ${({ activeTab }) => {
    if (activeTab === "trending") {
      return css`
        left: 0;
        width: 120px;
      `;
    } else if (activeTab === "popular") {
      return css`
        left: 140px;
        width: 110px;
      `;
    } else if (activeTab === "upcoming") {
      return css`
        left: 270px;
        width: 130px;
      `;
    }
    return "";
  }}

  @media (max-width: ${theme.breakpoints.mobile}) {
    ${({ activeTab }) => {
      if (activeTab === "trending") {
        return css`
          left: 0;
          width: 100px;
        `;
      } else if (activeTab === "popular") {
        return css`
          left: 110px;
          width: 90px;
        `;
      } else if (activeTab === "upcoming") {
        return css`
          left: 210px;
          width: 110px;
        `;
      }
      return "";
    }}
  }
`;

export const Tab = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: ${({ active }) =>
    active
      ? `linear-gradient(135deg, ${theme.colors.glassDark}, ${theme.colors.primary}15)`
      : theme.colors.glass};
  border: none;
  border-radius: 12px;
  color: ${({ active }) => (active ? theme.colors.primary : theme.colors.text)};
  cursor: pointer;
  transition: all ${theme.transitions.default};
  white-space: nowrap;
  font-weight: ${({ active }) => (active ? "600" : "400")};
  box-shadow: ${({ active }) =>
    active ? `0 4px 12px ${theme.colors.glassDark}` : "none"};

  &:hover {
    background: ${theme.colors.glassDark};
    transform: translateY(-2px);
    box-shadow: 0 4px 12px ${theme.colors.glassDark};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 10px 18px;
    font-size: 14px;
    border-radius: 8px;
  }
`;

export const CarouselContainer = styled.div`
  position: relative;
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scroll-behavior: smooth;
  padding: 10px 0;
  margin: -10px 0;

  &::-webkit-scrollbar {
    display: none;
  }

  .carousel-track {
    display: flex;
    gap: 24px;
    padding: 10px 5px;

    @media (max-width: ${theme.breakpoints.tablet}) {
      gap: 16px;
    }
  }

  & > div > div {
    flex: 0 0 auto;
    width: 300px;

    @media (max-width: ${theme.breakpoints.tablet}) {
      width: 260px;
    }

    @media (max-width: ${theme.breakpoints.mobile}) {
      width: 240px;
    }
  }
`;

export const GradientOverlay = styled.div`
  position: absolute;
  top: 0;
  ${(props) => props.position}: 0;
  width: 60px;
  height: 100%;
  z-index: 2;
  pointer-events: none;
  background: linear-gradient(
    to ${(props) => (props.position === "left" ? "right" : "left")},
    ${theme.colors.background},
    transparent
  );

  @media (max-width: ${theme.breakpoints.mobile}) {
    width: 40px;
  }
`;

export const Title = styled.h2`
  display: flex;
  align-items: center;
  gap: 12px;
  color: ${theme.colors.text};
  font-size: 24px;
  font-weight: 600;
  position: relative;

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 20px;
  }
`;

export const CategoryBadge = styled.span`
  font-size: 12px;
  padding: 4px 10px;
  border-radius: 30px;
  background: linear-gradient(
    to right,
    ${theme.colors.accent},
    ${theme.colors.primary}
  );
  color: white;
  margin-left: 10px;
  font-weight: bold;
  animation: ${shimmer} 3s infinite linear;
  background-size: 200% 100%;
`;

export const ActiveIndicator = styled.div`
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 3px;
  background: ${theme.colors.accent};
  border-radius: 3px;
  animation: ${fadeIn} ${theme.transitions.default};
`;

export const Icon = styled.i`
  color: inherit;
  font-size: 1.2em;

  ${Tab} & {
    font-size: 1em;
  }
`;

export const ViewAllButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: transparent;
  border: 1px solid ${theme.colors.primary};
  color: ${theme.colors.primary};
  border-radius: 30px;
  font-weight: 600;
  cursor: pointer;
  transition: all ${theme.transitions.default};

  &:hover {
    background: ${theme.colors.primary};
    color: white;
    transform: translateX(5px);

    i {
      transform: translateX(3px);
    }
  }

  i {
    transition: all ${theme.transitions.default};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 6px 12px;
    font-size: 14px;
  }
`;

export const CarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
  animation: ${fadeIn} ${theme.transitions.default};

  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 16px;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;
