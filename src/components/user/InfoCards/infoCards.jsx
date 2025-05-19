import React from "react";
import { motion } from "framer-motion";
import {
  InfoCardsContainer,
  CardWrapper,
  Card,
  IconContainer,
  CardIcon,
  CardContent,
  CardTitle,
  CardSubtitle,
} from "./infoCardsStyles";
import { infoCardsData } from "../../../data/user/exploreData";

const InfoCards = () => {
  return (
    <InfoCardsContainer>
      {infoCardsData.map((card, index) => (
        <CardWrapper
          key={card.id}
          as={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 15,
            delay: index * 0.1,
          }}
        >
          <Card>
            <IconContainer>
              <CardIcon className={card.iconClass} />
            </IconContainer>
            <CardContent>
              <CardTitle>{card.title}</CardTitle>
              <CardSubtitle>{card.subtitle}</CardSubtitle>
            </CardContent>
          </Card>
        </CardWrapper>
      ))}
    </InfoCardsContainer>
  );
};

export default InfoCards;
