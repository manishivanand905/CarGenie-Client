import styled, { keyframes } from "styled-components";
import { NavLink, Link } from "react-router-dom";

const glowAnimation = keyframes`
  0% { box-shadow: 0 0 5px rgba(91, 35, 51, 0.3); }
  50% { box-shadow: 0 0 20px rgba(91, 35, 51, 0.5); }
  100% { box-shadow: 0 0 5px rgba(91, 35, 51, 0.3); }
`;

export const HomeContainer = styled.div`
  overflow-x: hidden;
  width: 100%;
  min-height: 100vh;
`;

export const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 1rem 2rem;
  background: rgba(247, 244, 243, 0.15);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid rgba(247, 244, 243, 0.1);
  transition: all 0.3s ease;

  &:hover {
    background: rgba(247, 244, 243, 0.25);
  }

  @media (max-width: 768px) {
    padding: 0.8rem 1rem;
  }
`;

export const NavContainer = styled.nav`
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const LogoContainer = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary || "#333"};
  text-decoration: none;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }

  img {
    height: 45px;
    width: auto;
  }

  span {
    font-weight: bold;
  }
`;

export const LoginButton = styled(NavLink)`
  padding: 0.6rem 1.5rem;
  border-radius: 30px;
  background: #5b2333;
  color: #f7f4f3;
  text-decoration: none;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  border: 2px solid #5b2333;

  i {
    font-size: 1.1rem;
  }

  &:hover {
    background: transparent;
    color: #5b2333;
    animation: ${glowAnimation} 2s infinite;
  }
`;
