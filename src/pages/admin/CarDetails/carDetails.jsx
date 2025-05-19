import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faEdit,
  faTrash,
  faInfoCircle,
  faTachometerAlt,
  faRulerCombined,
  faShieldAlt,
  faImage,
  faCheck,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import Spinner from "../../../components/common/Spinner/spinner";
import ErrorContainer from "../../../components/common/Error/error";
import Toast from "../../../components/common/Toast/toast";
import BasicInfoModal from "../../../components/admin/BasicInfoModal/basicInfoModal";
import PerformanceModal from "../../../components/admin/PerformanceModal/performanceModal";
import DimensionsModal from "../../../components/admin/DimensionsModal/dimensionsModal";
import FeaturesModal from "../../../components/admin/FeaturesModal/featuresModal";
import ImagesModal from "../../../components/admin/ImagesModal/imagesModal";
import ConfirmationModal from "../../../components/admin/Confirmation/confirmation";
import {
  getCarDetails,
  updateCarBasicInfo,
  updateCarPerformance,
  updateCarDimensions,
  updateCarFeatures,
  addCarImages,
  deleteCarImage,
  deleteCar,
} from "../../../services/admin/api";
import {
  DetailContainer,
  Header,
  BackButton,
  ActionButtons,
  DeleteButton,
  CarDetailGrid,
  ImageSection,
  CarImage,
  InfoSection,
  CarBrand,
  BrandLogo,
  CarTitle,
  Description,
  SectionContainer,
  SectionHeader,
  SectionTitle,
  SectionEditButton,
  SectionContent,
  InfoItem,
  InfoLabel,
  InfoValue,
  DescriptionContainer,
  ColorsContainer,
  ColorsGrid,
  ColorItem,
  ColorCircle,
  ColorName,
  FeaturesList,
  FeatureItem,
  FeatureIcon,
  ProConContainer,
  ProsContainer,
  ConsContainer,
  ProsList,
  ConsList,
  ProItem,
  ConItem,
  ProIcon,
  ConIcon,
  ImagesGrid,
  ImageContainer,
  GalleryImage,
  DeleteImageButton,
  SafetyRatings,
  InfoGrid,
} from "./carDetailsStyles";

const AdminCarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "success",
  });
  const [openModal, setOpenModal] = useState(null);

  // Updated delete car confirmation modal state
  const [confirmDeleteModal, setConfirmDeleteModal] = useState({
    isOpen: false,
    id: null,
    isProcessing: false,
  });

  // New delete image confirmation modal state
  const [deleteImageModal, setDeleteImageModal] = useState({
    isOpen: false,
    imageUrl: null,
    isProcessing: false,
  });

  useEffect(() => {
    const fetchCarDetails = async () => {
      setIsLoading(true);
      try {
        const carData = await getCarDetails(id);
        setCar(carData);
      } catch (error) {
        showNotification(
          "Error fetching car details. Please try again.",
          "error"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchCarDetails();
  }, [id]);

  const showNotification = (message, type = "success") => {
    setNotification({
      show: true,
      message,
      type,
    });

    setTimeout(() => {
      setNotification((prev) => ({ ...prev, show: false }));
    }, 5000);
  };

  const closeNotification = () => {
    setNotification((prev) => ({ ...prev, show: false }));
  };

  const handleOpenModal = (modalType) => {
    setOpenModal(modalType);
  };

  const handleCloseModal = () => {
    setOpenModal(null);
  };

  const handleUpdateBasicInfo = async (data) => {
    try {
      const updatedCar = await updateCarBasicInfo(id, data);
      setCar(updatedCar);
      showNotification("Basic information updated successfully.");
      handleCloseModal();
    } catch (error) {
      showNotification(
        `Error updating basic information: ${error.message}`,
        "error"
      );
    }
  };

  const handleUpdatePerformance = async (data) => {
    try {
      const updatedCar = await updateCarPerformance(id, data);
      setCar(updatedCar);
      showNotification("Performance information updated successfully.");
      handleCloseModal();
    } catch (error) {
      showNotification(
        `Error updating performance information: ${error.message}`,
        "error"
      );
    }
  };

  const handleUpdateDimensions = async (data) => {
    try {
      const updatedCar = await updateCarDimensions(id, data);
      setCar(updatedCar);
      showNotification("Dimensions information updated successfully.");
      handleCloseModal();
    } catch (error) {
      showNotification(
        `Error updating dimensions information: ${error.message}`,
        "error"
      );
    }
  };

  const handleUpdateFeatures = async (data) => {
    try {
      const updatedCar = await updateCarFeatures(id, data);
      setCar(updatedCar);
      showNotification("Features information updated successfully.");
      handleCloseModal();
    } catch (error) {
      showNotification(
        `Error updating features information: ${error.message}`,
        "error"
      );
    }
  };

  const handleAddImages = async (formData) => {
    try {
      const updatedCar = await addCarImages(id, formData);
      setCar(updatedCar);
      showNotification("Images added successfully.");
      handleCloseModal();
    } catch (error) {
      showNotification(`Error adding images: ${error.message}`, "error");
    }
  };

  // Updated method to open the delete image confirmation modal
  const handleOpenDeleteImageConfirmation = (imageUrl) => {
    setDeleteImageModal({
      isOpen: true,
      imageUrl: imageUrl,
      isProcessing: false,
    });
  };

  // Method to close the delete image confirmation modal
  const handleCloseDeleteImageConfirmation = () => {
    setDeleteImageModal({
      isOpen: false,
      imageUrl: null,
      isProcessing: false,
    });
  };

  // Updated method to delete an image with processing state
  const handleDeleteImage = async () => {
    setDeleteImageModal((prev) => ({
      ...prev,
      isProcessing: true,
    }));

    try {
      const updatedCar = await deleteCarImage(id, deleteImageModal.imageUrl);
      setCar(updatedCar.car);
      showNotification("Image deleted successfully.");
    } catch (error) {
      showNotification(`Error deleting image: ${error.message}`, "error");
    } finally {
      handleCloseDeleteImageConfirmation();
    }
  };

  // Updated method to open the delete car confirmation modal
  const handleOpenDeleteConfirmation = () => {
    setConfirmDeleteModal({
      isOpen: true,
      id: id,
      isProcessing: false,
    });
  };

  // Updated method to close the delete car confirmation modal
  const handleCloseDeleteConfirmation = () => {
    setConfirmDeleteModal({
      isOpen: false,
      id: null,
      isProcessing: false,
    });
  };

  // Updated method to delete a car with processing state
  const handleDeleteCar = async () => {
    setConfirmDeleteModal((prev) => ({
      ...prev,
      isProcessing: true,
    }));

    try {
      await deleteCar(id);
      showNotification("Car deleted successfully.");
      navigate("/admin/cars");
    } catch (error) {
      showNotification(`Error deleting car: ${error.message}`, "error");
      setConfirmDeleteModal((prev) => ({
        ...prev,
        isProcessing: false,
      }));
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (!car) {
    return (
      <DetailContainer>
        <Header>
          <BackButton onClick={goBack}>
            <FontAwesomeIcon icon={faArrowLeft} /> Back to Cars
          </BackButton>
        </Header>
        <ErrorContainer
          error="The car you're looking for doesn't exist or has been removed."
          onRetry={() => navigate("/admin/cars")}
        />
      </DetailContainer>
    );
  }

  return (
    <DetailContainer>
      {notification.show && (
        <Toast
          message={notification.message}
          type={notification.type}
          onClose={closeNotification}
        />
      )}

      <Header>
        <BackButton onClick={goBack}>
          <FontAwesomeIcon icon={faArrowLeft} /> Back to Cars
        </BackButton>
        <ActionButtons>
          <DeleteButton onClick={handleOpenDeleteConfirmation}>
            <FontAwesomeIcon icon={faTrash} /> Delete Car
          </DeleteButton>
        </ActionButtons>
      </Header>

      <CarDetailGrid>
        <ImageSection>
          {car.images && car.images.length > 0 ? (
            <CarImage src={car.images[0]} alt={car.name} />
          ) : car.image ? (
            <CarImage src={car.image} alt={car.name} />
          ) : (
            <div>
              <FontAwesomeIcon icon={faImage} size="4x" />
              <p>No image available</p>
            </div>
          )}
        </ImageSection>

        <InfoSection>
          <CarBrand>
            {car.brandId?.logo && (
              <BrandLogo
                src={car.brandId.logo}
                alt={car.brandId?.name || car.brand}
              />
            )}
            {car.brandId?.name || car.brand}
          </CarBrand>
          <CarTitle>{car.name}</CarTitle>
        </InfoSection>
      </CarDetailGrid>

      <SectionContainer>
        <SectionHeader>
          <SectionTitle>
            <FontAwesomeIcon icon={faInfoCircle} /> Basic Information
          </SectionTitle>
          <SectionEditButton onClick={() => handleOpenModal("basicInfo")}>
            <FontAwesomeIcon icon={faEdit} /> Edit
          </SectionEditButton>
        </SectionHeader>
        <SectionContent>
          <InfoGrid>
            <InfoItem>
              <InfoLabel>Name:</InfoLabel>
              <InfoValue>{car.name || "N/A"}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>Brand:</InfoLabel>
              <InfoValue>{car.brand || "N/A"}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>Launch Date:</InfoLabel>
              <InfoValue>
                {car.launchDate
                  ? new Date(car.launchDate).toLocaleDateString()
                  : "N/A"}
              </InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>Price:</InfoLabel>
              <InfoValue>₹ {car.price || "N/A"}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>Engine:</InfoLabel>
              <InfoValue>{car.engine || "N/A"}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>Category:</InfoLabel>
              <InfoValue>{car.category || "N/A"}</InfoValue>
            </InfoItem>
          </InfoGrid>
          <DescriptionContainer>
            <InfoLabel>Description:</InfoLabel>
            <Description>
              {car.description || "No description available."}
            </Description>
          </DescriptionContainer>
        </SectionContent>
      </SectionContainer>

      <SectionContainer>
        <SectionHeader>
          <SectionTitle>
            <FontAwesomeIcon icon={faTachometerAlt} /> Performance
          </SectionTitle>
          <SectionEditButton onClick={() => handleOpenModal("performance")}>
            <FontAwesomeIcon icon={faEdit} /> Edit
          </SectionEditButton>
        </SectionHeader>
        <SectionContent>
          <InfoGrid columns={3}>
            <InfoItem>
              <InfoLabel>Horsepower:</InfoLabel>
              <InfoValue>{car.horsepower || "N/A"}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>Torque:</InfoLabel>
              <InfoValue>{car.torque || "N/A"}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>Top Speed:</InfoLabel>
              <InfoValue>{car.topSpeed || "N/A"}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>Acceleration:</InfoLabel>
              <InfoValue>{car.acceleration || "N/A"}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>Braking Distance:</InfoLabel>
              <InfoValue>{car.brakingDistance || "N/A"}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>Drive Type:</InfoLabel>
              <InfoValue>{car.driveType || "N/A"}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>Transmission:</InfoLabel>
              <InfoValue>{car.transmission || "N/A"}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>Fuel Type:</InfoLabel>
              <InfoValue>{car.fuelType || "N/A"}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>Mileage:</InfoLabel>
              <InfoValue>{car.mileage || "N/A"}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>Fuel Tank Capacity:</InfoLabel>
              <InfoValue>{car.fuelTankCapacity || "N/A"}</InfoValue>
            </InfoItem>
          </InfoGrid>
        </SectionContent>
      </SectionContainer>

      <SectionContainer>
        <SectionHeader>
          <SectionTitle>
            <FontAwesomeIcon icon={faRulerCombined} /> Dimensions
          </SectionTitle>
          <SectionEditButton onClick={() => handleOpenModal("dimensions")}>
            <FontAwesomeIcon icon={faEdit} /> Edit
          </SectionEditButton>
        </SectionHeader>
        <SectionContent>
          <InfoGrid columns={3}>
            <InfoItem>
              <InfoLabel>Length:</InfoLabel>
              <InfoValue>{car.dimensions?.length || "N/A"}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>Width:</InfoLabel>
              <InfoValue>{car.dimensions?.width || "N/A"}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>Height:</InfoLabel>
              <InfoValue>{car.dimensions?.height || "N/A"}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>Wheelbase:</InfoLabel>
              <InfoValue>{car.dimensions?.wheelbase || "N/A"}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>Ground Clearance:</InfoLabel>
              <InfoValue>{car.groundClearance || "N/A"}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>Cargo Space:</InfoLabel>
              <InfoValue>{car.cargoSpace || "N/A"}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>Curb Weight:</InfoLabel>
              <InfoValue>{car.curbWeight || "N/A"}</InfoValue>
            </InfoItem>
          </InfoGrid>

          {car.colors && car.colors.length > 0 && (
            <ColorsContainer>
              <h4>Available Colors:</h4>
              <ColorsGrid>
                {car.colors.map((color, index) => (
                  <ColorItem key={index}>
                    <ColorCircle color={color.color || color.code} />
                    <ColorName>{color.name}</ColorName>
                  </ColorItem>
                ))}
              </ColorsGrid>
            </ColorsContainer>
          )}
        </SectionContent>
      </SectionContainer>

      <SectionContainer>
        <SectionHeader>
          <SectionTitle>
            <FontAwesomeIcon icon={faShieldAlt} /> Features & Safety
          </SectionTitle>
          <SectionEditButton onClick={() => handleOpenModal("features")}>
            <FontAwesomeIcon icon={faEdit} /> Edit
          </SectionEditButton>
        </SectionHeader>
        <SectionContent>
          <SafetyRatings>
            <InfoItem>
              <InfoLabel>Safety Rating:</InfoLabel>
              <InfoValue>{car.safetyRating || "N/A"}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>Airbags:</InfoLabel>
              <InfoValue>{car.airbags || "N/A"}</InfoValue>
            </InfoItem>
          </SafetyRatings>

          {car.safetyFeatures && car.safetyFeatures.length > 0 && (
            <>
              <h4>Safety Features:</h4>
              <FeaturesList>
                {car.safetyFeatures.map((feature, index) => (
                  <FeatureItem key={index}>
                    <FeatureIcon>
                      <FontAwesomeIcon icon={faCheck} />
                    </FeatureIcon>
                    {feature}
                  </FeatureItem>
                ))}
              </FeaturesList>
            </>
          )}

          {car.features && car.features.length > 0 && (
            <>
              <h4>Features:</h4>
              <FeaturesList>
                {car.features.map((feature, index) => (
                  <FeatureItem key={index}>
                    <FeatureIcon>
                      <FontAwesomeIcon icon={faCheck} />
                    </FeatureIcon>
                    {feature}
                  </FeatureItem>
                ))}
              </FeaturesList>
            </>
          )}

          <ProConContainer>
            <ProsContainer>
              <h4>Pros:</h4>
              {car.pros && car.pros.length > 0 ? (
                <ProsList>
                  {car.pros.map((pro, index) => (
                    <ProItem key={index}>
                      <ProIcon>
                        <FontAwesomeIcon icon={faCheck} />
                      </ProIcon>
                      {pro}
                    </ProItem>
                  ))}
                </ProsList>
              ) : (
                <p>No pros specified.</p>
              )}
            </ProsContainer>

            <ConsContainer>
              <h4>Cons:</h4>
              {car.cons && car.cons.length > 0 ? (
                <ConsList>
                  {car.cons.map((con, index) => (
                    <ConItem key={index}>
                      <ConIcon>
                        <FontAwesomeIcon icon={faTimes} />
                      </ConIcon>
                      {con}
                    </ConItem>
                  ))}
                </ConsList>
              ) : (
                <p>No cons specified.</p>
              )}
            </ConsContainer>
          </ProConContainer>
        </SectionContent>
      </SectionContainer>

      <SectionContainer>
        <SectionHeader>
          <SectionTitle>
            <FontAwesomeIcon icon={faImage} /> Images
          </SectionTitle>
          <SectionEditButton onClick={() => handleOpenModal("images")}>
            <FontAwesomeIcon icon={faEdit} /> Edit
          </SectionEditButton>
        </SectionHeader>
        <ImagesGrid>
          {car.images && car.images.length > 0 ? (
            car.images.map((img, index) => (
              <ImageContainer key={index}>
                <GalleryImage src={img} alt={`${car.name} view ${index + 1}`} />
                <DeleteImageButton
                  onClick={() => handleOpenDeleteImageConfirmation(img)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </DeleteImageButton>
              </ImageContainer>
            ))
          ) : (
            <p>No images available.</p>
          )}
        </ImagesGrid>
      </SectionContainer>

      {openModal === "basicInfo" && (
        <BasicInfoModal
          isOpen={true}
          onClose={handleCloseModal}
          onSubmit={handleUpdateBasicInfo}
          carData={car}
        />
      )}

      {openModal === "performance" && (
        <PerformanceModal
          isOpen={true}
          onClose={handleCloseModal}
          onSubmit={handleUpdatePerformance}
          carData={car}
        />
      )}

      {openModal === "dimensions" && (
        <DimensionsModal
          isOpen={true}
          onClose={handleCloseModal}
          onSubmit={handleUpdateDimensions}
          carData={car}
        />
      )}

      {openModal === "features" && (
        <FeaturesModal
          isOpen={true}
          onClose={handleCloseModal}
          onSubmit={handleUpdateFeatures}
          carData={car}
        />
      )}

      {openModal === "images" && (
        <ImagesModal
          isOpen={true}
          onClose={handleCloseModal}
          onSubmit={handleAddImages}
          onDeleteImage={handleDeleteImage}
          carData={car}
        />
      )}

      {/* Updated Car Delete Confirmation Modal */}
      {confirmDeleteModal.isOpen && (
        <ConfirmationModal
          title="Delete Car"
          message="Are you sure you want to delete this car? This action cannot be undone."
          onConfirm={handleDeleteCar}
          onCancel={handleCloseDeleteConfirmation}
          confirmText="Delete"
          cancelText="Cancel"
          processingText="Processing..."
          isProcessing={confirmDeleteModal.isProcessing}
        />
      )}

      {/* New Image Delete Confirmation Modal */}
      {deleteImageModal.isOpen && (
        <ConfirmationModal
          title="Delete Image"
          message="Are you sure you want to delete this image? This action cannot be undone."
          onConfirm={handleDeleteImage}
          onCancel={handleCloseDeleteImageConfirmation}
          confirmText="Delete"
          cancelText="Cancel"
          processingText="Processing..."
          isProcessing={deleteImageModal.isProcessing}
        />
      )}
    </DetailContainer>
  );
};

export default AdminCarDetails;
