import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExclamationTriangle,
  faSync,
} from "@fortawesome/free-solid-svg-icons";
import { StyledErrorContainer, ErrorText, RetryButton } from "./errorStyles";

const ErrorContainer = ({ error, onRetry }) => {
  return (
    <StyledErrorContainer>
      <FontAwesomeIcon icon={faExclamationTriangle} />
      <ErrorText>{error}</ErrorText>
      <RetryButton onClick={onRetry}>
        <FontAwesomeIcon icon={faSync} /> Try Again
      </RetryButton>
    </StyledErrorContainer>
  );
};

export default ErrorContainer;
