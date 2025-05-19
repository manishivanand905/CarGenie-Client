import styled, { keyframes } from "styled-components";
import { theme } from "../../../styles/theme";

const fadeUpAnimation = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const floatAnimation = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
  100% { transform: translateY(0); }
`;

export const ProfileContainer = styled.div`
  background: linear-gradient(135deg, #f7f4f3, #ede7e6, #e4dcd9, #f7f4f3);
  min-height: 100vh;
  padding: 40px 20px;
`;

export const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  animation: ${fadeUpAnimation} 0.8s ease-out;
`;

export const BannerSection = styled.div`
  background: ${theme.colors.primary};
  border-radius: 20px;
  padding: 40px;
  margin-bottom: 30px;
  color: white;
  box-shadow: 0 10px 30px rgba(91, 35, 51, 0.1);

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 20px;
    border-radius: 15px;
  }
`;

export const ProfileDetails = styled.div`
  display: flex;
  gap: 40px;
  align-items: flex-start;

  @media (max-width: ${theme.breakpoints.tablet}) {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 30px;
  }
`;

export const ProfileImageContainer = styled.div`
  position: relative;
  width: 180px;
  height: 180px;
  flex-shrink: 0;
  border-radius: 50%;
  padding: 4px;
  background: white;
  box-shadow: 0 5px 15px rgba(91, 35, 51, 0.1);

  @media (max-width: ${theme.breakpoints.mobile}) {
    width: 150px;
    height: 150px;
  }
`;

export const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid white;
  transition: transform 0.3s ease;
`;

export const ImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.4);
  opacity: 0;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    opacity: 1;
  }
`;

export const UploadButton = styled.label`
  cursor: pointer;
  font-size: 24px;
  color: white;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

export const UserInfo = styled.div`
  flex-grow: 1;

  h1 {
    font-size: 2.8rem;
    margin-bottom: 10px;
    font-weight: 700;
    color: white;
    letter-spacing: -0.5px;

    @media (max-width: ${theme.breakpoints.mobile}) {
      font-size: 2rem;
    }
  }
`;

export const UserEmail = styled.div`
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.9);
  margin: 5px 0;
`;

export const TierLabel = styled.span`
  background: #ffc107;
  color: #000;
  padding: 8px 20px;
  border-radius: 25px;
  font-weight: 600;
  font-size: 0.9rem;
  display: inline-block;
  margin: 10px 0;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

export const BiographyText = styled.p`
  font-size: 1.2rem;
  margin: 20px 0;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.95);
  max-width: 600px;
`;

export const JoinedDate = styled.div`
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 20px;
  font-style: italic;
`;

export const StatsContainer = styled.div`
  margin-top: 35px;
  padding: 25px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 16px;
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

export const StatisticsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 20px;
`;

export const StatBox = styled.div`
  text-align: center;
  padding: 20px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.15);
  animation: ${floatAnimation} 3s infinite ease-in-out;

  &:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.15);
  }

  span {
    font-size: 0.95rem;
    color: rgba(255, 255, 255, 0.9);
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
`;

export const AnimatedCount = styled.div`
  font-size: 2.4rem;
  font-weight: 700;
  margin-bottom: 8px;
  color: white;
`;

export const ActionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 30px;
`;

export const ActionBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 16px 30px;
  border-radius: 12px;
  background: ${({ danger }) => (danger ? "#FF4444" : theme.colors.primary)};
  color: white;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    background: ${({ danger }) =>
      danger ? "#FF0000" : theme.colors.secondary};
    box-shadow: 0 5px 15px
      ${({ danger }) =>
        danger ? "rgba(255, 0, 0, 0.2)" : "rgba(91, 35, 51, 0.2)"};
  }

  svg {
    font-size: 1.2rem;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 14px 24px;
    font-size: 1rem;
  }
`;
