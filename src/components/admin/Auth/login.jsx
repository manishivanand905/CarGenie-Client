// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";
// import {
//   faEnvelope,
//   faLock,
//   faEye,
//   faEyeSlash,
// } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   adminLogin,
//   verifyAdminLoginOtp,
//   resendAdminOTP,
//   initiateAdminForgotPassword,
//   verifyAdminForgotPasswordOtp,
//   resetAdminPassword,
// } from "../../../services/admin/api";
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
//   SwitchText,
//   SwitchLink,
//   ForgotPassword,
// } from "./authStyles";
// import OTPModal from "./otpModal";
// import UpdatePassword from "./updatePassword";
// import Toast from "../../common/Toast/toast";

// const Login = ({ onSwitch, isEntering }) => {
//   const [showOTP, setShowOTP] = useState(false);
//   const [userEmail, setUserEmail] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [otpSentTime, setOtpSentTime] = useState(null);
//   const [showUpdatePassword, setShowUpdatePassword] = useState(false);
//   const [isForgotPasswordFlow, setIsForgotPasswordFlow] = useState(false);
//   const [newPassword, setNewPassword] = useState("");
//   const [toast, setToast] = useState({
//     message: "",
//     type: "info",
//     visible: false,
//   });

//   const navigate = useNavigate();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//     reset,
//     getValues,
//   } = useForm();

//   const showToast = (message, type = "info") => {
//     setToast({
//       message,
//       type,
//       visible: true,
//     });
//   };

//   const hideToast = () => {
//     setToast({
//       ...toast,
//       visible: false,
//     });
//   };

//   const onSubmit = async (data) => {
//     if (Object.keys(errors).length > 0) {
//       const firstError = Object.values(errors)[0];
//       showToast(firstError.message, "error");
//       return;
//     }

//     try {
//       if (otpSentTime && Date.now() - otpSentTime < 65000) {
//         const remainingTime = Math.ceil(
//           (65000 - (Date.now() - otpSentTime)) / 1000
//         );
//         showToast(
//           `Please wait ${remainingTime} seconds before requesting another OTP`,
//           "error"
//         );
//         return;
//       }

//       const response = await adminLogin(data.email, data.password);

//       if (response.success) {
//         setUserEmail(data.email);
//         setShowOTP(true);
//         setOtpSentTime(Date.now());
//         showToast("Admin verification OTP sent successfully", "success");
//       } else {
//         showToast(
//           response.message || "Admin login failed. Please try again.",
//           "error"
//         );
//       }
//     } catch (error) {
//       if (error.response?.status === 429) {
//         showToast(
//           "Please wait 1 minute before requesting another OTP",
//           "error"
//         );
//         setOtpSentTime(Date.now());
//       } else {
//         showToast(
//           error.message || "Admin login failed. Please try again.",
//           "error"
//         );
//       }
//     }
//   };

//   const handleOTPVerification = async (otp) => {
//     try {
//       if (isForgotPasswordFlow) {
//         const response = await verifyAdminForgotPasswordOtp(userEmail, otp);
//         if (!response.success) {
//           showToast(response.message || "OTP verification failed", "error");
//           return response.message || "OTP verification failed";
//         }

//         const resetResponse = await resetAdminPassword(
//           userEmail,
//           otp,
//           newPassword
//         );
//         if (resetResponse.success) {
//           showToast("Admin password reset successfully", "success");
//           setShowOTP(false);
//           setIsForgotPasswordFlow(false);
//           setNewPassword("");
//           reset();
//           return null;
//         }
//         showToast(
//           resetResponse.message || "Failed to reset admin password",
//           "error"
//         );
//         return resetResponse.message || "Failed to reset admin password";
//       }

//       try {
//         const response = await verifyAdminLoginOtp(userEmail, otp);

//         if (response.success) {
//           showToast("Admin login successful", "success");
//           reset();
//           setShowOTP(false);

//           setTimeout(() => {
//             navigate("/admin/dashboard");
//           }, 1000);

//           return null;
//         } else {
//           showToast(response.message || "Invalid or expired OTP", "error");
//           return response.message || "Invalid or expired OTP";
//         }
//       } catch (verificationError) {
//         showToast(verificationError.message || "Failed to verify OTP", "error");
//         return verificationError.message || "Failed to verify OTP";
//       }
//     } catch (error) {
//       showToast(error.message || "OTP verification failed", "error");
//       return error.message || "OTP verification failed";
//     }
//   };

//   const handleResendOTP = async () => {
//     try {
//       const response = isForgotPasswordFlow
//         ? await initiateAdminForgotPassword(userEmail)
//         : await resendAdminOTP(userEmail);

//       if (response.success) {
//         setOtpSentTime(Date.now());
//         showToast("Admin verification OTP sent successfully", "success");
//       } else {
//         showToast(
//           response.message || "Failed to send admin verification OTP",
//           "error"
//         );
//       }

//       return response;
//     } catch (error) {
//       if (error.message && error.message.includes("wait")) {
//         showToast(error.message, "error");
//         return {
//           success: false,
//           message: error.message,
//         };
//       }
//       showToast(
//         error.message ||
//           "Failed to send admin verification OTP. Please try again.",
//         "error"
//       );
//       return {
//         success: false,
//         message:
//           error.message ||
//           "Failed to send admin verification OTP. Please try again.",
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
//       showToast("Please enter your email address first", "error");
//       return;
//     }
//     setUserEmail(email);
//     setShowUpdatePassword(true);
//   };

//   const handleUpdatePasswordSubmit = async (password) => {
//     try {
//       setNewPassword(password);
//       const response = await initiateAdminForgotPassword(userEmail);

