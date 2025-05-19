import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { faCamera, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  ModalOverlay,
  ModalContainer,
  ModalHeader,
  ModalBody,
  ModalFooter,
  CloseButton,
  FormGroup,
  FormLabel,
  FormInput,
  FormTextArea,
  ImageUploadPreview,
  UploadButton,
  ErrorMessage,
  SaveButton,
  CancelButton,
} from "./editProfileStyles";
import Toast from "../../../common/Toast/toast";
import {
  getUserProfile,
  updateProfile,
  updateProfileWithImage,
} from "../../../../services/user/api";

const EditProfileModal = ({ isOpen, onClose, profileData, onSave }) => {
  const [previewImage, setPreviewImage] = useState(
    profileData?.profileImage || ""
  );
  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [toast, setToast] = useState({
    message: "",
    type: "info",
    duration: 3000,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      username: profileData?.username || "",
      bio: profileData?.bio || "",
    },
  });

  const showToast = (message, type = "info", duration = 3000) => {
    setToast({ message, type, duration });
  };

  const closeToast = () => {
    setToast({ ...toast, message: "" });
  };

  useEffect(() => {
    if (isOpen && !profileData) {
      setIsLoading(true);
      showToast("Loading profile data...", "info");

      getUserProfile()
        .then((data) => {
          reset({
            username: data.username,
            bio: data.bio,
          });
          setPreviewImage(data.profileImage);
          setIsLoading(false);
          showToast("Profile data loaded", "success");
        })
        .catch((error) => {
          console.error("Error fetching profile data:", error);
          setIsLoading(false);
          showToast("Failed to load profile data", "error");
        });
    } else if (isOpen && profileData) {
      reset({
        username: profileData.username,
        bio: profileData.bio,
      });
      setPreviewImage(profileData.profileImage);
    }
  }, [isOpen, profileData, reset]);

  const handleImageChange = (event) => {
    if (isLoading) return;

    const file = event.target.files[0];
    if (file) {
      if (!file.type.match("image.*")) {
        showToast("Please select an image file", "error");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        showToast("Image size should not exceed 5MB", "error");
        return;
      }

      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
      showToast("Image selected", "success");
    }
  };

  const onSubmit = async (data) => {
    if (isLoading) return;

    setIsLoading(true);
    showToast("Updating profile...", "info");

    try {
      let response;

      if (imageFile) {
        const formData = new FormData();
        formData.append("username", data.username);
        formData.append("bio", data.bio);
        formData.append("profileImage", imageFile);

        response = await updateProfileWithImage(formData);
      } else {
        response = await updateProfile(data.username, data.bio);
      }

      const updatedData = {
        ...response,
        profileImage: response.profileImage || previewImage,
      };

      if (onSave) {
        onSave(updatedData);
      }

      showToast("Profile updated successfully", "success");

      setTimeout(() => {
        setIsLoading(false);
        onClose();
      }, 1500);
    } catch (error) {
      console.error("Error updating profile:", error);
      setIsLoading(false);

      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        showToast(`Error: ${error.response.data.message}`, "error");
      } else {
        showToast("Failed to update profile", "error");
      }
    }
  };

  const handleClose = () => {
    if (isLoading) return;
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <Toast
        message={toast.message}
        type={toast.type}
        duration={toast.duration}
        onClose={closeToast}
      />

      <ModalOverlay onClick={handleClose}>
        <ModalContainer onClick={(e) => e.stopPropagation()}>
          <CloseButton
            onClick={handleClose}
            disabled={isLoading}
            style={{
              opacity: isLoading ? 0.7 : 1,
              cursor: isLoading ? "not-allowed" : "pointer",
            }}
          >
            <FontAwesomeIcon icon={faTimes} />
          </CloseButton>

          <ModalHeader>
            <h2>Edit Profile</h2>
          </ModalHeader>

          <ModalBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <ImageUploadPreview>
                <img
                  src={previewImage}
                  alt="Profile Preview"
                  style={{ opacity: isLoading ? 0.7 : 1 }}
                />
                <UploadButton
                  disabled={isLoading}
                  style={{
                    opacity: isLoading ? 0.7 : 1,
                    cursor: isLoading ? "not-allowed" : "pointer",
                  }}
                >
                  <FontAwesomeIcon icon={faCamera} />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    hidden
                    disabled={isLoading}
                  />
                </UploadButton>
              </ImageUploadPreview>

              <FormGroup>
                <FormLabel style={{ opacity: isLoading ? 0.7 : 1 }}>
                  Username
                </FormLabel>
                <FormInput
                  {...register("username", {
                    required: "Username is required",
                    minLength: {
                      value: 3,
                      message: "Username must be at least 3 characters",
                    },
                  })}
                  disabled={isLoading}
                  style={{ opacity: isLoading ? 0.7 : 1 }}
                />
                {errors.username && (
                  <ErrorMessage>{errors.username.message}</ErrorMessage>
                )}
              </FormGroup>

              <FormGroup>
                <FormLabel style={{ opacity: isLoading ? 0.7 : 1 }}>
                  Bio
                </FormLabel>
                <FormTextArea
                  {...register("bio", {
                    maxLength: {
                      value: 500,
                      message: "Bio must not exceed 500 characters",
                    },
                  })}
                  rows={4}
                  disabled={isLoading}
                  style={{ opacity: isLoading ? 0.7 : 1 }}
                />
                {errors.bio && (
                  <ErrorMessage>{errors.bio.message}</ErrorMessage>
                )}
              </FormGroup>
            </form>
          </ModalBody>

          <ModalFooter>
            <CancelButton
              onClick={handleClose}
              disabled={isLoading}
              style={{
                opacity: isLoading ? 0.7 : 1,
                cursor: isLoading ? "not-allowed" : "pointer",
              }}
            >
              Cancel
            </CancelButton>
            <SaveButton
              onClick={handleSubmit(onSubmit)}
              disabled={isLoading}
              style={{
                opacity: isLoading ? 0.7 : 1,
                cursor: isLoading ? "not-allowed" : "pointer",
              }}
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </SaveButton>
          </ModalFooter>
        </ModalContainer>
      </ModalOverlay>
    </>
  );
};

export default EditProfileModal;
