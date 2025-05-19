import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { validateToken } from "../../../services/user/api";

const AuthCheckContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
`;

const LoadingIcon = styled(FontAwesomeIcon)`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const LoadingText = styled.p`
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.1rem;
`;

const ProtectedRoute = () => {
  const [authStatus, setAuthStatus] = useState({
    isChecking: true,
    isAuthenticated: false,
    user: null,
  });

  const location = useLocation();

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const response = await validateToken();
        setAuthStatus({
          isChecking: false,
          isAuthenticated: response.success,
          user: response.user || null,
        });
      } catch (error) {
        console.error("Auth verification error:", error);
        setAuthStatus({
          isChecking: false,
          isAuthenticated: false,
          user: null,
        });
      }
    };

    verifyAuth();
  }, []);

  if (authStatus.isChecking) {
    return (
      <AuthCheckContainer>
        <LoadingIcon icon={faSpinner} spin />
        <LoadingText>Verifying your access...</LoadingText>
      </AuthCheckContainer>
    );
  }

  return authStatus.isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default ProtectedRoute;
