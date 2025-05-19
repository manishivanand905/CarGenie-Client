import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  faUser,
  faEnvelope,
  faPhone,
  faLock,
  faVenusMars,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  initiateAdminRegistration,
  verifyAdminOtp,
  resendAdminOTP,
} from "../../../services/admin/api";
import {
  FormWrapper,
  FormSection,
  ImageSection,
  Form,
  Title,
  InputGroup,
  Input,
  InputIcon,
  PasswordToggle,
  Select,
  Button,
  SwitchText,
  SwitchLink,
} from "./authStyles";
import OTPModal from "./otpModal";
import Toast from "../../common/Toast/toast";

const Register = ({ onSwitch, isEntering }) => {
  const [showOTP, setShowOTP] = useState(false);
  const [registrationData, setRegistrationData] = useState(null);
  const [otpSentTime, setOtpSentTime] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [toast, setToast] = useState({
    message: "",
    type: "info",
    visible: false,
  });

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const password = watch("password");

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

  const onSubmit = async (data) => {
    if (Object.keys(errors).length > 0) {
      const firstError = Object.values(errors)[0];
      showToast(firstError.message, "error");
      return;
    }

    try {
      if (otpSentTime && Date.now() - otpSentTime < 60000) {
        const remainingTime = Math.ceil(
          (60000 - (Date.now() - otpSentTime)) / 1000
        );
        showToast(
          `Please wait ${remainingTime} seconds before requesting another OTP`,
          "error"
        );
        return;
      }

      const response = await initiateAdminRegistration(data.email);

      if (response.success) {
        setRegistrationData(data);
        setShowOTP(true);
        setOtpSentTime(Date.now());
        showToast("Admin verification OTP sent successfully", "success");
      } else {
        showToast(
          response.message || "Admin registration failed. Please try again.",
          "error"
        );
      }
    } catch (error) {
      if (error.response?.status === 429) {
        showToast(
          "Please wait 1 minute before requesting another OTP",
          "error"
        );
        setOtpSentTime(Date.now());
      } else {
        showToast(
          error.message || "Admin registration failed. Please try again.",
          "error"
        );
      }
    }
  };

  const handleOTPVerification = async (otp) => {
    try {
      const response = await verifyAdminOtp(
        registrationData.email,
        otp,
        registrationData
      );

      if (response.success) {
        showToast("Admin registration successful", "success");
        reset();
        setTimeout(() => {
          navigate("/admin/dashboard");
        }, 1000);
        return null;
      }
      return response.message;
    } catch (error) {
      return error.message;
    }
  };

  const handleResendOTP = async () => {
    try {
      if (Date.now() - otpSentTime < 60000) {
        const message = `Please wait ${Math.ceil(
          (60000 - (Date.now() - otpSentTime)) / 1000
        )} seconds before requesting another OTP`;

        showToast(message, "error");
        return {
          success: false,
          message,
        };
      }

      const response = await resendAdminOTP(registrationData.email);
      if (response.success) {
        setOtpSentTime(Date.now());
        showToast("Admin verification OTP sent successfully", "success");
      } else {
        showToast(
          response.message || "Failed to send admin verification OTP",
          "error"
        );
      }
      return response;
    } catch (error) {
      const errorMessage =
        error.response?.status === 429
          ? "Please wait 1 minute before requesting another OTP"
          : error.message ||
            "Failed to send admin verification OTP. Please try again.";

      showToast(errorMessage, "error");
      return {
        success: false,
        message: errorMessage,
      };
    }
  };

  const handleModalClose = () => {
    setShowOTP(false);
    setOtpSentTime(null);
    setRegistrationData(null);
  };

  return (
    <>
      {toast.visible && (
        <Toast
          message={toast.message}
          type={toast.type}
          duration={3000}
          onClose={hideToast}
        />
      )}

      <FormWrapper isEntering={isEntering}>
        <FormSection>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Title>ADMIN REGISTRATION</Title>

            <InputGroup>
              <InputIcon>
                <FontAwesomeIcon icon={faUser} />
              </InputIcon>
              <Input
                {...register("name", {
                  required: "Full name is required",
                  pattern: {
                    value: /^[A-Za-z]+(?: [A-Za-z]+)+$/,
                    message: "Please enter your full name (first & last name)",
                  },
                  minLength: {
                    value: 5,
                    message: "Name must be at least 5 characters",
                  },
                })}
                placeholder="Full Name"
                error={errors.name}
              />
            </InputGroup>

            <InputGroup>
              <InputIcon>
                <FontAwesomeIcon icon={faEnvelope} />
              </InputIcon>
              <Input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                placeholder="Email Address"
                type="email"
                error={errors.email}
              />
            </InputGroup>

            <InputGroup>
              <InputIcon>
                <FontAwesomeIcon icon={faPhone} />
              </InputIcon>
              <Input
                {...register("mobile", {
                  required: "Mobile number is required",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Please enter a valid 10-digit mobile number",
                  },
                })}
                placeholder="Mobile Number"
                type="tel"
                error={errors.mobile}
              />
            </InputGroup>

            <InputGroup>
              <InputIcon>
                <FontAwesomeIcon icon={faVenusMars} />
              </InputIcon>
              <Select
                {...register("gender", { required: "Gender is required" })}
                error={errors.gender}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </Select>
            </InputGroup>

            <InputGroup>
              <InputIcon>
                <FontAwesomeIcon icon={faLock} />
              </InputIcon>
              <Input
                {...register("password", {
                  required: "Password is required",
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
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                error={errors.password}
              />
              <PasswordToggle
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </PasswordToggle>
            </InputGroup>

            <InputGroup>
              <InputIcon>
                <FontAwesomeIcon icon={faLock} />
              </InputIcon>
              <Input
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                error={errors.confirmPassword}
              />
              <PasswordToggle
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                aria-label={
                  showConfirmPassword ? "Hide password" : "Show password"
                }
              >
                <FontAwesomeIcon
                  icon={showConfirmPassword ? faEyeSlash : faEye}
                />
              </PasswordToggle>
            </InputGroup>

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "REGISTERING..." : "REGISTER AS ADMIN"}
            </Button>

            <SwitchText>
              Already have admin access?{" "}
              <SwitchLink onClick={onSwitch}>Login here</SwitchLink>
            </SwitchText>
          </Form>
        </FormSection>

        <ImageSection bgImage="https://wallpapercave.com/wp/wp13756592.jpg" />

        {showOTP && (
          <OTPModal
            onVerify={handleOTPVerification}
            onCancel={handleModalClose}
            onResend={handleResendOTP}
            initialTimerValue={60}
            otpSentTime={otpSentTime}
          />
        )}
      </FormWrapper>
    </>
  );
};

export default Register;
