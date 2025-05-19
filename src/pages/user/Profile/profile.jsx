import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  faEdit,
  faKey,
  faTrash,
  faCamera,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EditProfileModal from "../../../components/user/Profile/EditProfile/editProfile";
import ChangePasswordModal from "../../../components/user/Profile/ChangePassword/changePassword";
import DeleteAccountModal from "../../../components/user/Profile/DeleteAccount/deleteAccount";
import Toast from "../../../components/common/Toast/toast";
import Spinner from "../../../components/common/Spinner/spinner";
import {
  ProfileContainer,
  ContentWrapper,
  BannerSection,
  ProfileDetails,
  ProfileImageContainer,
  ImageOverlay,
  UploadButton,
  UserInfo,
  TierLabel,
  BiographyText,
  StatisticsGrid,
  StatBox,
  ActionGrid,
  ActionBtn,
  AnimatedCount,
  ProfileImage,
  UserEmail,
  StatsContainer,
  JoinedDate,
} from "./profileStyles";
import {
  getUserProfile,
  updateProfileWithImage,
} from "../../../services/user/api";

const Profile = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [toast, setToast] = useState({
    message: "",
    type: "info",
    duration: 3000,
  });

  const [profileData, setProfileData] = useState({
    username: "",
    email: "",
    tier: "Standard",
    bio: "",
    profileImage: "/default-profile.jpg",
    joinDate: "",
    stats: {
      "Cars Reviewed": 0,
      Comparisons: 0,
      "Saved Vehicles": 0,
    },
  });

  const showToast = useCallback((message, type = "info", duration = 3000) => {
    setToast({ message, type, duration });
  }, []);

  const closeToast = useCallback(() => {
    setToast({ ...toast, message: "" });
  }, [toast]);

  // Fetch user profile data on component mount
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoading(true);
        showToast("Loading profile data...", "info");
        const response = await getUserProfile();

        if (response.success && response.user) {
          const { user } = response;
          const joinDate = new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
          });

          setProfileData({
            username: user.fullName || "",
            email: user.email || "",
            tier: "Expert", // Assuming this isn't in API yet
            bio: user.bio || "",
            profileImage: user.profileImage || "/default-profile.jpg",
            joinDate: `Member since ${joinDate}`,
            stats: {
              "Cars Reviewed": 156, // Default stats if not provided by API
              Comparisons: 43,
              "Saved Vehicles": 89,
            },
          });
          showToast("Profile loaded successfully", "success");
        } else {
          showToast("Failed to load profile", "error");
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching profile data:", error);
        showToast("Error loading profile data", "error");
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [showToast]);

  const handleImageUpload = useCallback(
    async (event) => {
      if (isProcessing) return;

      const file = event.target.files[0];
      if (file) {
        // Validate file type
        if (!file.type.match("image.*")) {
          showToast("Please select an image file", "error");
          return;
        }

        // Validate file size (5MB limit)
        if (file.size > 5 * 1024 * 1024) {
          showToast("Image size should not exceed 5MB", "error");
          return;
        }

        setIsProcessing(true);
        showToast("Uploading profile image...", "info");

        try {
          const formData = new FormData();
          formData.append("username", profileData.username);
          formData.append("bio", profileData.bio);
          formData.append("profileImage", file);

          const reader = new FileReader();
          reader.onloadend = () => {
            // Update UI immediately while API call is in progress
            setProfileData((prev) => ({
              ...prev,
              profileImage: reader.result,
            }));
          };
          reader.readAsDataURL(file);

          // Send to API
          const response = await updateProfileWithImage(formData);
          if (response.success && response.user) {
            // Update with response from API once complete
            setProfileData((prev) => ({
              ...prev,
              profileImage: response.user.profileImage,
            }));
            showToast("Profile image updated successfully", "success");
          } else {
            showToast("Failed to update profile image", "error");
          }
        } catch (error) {
          console.error("Error uploading profile image:", error);
          showToast("Failed to upload image", "error");
        } finally {
          setIsProcessing(false);
        }
      }
    },
    [profileData.username, profileData.bio, showToast, isProcessing]
  );

  const handleProfileUpdate = useCallback(
    async (updatedData) => {
      try {
        setIsProcessing(true);

        // If updatedData already contains the API response, use it directly
        if (updatedData.success && updatedData.user) {
          const { user } = updatedData;
          setProfileData((prev) => ({
            ...prev,
            username: user.fullName || prev.username,
            bio: user.bio || prev.bio,
            profileImage: user.profileImage || prev.profileImage,
          }));
        } else {
          // Otherwise use the data returned from the modal
          setProfileData((prev) => ({
            ...prev,
            ...updatedData,
          }));
        }
        setIsModalOpen(false);
        showToast("Profile updated successfully", "success");
      } catch (error) {
        console.error("Error updating profile:", error);
        showToast("Error updating profile", "error");
      } finally {
        setIsProcessing(false);
      }
    },
    [showToast]
  );

  const handlePasswordChange = useCallback(
    (newPassword) => {
      setIsProcessing(true);
      setIsPasswordModalOpen(false);
      showToast("Password changed successfully", "success");

      setTimeout(() => {
        setIsProcessing(false);
      }, 800);
    },
    [showToast]
  );

  const handleDeleteAccount = useCallback(() => {
    setIsProcessing(true);
    setIsDeleteModalOpen(false);
    showToast("Account successfully deleted", "success");

    // Delay navigation to show the toast
    setTimeout(() => {
      navigate("/");
    }, 1500);
  }, [navigate, showToast]);

  const openModal = (modalType) => {
    if (isProcessing) return;

    switch (modalType) {
      case "edit":
        setIsModalOpen(true);
        break;
      case "password":
        setIsPasswordModalOpen(true);
        break;
      case "delete":
        setIsDeleteModalOpen(true);
        break;
      default:
        break;
    }
  };

  if (loading) {
    return (
      <ProfileContainer>
        <ContentWrapper>
          <div style={{ textAlign: "center", padding: "50px" }}>
            <Spinner />
            <p style={{ marginTop: "20px" }}>Loading profile...</p>
          </div>
        </ContentWrapper>
      </ProfileContainer>
    );
  }

  return (
    <ProfileContainer>
      <Toast
        message={toast.message}
        type={toast.type}
        duration={toast.duration}
        onClose={closeToast}
      />

      <ContentWrapper>
        <BannerSection>
          <ProfileDetails>
            <ProfileImageContainer>
              <ProfileImage
                src={profileData.profileImage}
                alt={profileData.username}
                style={{ opacity: isProcessing ? 0.7 : 1 }}
              />
              {isProcessing && (
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: 10,
                  }}
                >
                  <Spinner />
                </div>
              )}
              <ImageOverlay>
                <UploadButton
                  disabled={isProcessing}
                  style={{
                    opacity: isProcessing ? 0.7 : 1,
                    cursor: isProcessing ? "not-allowed" : "pointer",
                  }}
                >
                  <FontAwesomeIcon icon={faCamera} />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    hidden
                    disabled={isProcessing}
                  />
                </UploadButton>
              </ImageOverlay>
            </ProfileImageContainer>

            <UserInfo>
              <h1>{profileData.username}</h1>
              <TierLabel tier={profileData.tier}>{profileData.tier}</TierLabel>
              <UserEmail>{profileData.email}</UserEmail>
              <BiographyText>{profileData.bio}</BiographyText>
              <JoinedDate>{profileData.joinDate}</JoinedDate>

              <StatsContainer>
                <StatisticsGrid>
                  {Object.entries(profileData.stats).map(([key, value]) => (
                    <StatBox key={key}>
                      <AnimatedCount>{value}</AnimatedCount>
                      <span>{key}</span>
                    </StatBox>
                  ))}
                </StatisticsGrid>
              </StatsContainer>
            </UserInfo>
          </ProfileDetails>
        </BannerSection>

        <ActionGrid>
          <ActionBtn
            onClick={() => openModal("edit")}
            disabled={isProcessing}
            style={{
              opacity: isProcessing ? 0.7 : 1,
              cursor: isProcessing ? "not-allowed" : "pointer",
            }}
          >
            <FontAwesomeIcon icon={faEdit} />
            Edit Profile
          </ActionBtn>
          <ActionBtn
            onClick={() => openModal("password")}
            disabled={isProcessing}
            style={{
              opacity: isProcessing ? 0.7 : 1,
              cursor: isProcessing ? "not-allowed" : "pointer",
            }}
          >
            <FontAwesomeIcon icon={faKey} />
            Change Password
          </ActionBtn>
          <ActionBtn
            danger
            onClick={() => openModal("delete")}
            disabled={isProcessing}
            style={{
              opacity: isProcessing ? 0.7 : 1,
              cursor: isProcessing ? "not-allowed" : "pointer",
            }}
          >
            <FontAwesomeIcon icon={faTrash} />
            Delete Account
          </ActionBtn>
        </ActionGrid>

        {isModalOpen && (
          <EditProfileModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            profileData={{
              username: profileData.username,
              bio: profileData.bio,
              profileImage: profileData.profileImage,
            }}
            onSave={handleProfileUpdate}
          />
        )}

        {isPasswordModalOpen && (
          <ChangePasswordModal
            onClose={() => setIsPasswordModalOpen(false)}
            onSubmit={handlePasswordChange}
          />
        )}

        {isDeleteModalOpen && (
          <DeleteAccountModal
            onClose={() => setIsDeleteModalOpen(false)}
            onConfirm={handleDeleteAccount}
          />
        )}
      </ContentWrapper>
    </ProfileContainer>
  );
};

export default Profile;
