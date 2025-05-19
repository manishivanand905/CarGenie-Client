import React from "react";
import {
  GuidanceSection,
  GuidanceTitle,
  GuidanceContainer,
  GuidanceCard,
  StepNumber,
  StepIcon,
  ContentWrapper,
  StepTitle,
  StepDescription,
} from "./guidanceStyles";

const guidanceSteps = [
  {
    id: 1,
    icon: "fa-solid fa-magnifying-glass",
    title: "Search Your Car",
    description:
      "Browse through our extensive collection of vehicles and use filters to find your perfect match.",
  },
  {
    id: 2,
    icon: "fa-solid fa-calendar-check",
    title: "Book an Inspection",
    description:
      "Schedule a viewing and test drive at your convenience with our flexible booking system.",
  },
  {
    id: 3,
    icon: "fa-solid fa-file-contract",
    title: "Documentation",
    description:
      "Our expert team will guide you through all paperwork and financing options.",
  },
  {
    id: 4,
    icon: "fa-solid fa-key",
    title: "Get Your Keys",
    description:
      "Complete the purchase process and drive away in your dream car.",
  },
];

const Guidance = () => {
  return (
    <GuidanceSection>
      <GuidanceTitle>How It Works</GuidanceTitle>
      <GuidanceContainer>
        {guidanceSteps.map((step) => (
          <GuidanceCard key={step.id}>
            <StepNumber>{step.id}</StepNumber>
            <StepIcon>
              <i className={step.icon} aria-hidden="true"></i>
            </StepIcon>
            <ContentWrapper>
              <StepTitle>{step.title}</StepTitle>
              <StepDescription>{step.description}</StepDescription>
            </ContentWrapper>
          </GuidanceCard>
        ))}
      </GuidanceContainer>
    </GuidanceSection>
  );
};

export default Guidance;
