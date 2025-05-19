import styled from "styled-components";

export const StyledErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 48px 0;
  padding: 24px;
  background: #fef2f2;
  border: 1px solid #fee2e2;
  border-radius: 12px;
  text-align: center;
  max-width: 400px;
  margin: 48px auto;

  svg {
    color: #dc2626;
    font-size: 32px;
    margin-bottom: 16px;
  }
`;

export const ErrorText = styled.p`
  color: #991b1b;
  font-size: 16px;
  font-weight: 500;
  margin: 0;
  line-height: 1.5;
`;

export const RetryButton = styled.button`
  background: linear-gradient(135deg, #dc2626, #991b1b);
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  margin-top: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(220, 38, 38, 0.2);
  }

  &:active {
    transform: translateY(0);
  }

  svg {
    font-size: 16px;
    color: white;
    margin: 0;
  }
`;
