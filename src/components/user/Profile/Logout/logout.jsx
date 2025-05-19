import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import {
  ModalOverlay,
  ModalContainer,
  CloseButton,
  Title,
  Content,
  ButtonGroup,
  CancelButton,
  LogoutButton,
} from "./logoutStyles";
import Toast from "../../../common/Toast/toast";
import { logout } from "../../../../services/user/api";

const LogoutModal = ({ onClose }) => {
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [toast, setToast] = useState({ message: "", type: "" });

  const handleLogout = async () => {
    if (isLoggingOut) return;

    try {
      setIsLoggingOut(true);

      await logout();

      setToast({ message: "Successfully logged out", type: "success" });

      setTimeout(() => {
        // Use the navigate function instead of directly modifying location
        navigate("/login");
      }, 1000);
    } catch (error) {
      setToast({
        message: error.message || "Failed to logout. Please try again.",
        type: "error",
      });
      setIsLoggingOut(false);
    }
  };

  const handleCloseToast = () => {
    setToast({ message: "", type: "" });
  };

  const handleClose = () => {
    if (!isLoggingOut) {
      onClose();
    }
  };

  // Close dropdown menus when logout modal opens
  useEffect(() => {
    return () => {
      // This cleanup function will run when the modal unmounts
      document.body.style.overflow = "auto";
    };
  }, []);

  // Prevent body scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
  }, []);

  return (
    <ModalOverlay>
      <ModalContainer>
        <CloseButton
          onClick={handleClose}
          style={{ pointerEvents: isLoggingOut ? "none" : "auto" }}
        >
          &times;
        </CloseButton>
        <Title>Confirm Logout</Title>
        <Content>
          <p>Are you sure you want to logout from CarGenie?</p>
          <ButtonGroup>
            <CancelButton
              type="button"
              onClick={handleClose}
              disabled={isLoggingOut}
              style={{
                opacity: isLoggingOut ? 0.6 : 1,
                cursor: isLoggingOut ? "not-allowed" : "pointer",
                pointerEvents: isLoggingOut ? "none" : "auto",
              }}
            >
              Cancel
            </CancelButton>
            <LogoutButton
              type="button"
              onClick={handleLogout}
              disabled={isLoggingOut}
              style={{
                opacity: isLoggingOut ? 0.6 : 1,
                cursor: isLoggingOut ? "not-allowed" : "pointer",
                pointerEvents: isLoggingOut ? "none" : "auto",
              }}
            >
              <FontAwesomeIcon icon={faSignOutAlt} />
              {isLoggingOut ? "Logging out..." : "Logout"}
            </LogoutButton>
          </ButtonGroup>

          <Toast
            message={toast.message}
            type={toast.type}
            duration={3000}
            onClose={handleCloseToast}
          />
        </Content>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default LogoutModal;
