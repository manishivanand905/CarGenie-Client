import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const FAQSection = styled.section`
  margin-top: 3rem;
`;

export const FAQTitle = styled.h2`
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 2rem;
  font-size: 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 1.5rem;
  }
`;

export const FAQItem = styled.div`
  margin-bottom: 1rem;
  border-radius: 8px;
  overflow: hidden;
  background-color: white;
  box-shadow: 0 2px 4px ${({ theme }) => theme.colors.glass};
  transition: ${({ theme }) => theme.transitions.default};

  &:hover {
    box-shadow: 0 4px 8px ${({ theme }) => theme.colors.glassDark};
  }
`;

export const QuestionButton = styled.button`
  width: 100%;
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: none;
  border: none;
  text-align: left;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.default};

  &:hover {
    background-color: ${({ theme }) => theme.colors.glass};
  }
`;

export const StyledIcon = styled(FontAwesomeIcon)`
  color: ${({ theme }) => theme.colors.accent};
  transition: ${({ theme }) => theme.transitions.default};
  transform: ${({ $isOpen }) => ($isOpen ? "rotate(180deg)" : "rotate(0)")};
`;

export const AnswerContainer = styled.div`
  padding: ${({ $isOpen }) => ($isOpen ? "1rem 1.5rem" : "0 1.5rem")};
  max-height: ${({ $isOpen }) => ($isOpen ? "500px" : "0")};
  opacity: ${({ $isOpen }) => ($isOpen ? "1" : "0")};
  overflow: hidden;
  transition: all ${({ theme }) => theme.transitions.slow};
  color: ${({ theme }) => theme.colors.secondary};
`;
