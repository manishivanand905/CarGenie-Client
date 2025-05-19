import styled from "styled-components";

export const SearchContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 600px;
`;

export const SearchInputWrapper = styled.form`
  display: flex;
  width: 100%;
  position: relative;
`;

export const SearchInputField = styled.input`
  width: 100%;
  padding: 12px 20px;
  padding-right: 50px;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  font-size: 14px;
  transition: all 0.3s ease;
  background-color: #f8f9fa;

  &:focus {
    outline: none;
    border-color: #2196f3;
    box-shadow: 0 0 0 2px rgba(33, 150, 243, 0.2);
    background-color: #fff;
  }
`;

export const SearchButton = styled.button`
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  width: 50px;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #757575;
  transition: color 0.3s;

  &:hover {
    color: #2196f3;
  }
`;

export const DropdownContainer = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  width: 100%;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  max-height: 600px;
  overflow-y: auto;
  padding: 8px 0;
`;

export const ResultCategory = styled.div`
  padding: 8px 0;

  h4 {
    font-size: 14px;
    color: #757575;
    margin: 0;
    padding: 8px 16px;
    display: flex;
    align-items: center;
    gap: 8px;

    svg {
      font-size: 12px;
    }
  }

  &:not(:last-of-type) {
    border-bottom: 1px solid #f0f0f0;
  }
`;

export const ResultItem = styled.div`
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 16px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f5f5f5;
  }
`;

export const ResultImage = styled.div`
  width: 48px;
  height: 48px;
  overflow: hidden;
  border-radius: 6px;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const ResultInfo = styled.div`
  flex: 1;
`;

export const ResultName = styled.h5`
  margin: 0 0 4px;
  font-size: 15px;
  color: #333;
`;

export const ResultMeta = styled.p`
  margin: 0;
  font-size: 13px;
  color: #757575;
`;

export const NoResults = styled.div`
  padding: 20px 16px;
  text-align: center;
  color: #757575;
  font-size: 14px;
`;

export const LoadingIndicator = styled.div`
  padding: 20px 16px;
  text-align: center;
  color: #757575;
  font-size: 14px;
`;

export const ViewAllButton = styled.button`
  display: block;
  width: 100%;
  padding: 12px;
  text-align: center;
  background-color: #f5f5f5;
  border: none;
  border-top: 1px solid #f0f0f0;
  cursor: pointer;
  color: #2196f3;
  font-weight: 500;
  transition: background-color 0.2s;

  &:hover {
    background-color: #e3f2fd;
  }
`;
