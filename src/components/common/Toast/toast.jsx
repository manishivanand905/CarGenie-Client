import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { ToastContainer } from "./toastStyles";

const Toast = ({ message, type, duration = 3000, onClose }) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [message, duration, onClose]);

  if (!message) return null;

  return <ToastContainer type={type}>{message}</ToastContainer>;
};

Toast.propTypes = {
  message: PropTypes.string,
  type: PropTypes.oneOf(["success", "error", "info"]),
  duration: PropTypes.number,
  onClose: PropTypes.func.isRequired,
};

export default Toast;
