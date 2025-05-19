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
} from "./brandDetailsStyles";
import { getBrandDetails } from "../../../services/user/api";

const UserBrandDetails = () => {
  const { brandId } = useParams();
  const navigate = useNavigate();
  const [brand, setBrand] = useState(null);
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBrandDetails = async () => {
      try {
        const data = await getBrandDetails(brandId);
        if (data && data.brand) {
          setBrand(data.brand);
          setCars(data.brand.cars || []);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching brand details:", error);
        setLoading(false);
      }
    };

    fetchBrandDetails();
  }, [brandId]);

  const handleBack = () => {
    navigate(-1);
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

  if (loading) {
    return (
      <BrandDetailsContainer>
        <div>Loading...</div>
      </BrandDetailsContainer>
    );
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
      <BackButton onClick={handleBack}>
        <FontAwesomeIcon icon={faArrowLeft} /> Back to All Brands
      </BackButton>

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
              <StatValue>{brand.employees.toLocaleString()}</StatValue>
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
            {brand.employees.toLocaleString()}
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
        <CarsGrid>
          {cars.map((car, index) => (
            <CarCard key={car._id} index={index}>
              <CarImageContainer>
                <CarImage src={car.image} alt={car.name} loading="lazy" />
              </CarImageContainer>
              <CarInfo>
                <CarModel>{car.name}</CarModel>
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
                    <CarDetailValue>{car.fuelEconomy}</CarDetailValue>
                  </CarDetail>
                </CarDetails>
                <ViewMoreDetails onClick={() => handleCarClick(car)}>
                  View More Details
                </ViewMoreDetails>
              </CarInfo>
            </CarCard>
          ))}
        </CarsGrid>
      </CarSectionContainer>

      {isModalOpen && selectedCar && (
        <CarModalOverlay onClick={closeModal}>
          <CarModal onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <h3>
                {brand.name} {selectedCar.name} {selectedCar.year}
              </h3>
              <CloseButton onClick={closeModal}>
                <FontAwesomeIcon icon={faTimes} />
              </CloseButton>
            </ModalHeader>
            <ModalContent>
              <CarModalInfo>
                <CarModalImage src={selectedCar.image} alt={selectedCar.name} />
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
                      <FontAwesomeIcon icon={faGasPump} /> {selectedCar.mileage}
                    </CarModalDetailValue>
                  </CarModalDetailGroup>
                  <CarModalDetailGroup>
                    <CarModalDetailLabel>Key Features</CarModalDetailLabel>
                    <FeaturesList>
                      {selectedCar.features &&
                        selectedCar.features.map((feature, index) => (
                          <FeatureItem key={index}>
                            <FontAwesomeIcon icon={faCheck} /> {feature}
                          </FeatureItem>
                        ))}
                    </FeaturesList>
                  </CarModalDetailGroup>
                </CarModalDetails>
              </CarModalInfo>
            </ModalContent>
          </CarModal>
        </CarModalOverlay>
      )}
    </BrandDetailsContainer>
  );
};

export default UserBrandDetails;
