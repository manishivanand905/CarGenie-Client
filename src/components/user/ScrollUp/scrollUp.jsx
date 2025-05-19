import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { ScrollButton, ScrollToTopWrapper } from "./scrollUpStyles";

const ScrollUp = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <ScrollToTopWrapper isVisible={isVisible}>
      <ScrollButton
        onClick={scrollToTop}
        aria-label="Scroll to top"
        title="Back to top"
      >
        <FontAwesomeIcon icon={faArrowUp} />
      </ScrollButton>
    </ScrollToTopWrapper>
  );
};

export default ScrollUp;
