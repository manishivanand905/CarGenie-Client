import React, { useState } from "react";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import {
  FAQItem,
  QuestionButton,
  StyledIcon,
  AnswerContainer,
} from "./faqItemStyles";

const FAQItemComponent = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <FAQItem>
      <QuestionButton onClick={() => setIsOpen(!isOpen)}>
        {question}
        <StyledIcon icon={faChevronDown} $isOpen={isOpen} />
      </QuestionButton>
      <AnswerContainer $isOpen={isOpen}>{answer}</AnswerContainer>
    </FAQItem>
  );
};

export default FAQItemComponent;
