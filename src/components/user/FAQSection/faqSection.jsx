import React, { useState } from "react";
import {
  FAQContainer,
  FAQTitle,
  FAQItem,
  QuestionRow,
  QuestionText,
  ExpandIcon,
  AnswerContainer,
  AnswerText,
} from "./faqSectionStyles";
import { faqData } from "../../../data/user/exploreData";

const FAQSection = () => {
  const [expandedItems, setExpandedItems] = useState({});

  const toggleExpand = (id) => {
    setExpandedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <FAQContainer>
      <FAQTitle>New Car FAQs</FAQTitle>

      {faqData.map((item) => (
        <FAQItem key={item.id}>
          <QuestionRow onClick={() => toggleExpand(item.id)}>
            <QuestionText>Q ) {item.question}</QuestionText>
            <ExpandIcon
              className={
                expandedItems[item.id] ? "fas fa-minus" : "fas fa-plus"
              }
            />
          </QuestionRow>

          {expandedItems[item.id] && (
            <AnswerContainer
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <AnswerText>{item.answer}</AnswerText>
            </AnswerContainer>
          )}
        </FAQItem>
      ))}
    </FAQContainer>
  );
};

export default FAQSection;
