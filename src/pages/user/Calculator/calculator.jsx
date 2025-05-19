import React, { useState, useEffect, useCallback } from "react";
import Select from "../../../components/user/Select/select.jsx";
import Slider from "../../../components/user/Slider/slider";
import Toggle from "../../../components/user/Toggle/toggle";
import PieChart from "../../../components/user/CalculatorPieChart/calculatorPieChart.jsx";
import LoanScheduleTable from "../../../components/user/LoanScheduledTable/loanScheduledTable";
import FAQItem from "../../../components/user/FaqItem/faqItem.jsx";
import {
  calculateEMI,
  calculateLoanSchedule,
} from "../../../utils/calculations";
import { cars, cities, faqData } from "../../../data/user/calculatorData";
import {
  CalculatorContainer,
  Header,
  SubHeader,
  MainContent,
  InputSection,
  ResultSection,
  SelectGroup,
  Label,
  EMIAmount,
  EMIPeriod,
  InputGroup,
  InputField,
  Disclaimer,
  Link,
  BankComparisonTable,
  TableHeader,
  TableRow,
  BankLogo,
  InterestRate,
  FAQSection,
  FAQTitle,
} from "./calculatorStyles.js";

const CarLoanCalculator = () => {
  const [selectedCar, setSelectedCar] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [loanAmount, setLoanAmount] = useState(4500000);
  const [tenure, setTenure] = useState(5);
  const [interestRate, setInterestRate] = useState(10);
  const [showSchedule, setShowSchedule] = useState(false);
  const [emiDetails, setEmiDetails] = useState({
    emi: 0,
    totalInterest: 0,
    totalAmount: 0,
    schedule: [],
  });

  const calculateLoanDetails = useCallback(() => {
    const emi = calculateEMI(loanAmount, interestRate, tenure);
    const schedule = calculateLoanSchedule(loanAmount, interestRate, tenure);
    const totalAmount = emi * tenure * 12;
    const totalInterest = totalAmount - loanAmount;

    setEmiDetails({
      emi: Math.round(emi),
      totalInterest: Math.round(totalInterest),
      totalAmount: Math.round(totalAmount),
      schedule,
    });
  }, [loanAmount, tenure, interestRate]);

  useEffect(() => {
    calculateLoanDetails();
  }, [loanAmount, tenure, interestRate, calculateLoanDetails]);

  return (
    <CalculatorContainer>
      <Header>Car Loan EMI Calculator - Calculate Car EMI in Minutes</Header>
      <SubHeader>
        Check EMI for Cars at CarWale and get instant car loan eligibility with
        upto 100% financing
      </SubHeader>

      <SelectGroup>
        <div>
          <Label>CAR</Label>
          <Select
            placeholder="Select Your Car"
            options={cars}
            value={selectedCar}
            onChange={setSelectedCar}
          />
        </div>
        <div>
          <Label>CITY</Label>
          <Select
            placeholder="Select Your City"
            options={cities}
            value={selectedCity}
            onChange={setSelectedCity}
          />
        </div>
      </SelectGroup>

      <MainContent>
        <InputSection>
          <EMIAmount>
            ₹{emiDetails.emi.toLocaleString()}
            <EMIPeriod>EMI For {tenure} years</EMIPeriod>
          </EMIAmount>

          <InputGroup>
            <Label>Loan amount : Rs. {loanAmount.toLocaleString()}</Label>
            <Slider
              min={100000}
              max={5000000}
              value={loanAmount}
              onChange={setLoanAmount}
            />
            <InputField
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
            />
          </InputGroup>

          <InputGroup>
            <Label>Tenure : {tenure} Years</Label>
            <Slider min={1} max={8} value={tenure} onChange={setTenure} />
            <InputField
              value={tenure}
              onChange={(e) => setTenure(Number(e.target.value))}
            />
          </InputGroup>

          <InputGroup>
            <Label>
              Interest : {interestRate}% <i className="fas fa-info-circle" />
            </Label>
            <Slider
              min={8}
              max={20}
              value={interestRate}
              onChange={setInterestRate}
            />
            <InputField
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
            />
          </InputGroup>
        </InputSection>

        <ResultSection>
          <Toggle
            leftLabel="Graph"
            rightLabel="Schedule"
            value={showSchedule}
            onChange={setShowSchedule}
          />

          {showSchedule ? (
            <LoanScheduleTable schedule={emiDetails.schedule} />
          ) : (
            <PieChart
              principal={loanAmount}
              interest={emiDetails.totalInterest}
              total={emiDetails.totalAmount}
            />
          )}
        </ResultSection>
      </MainContent>

      <Disclaimer>
        If you are not sure what interest rate you are being charged for your
        car loan, try our{" "}
        <Link>Interest Rate Calculator/Loan Comparison tool</Link>.
      </Disclaimer>

      <Disclaimer small>
        The calculation performed by EMI Calculator is based on the information
        you entered and is for illustrative purposes only...
      </Disclaimer>

      <BankComparisonTable>
        <TableHeader>
          <div>Bank</div>
          <div>Interest Rate</div>
        </TableHeader>
        {[
          {
            name: "HDFC Bank",
            logo: "	https://wallpapercave.com/wp/wp10393268.jpg",
            rate: "8.50% - 12.50%",
          },
          {
            name: "ICICI Bank",
            logo: "https://getvectorlogo.com/wp-content/uploads/2018/12/icici-bank-vector-logo.png",
            rate: "8.75% - 11.50%",
          },
          {
            name: "SBI",
            logo: "	https://wallpapercave.com/wp/wp12874171.png",
            rate: "8.70% - 11.25%",
          },
          {
            name: "Axis Bank",
            logo: "https://wallpapercave.com/wp/wp13889153.jpg",
            rate: "8.60% - 11.00%",
          },
          {
            name: "Kotak Mahindra Bank",
            logo: "https://logos-download.com/wp-content/uploads/2016/06/Kotak_Mahindra_Bank_logo.png",
            rate: "8.75% - 11.50%",
          },
          {
            name: "Bank of Baroda",
            logo: "https://wallpapercave.com/wp/wp12810799.png",
            rate: "8.60% - 11.00%",
          },
          {
            name: "Bank of India",
            logo: "	https://logos-world.net/wp-content/uploads/2020/11/Bank-of-India-Logo.png",
            rate: "8.60% - 11.00%",
          },
          {
            name: "IDBI Bank",
            logo: "	https://1000logos.net/wp-content/uploads/2021/05/IDBI-Bank-logo.png",
            rate: "8.60% - 11.00%",
          },
          {
            name: "Yes Bank",
            logo: "https://brandlogos.net/wp-content/uploads/2022/07/yes_bank-logo_brandlogos.net_84zyr.png",
            rate: "8.60% - 11.00%",
          },
        ].map((bank, index) => (
          <TableRow key={index}>
            <BankLogo>
              <img src={bank.logo} alt={bank.name} />
              <span>{bank.name}</span>
            </BankLogo>
            <InterestRate>{bank.rate}</InterestRate>
          </TableRow>
        ))}
      </BankComparisonTable>

      <FAQSection>
        <FAQTitle>Frequently Asked Questions</FAQTitle>
        {faqData.map((faq) => (
          <FAQItem key={faq.id} question={faq.question} answer={faq.answer} />
        ))}
      </FAQSection>
    </CalculatorContainer>
  );
};

export default CarLoanCalculator;
