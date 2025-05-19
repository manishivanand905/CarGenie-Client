// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";
// import { faGoogle } from "@fortawesome/free-brands-svg-icons";
// import {
//   faEnvelope,
//   faLock,
//   faEye,
//   faEyeSlash,
// } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   initiateLogin,
//   verifyLoginOTP,
//   resendOTP,
//   initiateForgotPassword,
//   verifyForgotPasswordOTP,
//   resetPassword,
// } from "../../../services/user/api";
// import {
//   FormWrapper,
//   FormSection,
//   ImageSection,
//   Form,
//   Title,
//   InputGroup,
//   Input,
//   InputIcon,
//   PasswordToggle,
//   Button,
//   GoogleButton,
//   StyledIcon,
//   SwitchText,
//   SwitchLink,
//   ErrorMessage,
//   ForgotPassword,
// } from "./authStyles";
// import OTPModal from "./otpModal";
// import UpdatePassword from "./updatePassword";

// const Login = ({ onSwitch, isEntering }) => {
//   const [showOTP, setShowOTP] = useState(false);
//   const [userEmail, setUserEmail] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [loginError, setLoginError] = useState("");
//   const [otpSentTime, setOtpSentTime] = useState(null);
//   const [showUpdatePassword, setShowUpdatePassword] = useState(false);
//   const [isForgotPasswordFlow, setIsForgotPasswordFlow] = useState(false);
//   const [newPassword, setNewPassword] = useState("");

//   const navigate = useNavigate();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//     reset,
//     getValues,
//   } = useForm();

//   const onSubmit = async (data) => {
//     try {
//       setLoginError("");

//       if (otpSentTime && Date.now() - otpSentTime < 65000) {
//         const remainingTime = Math.ceil(
//           (65000 - (Date.now() - otpSentTime)) / 1000
//         );
//         setLoginError(
//           `Please wait ${remainingTime} seconds before requesting another OTP`
//         );
//         return;
//       }

//       const response = await initiateLogin(data.email, data.password);

//       if (response.success) {
//         setUserEmail(data.email);
//         setShowOTP(true);
//         setOtpSentTime(Date.now());
//       } else {
//         setLoginError(response.message || "Login failed. Please try again.");
//       }
//     } catch (error) {
//       if (error.response?.status === 429) {
//         setLoginError("Please wait 1 minute before requesting another OTP");
//         setOtpSentTime(Date.now());
//       } else {
//         setLoginError(error.message || "Login failed. Please try again.");
//       }
//     }
//   };

//   const handleGoogleLogin = () => {
//     window.location.href = `${process.env.REACT_APP_API_URL}/api/auth/google`;
//   };

//   const handleOTPVerification = async (otp) => {
//     try {
//       if (isForgotPasswordFlow) {
//         const response = await verifyForgotPasswordOTP(userEmail, otp);
//         if (!response.success)
//           return response.message || "OTP verification failed";

//         const resetResponse = await resetPassword(userEmail, otp, newPassword);
//         if (resetResponse.success) {
//           setShowOTP(false);
//           setIsForgotPasswordFlow(false);
//           setNewPassword("");
//           reset();
//           return null;
//         }
//         return resetResponse.message || "Failed to reset password";
//       }

//       const response = await verifyLoginOTP(userEmail, otp);
//       if (response.success) {
//         reset();
//         navigate("/user/dashboard");
//         return null;
//       }
//       return response.message;
//     } catch (error) {
//       return error.message;
//     }
//   };

//   const handleResendOTP = async () => {
//     try {
//       const response = isForgotPasswordFlow
//         ? await initiateForgotPassword(userEmail)
//         : await resendOTP(userEmail);

//       if (response.success) {
//         setOtpSentTime(Date.now());
//       }
//       return response;
//     } catch (error) {
//       if (error.message && error.message.includes("wait")) {
//         return {
//           success: false,
//           message: error.message,
//         };
//       }
//       return {
//         success: false,
//         message: error.message || "Failed to send OTP. Please try again.",
//       };
//     }
//   };

//   const handleModalClose = () => {
//     setShowOTP(false);
//     setOtpSentTime(null);
//     if (isForgotPasswordFlow) {
//       setIsForgotPasswordFlow(false);
//       setNewPassword("");
//     }
//   };

