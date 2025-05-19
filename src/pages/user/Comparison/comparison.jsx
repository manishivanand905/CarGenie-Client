import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGasPump,
  faTachometerAlt,
  faGears,
  faShieldAlt,
  faStar,
  faArrowRight,
  faRupeeSign,
} from "@fortawesome/free-solid-svg-icons";
import SelectedCars from "../../../components/user/SelectedCars/selectedCars";
import CarSelectionPopup from "../../../components/user/CarSearchModal/carSearchModal";
import {
  ComparisonWrapper,
  MainContent,
  StyledTable,
  TableHeader,
  TableCell,
  SectionHeader,
  MetricContainer,
  MetricValue,
  BarContainer,
  BarFill,
  Badge,
  StarRating,
  RatingText,
  AirbagCount,
  AirbagBadge,
  FeatureGrid,
  FeatureTag,
  ProConSection,
  SubText,
  DimensionGrid,
  CompareButton,
} from "./comparisonStyles";

const CarComparison = () => {
  const [selectedCars, setSelectedCars] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [tableKey, setTableKey] = useState(0);
  const navigate = useNavigate();

  const removeSelectedCar = (carId) => {
    const updatedCars = selectedCars.filter((car) => car.id !== carId);
    setSelectedCars(updatedCars);
    setTableKey((prevKey) => prevKey + 1);
  };

  const handleAddCarClick = () => {
    setIsPopupOpen(true);
  };

  const handleSelectCar = (car) => {
    setSelectedCars([...selectedCars, car]);
  };

  const calculateScore = (value, metric) => {
    const maxValues = {
      horsepower: 500,
      torque: 600,
      topSpeed: 300,
      safetyRating: 5,
    };
    return (parseInt(value) / maxValues[metric]) * 100;
  };

  return (
    <ComparisonWrapper>
      <MainContent>
        <SelectedCars
          selectedCars={selectedCars}
          onRemoveCar={removeSelectedCar}
          onAddCar={handleAddCarClick}
          maxCars={3}
        />

        <CarSelectionPopup
          isOpen={isPopupOpen}
          onClose={() => setIsPopupOpen(false)}
          onSelectCar={handleSelectCar}
          currentSelectedIds={selectedCars.map((car) => car.id)}
        />

        {selectedCars.length > 0 && (
          <StyledTable key={`table-${tableKey}`}>
            <thead>
              <tr>
                <TableHeader isFeature>Features</TableHeader>
                {selectedCars.map((car) => (
                  <TableHeader key={car.id}>{car.name}</TableHeader>
                ))}
              </tr>
            </thead>

            <tbody>
              <tr>
                <SectionHeader colSpan={selectedCars.length + 1}>
                  <FontAwesomeIcon icon={faTachometerAlt} />
                  Performance & Power
                </SectionHeader>
              </tr>
              <tr>
                <TableCell>Horsepower</TableCell>
                {selectedCars.map((car) => (
                  <TableCell key={car.id}>
                    <MetricContainer>
                      <MetricValue>{car.horsepower}</MetricValue>
                      <BarContainer>
                        <BarFill
                          value={calculateScore(
                            parseInt(car.horsepower),
                            "horsepower"
                          )}
                        />
                      </BarContainer>
                    </MetricContainer>
                  </TableCell>
                ))}
              </tr>
              <tr>
                <TableCell>Torque</TableCell>
                {selectedCars.map((car) => (
                  <TableCell key={car.id}>
                    <MetricContainer>
                      <MetricValue>{car.torque}</MetricValue>
                      <BarContainer>
                        <BarFill
                          value={calculateScore(parseInt(car.torque), "torque")}
                        />
                      </BarContainer>
                    </MetricContainer>
                  </TableCell>
                ))}
              </tr>
              <tr>
                <TableCell>Top Speed</TableCell>
                {selectedCars.map((car) => (
                  <TableCell key={car.id}>
                    <MetricContainer>
                      <MetricValue>{car.topSpeed}</MetricValue>
                      <BarContainer>
                        <BarFill
                          value={calculateScore(
                            parseInt(car.topSpeed),
                            "topSpeed"
                          )}
                        />
                      </BarContainer>
                    </MetricContainer>
                  </TableCell>
                ))}
              </tr>
              <tr>
                <TableCell>Acceleration</TableCell>
                {selectedCars.map((car) => (
                  <TableCell key={car.id}>
                    <MetricContainer>
                      <MetricValue highlight>{car.acceleration}</MetricValue>
                    </MetricContainer>
                  </TableCell>
                ))}
              </tr>
              <tr>
                <TableCell>Braking Distance</TableCell>
                {selectedCars.map((car) => (
                  <TableCell key={car.id}>
                    <MetricContainer>
                      <MetricValue>{car.brakingDistance}</MetricValue>
                    </MetricContainer>
                  </TableCell>
                ))}
              </tr>

              <tr>
                <SectionHeader colSpan={selectedCars.length + 1}>
                  <FontAwesomeIcon icon={faGasPump} />
                  Efficiency & Economy
                </SectionHeader>
              </tr>
              <tr>
                <TableCell>Fuel Type</TableCell>
                {selectedCars.map((car) => (
                  <TableCell key={car.id}>
                    <Badge fuelType={car.fuelType}>{car.fuelType}</Badge>
                  </TableCell>
                ))}
              </tr>
              <tr>
                <TableCell>Mileage</TableCell>
                {selectedCars.map((car) => (
                  <TableCell key={car.id}>
                    <MetricContainer>
                      <MetricValue highlight>{car.mileage}</MetricValue>
                      <SubText>
                        {car.fuelType === "Electric"
                          ? "Per Charge"
                          : "Per Liter"}
                      </SubText>
                    </MetricContainer>
                  </TableCell>
                ))}
              </tr>
              <tr>
                <TableCell>Transmission</TableCell>
                {selectedCars.map((car) => (
                  <TableCell key={car.id}>
                    <MetricValue>{car.transmission}</MetricValue>
                  </TableCell>
                ))}
              </tr>
              <tr>
                <TableCell>Fuel Tank Capacity</TableCell>
                {selectedCars.map((car) => (
                  <TableCell key={car.id}>
                    <MetricValue>{car.fuelTankCapacity}</MetricValue>
                  </TableCell>
                ))}
              </tr>

              <tr>
                <SectionHeader colSpan={selectedCars.length + 1}>
                  <FontAwesomeIcon icon={faShieldAlt} />
                  Safety & Security
                </SectionHeader>
              </tr>
              <tr>
                <TableCell>Safety Rating</TableCell>
                {selectedCars.map((car) => (
                  <TableCell key={car.id}>
                    <StarRating>
                      {[...Array(5)].map((_, index) => {
                        const starValue = index + 1;
                        const rating = car.safetyRating;
                        const ratingFloor = Math.floor(rating);
                        const hasDecimal = rating % 1 !== 0;

                        let className = "";
                        if (starValue <= ratingFloor) {
                          className = "filled";
                        } else if (
                          hasDecimal &&
                          starValue === ratingFloor + 1
                        ) {
                          className = "partial";
                        }

                        return (
                          <FontAwesomeIcon
                            key={index}
                            icon={faStar}
                            className={className}
                          />
                        );
                      })}
                      <RatingText>{car.safetyRating}/5</RatingText>
                    </StarRating>
                  </TableCell>
                ))}
              </tr>
              <tr>
                <TableCell>Airbags</TableCell>
                {selectedCars.map((car) => (
                  <TableCell key={car.id}>
                    <AirbagCount>
                      <MetricValue highlight>{car.airbags}</MetricValue>
                      <AirbagBadge>Standard</AirbagBadge>
                    </AirbagCount>
                  </TableCell>
                ))}
              </tr>

              <tr>
                <SectionHeader colSpan={selectedCars.length + 1}>
                  <FontAwesomeIcon icon={faRupeeSign} />
                  Dimensions & Weight
                </SectionHeader>
              </tr>
              <tr>
                <TableCell>Dimensions</TableCell>
                {selectedCars.map((car) => (
                  <TableCell key={car.id}>
                    <DimensionGrid>
                      <div>
                        <SubText>Length</SubText>
                        <MetricValue>{car.dimensions.length}</MetricValue>
                      </div>
                      <div>
                        <SubText>Width</SubText>
                        <MetricValue>{car.dimensions.width}</MetricValue>
                      </div>
                      <div>
                        <SubText>Height</SubText>
                        <MetricValue>{car.dimensions.height}</MetricValue>
                      </div>
                      <div>
                        <SubText>Wheelbase</SubText>
                        <MetricValue>{car.dimensions.wheelbase}</MetricValue>
                      </div>
                    </DimensionGrid>
                  </TableCell>
                ))}
              </tr>
              <tr>
                <TableCell>Ground Clearance</TableCell>
                {selectedCars.map((car) => (
                  <TableCell key={car.id}>
                    <MetricValue>{car.groundClearance}</MetricValue>
                  </TableCell>
                ))}
              </tr>
              <tr>
                <TableCell>Cargo Space</TableCell>
                {selectedCars.map((car) => (
                  <TableCell key={car.id}>
                    <MetricValue>{car.cargoSpace}</MetricValue>
                  </TableCell>
                ))}
              </tr>
              <tr>
                <TableCell>Curb Weight</TableCell>
                {selectedCars.map((car) => (
                  <TableCell key={car.id}>
                    <MetricValue>{car.curbWeight}</MetricValue>
                  </TableCell>
                ))}
              </tr>

              <tr>
                <SectionHeader colSpan={selectedCars.length + 1}>
                  <FontAwesomeIcon icon={faGears} />
                  Features & Specifications
                </SectionHeader>
              </tr>
              <tr>
                <TableCell>Key Features</TableCell>
                {selectedCars.map((car) => (
                  <TableCell key={car.id}>
                    <FeatureGrid>
                      {car.features.map((feature, index) => (
                        <FeatureTag key={index} index={index}>
                          {feature}
                        </FeatureTag>
                      ))}
                    </FeatureGrid>
                  </TableCell>
                ))}
              </tr>
            </tbody>
          </StyledTable>
        )}

        {selectedCars.length > 0 && (
          <ProConSection key={`pros-cons-${tableKey}`}>
            {selectedCars.map((car) => (
              <div key={car.id} className="pro-con-card">
                <h5>{car.name}</h5>
                <div className="lists">
                  <div className="pros">
                    <h6>Pros</h6>
                    <ul>
                      {car.pros.map((pro, index) => (
                        <li key={index}>
                          <FontAwesomeIcon icon={faGears} />
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="cons">
                    <h6>Cons</h6>
                    <ul>
                      {car.cons.map((con, index) => (
                        <li key={index}>
                          <FontAwesomeIcon icon={faGears} className="con" />
                          {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </ProConSection>
        )}

        {selectedCars.length > 0 && (
          <CompareButton
            key={`button-${tableKey}`}
            onClick={() => navigate("/car-details")}
          >
            View Detailed Comparison
            <FontAwesomeIcon icon={faArrowRight} />
          </CompareButton>
        )}
      </MainContent>
    </ComparisonWrapper>
  );
};

export default CarComparison;
