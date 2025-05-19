import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import styled from "styled-components";

// New styled components to match the BMW design
const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: white;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const CardContent = styled.div`
  padding: 16px;
`;

const CardTitle = styled.h3`
  font-size: 1.5rem;
  margin: 0 0 8px 0;
  color: #4e1d26;
  font-weight: 600;
`;

const PriceTag = styled.div`
  font-size: 1.2rem;
  font-weight: 500;
  color: #4e1d26;
  margin-bottom: 16px;
`;

const ActionButton = styled.button`
  background-color: #4e1d26;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 12px;
  width: 100%;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #3a151c;
  }
`;

const IconButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  background-color: white;
  color: ${(props) => (props.active ? "#e11d48" : "#888")};
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s ease, color 0.2s ease;
  z-index: 10;

  &:hover {
    transform: scale(1.1);
  }
`;

const ImageContainer = styled.div`
  position: relative;
`;

export const FavoriteCarCard = ({ car, onCardClick, onRemove }) => {
  const isFavorite = true;

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    onRemove(car._id);
  };

  return (
    <CardContainer onClick={onCardClick}>
      <ImageContainer>
        <CardImage
          src={car.image || "https://via.placeholder.com/600x400"}
          alt={car.name || "Car"}
        />
        <IconButton
          onClick={handleFavoriteClick}
          active={isFavorite}
          aria-label="Remove from favorites"
        >
          <FontAwesomeIcon icon={isFavorite ? faHeartSolid : faHeartRegular} />
        </IconButton>
      </ImageContainer>

      <CardContent>
        <CardTitle>{car.name || "Car Name"}</CardTitle>
        <PriceTag>₹ {car.price || "N/A"}</PriceTag>
        <ActionButton>View Details</ActionButton>
      </CardContent>
    </CardContainer>
  );
};
