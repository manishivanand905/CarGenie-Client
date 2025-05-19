import styled from "styled-components";
import { theme } from "../../../styles/theme";

export const CalculatorContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

export const Header = styled.h1`
  color: ${theme.colors.text};
  font-size: 24px;
  margin-bottom: 10px;
`;

export const SubHeader = styled.p`
  color: ${theme.colors.secondary};
  margin-bottom: 30px;
`;

export const MainContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;

  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

export const SelectGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 30px;

  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

export const Label = styled.label`
  color: ${theme.colors.text};
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
`;

export const InputSection = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px ${theme.colors.glass};
`;

export const ResultSection = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px ${theme.colors.glass};
`;

export const EMIAmount = styled.div`
  font-size: 32px;
  color: ${theme.colors.primary};
  font-weight: bold;
  margin-bottom: 20px;
`;

export const EMIPeriod = styled.span`
  font-size: 14px;
  color: ${theme.colors.secondary};
  font-weight: normal;
`;

export const InputGroup = styled.div`
  margin-bottom: 20px;
`;

export const InputField = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid ${theme.colors.glass};
  border-radius: 4px;
  margin-top: 8px;
`;

export const Disclaimer = styled.p`
  color: ${theme.colors.secondary};
  font-size: ${(props) => (props.small ? "12px" : "14px")};
  margin-top: 20px;
`;

export const Link = styled.a`
  color: ${theme.colors.accent};
  text-decoration: underline;
  cursor: pointer;
`;

// Bank Comparison Components
export const BankComparisonTable = styled.div`
  margin-top: 40px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px ${theme.colors.glass};
`;

export const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  background: ${theme.colors.primary};
  color: white;
  padding: 15px 20px;
  font-weight: 500;
`;

export const TableRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  padding: 12px 20px;
  align-items: center;
  border-bottom: 1px solid ${theme.colors.glass};
  background: white;

  &:last-child {
    border-bottom: none;
  }

  &:nth-child(even) {
    background: ${theme.colors.light};
  }
`;

export const BankLogo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  img {
    width: 40px;
    height: 40px;
    object-fit: contain;
  }

  span {
    font-weight: 500;
  }
`;

export const InterestRate = styled.div`
  font-weight: 500;
  color: ${theme.colors.accent};
`;

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
