// import React from "react";
// import {
//   Card,
//   ImageContainer,
//   Badge,
//   Content,
//   CarName,
//   Price,
//   Button,
// } from "./carCardStyles";

// const CarCard = ({ car }) => {
//   return (
//     <Card>
//       <ImageContainer>
//         <img src={car.image} alt={car.name} />
//         {car.badge && <Badge>{car.badge}</Badge>}
//       </ImageContainer>
//       <Content>
//         <div>
//           <CarName>{car.name}</CarName>
//           <Price>
//             <i className="fas fa-rupee-sign"></i>
//             {car.price} <span>onwards</span>
//           </Price>
//         </div>
//         <Button>{car.buttonText || "Show price in my city"}</Button>
//       </Content>
//     </Card>
//   );
// };

// export default CarCard;

// carCard.jsx
import React from "react";
import { motion } from "framer-motion";
import {
  Card,
  ImageContainer,
  Badge,
  Content,
  CarName,
  Price,
  Button,
  SpecsContainer,
  SpecItem,
  LikeButton,
  CompareButton,
  ActionBar,
  Divider,
  RatingContainer,
  RatingStar,
  PromoBadge,
  EngineIcon,
  FuelIcon,
  SpeedIcon,
  PriceDropBadge,
} from "./carCardStyles";

const CarCard = ({ car }) => {
  return (
    <Card>
      <ImageContainer>
        <img src={car.image} alt={car.name} />
        {car.badge && <Badge>{car.badge}</Badge>}
        {car.promo && <PromoBadge>{car.promo}</PromoBadge>}
        {car.priceDrop && (
          <PriceDropBadge>
            <span>-{car.priceDrop}%</span>
          </PriceDropBadge>
        )}
        <ActionBar>
          <LikeButton>
            <motion.i className="fas fa-heart" whileTap={{ scale: 1.4 }} />
          </LikeButton>
          <CompareButton>
            <motion.i
              className="fas fa-balance-scale"
              whileTap={{ scale: 1.2 }}
            />
          </CompareButton>
        </ActionBar>
      </ImageContainer>

      <Content>
        <div>
          <CarName>
            {car.name}
            <RatingContainer>
              {Array(5)
                .fill()
                .map((_, i) => (
                  <RatingStar
                    key={i}
                    className={
                      i < (car.rating || 4) ? "fas fa-star" : "far fa-star"
                    }
                  />
                ))}
            </RatingContainer>
          </CarName>

          <Price>
            <i className="fas fa-rupee-sign"></i>
            {car.price} <span>onwards</span>
            {car.oldPrice && (
              <span className="old-price">
                <i className="fas fa-rupee-sign"></i>
                {car.oldPrice}
              </span>
            )}
          </Price>

          <SpecsContainer>
            <SpecItem>
              <EngineIcon className="fas fa-cogs" />
              {car.engine || "1.5L"}
            </SpecItem>
            <Divider />
            <SpecItem>
              <FuelIcon className="fas fa-gas-pump" />
              {car.fuel || "Petrol"}
            </SpecItem>
            <Divider />
            <SpecItem>
              <SpeedIcon className="fas fa-tachometer-alt" />
              {car.mileage || "18.5 kmpl"}
            </SpecItem>
          </SpecsContainer>
        </div>

        <Button>
          <motion.span
            initial={{ x: 0 }}
            whileHover={{ x: 5 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            {car.buttonText || "Show price in my city"}
            <i className="fas fa-arrow-right"></i>
          </motion.span>
        </Button>
      </Content>
    </Card>
  );
};

export default CarCard;
