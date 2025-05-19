import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { validateAdminToken } from "../../../services/admin/api";

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

const AdminProtectedRoute = () => {
  const [authStatus, setAuthStatus] = useState({
    isChecking: true,
    isAuthenticated: false,
    user: null,
  });

  const location = useLocation();

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const hasTokenInCookie = document.cookie.includes("adminToken=");
        const hasTokenInStorage = !!localStorage.getItem("adminToken");

        if (!hasTokenInCookie && !hasTokenInStorage) {
          setAuthStatus({
            isChecking: false,
            isAuthenticated: false,
            user: null,
          });
          return;
        }

        const response = await validateAdminToken();

        if (response.success) {
          setAuthStatus({
            isChecking: false,
            isAuthenticated: true,
            user: response.admin || null,
          });
        } else {
          throw new Error("Token validation failed");
        }
      } catch (error) {
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
        <LoadingText>Verifying your admin access...</LoadingText>
      </AuthCheckContainer>
    );
  }

  return authStatus.isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/admin/login" state={{ from: location }} replace />
  );
};

export default AdminProtectedRoute;
