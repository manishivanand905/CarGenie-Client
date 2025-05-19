import styled from "styled-components";

export const HomeContainer = styled.div`
  padding: 2rem;
  background: ${({ theme }) => theme.colors.background};
`;

export const HeroSection = styled.div`
  background: linear-gradient(rgba(91, 35, 51, 0.8), rgba(91, 35, 51, 0.6)),
    url("/car-background.jpg");
  background-size: cover;
  background-position: center;
  border-radius: 1rem;
  padding: 3rem;
  margin-bottom: 2rem;
  transition: ${({ theme }) => theme.transitions.default};

  &:hover {
    transform: scale(1.01);
    box-shadow: 0 8px 16px ${({ theme }) => theme.colors.glassDark};
  }
`;

export const WelcomeText = styled.div`
  color: white;
  h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    font-weight: bold;
  }
  p {
    font-size: 1.2rem;
    opacity: 0.9;
  }
`;

export const ActionButtons = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;

  button {
    background: white;
    border: none;
    padding: 1rem;
    border-radius: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 600;
    cursor: pointer;
    transition: ${({ theme }) => theme.transitions.default};

    &:hover {
      background: ${({ theme }) => theme.colors.primary};
      color: white;
      transform: translateY(-2px);
      box-shadow: 0 4px 8px ${({ theme }) => theme.colors.glassDark};
    }
  }
`;

export const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

export const WidgetCard = styled.div`
  background: white;
  border-radius: 1rem;
  padding: 1.5rem;
  transition: ${({ theme }) => theme.transitions.default};

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px ${({ theme }) => theme.colors.glass};
  }
`;

export const WidgetHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.primary};

  h2 {
    font-size: 1.2rem;
    font-weight: 600;
  }
`;
