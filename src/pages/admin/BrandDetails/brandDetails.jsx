import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faTimes,
  faMapMarkerAlt,
  faGlobe,
  faBuilding,
  faUser,
  faChartLine,
  faUsers,
  faCalendar,
  faCog,
  faGasPump,
  faTachometerAlt,
  faWeight,
  faCheck,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import {
  BrandDetailsContainer,
  BrandHeader,
  LogoContainer,
  BrandLogo,
  BrandInfo,
  BrandName,
  BrandDescription,
  BrandDetailsGrid,
  DetailCard,
  DetailLabel,
  DetailValue,
  BackButton,
  SectionTitle,
  CarSectionContainer,
  CarsGrid,
  CarCard,
  CarImageContainer,
  CarImage,
  CarInfo,
  CarModel,
  CarYearPrice,
  CarYear,
  CarPrice,
  CarDetails,
  CarDetail,
  CarDetailLabel,
  CarDetailValue,
  ViewMoreDetails,
  CarModalOverlay,
  CarModal,
  ModalHeader,
  ModalContent,
  CarModalInfo,
  CarModalImage,
  CarModalDetails,
  CarModalDetailGroup,
  CarModalDetailLabel,
  CarModalDetailValue,
  FeaturesList,
  FeatureItem,
  CloseButton,
  StatsContainer,
  StatCard,
  StatValue,
  StatLabel,
  HeaderActions,
  ActionButton,
  LoadingContainer,
} from "./brandDetailsStyles";
import {
  updateBrand,
  deleteBrand,
  getBrandDetails,
} from "../../../services/admin/api";
import ConfirmationModal from "../../../components/admin/Confirmation/confirmation";
import BrandFormModal from "../../../components/admin/BrandForm/brandForm";
import Toast from "../../../components/common/Toast/toast";
import Spinner from "../../../components/common/Spinner/spinner";
import ErrorContainer from "../../../components/common/Error/error";

const BrandDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [brand, setBrand] = useState(null);
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [imagePreview, setImagePreview] = useState("");
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    id: null,
    isProcessing: false,
  });
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "success",
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBrandDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getBrandDetails(id);
        setBrand(response.brand);
        setCars(response.brand.cars || []);
      } catch (error) {
        console.error("Error fetching brand details:", error);
        setError("Failed to load brand details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchBrandDetails();
  }, [id]);

  const handleBack = () => {
    navigate("/admin/brands");
  };

  const handleCarClick = (car) => {
    setSelectedCar(car);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCar(null);
    document.body.style.overflow = "unset";
  };

  const openEditModal = () => {
    setImagePreview(brand.logo);
    setIsModalOpen(true);
  };

  const closeEditModal = () => {
    setIsModalOpen(false);
    setImagePreview("");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (formData) => {
    try {
      await updateBrand(id, formData);
      const response = await getBrandDetails(id);
      setBrand(response.brand);
      setCars(response.brand.cars || []);
      showNotification("Brand updated successfully!");
      closeEditModal();
    } catch (error) {
      showNotification(
        `Error: ${error.response?.data?.message || error.message}`,
        "error"
      );
      console.error("Error updating brand:", error);
    }
  };

  const openConfirmModal = () => {
    setConfirmModal({
      isOpen: true,
      id: id,
      isProcessing: false,
    });
  };

  const closeConfirmModal = () => {
    setConfirmModal({
      isOpen: false,
      id: null,
      isProcessing: false,
    });
  };

  const handleDelete = async () => {
    try {
      setConfirmModal((prev) => ({
        ...prev,
        isProcessing: true,
      }));

      await deleteBrand(id);
      showNotification("Brand deleted successfully!");
      navigate("/admin/brands");
    } catch (error) {
      showNotification(
        `Error deleting brand: ${
          error.response?.data?.message || error.message || "Unknown error"
        }`,
        "error"
      );
      console.error("Error deleting brand:", error);

      setConfirmModal((prev) => ({
        ...prev,
        isProcessing: false,
      }));
    }
  };

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

  const handleRetry = () => {
    const fetchBrandDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getBrandDetails(id);
        setBrand(response.brand);
        setCars(response.brand.cars || []);
      } catch (error) {
        console.error("Error fetching brand details:", error);
        setError("Failed to load brand details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchBrandDetails();
  };

  if (loading) {
    return (
      <LoadingContainer>
        <Spinner />
        <p>Loading brand details...</p>
      </LoadingContainer>
    );
  }

  if (error) {
    return <ErrorContainer error={error} onRetry={handleRetry} />;
  }

  if (!brand) {
    return (
      <BrandDetailsContainer>
        <div>Brand not found</div>
        <BackButton onClick={handleBack}>
          <FontAwesomeIcon icon={faArrowLeft} /> Go Back
        </BackButton>
      </BrandDetailsContainer>
    );
  }

  return (
    <BrandDetailsContainer>
      {notification.show && (
        <Toast
          message={notification.message}
          type={notification.type}
          onClose={closeNotification}
        />
      )}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <BackButton onClick={handleBack}>
          <FontAwesomeIcon icon={faArrowLeft} /> Back to All Brands
        </BackButton>

        <HeaderActions>
          <ActionButton onClick={openEditModal} title="Edit Brand">
            <FontAwesomeIcon icon={faEdit} />
          </ActionButton>
          <ActionButton onClick={openConfirmModal} title="Delete Brand">
            <FontAwesomeIcon icon={faTrash} />
          </ActionButton>
        </HeaderActions>
      </div>

      <BrandHeader>
        <LogoContainer>
          <BrandLogo src={brand.logo} alt={`${brand.name} logo`} />
        </LogoContainer>
        <BrandInfo>
          <BrandName>{brand.name}</BrandName>
          <BrandDescription>{brand.description}</BrandDescription>

          <StatsContainer>
            <StatCard index={0}>
              <StatValue>{brand.founded}</StatValue>
              <StatLabel>Founded</StatLabel>
            </StatCard>
            <StatCard index={1}>
              <StatValue>{brand.country}</StatValue>
              <StatLabel>Country</StatLabel>
            </StatCard>
            <StatCard index={2}>
              <StatValue>
                {brand.employees?.toLocaleString() || "N/A"}
              </StatValue>
              <StatLabel>Employees</StatLabel>
            </StatCard>
            <StatCard index={3}>
              <StatValue>{cars.length}</StatValue>
              <StatLabel>Models</StatLabel>
            </StatCard>
          </StatsContainer>
        </BrandInfo>
      </BrandHeader>

      <SectionTitle>Company Details</SectionTitle>
      <BrandDetailsGrid>
        <DetailCard>
          <DetailLabel>Country</DetailLabel>
          <DetailValue>
            <FontAwesomeIcon icon={faMapMarkerAlt} /> {brand.country}
          </DetailValue>
        </DetailCard>
        <DetailCard>
          <DetailLabel>Founded</DetailLabel>
          <DetailValue>
            <FontAwesomeIcon icon={faCalendar} /> {brand.founded}
          </DetailValue>
        </DetailCard>
        <DetailCard>
          <DetailLabel>Website</DetailLabel>
          <DetailValue>
            <FontAwesomeIcon icon={faGlobe} />{" "}
            <a href={brand.website} target="_blank" rel="noopener noreferrer">
              {brand.website}
            </a>
          </DetailValue>
        </DetailCard>
        <DetailCard>
          <DetailLabel>Parent Company</DetailLabel>
          <DetailValue>
            <FontAwesomeIcon icon={faBuilding} /> {brand.parentCompany}
          </DetailValue>
        </DetailCard>
        <DetailCard>
          <DetailLabel>CEO</DetailLabel>
          <DetailValue>
            <FontAwesomeIcon icon={faUser} /> {brand.ceo}
          </DetailValue>
        </DetailCard>
        <DetailCard>
          <DetailLabel>Revenue</DetailLabel>
          <DetailValue>
            <FontAwesomeIcon icon={faChartLine} /> {brand.revenue}
          </DetailValue>
        </DetailCard>
        <DetailCard>
          <DetailLabel>Employees</DetailLabel>
          <DetailValue>
            <FontAwesomeIcon icon={faUsers} />{" "}
            {brand.employees?.toLocaleString() || "N/A"}
          </DetailValue>
        </DetailCard>
        <DetailCard>
          <DetailLabel>Date Added</DetailLabel>
          <DetailValue>
            <FontAwesomeIcon icon={faCalendar} />{" "}
            {new Date(brand.dateAdded).toLocaleDateString()}
          </DetailValue>
        </DetailCard>
      </BrandDetailsGrid>

      <CarSectionContainer>
        <SectionTitle>{brand.name} Models</SectionTitle>
        {cars.length > 0 ? (
          <CarsGrid>
            {cars.map((car, index) => (
              <CarCard key={car.id || car._id} index={index}>
                <CarImageContainer>
                  <CarImage
                    src={car.image}
                    alt={car.model || car.name}
                    loading="lazy"
                  />
                </CarImageContainer>
                <CarInfo>
                  <CarModel>{car.model || car.name}</CarModel>
                  <CarYearPrice>
                    <CarYear>{car.year}</CarYear>
                    <CarPrice>{car.price}</CarPrice>
                  </CarYearPrice>
                  <CarDetails>
                    <CarDetail>
                      <CarDetailLabel>Engine</CarDetailLabel>
                      <CarDetailValue>{car.engine}</CarDetailValue>
                    </CarDetail>
                    <CarDetail>
                      <CarDetailLabel>Horsepower</CarDetailLabel>
                      <CarDetailValue>{car.horsepower} hp</CarDetailValue>
                    </CarDetail>
                    <CarDetail>
                      <CarDetailLabel>Transmission</CarDetailLabel>
                      <CarDetailValue>{car.transmission}</CarDetailValue>
                    </CarDetail>
                    <CarDetail>
                      <CarDetailLabel>Fuel Economy</CarDetailLabel>
                      <CarDetailValue>{car.mileage}</CarDetailValue>
                    </CarDetail>
                  </CarDetails>
                  <ViewMoreDetails onClick={() => handleCarClick(car)}>
                    View More Details
                  </ViewMoreDetails>
                </CarInfo>
              </CarCard>
            ))}
          </CarsGrid>
        ) : (
          <div style={{ textAlign: "center", padding: "2rem" }}>
            <p>No car models available for this brand.</p>
          </div>
        )}
      </CarSectionContainer>

      {isModalOpen && selectedCar && (
        <CarModalOverlay onClick={closeModal}>
          <CarModal onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <h3>
                {brand.name} {selectedCar.model || selectedCar.name}{" "}
                {selectedCar.year}
              </h3>
              <CloseButton onClick={closeModal}>
                <FontAwesomeIcon icon={faTimes} />
              </CloseButton>
            </ModalHeader>
            <ModalContent>
              <CarModalInfo>
                <CarModalImage
                  src={selectedCar.image}
                  alt={selectedCar.model || selectedCar.name}
                />
                <CarModalDetails>
                  <CarModalDetailGroup>
                    <CarModalDetailLabel>Price</CarModalDetailLabel>
                    <CarModalDetailValue>
                      {selectedCar.price}
                    </CarModalDetailValue>
                  </CarModalDetailGroup>
                  <CarModalDetailGroup>
                    <CarModalDetailLabel>Engine</CarModalDetailLabel>
                    <CarModalDetailValue>
                      <FontAwesomeIcon icon={faCog} /> {selectedCar.engine}
                    </CarModalDetailValue>
                  </CarModalDetailGroup>
                  <CarModalDetailGroup>
                    <CarModalDetailLabel>Transmission</CarModalDetailLabel>
                    <CarModalDetailValue>
                      <FontAwesomeIcon icon={faCog} />{" "}
                      {selectedCar.transmission}
                    </CarModalDetailValue>
                  </CarModalDetailGroup>
                  <CarModalDetailGroup>
                    <CarModalDetailLabel>Performance</CarModalDetailLabel>
                    <CarModalDetailValue>
                      <div>
                        <FontAwesomeIcon icon={faTachometerAlt} />{" "}
                        {selectedCar.horsepower} hp
                      </div>
                      <div>
                        <FontAwesomeIcon icon={faWeight} /> {selectedCar.torque}{" "}
                        torque
                      </div>
                    </CarModalDetailValue>
                  </CarModalDetailGroup>
                  <CarModalDetailGroup>
                    <CarModalDetailLabel>Fuel Economy</CarModalDetailLabel>
                    <CarModalDetailValue>
                      <FontAwesomeIcon icon={faGasPump} />{" "}
                      {selectedCar.fuelEconomy}
                    </CarModalDetailValue>
                  </CarModalDetailGroup>
                  {selectedCar.features && selectedCar.features.length > 0 && (
                    <CarModalDetailGroup>
                      <CarModalDetailLabel>Key Features</CarModalDetailLabel>
                      <FeaturesList>
                        {selectedCar.features.map((feature, index) => (
                          <FeatureItem key={index}>
                            <FontAwesomeIcon icon={faCheck} /> {feature}
                          </FeatureItem>
                        ))}
                      </FeaturesList>
                    </CarModalDetailGroup>
                  )}
                </CarModalDetails>
              </CarModalInfo>
            </ModalContent>
          </CarModal>
        </CarModalOverlay>
      )}

      {isModalOpen && !selectedCar && (
        <BrandFormModal
          isOpen={isModalOpen}
          onClose={closeEditModal}
          onSubmit={onSubmit}
          brand={brand}
          imagePreview={imagePreview}
          onImageChange={handleImageChange}
          isEdit={true}
        />
      )}

      {confirmModal.isOpen && (
        <ConfirmationModal
          title="Delete Brand"
          message={`Are you sure you want to delete ${brand.name}? This action cannot be undone.`}
          onConfirm={handleDelete}
          onCancel={closeConfirmModal}
          isProcessing={confirmModal.isProcessing}
          confirmText="Confirm"
          cancelText="Cancel"
          processingText="Processing..."
        />
      )}
    </BrandDetailsContainer>
  );
};

export default BrandDetails;
