import React, { useState, useCallback, memo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faLock } from "@fortawesome/free-solid-svg-icons";
import {
  ModalOverlay,
  ModalContainer,
  CloseButton,
  Form,
  FormTitle,
  FormGroup,
  Input,
  InputWrapper,
  TogglePasswordButton,
  ErrorText,
  SubmitButton,
  InfoText,
} from "./changePasswordStyles";
import OTP from "../../Auth/otpModal";
import Toast from "../../../common/Toast/toast";
import {
  initiatePasswordChange,
  verifyAndChangePassword,
  resendAuthenticatedOTP,
} from "../../../../services/user/api";

const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const PasswordInput = memo(
  ({
    type,
    value,
    onChange,
    placeholder,
    showPassword,
    onToggleVisibility,
    disabled,
  }) => (
    <InputWrapper>
      <Input
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        style={{ opacity: disabled ? 0.7 : 1 }}
      />
      <TogglePasswordButton
        type="button"
        onClick={onToggleVisibility}
        disabled={disabled}
        style={{
          opacity: disabled ? 0.7 : 1,
          cursor: disabled ? "not-allowed" : "pointer",
        }}
      >
        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
      </TogglePasswordButton>
    </InputWrapper>
  )
);

const ChangePasswordModal = ({ onClose }) => {
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [visibilityStates, setVisibilityStates] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
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

  const showToast = useCallback((message, type = "info", duration = 3000) => {
    setToast({ message, type, duration });
  }, []);

  const closeToast = useCallback(() => {
    setToast({ ...toast, message: "" });
  }, [toast]);

  const handleInputChange = useCallback(
    (field) => (e) => {
      if (isLoading) return;

      setPasswordData((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
      setError("");
    },
    [isLoading]
  );

  const toggleVisibility = useCallback(
    (field) => () => {
      if (isLoading) return;

      setVisibilityStates((prev) => ({
        ...prev,
        [field]: !prev[field],
      }));
    },
    [isLoading]
  );

  const validatePasswords = useCallback(() => {
    const { currentPassword, newPassword, confirmPassword } = passwordData;

    if (!currentPassword || !newPassword || !confirmPassword) {
      return "All fields are required";
    }

    if (!PASSWORD_REGEX.test(newPassword)) {
      return "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character";
    }

    if (newPassword !== confirmPassword) {
      return "New passwords do not match";
    }

    return null;
  }, [passwordData]);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (isLoading) return;

      const validationError = validatePasswords();

      if (validationError) {
        setError(validationError);
        showToast(validationError, "error");
        return;
      }

      setIsLoading(true);

      try {
        const response = await initiatePasswordChange(
          passwordData.currentPassword
        );
        if (response.success) {
          setOtpSentTime(Date.now());
          setShowOTPModal(true);
          showToast("Verification code sent to your email", "info");
        } else {
          if (response.message.includes("incorrect")) {
            setError("Current password is incorrect");
            showToast("Current password is incorrect", "error");
          } else if (
            response.message.includes("wait") ||
            response.message.includes("seconds")
          ) {
            setError(response.message);
            showToast("Please wait before trying again", "error");
          } else {
            setError(response.message || "Failed to initiate password change");
            showToast("Failed to initiate password change", "error");
          }
        }
      } catch (err) {
        setError("An error occurred. Please try again later.");
        showToast("An unexpected error occurred", "error");
      } finally {
        setIsLoading(false);
      }
    },
    [validatePasswords, passwordData.currentPassword, isLoading, showToast]
  );

  const handleOTPVerify = useCallback(
    async (otp) => {
      setIsLoading(true);

      try {
        const response = await verifyAndChangePassword(
          otp,
          passwordData.newPassword
        );
        if (response.success) {
          setShowOTPModal(false);
          showToast("Password changed successfully", "success");

          // Delay closing the modal to show the success toast
          setTimeout(() => {
            onClose();
          }, 1500);

          setIsLoading(false);
          return null; // No error message means success
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
        showToast("An error occurred during verification", "error");
        return "An error occurred during verification";
      }
    },
    [onClose, passwordData.newPassword, showToast]
  );

  const handleOTPCancel = useCallback(() => {
    if (isLoading) return;
    setShowOTPModal(false);
  }, [isLoading]);

  const handleResendOTP = useCallback(async () => {
    setIsLoading(true);

    try {
      const response = await resendAuthenticatedOTP("passwordChange");

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
  }, [showToast]);

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
          <Form onSubmit={handleSubmit}>
            <FormTitle>
              <FontAwesomeIcon icon={faLock} /> Change Password
            </FormTitle>

            {Object.keys(passwordData).map((field) => (
              <FormGroup key={field}>
                <PasswordInput
                  value={passwordData[field]}
                  onChange={handleInputChange(field)}
                  placeholder={field.split(/(?=[A-Z])/).join(" ")}
                  showPassword={visibilityStates[field]}
                  onToggleVisibility={toggleVisibility(field)}
                  disabled={isLoading}
                />
              </FormGroup>
            ))}

            {error && <ErrorText>{error}</ErrorText>}

            <InfoText style={{ opacity: isLoading ? 0.7 : 1 }}>
              Password must contain at least 8 characters, including uppercase,
              lowercase, number, and special character
            </InfoText>

            <SubmitButton
              type="submit"
              disabled={isLoading}
              style={{
                opacity: isLoading ? 0.7 : 1,
                cursor: isLoading ? "not-allowed" : "pointer",
              }}
            >
              {isLoading ? "Processing..." : "Change Password"}
            </SubmitButton>
          </Form>
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

export default memo(ChangePasswordModal);
