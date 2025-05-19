import React from "react";
import { useNavigate } from "react-router-dom";
import { faHome, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  NotFoundWrapper,
  NotFoundContent,
  ErrorCode,
  Title,
  Description,
  ButtonGroup,
  Button,
} from "./notFoundStyles";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <NotFoundWrapper>
      <NotFoundContent>
        <ErrorCode>404</ErrorCode>
        <Title>Page Not Found</Title>
        <Description>
          Oops! The page you're looking for doesn't exist or has been moved.
        </Description>
        <ButtonGroup>
          <Button onClick={() => navigate(-1)}>
            <FontAwesomeIcon icon={faArrowLeft} /> Go Back
          </Button>
          <Button primary onClick={() => navigate("/")}>
            <FontAwesomeIcon icon={faHome} /> Home
          </Button>
        </ButtonGroup>
      </NotFoundContent>
    </NotFoundWrapper>
  );
};

export default NotFound;
