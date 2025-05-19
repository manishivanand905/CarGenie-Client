import React, { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  faChevronRight,
  faChevronLeft,
  faHeart,
  faShareNodes,
  faLocationDot,
  faCheck,
  faCopy,
  faLink,
  faMessage,
  faEnvelope,
  faInfoCircle,
  faRocket,
  faRulerCombined,
  faShieldAlt,
  faThumbsUp,
  faThumbsDown,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  getCarDetails,
  addToFavourites,
  removeFromFavourites,
  removeFromFavouritesByCarId,
  checkFavouritestatus,
} from "./../../../services/user/api";
import {
  DetailPageContainer,
  CarDetailsHeader,
  ImageContainer,
  CarImage,
  ArrowButton,
  InfoContainer,
  CarNameContainer,
  CarTitle,
  CarBrand,
  ActionButtons,
  IconButton,
  PriceContainer,
  PriceTag,
  Asterisk,
  PriceNote,
  LocationLink,
  ActionButton,
  ContentSection,
  SectionTitle,
  FeaturesList,
  FeatureItem,
  FeatureIcon,
  SpecsGrid,
  SpecItem,
  SpecTitle,
  SpecValue,
  BackButton,
  Input,
  TextArea,
  SubmitButton,
  ModalTitle,
  CloseButton,
  FormField,
  Label,
  ShareModal,
  ModalContent,
  ModalHeader,
  ShareOption,
  SharePopup,
  ShareOptionIcon,
  ShareOptionText,
  CopyNotification,
  ColorName,
  ColorCircle,
  ColorItem,
  ColorsGrid,
  ColorOptionsContainer,
  ColorOptionsTitle,
  DescriptionSection,
  SectionContainer,
  SectionIcon,
  SectionHeader,
  ProConItem,
  ProConList,
  ProConHeader,
  CarouselCounter,
  GalleryContainer,
} from "./carDetailsStyles";

