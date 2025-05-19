import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExpand, faDownload } from "@fortawesome/free-solid-svg-icons";
import Popup from "../Popup/popup";
import {
  ChartWrapper,
  ChartHeader,
  ChartTitle,
  ChartControls,
  ControlButton,
  ExpandedChartContainer,
} from "./chartCardStyles";

const ChartCard = ({ title, chart, delay, onExport }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <ChartWrapper delay={delay}>
        <ChartHeader>
          <ChartTitle>{title}</ChartTitle>
          <ChartControls>
            <ControlButton onClick={onExport} title="Export Data">
              <FontAwesomeIcon icon={faDownload} />
            </ControlButton>
            <ControlButton
              onClick={() => setIsExpanded(true)}
              title="Expand View"
            >
              <FontAwesomeIcon icon={faExpand} />
            </ControlButton>
          </ChartControls>
        </ChartHeader>
        {chart}
      </ChartWrapper>

      <Popup
        isOpen={isExpanded}
        onClose={() => setIsExpanded(false)}
        title={title}
      >
        <ExpandedChartContainer>{chart}</ExpandedChartContainer>
      </Popup>
    </>
  );
};

export default ChartCard;
