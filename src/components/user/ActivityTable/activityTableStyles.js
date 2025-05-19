import styled, { keyframes } from "styled-components";

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

export const TableWrapper = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px ${({ theme }) => theme.colors.glass};
  animation: fadeIn 0.8s ease-out forwards;
  overflow-x: auto;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid ${({ theme }) => theme.colors.glass};
  }
`;

export const SearchBar = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  background: white;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  box-shadow: 0 2px 4px ${({ theme }) => theme.colors.glass};
`;

export const SearchIcon = styled.div`
  color: ${({ theme }) => theme.colors.primary};
  margin-right: 0.5rem;
`;

export const SearchInput = styled.input`
  border: none;
  outline: none;
  width: 100%;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text};

  &::placeholder {
    color: ${({ theme }) => theme.colors.glass};
  }
`;

export const TableHeader = styled.th`
  position: sticky;
  top: 0;
  background: white;
  z-index: 1;
  padding: 1rem;
`;

export const SortButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 600;
  transition: color ${({ theme }) => theme.transitions.default};

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

export const LoadingSpinner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 2rem;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.1rem;

  svg {
    animation: ${spin} 1s linear infinite;
  }
`;

export const NoDataMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.1rem;
`;

export const TimeStamp = styled.span`
  color: ${({ theme }) => theme.colors.secondary};
  font-size: 0.9rem;
`;

export const UserInfo = styled.span`
  font-weight: 500;
`;

export const ActivityType = styled.span`
  padding: 0.25rem 0.75rem;
  border-radius: 15px;
  font-size: 0.9rem;
  background: ${({ type, theme }) => {
    switch (type) {
      case "car comparison":
        return "rgba(25, 118, 210, 0.1)";
      case "saved search":
        return "rgba(76, 175, 80, 0.1)";
      case "test drive request":
        return "rgba(255, 152, 0, 0.1)";
      case "car review":
        return "rgba(156, 39, 176, 0.1)";
      case "price alert":
        return "rgba(244, 67, 54, 0.1)";
      default:
        return theme.colors.glass;
    }
  }};
  color: ${({ type }) => {
    switch (type) {
      case "car comparison":
        return "#1976D2";
      case "saved search":
        return "#4CAF50";
      case "test drive request":
        return "#FF9800";
      case "car review":
        return "#9C27B0";
      case "price alert":
        return "#F44336";
      default:
        return "#757575";
    }
  }};
`;

export const CarInfo = styled.span`
  color: ${({ theme }) => theme.colors.accent};
  font-weight: 500;
`;

export const ActivityDetail = styled.span`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.8;
`;
