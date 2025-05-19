import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CardWrapper, IconWrapper, Title, Value } from "./metricCardStyles";

const MetricCard = ({ icon, title, value, delay }) => {
  const formattedValue =
    typeof value === "number" ? value.toLocaleString() : value;

  return (
    <CardWrapper delay={delay}>
      <IconWrapper className="icon">
        <FontAwesomeIcon icon={icon} />
      </IconWrapper>
      <Title>{title}</Title>
      <Value>{formattedValue}</Value>
    </CardWrapper>
  );
};

export default MetricCard;
