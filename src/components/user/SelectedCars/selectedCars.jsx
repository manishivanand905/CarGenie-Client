import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash, faCar } from "@fortawesome/free-solid-svg-icons";
import {
  SelectedCarsSection,
  CarComparisonCard,
  CarImage,
  CarDetails,
  AddCarSlot,
  RemoveButton,
  DetailText,
  EmptyStateMessage,
  EmptyStateAddCar,
  HorizontalScrollContainer,
} from "./selectedCarsStyles";

const SelectedCars = ({
  selectedCars = [],
  onRemoveCar,
  onAddCar,
  maxCars = 3,
  addCarText = "Add Car to Compare",
  addCarSubText = "Compare up to 3 cars",
}) => {
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);

  React.useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleAddCarClick = (e) => {
    e.stopPropagation();
    onAddCar();
  };

  const isMobile = windowWidth < 768;

  const renderContent = () => {
    if (selectedCars.length === 0) {
      return (
        <EmptyStateMessage>
          <FontAwesomeIcon icon={faCar} size="3x" />
          <h3>No Cars Selected</h3>
          <p>Add cars to compare their features and specifications</p>
          <EmptyStateAddCar onClick={onAddCar}>
            <FontAwesomeIcon icon={faPlus} />
            <span>{addCarText}</span>
          </EmptyStateAddCar>
        </EmptyStateMessage>
      );
    }

    const carCards = selectedCars.map((car, index) => (
      <CarComparisonCard key={car.id} index={index} isMobile={isMobile}>
        <CarImage src={car.image} alt={car.name} />
        <CarDetails>
          <h3>{car.name}</h3>
          <div className="price">{car.price}</div>
          <div className="brand">{car.brand}</div>
          <div className="engine">{car.engine}</div>
          <DetailText>{car.description}</DetailText>
        </CarDetails>
        <RemoveButton
          onClick={(e) => {
            e.stopPropagation();
            onRemoveCar(car.id);
          }}
          aria-label="Remove car"
        >
          <FontAwesomeIcon icon={faTrash} />
        </RemoveButton>
      </CarComparisonCard>
    ));

    const addCarSlot = selectedCars.length < maxCars && (
      <AddCarSlot
        onClick={handleAddCarClick}
        isMobile={isMobile}
        style={{ height: "430px" }}
      >
        <FontAwesomeIcon icon={faPlus} />
        <span>{addCarText}</span>
        <p>{addCarSubText}</p>
      </AddCarSlot>
    );

    if (isMobile) {
      return (
        <HorizontalScrollContainer>
          {carCards}
          {addCarSlot}
        </HorizontalScrollContainer>
      );
    }

    return (
      <SelectedCarsSection>
        {carCards}
        {addCarSlot}
      </SelectedCarsSection>
    );
  };

  return renderContent();
};

export default SelectedCars;