//   const handleForgotPassword = () => {
//     const email = getValues("email");
//     if (!email) {
//       setLoginError("Please enter your email address first");
//       return;
//     }
//     setUserEmail(email);
//     setShowUpdatePassword(true);
//   };

//   const handleUpdatePasswordSubmit = async (password) => {
//     try {
//       setNewPassword(password);
//       const response = await initiateForgotPassword(userEmail);

//       if (response.success) {
//         setShowUpdatePassword(false);
//         setIsForgotPasswordFlow(true);
//         setShowOTP(true);
//         setOtpSentTime(Date.now());
//       } else {
//         setLoginError(response.message || "Failed to initiate password reset");
//       }
//     } catch (error) {
//       if (error.response?.status === 429) {
//         setShowUpdatePassword(false);
//         setIsForgotPasswordFlow(true);
//         setShowOTP(true);
//         setOtpSentTime(Date.now());
//       } else {
//         setLoginError(error.message || "Failed to initiate password reset");
//       }
//     }
//   };

//   const handleUpdatePasswordCancel = () => {
//     setShowUpdatePassword(false);
//   };

//   return (
//     <>
//       <FormWrapper isEntering={isEntering}>
//         <FormSection>
//           <Form onSubmit={handleSubmit(onSubmit)}>
//             <Title>CarGenie LOGIN</Title>

//             {loginError && <ErrorMessage>{loginError}</ErrorMessage>}

//             <InputGroup>
//               <InputIcon>
//                 <FontAwesomeIcon icon={faEnvelope} />
//               </InputIcon>
//               <Input
//                 {...register("email", {
//                   required: "Email is required",
//                   pattern: {
//                     value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
//                     message: "Invalid email address",
//                   },
//                 })}
//                 placeholder="Email Address"
//                 type="email"
//                 error={errors.email}
//               />
//               {errors.email && (
//                 <ErrorMessage>{errors.email.message}</ErrorMessage>
//               )}
//             </InputGroup>

//             <InputGroup>
//               <InputIcon>
//                 <FontAwesomeIcon icon={faLock} />
//               </InputIcon>
//               <Input
//                 {...register("password", {
//                   required: "Password is required",
//                 })}
//                 type={showPassword ? "text" : "password"}
//                 placeholder="Password"
//                 error={errors.password}
//               />
//               <PasswordToggle
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 aria-label={showPassword ? "Hide password" : "Show password"}
//               >
//                 <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
//               </PasswordToggle>
//               {errors.password && (
//                 <ErrorMessage>{errors.password.message}</ErrorMessage>
//               )}
//             </InputGroup>

//             <ForgotPassword onClick={handleForgotPassword}>
//               Forgot Password?
//             </ForgotPassword>

//             <Button type="submit" disabled={isSubmitting}>
//               {isSubmitting ? "LOGGING IN..." : "CONTINUE"}
//             </Button>

//             <GoogleButton type="button" onClick={handleGoogleLogin}>
//               <StyledIcon icon={faGoogle} /> Sign in with Google
//             </GoogleButton>

//             <SwitchText>
//               Don't have a CarGenie ID?{" "}
//               <SwitchLink onClick={onSwitch}>Register here</SwitchLink>
//             </SwitchText>
//           </Form>
//         </FormSection>
//         <ImageSection bgImage="https://wallpapercave.com/dwp2x/wp13756589.jpg" />
//       </FormWrapper>

//       {showUpdatePassword && (
//         <UpdatePassword
//           onSubmit={handleUpdatePasswordSubmit}
//           onCancel={handleUpdatePasswordCancel}
//           email={userEmail}
//         />
//       )}

//       {showOTP && (
//         <OTPModal
//           onVerify={handleOTPVerification}
//           onCancel={handleModalClose}
//           onResend={handleResendOTP}
//           initialTimerValue={65}
//           otpSentTime={otpSentTime}
//         />
//       )}
//     </>
//   );
// };

// export default Login;

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import {
  faEnvelope,
  faLock,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  initiateLogin,
  verifyLoginOTP,
  resendOTP,
  initiateForgotPassword,
  verifyForgotPasswordOTP,
  resetPassword,
} from "../../../services/user/api";
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
  Button,
  GoogleButton,
  StyledIcon,
  SwitchText,
  SwitchLink,
  ForgotPassword,
} from "./authStyles";
import OTPModal from "./otpModal";
import UpdatePassword from "./updatePassword";
import Toast from "../../common/Toast/toast";

