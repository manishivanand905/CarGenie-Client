import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCar,
  faGasPump,
  faTachometerAlt,
} from "@fortawesome/free-solid-svg-icons";
import { carouselData } from "../../../data/user/trendingData";
import { getCars } from "../../../services/user/api";
import {
  Container,
  CarouselWrapper,
  CarouselSlide,
  CarouselContent,
  CardsGrid,
  CarCard,
  CarImage,
  CarInfo,
  CarTitle,
  CarPrice,
  CarSpecs,
  SpecItem,
  ViewButton,
} from "./carsStyles";

const Cars = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const data = await getCars();
        setCars(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching cars:", error);
        setLoading(false);
      }
    };

    fetchCars();

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselData.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleCardClick = (carId) => {
    navigate(`/user/cars/${carId}`);
  };

  if (loading) {
    return (
      <Container>
        <div>Loading trending cars...</div>
      </Container>
    );
  }

  return (
    <Container>
      <CarouselWrapper>
        {carouselData.map((slide, index) => (
          <CarouselSlide key={slide.id} active={index === currentSlide}>
            <img src={slide.image} alt={slide.title} />
            <CarouselContent>
              <h2>{slide.title}</h2>
              <p>{slide.subtitle}</p>
            </CarouselContent>
          </CarouselSlide>
        ))}
      </CarouselWrapper>

      <CardsGrid>
        {cars.map((car) => (
          <CarCard key={car._id}>
            <CarImage src={car.image} alt={car.name} />
            <CarInfo>
              <CarTitle>{car.name}</CarTitle>
              <CarPrice>{car.price}</CarPrice>
              <CarSpecs>
                {car.engine && (
                  <SpecItem>
                    <FontAwesomeIcon icon={faCar} />
                    <span>{car.engine}</span>
                  </SpecItem>
                )}
                {car.fuelType && (
                  <SpecItem>
                    <FontAwesomeIcon icon={faGasPump} />
                    <span>{car.fuelType}</span>
                  </SpecItem>
                )}
                {car.mileage && (
                  <SpecItem>
                    <FontAwesomeIcon icon={faTachometerAlt} />
                    <span>{car.mileage}</span>
                  </SpecItem>
                )}
              </CarSpecs>
              <ViewButton onClick={() => handleCardClick(car._id)}>
                View Details
              </ViewButton>
            </CarInfo>
          </CarCard>
        ))}
      </CardsGrid>
    </Container>
  );
};

export default Cars;
