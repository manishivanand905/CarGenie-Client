import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  faGoogle,
  faApple,
  faFacebook,
} from "@fortawesome/free-brands-svg-icons";
import {
  faEnvelope,
  faBell,
  faVolumeLow,
  faShieldHalved,
  faMobile,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import OTP from "../../../components/user/Auth/otpModal";
import ConfirmationModal from "../../../components/user/Auth/confirmation";
import Toast from "../../../components/common/Toast/toast";
import {
  SettingsContainer,
  SettingsSection,
  SettingsForm,
  SettingsInput,
  ToggleSwitch,
  Button,
  LinkedAccountButton,
  DeviceCard,
  SelectInput,
  NotificationsGrid,
  NotificationSection,
} from "./settingsStyles";
import {
  updateEmail,
  verifyEmailOTP,
  resendEmailOTP,
  initiatePasswordChange,
  verifyAndChangePassword,
  resendAuthenticatedOTP,
} from "../../../services/user/api";

const Settings = () => {
  const [showOTP, setShowOTP] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [updateType, setUpdateType] = useState("email");
  const [newEmail, setNewEmail] = useState("");
  const [pendingPasswordData, setPendingPasswordData] = useState(null);
  const [notifications, setNotifications] = useState({
    deals: true,
    updates: true,
    community: false,
    priceDrops: true,
    comparisons: true,
    messages: true,
    sounds: true,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [otpSentTime, setOtpSentTime] = useState(null);
  const [toast, setToast] = useState({
    message: "",
    type: "info",
    duration: 3000,
  });

  const [devices] = useState([
    {
      id: 1,
      name: "iPhone 13",
      lastActive: "2024-02-20",
      location: "New York, USA",
    },
    {
      id: 2,
      name: "MacBook Pro",
      lastActive: "2024-02-21",
      location: "New York, USA",
    },
  ]);

  const { register, handleSubmit, reset } = useForm();

  const showToast = (message, type = "info", duration = 3000) => {
    setToast({ message, type, duration });
  };

  const closeToast = () => {
    setToast({ ...toast, message: "" });
  };

  const onUpdateProfile = async (data) => {
    setIsLoading(true);
    setError("");

    try {
      if (updateType === "email" && data.email) {
        const response = await updateEmail(data.email);
        if (response.success) {
          setNewEmail(data.email);
          setShowOTP(true);
          setOtpSentTime(response.otpSentTime || Date.now());
          showToast("Verification code sent to your email", "info");
        } else {
          if (
            response.message.includes("wait") ||
            response.message.includes("seconds")
          ) {
            setError(response.message);
            showToast(response.message, "error");
          } else if (
            response.message.includes("already") ||
            response.message.includes("associated")
          ) {
            setError(
              "This email address is already associated with another account."
            );
            showToast("Email already in use", "error");
          } else if (
            response.message.includes("same") ||
            response.message.includes("different")
          ) {
            setError(
              "The new email must be different from your current email."
            );
            showToast("New email must be different", "error");
          } else if (response.message.includes("valid")) {
            setError("Please enter a valid email address.");
            showToast("Invalid email format", "error");
          } else {
            setError(
              response.message || "Failed to send email verification code"
            );
            showToast("Failed to send verification code", "error");
          }
        }
      } else if (
        updateType === "password" &&
        data.currentPassword &&
        data.newPassword &&
        data.confirmPassword
      ) {
        if (data.newPassword !== data.confirmPassword) {
          setError("New passwords do not match");
          showToast("New passwords do not match", "error");
          setIsLoading(false);
          return;
        }

        const response = await initiatePasswordChange(data.currentPassword);
        if (response.success) {
          setPendingPasswordData(data);
          setShowOTP(true);
          setOtpSentTime(response.otpSentTime || Date.now());
          showToast("Verification code sent to your email", "info");
        } else {
          if (
            response.message.includes("wait") ||
            response.message.includes("seconds")
          ) {
            setError(response.message);
            showToast(response.message, "error");
          } else if (response.message.includes("incorrect")) {
            setError("The current password is incorrect.");
            showToast("Current password is incorrect", "error");
          } else if (response.message.includes("No email")) {
            setError(
              "No email address found for your account. Please add an email first."
            );
            showToast("No email address found for your account", "error");
          } else {
            setError(response.message || "Failed to initiate password change");
            showToast("Failed to initiate password change", "error");
          }
        }
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      showToast("An unexpected error occurred", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOTPVerify = async (otpString) => {
    setIsLoading(true);

    try {
      if (updateType === "email") {
        if (!newEmail) {
          setShowOTP(false);
          setError("No email change request pending. Please try again.");
          showToast("No email change request pending", "error");
          return "No email change request pending";
        }

        const response = await verifyEmailOTP(otpString);
        if (response.success) {
          setNewEmail("");
          setShowOTP(false);
          reset();
          setError("");
          showToast("Email updated successfully", "success");
          return null;
        } else {
          if (response.message === "No email change request pending") {
            setShowOTP(false);
            setError(
              "Your verification session has expired. Please try again."
            );
            showToast("Verification session expired", "error");
          } else if (response.message.includes("expired")) {
            setShowOTP(false);
            setError(
              "Verification code has expired. Please request a new code."
            );
            showToast("Verification code expired", "error");
          } else if (response.message.includes("Invalid")) {
            showToast("Invalid verification code", "error");
            return "Invalid verification code. Please try again.";
          }
          return response.message || "Invalid verification code";
        }
      } else if (updateType === "password" && pendingPasswordData) {
        const response = await verifyAndChangePassword(
          otpString,
          pendingPasswordData.newPassword
        );
        if (response.success) {
          setPendingPasswordData(null);
          setShowOTP(false);
          reset();
          setError("");
          showToast("Password updated successfully", "success");
          return null;
        } else {
          if (response.message === "OTP has expired") {
            setShowOTP(false);
            setError("Verification code has expired. Please try again.");
            showToast("Verification code expired", "error");
          } else if (response.message === "Invalid OTP") {
            showToast("Invalid verification code", "error");
            return "Invalid verification code. Please try again.";
          } else {
            setShowOTP(false);
            setError(
              response.message || "Failed to verify code. Please try again."
            );
            showToast("Failed to verify code", "error");
          }
          return response.message || "Invalid verification code";
        }
      }
    } catch (err) {
      showToast("An unexpected error occurred", "error");
      return "An unexpected error occurred. Please try again.";
    } finally {
      setIsLoading(false);
    }
  };

  const handleOTPCancel = () => {
    setShowOTP(false);
    setNewEmail("");
    setPendingPasswordData(null);
    reset();
  };

  const handleResendOTP = async () => {
    setIsLoading(true);

    try {
      let response;

      if (updateType === "email") {
        if (!newEmail) {
          setShowOTP(false);
          setError("No email change request pending. Please try again.");
          showToast("No email change request pending", "error");
          return {
            success: false,
            message: "No email change request pending",
          };
        }

        response = await resendEmailOTP();
      } else if (updateType === "password") {
        if (!pendingPasswordData) {
          setShowOTP(false);
          setError("No password change request pending. Please try again.");
          showToast("No password change request pending", "error");
          return {
            success: false,
            message: "No password change request pending",
          };
        }

        response = await resendAuthenticatedOTP("password_change");
      }

      if (response.success) {
        setOtpSentTime(response.otpSentTime || Date.now());
        showToast("Verification code resent", "success");
        return { success: true };
      } else {
        if (response.message === "No email change request pending") {
          setShowOTP(false);
          setError(
            "Your email verification session has expired. Please restart the process."
          );
          showToast("Email verification session expired", "error");
          return {
            success: false,
            message: "Session expired",
          };
        } else if (response.message === "No password change request pending") {
          setShowOTP(false);
          setError(
            "Your password verification session has expired. Please restart the process."
          );
          showToast("Password verification session expired", "error");
          return {
            success: false,
            message: "Session expired",
          };
        } else if (
          response.message.includes("wait") ||
          response.message.includes("seconds")
        ) {
          showToast(response.message, "error");
          return {
            success: false,
            message: response.message,
          };
        }

        showToast("Failed to resend verification code", "error");
        return {
          success: false,
          message: response.message || "Failed to resend verification code",
        };
      }
    } catch (err) {
      showToast("An unexpected error occurred", "error");
      return {
        success: false,
        message: "An unexpected error occurred. Please try again.",
      };
    } finally {
      setIsLoading(false);
    }
  };

  const toggleNotification = (key) => {
    if (isLoading) return;

    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));

    showToast(
      `${key} notifications ${notifications[key] ? "disabled" : "enabled"}`,
      "success"
    );
  };

  const handleSocialLogin = (platform) => {
    if (isLoading) return;

    console.log(`Logging in with ${platform}`);
    showToast(`Connecting to ${platform}...`, "info");
  };

  const initiateDeviceRevoke = (device) => {
    if (isLoading) return;

    setSelectedDevice(device);
    setShowConfirmModal(true);
  };

  const handleConfirmRevoke = () => {
    if (selectedDevice) {
      setIsLoading(true);

      console.log(`Revoking access for device ${selectedDevice.id}`);
      showToast(`Access revoked for ${selectedDevice.name}`, "success");

      setTimeout(() => {
        setShowConfirmModal(false);
        setSelectedDevice(null);
        setIsLoading(false);
      }, 1000);
    }
  };

  return (
    <SettingsContainer>
      <Toast
        message={toast.message}
        type={toast.type}
        duration={toast.duration}
        onClose={closeToast}
      />

      {showOTP && (
        <OTP
          onVerify={handleOTPVerify}
          onCancel={handleOTPCancel}
          onResend={handleResendOTP}
          initialTimerValue={65}
          otpSentTime={otpSentTime}
          isDisabled={isLoading}
        />
      )}

      {showConfirmModal && (
        <ConfirmationModal
          title="Confirm Device Revocation"
          message={`Are you sure you want to revoke access for ${selectedDevice?.name}? This will sign out the device immediately.`}
          onConfirm={handleConfirmRevoke}
          onCancel={() => {
            if (isLoading) return;
            setShowConfirmModal(false);
            setSelectedDevice(null);
          }}
          isDisabled={isLoading}
        />
      )}

      <SettingsSection>
        <h2>
          <FontAwesomeIcon icon={faEnvelope} /> Profile & Account Settings
        </h2>
        {error && (
          <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>
        )}
        <SettingsForm onSubmit={handleSubmit(onUpdateProfile)}>
          <SelectInput
            {...register("updateType")}
            onChange={(e) => setUpdateType(e.target.value)}
            value={updateType}
            disabled={isLoading}
          >
            <option value="email">Update Email</option>
            <option value="password">Update Password</option>
          </SelectInput>

          {updateType === "email" && (
            <SettingsInput
              {...register("email", {
                required: true,
                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              })}
              type="email"
              placeholder="New Email Address"
              disabled={isLoading}
            />
          )}

          {updateType === "password" && (
            <>
              <SettingsInput
                {...register("currentPassword", { required: true })}
                type="password"
                placeholder="Current Password"
                disabled={isLoading}
              />
              <SettingsInput
                {...register("newPassword", { required: true, minLength: 8 })}
                type="password"
                placeholder="New Password"
                disabled={isLoading}
              />
              <SettingsInput
                {...register("confirmPassword", { required: true })}
                type="password"
                placeholder="Confirm New Password"
                disabled={isLoading}
              />
            </>
          )}

          <Button
            type="submit"
            disabled={isLoading}
            style={{
              opacity: isLoading ? 0.7 : 1,
              cursor: isLoading ? "not-allowed" : "pointer",
            }}
          >
            {isLoading
              ? "Processing..."
              : updateType === "email"
              ? "Update Email"
              : "Update Password"}
          </Button>
        </SettingsForm>

        <div>
          <h3>Linked Accounts</h3>
          <LinkedAccountButton
            onClick={() => handleSocialLogin("google")}
            disabled={isLoading}
            style={{
              opacity: isLoading ? 0.7 : 1,
              cursor: isLoading ? "not-allowed" : "pointer",
            }}
          >
            <FontAwesomeIcon icon={faGoogle} /> Google
          </LinkedAccountButton>
          <LinkedAccountButton
            onClick={() => handleSocialLogin("apple")}
            disabled={isLoading}
            style={{
              opacity: isLoading ? 0.7 : 1,
              cursor: isLoading ? "not-allowed" : "pointer",
            }}
          >
            <FontAwesomeIcon icon={faApple} /> Apple
          </LinkedAccountButton>
          <LinkedAccountButton
            onClick={() => handleSocialLogin("facebook")}
            disabled={isLoading}
            style={{
              opacity: isLoading ? 0.7 : 1,
              cursor: isLoading ? "not-allowed" : "pointer",
            }}
          >
            <FontAwesomeIcon icon={faFacebook} /> Facebook
          </LinkedAccountButton>
        </div>
      </SettingsSection>

      <SettingsSection>
        <h2>
          <FontAwesomeIcon icon={faBell} /> Notifications & Alerts
        </h2>
        <NotificationsGrid>
          <NotificationSection>
            <h3>Push Notifications</h3>
            <ToggleSwitch>
              <label>
                <input
                  type="checkbox"
                  checked={notifications.deals}
                  onChange={() => toggleNotification("deals")}
                  disabled={isLoading}
                />
                Deals & Offers
              </label>
            </ToggleSwitch>
            <ToggleSwitch>
              <label>
                <input
                  type="checkbox"
                  checked={notifications.updates}
                  onChange={() => toggleNotification("updates")}
                  disabled={isLoading}
                />
                Car Updates
              </label>
            </ToggleSwitch>
            <ToggleSwitch>
              <label>
                <input
                  type="checkbox"
                  checked={notifications.community}
                  onChange={() => toggleNotification("community")}
                  disabled={isLoading}
                />
                Community Replies
              </label>
            </ToggleSwitch>
          </NotificationSection>

          <NotificationSection>
            <h3>Email Alerts</h3>
            <ToggleSwitch>
              <label>
                <input
                  type="checkbox"
                  checked={notifications.priceDrops}
                  onChange={() => toggleNotification("priceDrops")}
                  disabled={isLoading}
                />
                Price Drops
              </label>
            </ToggleSwitch>
            <ToggleSwitch>
              <label>
                <input
                  type="checkbox"
                  checked={notifications.comparisons}
                  onChange={() => toggleNotification("comparisons")}
                  disabled={isLoading}
                />
                New Comparisons
              </label>
            </ToggleSwitch>
            <ToggleSwitch>
              <label>
                <input
                  type="checkbox"
                  checked={notifications.messages}
                  onChange={() => toggleNotification("messages")}
                  disabled={isLoading}
                />
                Dealer Messages
              </label>
            </ToggleSwitch>
          </NotificationSection>

          <NotificationSection>
            <h3>
              <FontAwesomeIcon icon={faVolumeLow} /> App Settings
            </h3>
            <ToggleSwitch>
              <label>
                <input
                  type="checkbox"
                  checked={notifications.sounds}
                  onChange={() => toggleNotification("sounds")}
                  disabled={isLoading}
                />
                Sounds & Animations
              </label>
            </ToggleSwitch>
          </NotificationSection>
        </NotificationsGrid>
      </SettingsSection>

      <SettingsSection>
        <h2>
          <FontAwesomeIcon icon={faShieldHalved} /> Security & Privacy
        </h2>
        <div>
          <h3>Two-Factor Authentication</h3>
          <Button
            disabled={isLoading}
            style={{
              opacity: isLoading ? 0.7 : 1,
              cursor: isLoading ? "not-allowed" : "pointer",
            }}
          >
            Enable 2FA
          </Button>
        </div>

        <div>
          <h3>
            <FontAwesomeIcon icon={faMobile} /> Device Management
          </h3>
          {devices.map((device) => (
            <DeviceCard key={device.id}>
              <div>
                <h4>{device.name}</h4>
                <p>Last active: {device.lastActive}</p>
                <p>Location: {device.location}</p>
              </div>
              <Button
                onClick={() => initiateDeviceRevoke(device)}
                disabled={isLoading}
                style={{
                  opacity: isLoading ? 0.7 : 1,
                  cursor: isLoading ? "not-allowed" : "pointer",
                }}
              >
                Revoke Access
              </Button>
            </DeviceCard>
          ))}
        </div>
      </SettingsSection>
    </SettingsContainer>
  );
};

export default Settings;
