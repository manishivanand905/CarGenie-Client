import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExclamationTriangle,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import {
  ModalOverlay,
  ModalContainer,
  CloseButton,
  Title,
  WarningIcon,
  Content,
  CheckboxContainer,
  StyledCheckbox,
  CheckboxLabel,
  ButtonGroup,
  CancelButton,
  DeleteButton,
  PasswordInput,
  ErrorText,
} from "./deleteAccountStyles";
import OTP from "../../Auth/otpModal";
import Toast from "../../../common/Toast/toast";
import {
  initiateAccountDeletion,
  verifyAndDeleteAccount,
  resendAuthenticatedOTP,
} from "../../../../services/user/api";

const DeleteAccountModal = ({ onClose, onConfirm }) => {
  const [password, setPassword] = useState("");
  const [confirmations, setConfirmations] = useState({
    deleteData: false,
    noRecover: false,
    understand: false,
  });
  const [error, setError] = useState("");
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [otpSentTime, setOtpSentTime] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState({
    message: "",
    type: "info",
    duration: 3000,
  });

  const showToast = (message, type = "info", duration = 3000) => {
    setToast({ message, type, duration });
  };

  const closeToast = () => {
    setToast({ ...toast, message: "" });
  };

  const handleCheckboxChange = (key) => {
    if (isLoading) return;

    setConfirmations((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;

    setError("");
    setIsLoading(true);

    if (!password) {
      setError("Please enter your password");
      setIsLoading(false);
      return;
    }

    if (!Object.values(confirmations).every((value) => value)) {
      setError("Please acknowledge all confirmations");
      setIsLoading(false);
      return;
    }

    try {
      const response = await initiateAccountDeletion(password);
      if (response.success) {
        setOtpSentTime(Date.now());
        setShowOTPModal(true);
        showToast("Verification code sent to your email", "info");
      } else {
        if (response.message.includes("incorrect")) {
          setError("The password is incorrect");
          showToast("Incorrect password", "error");
        } else if (
          response.message.includes("wait") ||
          response.message.includes("seconds")
        ) {
          setError(response.message);
          showToast("Please wait before trying again", "error");
        } else {
          setError(response.message || "Failed to initiate account deletion");
          showToast("Failed to initiate account deletion", "error");
        }
      }
    } catch (err) {
      setError("An error occurred. Please try again later.");
      showToast("An unexpected error occurred", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOTPVerify = async (otp) => {
    setIsLoading(true);

    try {
      const response = await verifyAndDeleteAccount(otp);
      if (response.success) {
        setShowOTPModal(false);
        showToast("Account successfully deleted", "success");

        setTimeout(() => {
          onConfirm();
        }, 1000);

        setIsLoading(false);
        return null;
      } else {
        if (response.message.includes("expired")) {
          showToast("Verification code expired", "error");
        } else if (response.message.includes("Invalid")) {
          showToast("Invalid verification code", "error");
        } else {
          showToast("Verification failed", "error");
        }

        setIsLoading(false);
        return response.message || "Verification failed";
      }
    } catch (err) {
      setIsLoading(false);
      showToast("An unexpected error occurred", "error");
      return "An error occurred during verification";
    }
  };

  const handleOTPCancel = () => {
    if (isLoading) return;

    setShowOTPModal(false);
  };

  const handleResendOTP = async () => {
    setIsLoading(true);

    try {
      const response = await resendAuthenticatedOTP("accountDeletion");

      if (response.success) {
        setOtpSentTime(Date.now());
        showToast("Verification code resent", "success");
      } else {
        if (
          response.message.includes("wait") ||
          response.message.includes("seconds")
        ) {
          showToast(response.message, "error");
        } else {
          showToast("Failed to resend verification code", "error");
        }
      }

      setIsLoading(false);
      return response;
    } catch (err) {
      setIsLoading(false);
      showToast("Failed to resend verification code", "error");
      return {
        success: false,
        message: "Failed to resend OTP",
      };
    }
  };

  return (
    <>
      <Toast
        message={toast.message}
        type={toast.type}
        duration={toast.duration}
        onClose={closeToast}
      />

      <ModalOverlay>
        <ModalContainer>
          <CloseButton
            onClick={onClose}
            disabled={isLoading}
            style={{
              opacity: isLoading ? 0.7 : 1,
              cursor: isLoading ? "not-allowed" : "pointer",
            }}
          >
            &times;
          </CloseButton>
          <Title>
            <WarningIcon>
              <FontAwesomeIcon icon={faExclamationTriangle} />
            </WarningIcon>
            Delete Account
          </Title>

          <Content>
            <form onSubmit={handleSubmit}>
              <p>
                Are you sure you want to delete your CarGenie account? This
                action cannot be undone.
              </p>

              <CheckboxContainer>
                <StyledCheckbox
                  type="checkbox"
                  id="deleteData"
                  checked={confirmations.deleteData}
                  onChange={() => handleCheckboxChange("deleteData")}
                  disabled={isLoading}
                />
                <CheckboxLabel
                  htmlFor="deleteData"
                  style={{ opacity: isLoading ? 0.7 : 1 }}
                >
                  I understand that all my data, including saved cars,
                  comparisons, and preferences will be permanently deleted
                </CheckboxLabel>
              </CheckboxContainer>

              <CheckboxContainer>
                <StyledCheckbox
                  type="checkbox"
                  id="noRecover"
                  checked={confirmations.noRecover}
                  onChange={() => handleCheckboxChange("noRecover")}
                  disabled={isLoading}
                />
                <CheckboxLabel
                  htmlFor="noRecover"
                  style={{ opacity: isLoading ? 0.7 : 1 }}
                >
                  I understand that once deleted, my account cannot be recovered
                </CheckboxLabel>
              </CheckboxContainer>

              <CheckboxContainer>
                <StyledCheckbox
                  type="checkbox"
                  id="understand"
                  checked={confirmations.understand}
                  onChange={() => handleCheckboxChange("understand")}
                  disabled={isLoading}
                />
                <CheckboxLabel
                  htmlFor="understand"
                  style={{ opacity: isLoading ? 0.7 : 1 }}
                >
                  I understand that this action is permanent and irreversible
                </CheckboxLabel>
              </CheckboxContainer>

              <PasswordInput
                type="password"
                placeholder="Enter your password to confirm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                style={{ opacity: isLoading ? 0.7 : 1 }}
              />

              {error && <ErrorText>{error}</ErrorText>}

              <ButtonGroup>
                <CancelButton
                  type="button"
                  onClick={onClose}
                  disabled={isLoading}
                  style={{
                    opacity: isLoading ? 0.7 : 1,
                    cursor: isLoading ? "not-allowed" : "pointer",
                  }}
                >
                  Cancel
                </CancelButton>
                <DeleteButton
                  type="submit"
                  disabled={isLoading}
                  style={{
                    opacity: isLoading ? 0.7 : 1,
                    cursor: isLoading ? "not-allowed" : "pointer",
                  }}
                >
                  <FontAwesomeIcon icon={faTrash} />{" "}
                  {isLoading ? "Processing..." : "Delete Account"}
                </DeleteButton>
              </ButtonGroup>
            </form>
          </Content>
        </ModalContainer>
      </ModalOverlay>

      {showOTPModal && (
        <OTP
          onVerify={handleOTPVerify}
          onCancel={handleOTPCancel}
          onResend={handleResendOTP}
          otpSentTime={otpSentTime}
          isDisabled={isLoading}
        />
      )}
    </>
  );
};

export default DeleteAccountModal;
