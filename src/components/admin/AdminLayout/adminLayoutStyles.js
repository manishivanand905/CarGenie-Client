import styled from "styled-components";

export const LayoutWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.background};
`;

export const MainContainer = styled.div`
  display: flex;
  flex: 1;
  position: relative;
  overflow-x: hidden;
  background: ${({ theme }) => `linear-gradient(
    135deg,
    ${theme.colors.background} 0%,
    ${theme.colors.glass} 100%
  )`};
`;

export const PageContent = styled.main`
  flex: 1;
  padding: 2rem;
  position: relative;
  min-height: calc(100vh - 70px - 60px);
  animation: fadeIn ${({ theme }) => theme.transitions.slow};

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 1rem;
  }
`;

export const ContentWrapper = styled.div`
  flex: 1;
  margin-left: ${({ isSidebarOpen }) => (isSidebarOpen ? "250px" : "60px")};
  // min-height: calc(100vh - 70px);
  display: flex;
  flex-direction: column;
  transition: all ${({ theme }) => theme.transitions.default};
  // position: relative;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: ${({ theme }) => theme.colors.glass};
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    z-index: -1;
    opacity: 0.5;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    margin-left: 0;
    width: 100%;
  }
`;

export const LoaderWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.background};
  z-index: 2000;
`;

export const ErrorBoundary = styled.div`
  padding: 2rem;
  text-align: center;
  min-height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  color: ${({ theme }) => theme.colors.text};

  h2 {
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: 1rem;
  }

  p {
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.6;
  }

  button {
    margin-top: 1rem;
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    border: none;
    background: ${({ theme }) => theme.colors.primary};
    color: white;
    cursor: pointer;
    transition: all ${({ theme }) => theme.transitions.default};

    &:hover {
      background: ${({ theme }) => theme.colors.secondary};
      transform: translateY(-2px);
    }
  }
`;

export const ScrollTopButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${({ visible }) => (visible ? "1" : "0")};
  transform: translateY(${({ visible }) => (visible ? "0" : "20px")});
  transition: all ${({ theme }) => theme.transitions.default};
  z-index: 1000;

  &:hover {
    background: ${({ theme }) => theme.colors.secondary};
    transform: translateY(-2px);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    bottom: 80px;
  }
`;
