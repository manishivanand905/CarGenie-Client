import styled from "styled-components";

export const WhyChooseUsSection = styled.section`
  padding: 5rem 2rem;
  background: #f7f4f3;
`;

export const WhyChooseUsTitle = styled.h2`
  text-align: center;
  margin-bottom: 3rem;
  color: #5b2333;
  font-size: 2.5rem;
  position: relative;

  &:after {
    content: "";
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 3px;
    background: #5b2333;
  }
`;

export const WhyChooseUsGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  padding: 2rem;
`;

export const FeatureCard = styled.div`
  position: relative;
  background: #f0e6e8;
  border-radius: 15px;
  padding: 2rem;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-10px);
  }
`;

export const FeatureNumber = styled.div`
  position: absolute;
  top: -20px;
  left: 20px;
  width: 40px;
  height: 40px;
  background: #5b2333;
  color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.2rem;
`;

export const FeatureIcon = styled.div`
  position: absolute;
  right: 1.5rem;
  top: 50%;
  transform: translateY(-50%);
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;

  i {
    font-size: 2.5rem;
    color: #5b2333;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }
`;

export const ContentWrapper = styled.div`
  max-width: 70%;
  padding-right: 1rem;
`;

export const FeatureTitle = styled.h3`
  color: #5b2333;
  margin-bottom: 1rem;
  font-size: 1.5rem;
  text-align: left;
`;

export const FeatureDescription = styled.p`
  color: #5b2333;
  line-height: 1.6;
  font-size: 1.1rem;
  text-align: left;
`;
