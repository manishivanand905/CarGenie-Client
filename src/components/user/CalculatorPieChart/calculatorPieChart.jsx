import React from "react";
import { theme } from "../../../styles/theme";
import {
  ChartContainer,
  Chart,
  Circle,
  Center,
  Legend,
  LegendItem,
  ColorBox,
  LegendText,
  Amount,
  TotalAmount,
  Note,
} from "./calculatorPieChart";

const PieChart = ({ principal, interest, total }) => {
  const principalPercentage = (principal / total) * 100;

  return (
    <ChartContainer>
      <Chart>
        <Circle principalPercentage={principalPercentage} />
        <Center />
      </Chart>

      <Legend>
        <LegendItem>
          <ColorBox color={theme.colors.primary} />
          <LegendText>
            <div>Principal Loan Amount</div>
            <Amount>Rs. {principal.toLocaleString()}</Amount>
          </LegendText>
        </LegendItem>

        <LegendItem>
          <ColorBox color={theme.colors.accent} />
          <LegendText>
            <div>Total Interest Payable</div>
            <Amount>Rs. {interest.toLocaleString()}</Amount>
          </LegendText>
        </LegendItem>
      </Legend>

      <TotalAmount>
        <span>Total Amount Payable</span>
        <span>Rs. {total.toLocaleString()}</span>
      </TotalAmount>

      <Note>Note: This doesn't include bank processing fee.</Note>
    </ChartContainer>
  );
};

export default PieChart;
