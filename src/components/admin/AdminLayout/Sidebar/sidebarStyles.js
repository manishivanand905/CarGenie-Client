import styled, { css } from "styled-components";

export const SidebarWrapper = styled.aside`
  position: fixed;
  left: 0;
  height: 100vh;
  z-index: 1002;
  width: ${({ isOpen }) => (isOpen ? "250px" : "60px")};
  transition: all ${({ theme }) => theme.transitions.default};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    transform: translateX(${({ isOpen }) => (isOpen ? "0" : "-100%")});
    width: 250px;
    height: 100vh;
  }
`;

export const GlassOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: ${({ theme }) => theme.colors.glass};
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  z-index: -1;
  border-right: 1px solid ${({ theme }) => theme.colors.glass};
  transition: all ${({ theme }) => theme.transitions.default};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
    background: ${({ theme }) => theme.colors.background};
  }
`;

export const MobileOverlay = styled.div`
  display: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: block;
    position: fixed;
    top: 70px; // Start below header
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    z-index: 1001;
    opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
    visibility: ${({ isOpen }) => (isOpen ? "visible" : "hidden")};
    transition: all ${({ theme }) => theme.transitions.default};
    pointer-events: ${({ isOpen }) => (isOpen ? "auto" : "none")};
  }
`;

export const SidebarContainer = styled.nav`
  height: 100%;
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
`;

export const DesktopToggleButton = styled.button`
  position: absolute;
  right: -12px;
  top: 12px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: none;
  transition: all ${({ theme }) => theme.transitions.default};
  z-index: 901;
  transform: ${({ isOpen }) => (isOpen ? "rotate(0)" : "rotate(180deg)")};
  box-shadow: 0 2px 8px ${({ theme }) => theme.colors.glassDark};

  &:hover {
    background: ${({ theme }) => theme.colors.secondary};
    transform: ${({ isOpen }) =>
      isOpen ? "rotate(0) scale(1.1)" : "rotate(180deg) scale(1.1)"};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }
`;

export const MobileToggleButton = styled.button`
  display: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: flex;
    position: fixed;
    left: 16px;
    bottom: 16px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.primary};
    color: white;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border: none;
    transition: all ${({ theme }) => theme.transitions.default};
    z-index: 1500;
    box-shadow: 0 4px 12px ${({ theme }) => theme.colors.glassDark};
    opacity: ${({ isOpen }) => (isOpen ? 0.8 : 1)};

    svg {
      font-size: 1.25rem;
    }

    &:hover {
      background: ${({ theme }) => theme.colors.secondary};
      transform: scale(1.1);
      opacity: 1;
    }
  }
`;

export const SidebarContent = styled.div`
  height: 100%;
  padding: 1rem 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const NavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;

export const NavItem = styled.li`
  width: 100%;
`;

export const NavLink = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.default};
  color: ${({ theme }) => theme.colors.primary};
  background: ${({ isActive, theme }) =>
    isActive ? theme.colors.glass : "transparent"};
  position: relative;

  &:hover {
    background: ${({ theme }) => theme.colors.glass};
    transform: translateX(5px);
  }

  ${({ isActive, theme }) =>
    isActive &&
    css`
      font-weight: 500;
      &::before {
        content: "";
        position: absolute;
        left: 0;
        height: 24px;
        width: 3px;
        background: ${theme.colors.primary};
        border-radius: 0 3px 3px 0;
      }
    `}
`;

export const LinkIcon = styled.div`
  min-width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all ${({ theme }) => theme.transitions.default};

  svg {
    font-size: ${({ isOpen }) => (isOpen ? "1rem" : "1.2rem")};
    transition: all ${({ theme }) => theme.transitions.default};
  }
`;

export const LinkText = styled.span`
  white-space: nowrap;
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  visibility: ${({ isOpen }) => (isOpen ? "visible" : "hidden")};
  transition: all ${({ theme }) => theme.transitions.default};
`;
