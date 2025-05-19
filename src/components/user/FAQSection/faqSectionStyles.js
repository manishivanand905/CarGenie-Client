import styled from "styled-components";
import { motion } from "framer-motion";
import { theme } from "../../../styles/theme";

export const FAQContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto 60px;
  padding: 30px 20px;
  background-color: ${theme.colors.background};
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(91, 35, 51, 0.08);
`;

export const FAQTitle = styled.h2`
  font-size: 28px;
  font-weight: 700;
  color: ${theme.colors.text};
  margin-bottom: 24px;

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 24px;
  }
`;

export const FAQItem = styled.div`
  border-bottom: 1px solid ${theme.colors.glass};

  &:last-child {
    border-bottom: none;
  }
`;

export const QuestionRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  cursor: pointer;
  transition: all ${theme.transitions.default};

  &:hover {
    color: ${theme.colors.primary};
  }
`;

export const QuestionText = styled.h3`
  font-size: 18px;
  font-weight: 500;
  color: ${theme.colors.text};

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 16px;
  }
`;

export const ExpandIcon = styled.i`
  color: ${theme.colors.primary};
  font-size: 16px;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: ${theme.colors.glass};
  transition: all ${theme.transitions.default};
  transform-origin: center;

  &.fa-minus {
    transform: rotate(0deg);
    background: ${theme.colors.primary};
    color: white;
  }

  &.fa-plus {
    transform: rotate(90deg);
    transform-origin: center;
  }
`;

export const AnswerContainer = styled(motion.div)`
  overflow: hidden;
  padding: 0 10px;
`;

export const AnswerText = styled.p`
  color: ${theme.colors.text};
  opacity: 0.9;
  line-height: 1.6;
  margin: 0;
  padding: 0 0 20px 0;
  font-size: 16px;

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 14px;
  }
`;
