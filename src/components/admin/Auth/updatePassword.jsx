import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import {
  ModalOverlay,
  ModalContent,
  ModalTitle,
  InputGroup,
  Input,
  Button,
  CloseButton,
  PasswordToggle,
} from "./authStyles";
import Toast from "../../common/Toast/toast";

const UpdatePassword = ({ onSubmit, onCancel, email }) => {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState({
    message: "",
    type: "info",
    visible: false,
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("newPassword");

  const showToast = (message, type = "info") => {
    setToast({
      message,
      type,
      visible: true,
    });
  };

  const hideToast = () => {
    setToast({
      ...toast,
      visible: false,
    });
  };

  const handleFormSubmit = async (data) => {
    // Check for form validation errors and show them in toast
    if (Object.keys(errors).length > 0) {
      const firstError = Object.values(errors)[0];
      showToast(firstError.message, "error");
      return;
    }

    setIsSubmitting(true);

    try {
      await onSubmit(data.newPassword);
      showToast("Password update initiated successfully", "success");
    } catch (error) {
      showToast(error.message || "Failed to update password", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ModalOverlay>
      {toast.visible && (
        <Toast
          message={toast.message}
          type={toast.type}
          duration={3000}
          onClose={hideToast}
        />
      )}

      <ModalContent>
        <CloseButton onClick={onCancel}>&times;</CloseButton>
        <ModalTitle>Update Password</ModalTitle>

        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <InputGroup>
            <Input
              {...register("newPassword", {
                required: "New password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message:
                    "Password must contain uppercase, lowercase, number and special character",
                },
              })}
              type={showNewPassword ? "text" : "password"}
              placeholder="New Password"
              error={errors.newPassword}
              disabled={isSubmitting}
            />
            <PasswordToggle
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              aria-label={showNewPassword ? "Hide password" : "Show password"}
              disabled={isSubmitting}
            >
              <FontAwesomeIcon icon={showNewPassword ? faEyeSlash : faEye} />
            </PasswordToggle>
          </InputGroup>

          <InputGroup>
            <Input
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              error={errors.confirmPassword}
              disabled={isSubmitting}
            />
            <PasswordToggle
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              aria-label={
                showConfirmPassword ? "Hide password" : "Show password"
              }
              disabled={isSubmitting}
            >
              <FontAwesomeIcon
                icon={showConfirmPassword ? faEyeSlash : faEye}
              />
            </PasswordToggle>
          </InputGroup>

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "UPDATING..." : "UPDATE PASSWORD"}
          </Button>
        </form>
      </ModalContent>
    </ModalOverlay>
  );
};

export default UpdatePassword;