const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedColor, setSelectedColor] = useState(null);
  const [showSharePopup, setShowSharePopup] = useState(false);
  const [showCopyNotification, setShowCopyNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [showShareModal, setShowShareModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [recipient, setRecipient] = useState("");
  const [message, setMessage] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [carData, setCarData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [favoriteId, setFavoriteId] = useState(null);
  const shareRef = useRef(null);

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const data = await getCarDetails(id);
        setCarData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching car details:", error);
        setLoading(false);
      }
    };

    fetchCarDetails();
  }, [id]);

  const handleBackClick = () => {
    navigate("/user/cars");
  };

  const nextImage = () => {
    if (!carData || !carData.images) return;
    setCurrentImageIndex((prevIndex) =>
      prevIndex === carData.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    if (!carData || !carData.images) return;
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? carData.images.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    if (!carData) return;

    const checkIfFavorite = async () => {
      try {
        const response = await checkFavouritestatus(id);

        if (response && response.success) {
          setIsFavorite(response.isFavorite);
          if (response.favoriteId) {
            setFavoriteId(response.favoriteId);
          }
        }
      } catch (error) {
        console.error("Error checking favorite status:", error);
      }
    };

    if (carData.colors && carData.colors.length > 0) {
      setSelectedColor(carData.colors[0].name);
    }

    const currentUrl = window.location.href;
    const defaultMessage = `Check out this ${
      carData.name || "car"
    } at ${currentUrl}`;
    setMessage(defaultMessage);

    checkIfFavorite();
  }, [carData, id]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (shareRef.current && !shareRef.current.contains(event.target)) {
        setShowSharePopup(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleFavoriteClick = async () => {
    try {
      if (isFavorite) {
        if (favoriteId) {
          const response = await removeFromFavourites(favoriteId);
          if (response && response.success) {
            setIsFavorite(false);
            setFavoriteId(null);
            showNotification("Removed from favorites!");
          } else {
            throw new Error(
              response?.message || "Failed to remove from favorites"
            );
          }
        } else {
          const response = await removeFromFavouritesByCarId(id);
          if (response && response.success) {
            setIsFavorite(false);
            setFavoriteId(null);
            showNotification("Removed from favorites!");
          } else {
            throw new Error(
              response?.message || "Failed to remove from favorites"
            );
          }
        }
      } else {
        const carDataToAdd = {
          carId: id,
          carModel: carData.name || "", // Changed from carModel to name to match what's in carData
          brand: carData.brand || "",
          year: carData.year || new Date().getFullYear(),
          price: carData.price || "",
          image: carData.images?.[0] || carData.image || "",
          description: carData.description || "",
        };

        const response = await addToFavourites(carDataToAdd);

        if (response && response.success && response.data) {
          setFavoriteId(response.data._id);
          setIsFavorite(true);
          showNotification("Added to favorites!");
        } else {
          throw new Error(response?.message || "Failed to add to favorites");
        }
      }
    } catch (error) {
      console.error("Error updating favorites:", error);
      showNotification(
        error.message || "Failed to update favorites. Please try again."
      );
    }
  };

  const handleShareClick = () => {
    setShowSharePopup(!showSharePopup);
  };

  const showNotification = (message) => {
    setNotificationMessage(message);
    setShowCopyNotification(true);
    setTimeout(() => {
      setShowCopyNotification(false);
    }, 2000);
  };

  const handleCopyLink = () => {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl).then(() => {
      showNotification("URL copied to clipboard!");
      setShowSharePopup(false);
    });
  };

  const handleShareLink = () => {
    if (navigator.share) {
      navigator
        .share({
          title: carData.name || "Car Details",
          text: `Check out this ${carData.name || "car"}!`,
          url: window.location.href,
        })
        .then(() => {
          showNotification("Shared successfully!");
          setShowSharePopup(false);
        })
        .catch((error) => {
          console.error("Error sharing:", error);
          handleCopyLink();
        });
    } else {
      handleCopyLink();
    }
  };

  const handleMessageShare = () => {
    setModalType("message");
    setShowShareModal(true);
    setShowSharePopup(false);
  };

  const handleEmailShare = () => {
    setModalType("email");
    setShowShareModal(true);
    setShowSharePopup(false);
  };

  const handleModalClose = () => {
    setShowShareModal(false);
    setRecipient("");
  };

  const handleModalSubmit = (e) => {
    e.preventDefault();

    if (modalType === "email") {
      const subject = encodeURIComponent(
        `Check out this ${carData.name || "car"}`
      );
      const body = encodeURIComponent(message);
      window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
      showNotification("Email client opened!");
    } else if (modalType === "message") {
      const smsBody = encodeURIComponent(message);
      window.location.href = `sms:${recipient}?body=${smsBody}`;
      showNotification("Message app opened!");
    }

    setShowShareModal(false);
    setRecipient("");
  };

  const handleColorSelect = (colorName) => {
    setSelectedColor(colorName);
  };

  const renderBasicInfo = () => {
    if (!carData) return null;

    return (
      <SectionContainer>
        <SectionHeader>
          <SectionIcon>
            <FontAwesomeIcon icon={faInfoCircle} />
          </SectionIcon>
          <SectionTitle>Basic Information</SectionTitle>
        </SectionHeader>
        <SpecsGrid>
          <SpecItem>
            <SpecTitle>Brand</SpecTitle>
            <SpecValue>{carData.brand || "N/A"}</SpecValue>
          </SpecItem>
          <SpecItem>
            <SpecTitle>Launch Date</SpecTitle>
            <SpecValue>
              {carData.launchDate
                ? new Date(carData.launchDate).toLocaleDateString()
                : "N/A"}
            </SpecValue>
          </SpecItem>
          <SpecItem>
            <SpecTitle>Price Range</SpecTitle>
            <SpecValue>₹ {carData.price || "N/A"}</SpecValue>
          </SpecItem>
          <SpecItem>
            <SpecTitle>Engine</SpecTitle>
            <SpecValue>{carData.engine || "N/A"}</SpecValue>
          </SpecItem>
          <SpecItem>
            <SpecTitle>Category</SpecTitle>
            <SpecValue>{carData.category || "N/A"}</SpecValue>
          </SpecItem>
        </SpecsGrid>
        <DescriptionSection>
          <SectionTitle>Description</SectionTitle>
          <p>{carData.description || "No description available."}</p>
        </DescriptionSection>
      </SectionContainer>
    );
  };

  const renderPerformance = () => {
    if (!carData) return null;

    return (
      <SectionContainer>
        <SectionHeader>
          <SectionIcon>
            <FontAwesomeIcon icon={faRocket} />
          </SectionIcon>
          <SectionTitle>Performance</SectionTitle>
        </SectionHeader>
        <SpecsGrid>
          <SpecItem>
            <SpecTitle>Horsepower</SpecTitle>
            <SpecValue>{carData.horsepower || "N/A"}</SpecValue>
          </SpecItem>
          <SpecItem>
            <SpecTitle>Torque</SpecTitle>
            <SpecValue>{carData.torque || "N/A"}</SpecValue>
          </SpecItem>
          <SpecItem>
            <SpecTitle>Top Speed</SpecTitle>
            <SpecValue>{carData.topSpeed || "N/A"}</SpecValue>
          </SpecItem>
          <SpecItem>
            <SpecTitle>Acceleration</SpecTitle>
            <SpecValue>{carData.acceleration || "N/A"}</SpecValue>
          </SpecItem>
          <SpecItem>
            <SpecTitle>Braking Distance</SpecTitle>
            <SpecValue>{carData.brakingDistance || "N/A"}</SpecValue>
          </SpecItem>
          <SpecItem>
            <SpecTitle>Drive Type</SpecTitle>
            <SpecValue>{carData.driveType || "N/A"}</SpecValue>
          </SpecItem>
          <SpecItem>
            <SpecTitle>Transmission</SpecTitle>
            <SpecValue>{carData.transmission || "N/A"}</SpecValue>
          </SpecItem>
          <SpecItem>
            <SpecTitle>Fuel Type</SpecTitle>
            <SpecValue>{carData.fuelType || "N/A"}</SpecValue>
          </SpecItem>
          <SpecItem>
            <SpecTitle>Mileage</SpecTitle>
            <SpecValue>{carData.mileage || "N/A"}</SpecValue>
          </SpecItem>
          <SpecItem>
            <SpecTitle>Fuel Tank Capacity</SpecTitle>
            <SpecValue>{carData.fuelTankCapacity || "N/A"}</SpecValue>
          </SpecItem>
        </SpecsGrid>
      </SectionContainer>
    );
  };

  const renderDimensions = () => {
    if (!carData) return null;

    return (
      <SectionContainer>
        <SectionHeader>
          <SectionIcon>
            <FontAwesomeIcon icon={faRulerCombined} />
          </SectionIcon>
          <SectionTitle>Dimensions</SectionTitle>
        </SectionHeader>
        <SpecsGrid>
          <SpecItem>
            <SpecTitle>Length</SpecTitle>
            <SpecValue>{carData.dimensions?.length || "N/A"}</SpecValue>
          </SpecItem>
          <SpecItem>
            <SpecTitle>Width</SpecTitle>
            <SpecValue>{carData.dimensions?.width || "N/A"}</SpecValue>
          </SpecItem>
          <SpecItem>
            <SpecTitle>Height</SpecTitle>
            <SpecValue>{carData.dimensions?.height || "N/A"}</SpecValue>
          </SpecItem>
          <SpecItem>
            <SpecTitle>Wheelbase</SpecTitle>
            <SpecValue>{carData.dimensions?.wheelbase || "N/A"}</SpecValue>
          </SpecItem>
          <SpecItem>
            <SpecTitle>Ground Clearance</SpecTitle>
            <SpecValue>{carData.groundClearance || "N/A"}</SpecValue>
          </SpecItem>
          <SpecItem>
            <SpecTitle>Cargo Space</SpecTitle>
            <SpecValue>{carData.cargoSpace || "N/A"}</SpecValue>
          </SpecItem>
          <SpecItem>
            <SpecTitle>Curb Weight</SpecTitle>
            <SpecValue>{carData.curbWeight || "N/A"}</SpecValue>
          </SpecItem>
        </SpecsGrid>

        {carData.colors && carData.colors.length > 0 && (
          <ColorOptionsContainer>
            <ColorOptionsTitle>Available Colors</ColorOptionsTitle>
            <ColorsGrid>
              {carData.colors.map((color, index) => (
                <ColorItem
                  key={index}
                  onClick={() => handleColorSelect(color.name)}
                >
                  <ColorCircle
                    color={color.color}
                    selected={selectedColor === color.name}
                  />
                  <ColorName selected={selectedColor === color.name}>
                    {color.name}
                  </ColorName>
                </ColorItem>
              ))}
            </ColorsGrid>
          </ColorOptionsContainer>
        )}
      </SectionContainer>
    );
  };

  const renderFeatures = () => {
    if (!carData) return null;

    return (
      <SectionContainer>
        <SectionHeader>
          <SectionIcon>
            <FontAwesomeIcon icon={faShieldAlt} />
          </SectionIcon>
          <SectionTitle>Features & Safety</SectionTitle>
        </SectionHeader>
        <SpecsGrid>
          <SpecItem>
            <SpecTitle>Safety Rating</SpecTitle>
            <SpecValue>{carData.safetyRating || "N/A"}</SpecValue>
          </SpecItem>
          <SpecItem>
            <SpecTitle>Airbags</SpecTitle>
            <SpecValue>{carData.airbags || "N/A"}</SpecValue>
          </SpecItem>
        </SpecsGrid>

        <SectionTitle>Safety Features</SectionTitle>
        <FeaturesList>
          {(carData.safetyFeatures || []).map((feature, index) => (
            <FeatureItem key={index}>
              <FeatureIcon icon={faCheck} />
              {feature}
            </FeatureItem>
          ))}
        </FeaturesList>

        <SectionTitle>Features</SectionTitle>
        <FeaturesList>
          {(carData.features || []).map((feature, index) => (
            <FeatureItem key={index}>
              <FeatureIcon icon={faCheck} />
              {feature}
            </FeatureItem>
          ))}
        </FeaturesList>

        <div style={{ display: "flex", gap: "2rem", marginTop: "2rem" }}>
          <ProConList>
            <ProConHeader>
              <FontAwesomeIcon icon={faThumbsUp} /> Pros
            </ProConHeader>
            {(carData.pros || []).map((pro, index) => (
              <ProConItem key={index}>
                <FeatureIcon icon={faCheck} />
                {pro}
              </ProConItem>
            ))}
          </ProConList>

          <ProConList>
            <ProConHeader>
              <FontAwesomeIcon icon={faThumbsDown} /> Cons
            </ProConHeader>
            {(carData.cons || []).map((con, index) => (
              <ProConItem key={index}>
                <FeatureIcon icon={faCheck} />
                {con}
              </ProConItem>
            ))}
          </ProConList>
        </div>
      </SectionContainer>
    );
  };

  if (loading) {
    return (
      <DetailPageContainer>
        <div>Loading car details...</div>
      </DetailPageContainer>
    );
  }

  if (!carData) {
    return (
      <DetailPageContainer>
        <div>Car not found</div>
        <BackButton onClick={handleBackClick}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </BackButton>
      </DetailPageContainer>
    );
  }

  return (
    <DetailPageContainer>
      <BackButton onClick={handleBackClick} aria-label="Back to trending">
        <FontAwesomeIcon icon={faChevronLeft} />
      </BackButton>

      <CarDetailsHeader>
        <GalleryContainer>
          <ImageContainer>
            <CarImage
              src={
                carData.images?.[currentImageIndex] ||
                "https://via.placeholder.com/600x400"
              }
              alt={`${carData.name} - View ${currentImageIndex + 1}`}
            />
            <ArrowButton className="left" onClick={prevImage}>
              <FontAwesomeIcon icon={faChevronLeft} />
            </ArrowButton>
            <ArrowButton className="right" onClick={nextImage}>
              <FontAwesomeIcon icon={faChevronRight} />
            </ArrowButton>
            <CarouselCounter>
              {currentImageIndex + 1}/{carData.images?.length || 1}
            </CarouselCounter>
          </ImageContainer>
        </GalleryContainer>

        <InfoContainer>
          <CarNameContainer>
            <div>
              <CarBrand>{carData.brand || "Brand"}</CarBrand>
              <CarTitle>{carData.name || "Car Name"}</CarTitle>
            </div>
            <ActionButtons>
              <IconButton
                onClick={handleFavoriteClick}
                active={isFavorite}
                aria-label={
                  isFavorite ? "Remove from favorites" : "Add to favorites"
                }
              >
                <FontAwesomeIcon icon={isFavorite ? faHeart : faHeartRegular} />
              </IconButton>
              <div ref={shareRef} style={{ position: "relative" }}>
                <IconButton
                  onClick={handleShareClick}
                  aria-label="Share"
                  active={showSharePopup}
                >
                  <FontAwesomeIcon icon={faShareNodes} />
                </IconButton>
                <SharePopup isOpen={showSharePopup}>
                  <ShareOption onClick={handleCopyLink}>
                    <ShareOptionIcon>
                      <FontAwesomeIcon icon={faCopy} />
                    </ShareOptionIcon>
                    <ShareOptionText>Copy URL</ShareOptionText>
                  </ShareOption>
                  <ShareOption onClick={handleShareLink}>
                    <ShareOptionIcon>
                      <FontAwesomeIcon icon={faLink} />
                    </ShareOptionIcon>
                    <ShareOptionText>Share Link</ShareOptionText>
                  </ShareOption>
                  <ShareOption onClick={handleMessageShare}>
                    <ShareOptionIcon>
                      <FontAwesomeIcon icon={faMessage} />
                    </ShareOptionIcon>
                    <ShareOptionText>Message</ShareOptionText>
                  </ShareOption>
                  <ShareOption onClick={handleEmailShare}>
                    <ShareOptionIcon>
                      <FontAwesomeIcon icon={faEnvelope} />
                    </ShareOptionIcon>
                    <ShareOptionText>Email</ShareOptionText>
                  </ShareOption>
                </SharePopup>
              </div>
            </ActionButtons>
          </CarNameContainer>

          <PriceContainer>
            <PriceTag>
              ₹ {carData.price || "N/A"}
              <Asterisk>*</Asterisk>
            </PriceTag>
            <PriceNote>
              *Ex-showroom Price in{" "}
              <LocationLink href="#">
                Delhi
                <FontAwesomeIcon icon={faLocationDot} size="sm" />
              </LocationLink>
            </PriceNote>
          </PriceContainer>

          <ActionButton href="#">Get On-Road Price</ActionButton>
          <ActionButton href="#">Book a Test Drive</ActionButton>
          <ActionButton href="#">View Complete Offers</ActionButton>
        </InfoContainer>
      </CarDetailsHeader>

      <ContentSection>
        {renderBasicInfo()}
        {renderPerformance()}
        {renderDimensions()}
        {renderFeatures()}
      </ContentSection>

      <CopyNotification isVisible={showCopyNotification}>
        {notificationMessage}
      </CopyNotification>

      <ShareModal isOpen={showShareModal}>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>
              {modalType === "email" ? "Share via Email" : "Share via Message"}
            </ModalTitle>
            <CloseButton onClick={handleModalClose}>×</CloseButton>
          </ModalHeader>
          <form onSubmit={handleModalSubmit}>
            <FormField>
              <Label>
                {modalType === "email" ? "Email Address" : "Phone Number"}
              </Label>
              <Input
                type={modalType === "email" ? "email" : "tel"}
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder={
                  modalType === "email"
                    ? "example@email.com"
                    : "+1 (123) 456-7890"
                }
                required
              />
            </FormField>
            <FormField>
              <Label>Message</Label>
              <TextArea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </FormField>
            <SubmitButton type="submit">Send</SubmitButton>
          </form>
        </ModalContent>
      </ShareModal>
    </DetailPageContainer>
  );
};

export default CarDetails;
