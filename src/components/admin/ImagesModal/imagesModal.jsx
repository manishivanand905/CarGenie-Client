import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faImage,
  faPlus,
  faUpload,
  faTrash,
  faCheck,
  faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";
import {
  ModalOverlay,
  ModalContainer,
  ModalHeader,
  ModalTitle,
  CloseButton,
  ModalBody,
  ModalFooter,
  SubmitButton,
  CancelButton,
  UploadContainer,
  UploadArea,
  UploadIcon,
  UploadText,
  UploadInput,
  PreviewsContainer,
  PreviewItem,
  PreviewImage,
  PreviewName,
  PreviewInfo,
  RemovePreviewButton,
  CurrentImagesContainer,
  CurrentImagesTitle,
  CurrentImagesGrid,
  CurrentImageItem,
  DeleteImageButton,
  NoImagesMessage,
  DropActiveOverlay,
  UploadProgress,
  ProgressBar,
  ProgressText,
  ErrorMessage,
  UploadInstructions,
  UploadRequirements,
} from "./imagesModalStyles";

const ImagesModal = ({ isOpen, onClose, onSubmit, onDeleteImage, carData }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const fileInputRef = useRef(null);
  const maxFileSize = 5 * 1024 * 1024; // 5MB
  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  // Cleanup previews on component unmount
  useEffect(() => {
    return () => {
      previews.forEach((preview) => {
        if (preview.url) URL.revokeObjectURL(preview.url);
      });
    };
  }, [previews]);

  // Handle file selection
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    processFiles(files);
  };

  // Process and validate selected files
  const processFiles = (files) => {
    setUploadError("");

    const validFiles = [];
    const newPreviews = [];

    files.forEach((file) => {
      // Check file type
      if (!allowedTypes.includes(file.type)) {
        setUploadError(
          `File type not supported: ${file.name}. Please use JPG, PNG, or WebP.`
        );
        return;
      }

      // Check file size
      if (file.size > maxFileSize) {
        setUploadError(`File too large: ${file.name}. Maximum size is 5MB.`);
        return;
      }

      validFiles.push(file);

      // Create preview
      const preview = {
        file,
        name: file.name,
        size: formatFileSize(file.size),
        url: URL.createObjectURL(file),
      };

      newPreviews.push(preview);
    });

    if (validFiles.length > 0) {
      setSelectedFiles((prev) => [...prev, ...validFiles]);
      setPreviews((prev) => [...prev, ...newPreviews]);
    }
  };

  // Format file size for display
  const formatFileSize = (size) => {
    if (size < 1024) return size + " B";
    else if (size < 1024 * 1024) return Math.round(size / 1024) + " KB";
    else return (size / (1024 * 1024)).toFixed(2) + " MB";
  };

  // Remove a selected file
  const handleRemoveFile = (index) => {
    // Revoke object URL to avoid memory leaks
    if (previews[index].url) URL.revokeObjectURL(previews[index].url);

    // Remove the file from state
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  // Delete an existing image
  const handleDeleteImage = async (imageUrl) => {
    try {
      // Check if onDeleteImage is a function before calling it
      if (typeof onDeleteImage === "function") {
        await onDeleteImage(imageUrl);
      } else {
        console.error("onDeleteImage is not a function");
        setUploadError(
          "Image deletion is not available at the moment. Please try again later."
        );
      }
    } catch (error) {
      console.error("Error deleting image:", error);
      setUploadError(`Error deleting image: ${error.message}`);
    }
  };

  // Handle upload button click
  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  // Handle drag events
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    processFiles(files);
  };

  // Handle form submission with simulated upload progress
  const onFormSubmit = async () => {
    if (selectedFiles.length === 0) {
      setUploadError("Please select at least one image to upload.");
      return;
    }

    try {
      setIsUploading(true);
      setUploadProgress(0);
      setUploadError("");

      // Create FormData for file upload
      const formData = new FormData();
      selectedFiles.forEach((file) => {
        formData.append("images", file);
      });

      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          const newProgress = prev + Math.random() * 15;
          return newProgress >= 100 ? 100 : newProgress;
        });
      }, 200);

      // Submit form data
      await onSubmit(formData);

      // Clear interval and set complete
      clearInterval(progressInterval);
      setUploadProgress(100);

      // Reset state after successful upload
      setTimeout(() => {
        setSelectedFiles([]);
        setPreviews([]);
        setIsUploading(false);
      }, 1000);
    } catch (error) {
      setUploadError(`Error uploading images: ${error.message}`);
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={(e) => e.target === e.currentTarget && onClose()}>
      <ModalContainer>
        <ModalHeader>
          <ModalTitle>
            <FontAwesomeIcon icon={faImage} /> Manage Car Images
          </ModalTitle>
          <CloseButton onClick={onClose} disabled={isUploading}>
            <FontAwesomeIcon icon={faTimes} />
          </CloseButton>
        </ModalHeader>

        <ModalBody>
          <form id="images-form" onSubmit={handleSubmit(onFormSubmit)}>
            {/* Current Images Section */}
            <CurrentImagesContainer>
              <CurrentImagesTitle>Current Images</CurrentImagesTitle>

              {carData && carData.images && carData.images.length > 0 ? (
                <CurrentImagesGrid>
                  {carData.images.map((imageUrl, index) => (
                    <CurrentImageItem key={index}>
                      <PreviewImage
                        src={imageUrl}
                        alt={`Car image ${index + 1}`}
                      />
                      <DeleteImageButton
                        onClick={() => handleDeleteImage(imageUrl)}
                        disabled={isUploading}
                        type="button"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </DeleteImageButton>
                    </CurrentImageItem>
                  ))}
                </CurrentImagesGrid>
              ) : (
                <NoImagesMessage>
                  <FontAwesomeIcon icon={faImage} />
                  <span>No images available</span>
                </NoImagesMessage>
              )}
            </CurrentImagesContainer>

            {/* Upload New Images Section */}
            <UploadContainer>
              <CurrentImagesTitle>Upload New Images</CurrentImagesTitle>

              <UploadArea
                onClick={!isUploading ? handleUploadClick : undefined}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                isDragging={isDragging}
                isUploading={isUploading}
              >
                {isDragging && (
                  <DropActiveOverlay>
                    <FontAwesomeIcon icon={faCheck} />
                    <span>Drop to upload</span>
                  </DropActiveOverlay>
                )}

                <UploadIcon>
                  <FontAwesomeIcon icon={faUpload} />
                </UploadIcon>
                <UploadText>
                  Drag & drop images here or <span>browse files</span>
                </UploadText>
                <UploadInstructions>
                  Select multiple files by holding Ctrl or ⌘ while selecting
                </UploadInstructions>
                <UploadRequirements>
                  JPG, PNG or WebP • Max 5MB per image
                </UploadRequirements>
                <UploadInput
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleFileChange}
                  disabled={isUploading}
                />
              </UploadArea>

              {uploadError && (
                <ErrorMessage>
                  <FontAwesomeIcon icon={faExclamationCircle} />
                  {uploadError}
                </ErrorMessage>
              )}

              {/* Upload Progress */}
              {isUploading && (
                <UploadProgress>
                  <ProgressBar progress={uploadProgress} />
                  <ProgressText>
                    Uploading... {Math.round(uploadProgress)}%
                  </ProgressText>
                </UploadProgress>
              )}

              {/* Image Previews */}
              {previews.length > 0 && (
                <PreviewsContainer>
                  {previews.map((preview, index) => (
                    <PreviewItem key={index}>
                      <PreviewImage src={preview.url} alt={preview.name} />
                      <PreviewInfo>
                        <PreviewName>{preview.name}</PreviewName>
                        <span>{preview.size}</span>
                      </PreviewInfo>
                      <RemovePreviewButton
                        onClick={() => handleRemoveFile(index)}
                        disabled={isUploading}
                        type="button"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </RemovePreviewButton>
                    </PreviewItem>
                  ))}
                </PreviewsContainer>
              )}
            </UploadContainer>
          </form>
        </ModalBody>

        <ModalFooter>
          <CancelButton
            type="button"
            onClick={onClose}
            disabled={isUploading || isSubmitting}
          >
            Cancel
          </CancelButton>
          <SubmitButton
            type="submit"
            form="images-form"
            disabled={selectedFiles.length === 0 || isUploading || isSubmitting}
          >
            <FontAwesomeIcon icon={faPlus} />
            {isUploading ? "Uploading..." : "Upload Images"}
          </SubmitButton>
        </ModalFooter>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default ImagesModal;
