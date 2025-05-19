import React from "react";
import {
  WhyChooseUsSection,
  WhyChooseUsTitle,
  WhyChooseUsGrid,
  FeatureCard,
  FeatureNumber,
  FeatureIcon,
  ContentWrapper,
  FeatureTitle,
  FeatureDescription,
} from "./whyChooseUsStyles";

const featuresData = [
  {
    id: 1,
    icon: "fas fa-shield-alt",
    title: "Trusted Dealers",
    description:
      "We partner with only the most reputable dealers to ensure your peace of mind.",
  },
  {
    id: 2,
    icon: "fas fa-tags",
    title: "Best Prices",
    description:
      "Get the most competitive prices in the market with our price-match guarantee.",
  },
  {
    id: 3,
    icon: "fas fa-headset",
    title: "24/7 Support",
    description:
      "Our dedicated team is always ready to assist you with any queries.",
  },
  {
    id: 4,
    icon: "fas fa-car",
    title: "Wide Selection",
    description:
      "Choose from thousands of vehicles to find your perfect match.",
  },
];

const WhyChooseUs = () => {
  return (
    <WhyChooseUsSection>
      <WhyChooseUsTitle>Why Choose Us</WhyChooseUsTitle>
      <WhyChooseUsGrid>
        {featuresData.map((feature) => (
          <FeatureCard key={feature.id}>
            <FeatureNumber>{feature.id}</FeatureNumber>
            <ContentWrapper>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>
            </ContentWrapper>
            <FeatureIcon>
              <i className={feature.icon}></i>
            </FeatureIcon>
          </FeatureCard>
        ))}
      </WhyChooseUsGrid>
    </WhyChooseUsSection>
  );
};

export default WhyChooseUs;
