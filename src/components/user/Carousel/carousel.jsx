import React, { useState, useEffect } from "react";
import {
  CarouselWrapper,
  Slide,
  SlideImage,
  SlideOverlay,
  SlideContent,
} from "./carouselStyles";
import { carouselData } from "../../../data/user/homeData";

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isTransitioning) {
        setIsTransitioning(true);
        setCurrentSlide((prev) => (prev + 1) % carouselData.length);
        setTimeout(() => setIsTransitioning(false), 800);
      }
    }, 7000);

    return () => clearInterval(interval);
  }, [isTransitioning]);

  return (
    <CarouselWrapper>
      {carouselData.map((slide, index) => (
        <Slide
          key={slide.id}
          active={index === currentSlide}
          style={{ zIndex: index === currentSlide ? 1 : 0 }}
        >
          <SlideImage
            src={slide.image}
            alt={slide.title}
            loading={index === 0 ? "eager" : "lazy"}
          />
          <SlideOverlay />
          <SlideContent active={index === currentSlide}>
            <h2>{slide.title}</h2>
            <p>{slide.description}</p>
          </SlideContent>
        </Slide>
      ))}
    </CarouselWrapper>
  );
};

export default Carousel;
