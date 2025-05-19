import styled from "styled-components";

export const AuthContainer = styled.div`
  display: flex;
  min-height: 100vh;
  width: 100%;
  background: #ffffff;
  position: relative;
  overflow: hidden;

  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;
`;
