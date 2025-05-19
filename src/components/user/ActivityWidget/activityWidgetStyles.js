import styled from "styled-components";

export const ActivityItem = styled.div`
  padding: 0.75rem 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.glass};

  &:last-child {
    border-bottom: none;
  }

  h3 {
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 600;
    margin-bottom: 0.25rem;
  }

  p {
    color: ${({ theme }) => theme.colors.text};
    font-size: 0.9rem;
  }
`;
