import React, { useState, useEffect, useRef, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faSpinner } from "@fortawesome/free-solid-svg-icons";
import {
  ModalOverlay,
  ModalContent,
  OTPContainer,
  OTPInput,
  ModalTitle,
  ModalSubtitle,
  ButtonGroup,
  ResendButton,
  CloseButton,
  Button,
  LoadingSpinner,
} from "./authStyles";
import Toast from "../../common/Toast/toast";

const OTPModal = ({
  onVerify,
  onCancel,
  onResend,
  initialTimerValue = 65,
  otpSentTime,
}) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [resendTimer, setResendTimer] = useState(initialTimerValue);
  const [isResending, setIsResending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationSuccess, setVerificationSuccess] = useState(false);

  const [toast, setToast] = useState({
    message: "",
    type: "info",
    visible: false,
  });

  const inputRefs = useRef([...Array(6)].map(() => React.createRef()));
  const timerRef = useRef(null);
  const modalRef = useRef(null);

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

  const verifyOTP = useCallback(async () => {
    const otpString = otp.join("");
    if (otpString.length !== 6) {
      showToast("Please enter all 6 digits", "error");
      return;
    }

    // Prevent verification if already verifying or already successful
    if (isVerifying || verificationSuccess) {
      return;
    }

    setIsVerifying(true);

    try {
      const errorMessage = await onVerify(otpString);
      if (errorMessage) {
        // Only show error message if verification failed
        showToast(errorMessage, "error");
        setOtp(["", "", "", "", "", ""]);
        inputRefs.current[0].current?.focus();
      } else {
        // Mark verification as successful to prevent additional attempts
        setVerificationSuccess(true);
      }
    } catch (err) {
      showToast("Verification failed. Please try again.", "error");
    } finally {
      setIsVerifying(false);
    }
  }, [otp, onVerify, isVerifying, verificationSuccess]);

  const startResendTimer = useCallback((seconds = 65) => {
    if (timerRef.current) clearInterval(timerRef.current);

    setResendTimer(seconds);
    timerRef.current = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, []);

  const startInitialTimer = useCallback(() => {
    if (otpSentTime) {
      const timeElapsed = Date.now() - otpSentTime;
      const remainingTime = Math.max(
        0,
        Math.ceil((65000 - timeElapsed) / 1000)
      );

      if (remainingTime > 0) {
        startResendTimer(remainingTime);
      } else {
        setResendTimer(0);
      }
    } else {
      startResendTimer(initialTimerValue);
    }
  }, [otpSentTime, initialTimerValue, startResendTimer]);

  useEffect(() => {
    inputRefs.current[0]?.current?.focus();
    startInitialTimer();

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startInitialTimer]);

  useEffect(() => {
    // Only auto-verify if all digits are filled, not currently verifying,
    // and verification hasn't already succeeded
    const allDigitsFilled = otp.every((digit) => digit !== "");
    if (allDigitsFilled && !isVerifying && !verificationSuccess) {
      verifyOTP();
    }
  }, [otp, isVerifying, verifyOTP, verificationSuccess]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "Enter" && !isVerifying && !verificationSuccess) {
        verifyOTP();
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [isVerifying, verifyOTP, verificationSuccess]);

  const handleChange = (index, e) => {
    // Skip input handling if verification was successful
    if (verificationSuccess) return;

    const value = e.target.value;
    const lastChar = value.slice(-1);

    if (!/^\d*$/.test(lastChar)) return;

    const newOtp = [...otp];
    newOtp[index] = lastChar;
    setOtp(newOtp);

    if (lastChar && index < 5) {
      inputRefs.current[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Skip input handling if verification was successful
    if (verificationSuccess) return;

    if (e.key === "Backspace") {
      e.preventDefault();
      if (otp[index]) {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        const newOtp = [...otp];
        newOtp[index - 1] = "";
        setOtp(newOtp);
        inputRefs.current[index - 1].current?.focus();
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1].current?.focus();
    } else if (e.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1].current?.focus();
    }
  };

  const handlePaste = (e) => {
    // Skip input handling if verification was successful
    if (verificationSuccess) return;

    e.preventDefault();
    const pastedData = e.clipboardData
      .getData("text")
      .replace(/[^0-9]/g, "")
      .slice(0, 6);

    if (!pastedData) return;

    const newOtp = [...otp];
    pastedData.split("").forEach((digit, index) => {
      if (index < 6) newOtp[index] = digit;
    });
    setOtp(newOtp);

    const focusIndex = Math.min(pastedData.length, 5);
    inputRefs.current[focusIndex].current?.focus();
  };

  const handleResendClick = useCallback(async () => {
    if (resendTimer > 0 || isResending || verificationSuccess) return;

    setIsResending(true);

    try {
      const response = await onResend();

      if (response.success) {
        setOtp(["", "", "", "", "", ""]);
        startResendTimer(65);
        showToast("OTP sent successfully!", "success");
        inputRefs.current[0].current?.focus();
      } else {
        showToast(response.message, "error");
        if (
          response.message.includes("wait") ||
          response.message.includes("Please wait")
        ) {
          const parsedSeconds = parseInt(
            response.message.match(/\d+/)?.[0] || "60"
          );
          startResendTimer(parsedSeconds + 5);
        }
      }
    } catch (err) {
      const errorMessage =
        err.message || "Failed to send OTP. Please try again.";
      showToast(errorMessage, "error");
    } finally {
      setIsResending(false);
    }
  }, [
    resendTimer,
    isResending,
    onResend,
    startResendTimer,
    verificationSuccess,
  ]);

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

      <ModalContent ref={modalRef}>
        <CloseButton onClick={onCancel}>
          <FontAwesomeIcon icon={faTimes} />
        </CloseButton>
        <ModalTitle>Verify your account</ModalTitle>
        <ModalSubtitle>
          Enter the 6-digit code sent to your email address
        </ModalSubtitle>

        <OTPContainer onPaste={handlePaste}>
          {otp.map((digit, index) => (
            <OTPInput
              key={index}
              ref={inputRefs.current[index]}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onFocus={(e) => e.target.select()}
              filled={digit !== ""}
              autoComplete="off"
              aria-label={`OTP digit ${index + 1}`}
              disabled={verificationSuccess}
            />
          ))}
        </OTPContainer>

        <ButtonGroup>
          <Button
            onClick={verifyOTP}
            disabled={isVerifying || verificationSuccess}
          >
            {isVerifying ? (
              <>
                <LoadingSpinner>
                  <FontAwesomeIcon icon={faSpinner} spin />
                </LoadingSpinner>
                Verifying...
              </>
            ) : verificationSuccess ? (
              "Verified"
            ) : (
              "Verify"
            )}
          </Button>
          <ResendButton
            onClick={handleResendClick}
            disabled={resendTimer > 0 || isResending || verificationSuccess}
          >
            {isResending ? (
              <>
                <LoadingSpinner>
                  <FontAwesomeIcon icon={faSpinner} spin />
                </LoadingSpinner>
                Sending...
              </>
            ) : verificationSuccess ? (
              "Verified"
            ) : resendTimer > 0 ? (
              `Resend code in ${resendTimer}s`
            ) : (
              "Resend code"
            )}
          </ResendButton>
        </ButtonGroup>
      </ModalContent>
    </ModalOverlay>
  );
};

export default OTPModal;
