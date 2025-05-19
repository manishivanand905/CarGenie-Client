// styles.js
import styled, { css } from "styled-components";

export const PageContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 10px;
  }
`;

export const HeroSection = styled.div`
  text-align: center;
  padding: 60px 0;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.primary},
    ${({ theme }) => theme.colors.secondary}
  );
  border-radius: 20px;
  margin-bottom: 40px;
  color: white;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 40px 0;
  }
`;

export const HeroTitle = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 20px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 2.5rem;
  }
`;

export const HeroSubtitle = styled.p`
  font-size: 1.2rem;
  opacity: 0.9;
`;

export const CategorySection = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 30px;
  overflow-x: auto;
  padding: 10px 0;

  &::-webkit-scrollbar {
    height: 6px;
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.glass};
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.primary};
    border-radius: 3px;
  }
`;

export const CategoryTab = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 20px;
  background: ${({ active, theme }) =>
    active ? theme.colors.primary : theme.colors.glass};
  color: ${({ active, theme }) => (active ? "white" : theme.colors.text)};
  cursor: pointer;
  white-space: nowrap;
  transition: ${({ theme }) => theme.transitions.default};

  &:hover {
    background: ${({ theme }) => theme.colors.glassDark};
    transform: translateY(-2px);
  }
`;

export const TrendingSection = styled.section`
  margin-bottom: 40px;
`;

export const CarouselContainer = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin: 20px 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

export const CarouselButton = styled.button`
  position: absolute;
  top: 50%;
  ${({ position }) => position}: -40px;
  transform: translateY(-50%);
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.default};

  &:hover {
    transform: translateY(-50%) scale(1.1);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }
`;

export const PostsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin: 20px 0;
`;

export const PostCard = styled.article`
  background: white;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: ${({ theme }) => theme.transitions.default};

  ${({ trending }) =>
    trending &&
    css`
      border: 2px solid ${({ theme }) => theme.colors.accent};
    `}

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
  }
`;

export const PostHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
  }

  h4 {
    margin: 0;
    font-size: 1rem;
  }

  span {
    font-size: 0.8rem;
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

export const PostContent = styled.div`
  h3 {
    margin: 0 0 10px 0;
    font-size: 1.2rem;
  }

  p {
    margin: 0;
    color: ${({ theme }) => theme.colors.secondary};
    font-size: 0.9rem;
    line-height: 1.5;
  }
`;

export const EngagementStats = styled.div`
  display: flex;
  gap: 15px;
  margin: 15px 0;
  margin-bottom: 10px;

  span {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 0.9rem;
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

export const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export const Tag = styled.span`
  background: ${({ theme }) => theme.colors.glass};
  color: ${({ theme }) => theme.colors.primary};
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.8rem;
  transition: ${({ theme }) => theme.transitions.default};

  &:hover {
    background: ${({ theme }) => theme.colors.glassDark};
  }
`;
export const Button = styled.button`
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: 0.3s ease-in-out;

  ${({ primary, theme }) =>
    primary
      ? `
    background: ${theme.colors.primary};
    color: white;
    
    &:hover {
      background: ${theme.colors.secondary};
      transform: translateY(-2px);
    }
  `
      : `
    background: ${theme.colors.glass};
    color: ${theme.colors.text};
    
    &:hover {
      background: ${theme.colors.glassDark};
    }
  `}
`;

export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Input = styled.input`
  padding: 10px 15px;
  border: 2px solid ${({ theme }) => theme.colors.glass};
  border-radius: 8px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const TextArea = styled.textarea`
  padding: 10px 15px;
  border: 2px solid ${({ theme }) => theme.colors.glass};
  border-radius: 8px;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const ErrorMessage = styled.span`
  color: #dc3545;
  font-size: 0.875rem;
`;