//       if (response.success) {
//         setShowUpdatePassword(false);
//         setIsForgotPasswordFlow(true);
//         setShowOTP(true);
//         setOtpSentTime(Date.now());
//         showToast("Admin verification OTP sent to your email", "success");
//       } else {
//         showToast(
//           response.message || "Failed to initiate admin password reset",
//           "error"
//         );
//       }
//     } catch (error) {
//       if (error.response?.status === 429) {
//         setShowUpdatePassword(false);
//         setIsForgotPasswordFlow(true);
//         setShowOTP(true);
//         setOtpSentTime(Date.now());
//         showToast("Admin verification OTP sent to your email", "success");
//       } else {
//         showToast(
//           error.message || "Failed to initiate admin password reset",
//           "error"
//         );
//       }
//     }
//   };

//   const handleUpdatePasswordCancel = () => {
//     setShowUpdatePassword(false);
//   };

//   return (
//     <>
//       {toast.visible && (
//         <Toast
//           message={toast.message}
//           type={toast.type}
//           duration={3000}
//           onClose={hideToast}
//         />
//       )}

//       <FormWrapper isEntering={isEntering}>
//         <FormSection>
//           <Form onSubmit={handleSubmit(onSubmit)}>
//             <Title>ADMIN LOGIN</Title>

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
//             </InputGroup>

//             <ForgotPassword onClick={handleForgotPassword}>
//               Forgot Password?
//             </ForgotPassword>

//             <Button type="submit" disabled={isSubmitting}>
//               {isSubmitting ? "LOGGING IN..." : "LOGIN"}
//             </Button>

//             <SwitchText>
//               Don't have admin access?{" "}
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
import {
  faEnvelope,
  faLock,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  adminLogin,
  verifyAdminLoginOtp,
  resendAdminOTP,
  initiateAdminForgotPassword,
  verifyAdminForgotPasswordOtp,
  resetAdminPassword,
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
  Button,
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

      const response = await adminLogin(data.email, data.password);

      if (response.success) {
        setUserEmail(data.email);
        setShowOTP(true);
        setOtpSentTime(Date.now());
        showToast("Admin verification OTP sent successfully", "success");
      } else {
        showToast(
          response.message || "Admin login failed. Please try again.",
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
          error.message || "Admin login failed. Please try again.",
          "error"
        );
      }
    }
  };

  const handleOTPVerification = async (otp) => {
    try {
      if (isForgotPasswordFlow) {
        const response = await verifyAdminForgotPasswordOtp(userEmail, otp);
        if (!response.success) {
          showToast(response.message || "OTP verification failed", "error");
          return response.message || "OTP verification failed";
        }

        const resetResponse = await resetAdminPassword(
          userEmail,
          otp,
          newPassword
        );
        if (resetResponse.success) {
          showToast("Admin password reset successfully", "success");
          setShowOTP(false);
          setIsForgotPasswordFlow(false);
          setNewPassword("");
          reset();
          return null;
        }
        showToast(
          resetResponse.message || "Failed to reset admin password",
          "error"
        );
        return resetResponse.message || "Failed to reset admin password";
      }

      try {
        const response = await verifyAdminLoginOtp(userEmail, otp);

        if (response.success) {
          if (response.token) {
            const expires = new Date(
              Date.now() + 24 * 60 * 60 * 1000
            ).toUTCString();
            document.cookie = `adminToken=${response.token}; expires=${expires}; path=/; secure; samesite=strict`;
            localStorage.setItem("adminUser", JSON.stringify(response.admin));
            localStorage.setItem("adminToken", response.token);
          }

          showToast("Admin login successful", "success");
          reset();
          setShowOTP(false);

          setTimeout(() => {
            navigate("/admin/dashboard");
          }, 1000);

          return null;
        } else {
          showToast(response.message || "Invalid or expired OTP", "error");
          return response.message || "Invalid or expired OTP";
        }
      } catch (verificationError) {
        showToast(verificationError.message || "Failed to verify OTP", "error");
        return verificationError.message || "Failed to verify OTP";
      }
    } catch (error) {
      showToast(error.message || "OTP verification failed", "error");
      return error.message || "OTP verification failed";
    }
  };

  const handleResendOTP = async () => {
    try {
      const response = isForgotPasswordFlow
        ? await initiateAdminForgotPassword(userEmail)
        : await resendAdminOTP(userEmail);

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
      if (error.message && error.message.includes("wait")) {
        showToast(error.message, "error");
        return {
          success: false,
          message: error.message,
        };
      }
      showToast(
        error.message ||
          "Failed to send admin verification OTP. Please try again.",
        "error"
      );
      return {
        success: false,
        message:
          error.message ||
          "Failed to send admin verification OTP. Please try again.",
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
      const response = await initiateAdminForgotPassword(userEmail);

      if (response.success) {
        setShowUpdatePassword(false);
        setIsForgotPasswordFlow(true);
        setShowOTP(true);
        setOtpSentTime(Date.now());
        showToast("Admin verification OTP sent to your email", "success");
      } else {
        showToast(
          response.message || "Failed to initiate admin password reset",
          "error"
        );
      }
    } catch (error) {
      if (error.response?.status === 429) {
        setShowUpdatePassword(false);
        setIsForgotPasswordFlow(true);
        setShowOTP(true);
        setOtpSentTime(Date.now());
        showToast("Admin verification OTP sent to your email", "success");
      } else {
        showToast(
          error.message || "Failed to initiate admin password reset",
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
            <Title>ADMIN LOGIN</Title>

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
              {isSubmitting ? "LOGGING IN..." : "LOGIN"}
            </Button>

            <SwitchText>
              Don't have admin access?{" "}
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
