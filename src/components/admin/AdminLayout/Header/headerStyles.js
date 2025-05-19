import styled from "styled-components";
import { Link } from "react-router-dom";

export const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 70px;
  z-index: 1001;
  transform: translateY(${({ $isVisible }) => ($isVisible ? "0" : "-100%")});
  transition: transform 0.3s ease;
`;

export const GlassPane = styled.div`
  position: absolute;
  inset: 0;
  background: ${({ theme }) => theme.colors.glassDark};
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border-bottom: 1px solid ${({ theme }) => theme.colors.glass};
`;

export const HeaderContent = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 2rem;
  padding: 0 2rem;
  position: relative;
  z-index: 2;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: auto auto;
    gap: 1rem;
    padding: 0 1rem;
  }
`;

export const Logo = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  white-space: nowrap;
  transition: transform 0.2s ease;

  i {
    color: ${({ theme }) => theme.colors.accent};
    font-size: 1.2em;
  }

  .highlight {
    color: ${({ theme }) => theme.colors.accent};
  }

  &:hover {
    transform: translateY(-1px);
  }
`;

export const SearchWrapper = styled.form`
  width: 100%;
  max-width: 600px;
  position: relative;
  justify-self: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }
`;

export const SearchInput = styled.input`
  width: 100%;
  height: 40px;
  padding: 0 3rem 0 1.5rem;
  border: none;
  border-radius: 20px;
  background: ${({ theme }) => theme.colors.glass};
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.95rem;
  transition: all 0.2s ease;

  &::placeholder {
    color: ${({ theme }) => theme.colors.secondary};
    opacity: 0.7;
  }

  &:focus {
    outline: none;
    background: ${({ theme }) => theme.colors.glassDark};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.accent};
  }
`;

export const SearchButton = styled.button`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.secondary};
  font-size: 1rem;
  cursor: pointer;
  padding: 0.5rem;
  transition: all 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
    transform: translateY(-50%) scale(1.1);
  }
`;

export const NavActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  justify-self: end;
`;

export const NotificationButton = styled.button`
  position: relative;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.5rem;
  transition: all 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
    transform: scale(1.1);
  }
`;

export const NotificationBadge = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  background: ${({ theme }) => theme.colors.accent};
  color: white;
  font-size: 0.7rem;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid ${({ theme }) => theme.colors.background};
  transform: translate(25%, -25%);
`;

export const NotificationPopup = styled.div`
  position: absolute;
  top: calc(100% + 0.5rem);
  right: -1rem;
  width: 320px;
  background: ${({ theme }) => theme.colors.background};
  border-radius: 12px;
  box-shadow: 0 4px 20px ${({ theme }) => theme.colors.glassDark};
  overflow: hidden;
  animation: fadeIn 0.2s ease;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const NotificationHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  background: ${({ theme }) => theme.colors.glass};
  border-bottom: 1px solid ${({ theme }) => theme.colors.glassDark};
`;

export const NotificationTitle = styled.h3`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
`;

export const MarkAllButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.accent};
  font-size: 0.875rem;
  cursor: pointer;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.glass};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const NotificationList = styled.div`
  max-height: 400px;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: ${({ theme }) =>
    `${theme.colors.accent} ${theme.colors.glass}`};

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.glass};
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.accent};
    border-radius: 3px;
  }
`;

export const NotificationItem = styled.div`
  padding: 0.75rem 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${({ $read, theme }) =>
    $read ? "transparent" : `${theme.colors.glass}`};

  .notification-content {
    display: flex;
    gap: 0.75rem;
    align-items: center;
  }

  .read {
    color: #4caf50;
  }

  .unread {
    color: ${({ theme }) => theme.colors.primary};
  }

  &:hover {
    background: ${({ theme }) => theme.colors.glass};
  }

  &:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.colors.glass};
  }
`;

export const ProfileButton = styled.button`
  position: relative;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.5rem;
  transition: all 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
    transform: scale(1.1);
  }
`;

export const DropdownMenu = styled.div`
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  width: 220px;
  background: ${({ theme }) => theme.colors.background};
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px ${({ theme }) => theme.colors.glassDark};
  animation: fadeIn 0.2s ease;
`;

export const DropdownItem = styled.div`
  padding: 0.75rem 1rem;
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;

  svg {
    font-size: 1.1rem;
    color: ${({ theme }) => theme.colors.secondary};
    transition: color 0.2s ease;
  }

  &:hover {
    background: ${({ theme }) => theme.colors.glass};
    padding-left: 1.5rem;

    svg {
      color: ${({ theme }) => theme.colors.accent};
    }
  }
`;