const Login = ({ onSwitch, isEntering }) => {
  const [showOTP, setShowOTP] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [otpSentTime, setOtpSentTime] = useState(null);
  const [showUpdatePassword, setShowUpdatePassword] = useState(false);
  const [isForgotPasswordFlow, setIsForgotPasswordFlow] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [toast, setToast] = useState({
    message: "",
    type: "info",
    visible: false,
  });

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    getValues,
  } = useForm();

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
    // Check for form validation errors and show them in toast
    if (Object.keys(errors).length > 0) {
      const firstError = Object.values(errors)[0];
      showToast(firstError.message, "error");
      return;
    }

    try {
      if (otpSentTime && Date.now() - otpSentTime < 65000) {
        const remainingTime = Math.ceil(
          (65000 - (Date.now() - otpSentTime)) / 1000
        );
        showToast(
          `Please wait ${remainingTime} seconds before requesting another OTP`,
          "error"
        );
        return;
      }

      const response = await initiateLogin(data.email, data.password);

      if (response.success) {
        setUserEmail(data.email);
        setShowOTP(true);
        setOtpSentTime(Date.now());
        showToast("OTP sent successfully", "success");
      } else {
        showToast(
          response.message || "Login failed. Please try again.",
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
        showToast(error.message || "Login failed. Please try again.", "error");
      }
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${process.env.REACT_APP_API_URL}/api/auth/google`;
  };

  // const handleOTPVerification = async (otp) => {
  //   try {
  //     if (isForgotPasswordFlow) {
  //       const response = await verifyForgotPasswordOTP(userEmail, otp);
  //       if (!response.success) {
  //         showToast(response.message || "OTP verification failed", "error");
  //         return response.message || "OTP verification failed";
  //       }

  //       const resetResponse = await resetPassword(userEmail, otp, newPassword);
  //       if (resetResponse.success) {
  //         showToast("Password reset successfully", "success");
  //         setShowOTP(false);
  //         setIsForgotPasswordFlow(false);
  //         setNewPassword("");
  //         reset();
  //         return null;
  //       }
  //       showToast(resetResponse.message || "Failed to reset password", "error");
  //       return resetResponse.message || "Failed to reset password";
  //     }

  //     const response = await verifyLoginOTP(userEmail, otp);
  //     if (response.success) {
  //       showToast("Login successful", "success");
  //       reset();
  //       // Add a small delay to allow the toast to be visible before navigation
  //       setTimeout(() => {
  //         navigate("/user/dashboard");
  //       }, 1000);
  //       return null;
  //     }
  //     return response.message;
  //   } catch (error) {
  //     showToast(error.message || "OTP verification failed", "error");
  //     return error.message;
  //   }
  // };

  // Update the handleOTPVerification function in Login.js

  // Update the handleOTPVerification function in Login.js

  // This is a complete implementation of the handleOTPVerification function for Login.js
  const handleOTPVerification = async (otp) => {
    try {
      if (isForgotPasswordFlow) {
        const response = await verifyForgotPasswordOTP(userEmail, otp);
        if (!response.success) {
          showToast(response.message || "OTP verification failed", "error");
          return response.message || "OTP verification failed";
        }

        const resetResponse = await resetPassword(userEmail, otp, newPassword);
        if (resetResponse.success) {
          showToast("Password reset successfully", "success");
          setShowOTP(false);
          setIsForgotPasswordFlow(false);
          setNewPassword("");
          reset();
          return null;
        }
        showToast(resetResponse.message || "Failed to reset password", "error");
        return resetResponse.message || "Failed to reset password";
      }

      // For login flow
      try {
        const response = await verifyLoginOTP(userEmail, otp);

        if (response.success) {
          // Properly handle token and user data
          if (response.token) {
            // Store token in localStorage or sessionStorage depending on your app's security needs
            localStorage.setItem("authToken", response.token);

            // Set the token in your auth header for future API calls
            // If you're using axios for API calls, you might want to set the default header
            // axios.defaults.headers.common['Authorization'] = `Bearer ${response.token}`;

            // Store user data if needed
            if (response.user) {
              localStorage.setItem("userData", JSON.stringify(response.user));
            }
          }

          // Show success message
          showToast("Login successful", "success");

          // Reset the form
          reset();

          // Ensure OTP modal is closed
          setShowOTP(false);

          // Add a small delay to allow the toast to be visible before navigation
          setTimeout(() => {
            // Navigate to dashboard - make sure this is working correctly
            navigate("/user/dashboard");
          }, 1000);

          // Return null to indicate success to the OTP component
          return null;
        } else {
          // Handle unsuccessful verification
          showToast(response.message || "Invalid or expired OTP", "error");
          return response.message || "Invalid or expired OTP";
        }
      } catch (verificationError) {
        // Specific error handling for verification errors
        console.error("OTP Verification error:", verificationError);
        showToast(verificationError.message || "Failed to verify OTP", "error");
        return verificationError.message || "Failed to verify OTP";
      }
    } catch (error) {
      // General error handling
      console.error("Overall OTP handling error:", error);
      showToast(error.message || "OTP verification failed", "error");
      return error.message || "OTP verification failed";
    }
  };

  const handleResendOTP = async () => {
    try {
      const response = isForgotPasswordFlow
        ? await initiateForgotPassword(userEmail)
        : await resendOTP(userEmail);

      if (response.success) {
        setOtpSentTime(Date.now());
        showToast("OTP sent successfully", "success");
      } else {
        showToast(response.message || "Failed to send OTP", "error");
      }

      return response;
    } catch (error) {
      if (error.message && error.message.includes("wait")) {
        showToast(error.message, "error");
        return {
          success: false,
          message: error.message,
        };
      }
      showToast(
        error.message || "Failed to send OTP. Please try again.",
        "error"
      );
      return {
        success: false,
        message: error.message || "Failed to send OTP. Please try again.",
      };
    }
  };

  const handleModalClose = () => {
    setShowOTP(false);
    setOtpSentTime(null);
    if (isForgotPasswordFlow) {
      setIsForgotPasswordFlow(false);
      setNewPassword("");
    }
  };

  const handleForgotPassword = () => {
    const email = getValues("email");
    if (!email) {
      showToast("Please enter your email address first", "error");
      return;
    }
    setUserEmail(email);
    setShowUpdatePassword(true);
  };

  const handleUpdatePasswordSubmit = async (password) => {
    try {
      setNewPassword(password);
      const response = await initiateForgotPassword(userEmail);

      if (response.success) {
        setShowUpdatePassword(false);
        setIsForgotPasswordFlow(true);
        setShowOTP(true);
        setOtpSentTime(Date.now());
        showToast("OTP sent to your email", "success");
      } else {
        showToast(
          response.message || "Failed to initiate password reset",
          "error"
        );
      }
    } catch (error) {
      if (error.response?.status === 429) {
        setShowUpdatePassword(false);
        setIsForgotPasswordFlow(true);
        setShowOTP(true);
        setOtpSentTime(Date.now());
        showToast("OTP sent to your email", "success");
      } else {
        showToast(
          error.message || "Failed to initiate password reset",
          "error"
        );
      }
    }
  };

  const handleUpdatePasswordCancel = () => {
    setShowUpdatePassword(false);
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
            <Title>CarGenie LOGIN</Title>

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
                <FontAwesomeIcon icon={faLock} />
              </InputIcon>
              <Input
                {...register("password", {
                  required: "Password is required",
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

            <ForgotPassword onClick={handleForgotPassword}>
              Forgot Password?
            </ForgotPassword>

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "LOGGING IN..." : "CONTINUE"}
            </Button>

            <GoogleButton type="button" onClick={handleGoogleLogin}>
              <StyledIcon icon={faGoogle} /> Sign in with Google
            </GoogleButton>

            <SwitchText>
              Don't have a CarGenie ID?{" "}
              <SwitchLink onClick={onSwitch}>Register here</SwitchLink>
            </SwitchText>
          </Form>
        </FormSection>
        <ImageSection bgImage="https://wallpapercave.com/dwp2x/wp13756589.jpg" />
      </FormWrapper>

      {showUpdatePassword && (
        <UpdatePassword
          onSubmit={handleUpdatePasswordSubmit}
          onCancel={handleUpdatePasswordCancel}
          email={userEmail}
        />
      )}

      {showOTP && (
        <OTPModal
          onVerify={handleOTPVerification}
          onCancel={handleModalClose}
          onResend={handleResendOTP}
          initialTimerValue={65}
          otpSentTime={otpSentTime}
        />
      )}
    </>
  );
};

export default Login;
