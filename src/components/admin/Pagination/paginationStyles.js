import styled from "styled-components";

export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1.5rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    gap: 0.25rem;
  }
`;

export const PageButton = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 8px;
  background: ${({ active, theme }) =>
    active ? theme.colors.primary : theme.colors.glass};
  color: ${({ active, theme }) => (active ? "white" : theme.colors.primary)};
  transition: all ${({ theme }) => theme.transitions.default};
  font-weight: ${({ active }) => (active ? "600" : "400")};

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: white;
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 0.4rem 0.8rem;
    font-size: 0.9rem;
  }
`;
