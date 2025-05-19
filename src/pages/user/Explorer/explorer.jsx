import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CarCard from "../../../components/user/CarCard/carCard";
import InfoCards from "../../../components/user/InfoCards/infoCards";
import FAQSection from "../../../components/user/FAQSection/faqSection";
import {
  ExplorerContainer,
  Section,
  TabContainer,
  Tab,
  CarouselContainer,
  CarGrid,
  Title,
  Icon,
  SectionHeader,
  ViewAllButton,
  CategoryBadge,
  TabHighlight,
  GradientOverlay,
} from "./explorerStyles";
import {
  featuredCars,
  popularCars,
  upcomingCars,
  newLaunches,
} from "../../../data/user/exploreData";

const CarExplorer = () => {
  const [activeTab, setActiveTab] = useState("trending");
  const [expandedSections, setExpandedSections] = useState({
    featured: false,
    popular: false,
    upcoming: false,
    newLaunches: false,
  });
  const carouselsRef = useRef({});

  const getCarsForTab = () => {
    switch (activeTab) {
      case "trending":
        return featuredCars;
      case "popular":
        return popularCars;
      case "upcoming":
        return upcomingCars;
      default:
        return featuredCars;
    }
  };

  const handleDragEnd = (e, info, carouselId) => {
    if (Math.abs(info.offset.x) > 100) {
      const carousel = carouselsRef.current[carouselId];
      const scrollAmount = info.offset.x > 0 ? -300 : 300;
      carousel.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const toggleExpandSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const renderCarousel = (section, sectionId) => {
    const data = {
      featured: getCarsForTab(),
      popular: popularCars,
      upcoming: upcomingCars,
      newLaunches: newLaunches,
    }[section];

    if (expandedSections[section]) {
      return (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <CarGrid>
              {data.map((car) => (
                <motion.div
                  key={car.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 15,
                    delay: (car.id * 0.05) % 0.5, // Limit delay to prevent too long animations
                  }}
                >
                  <CarCard car={car} />
                </motion.div>
              ))}
            </CarGrid>
          </motion.div>
        </AnimatePresence>
      );
    }

    return (
      <div style={{ position: "relative" }}>
        <CarouselContainer
          ref={(el) => (carouselsRef.current[sectionId] = el)}
          id={sectionId}
        >
          <motion.div
            className="carousel-track"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(e, info) => handleDragEnd(e, info, sectionId)}
          >
            {data.map((car) => (
              <motion.div
                key={car.id}
                whileHover={{ y: -8 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 15,
                  delay: (car.id * 0.05) % 0.5,
                }}
              >
                <CarCard car={car} />
              </motion.div>
            ))}
          </motion.div>
        </CarouselContainer>
        {/* Fixed position gradient overlays */}
        <GradientOverlay position="left" />
        <GradientOverlay position="right" />
      </div>
    );
  };

  return (
    <ExplorerContainer>
      <Section>
        <SectionHeader>
          <Title>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              Featured Cars
            </motion.div>
            <CategoryBadge>Premium</CategoryBadge>
          </Title>
          <ViewAllButton onClick={() => toggleExpandSection("featured")}>
            {expandedSections.featured ? "Show Less" : "View All"}{" "}
            <Icon
              className={
                expandedSections.featured
                  ? "fas fa-arrow-up"
                  : "fas fa-arrow-right"
              }
            />
          </ViewAllButton>
        </SectionHeader>

        <TabContainer>
          <Tab
            active={activeTab === "trending"}
            onClick={() => setActiveTab("trending")}
          >
            <Icon className="fas fa-fire" />
            Trending
          </Tab>
          <Tab
            active={activeTab === "popular"}
            onClick={() => setActiveTab("popular")}
          >
            <Icon className="fas fa-car-side" />
            Popular
          </Tab>
          <Tab
            active={activeTab === "upcoming"}
            onClick={() => setActiveTab("upcoming")}
          >
            <Icon className="fas fa-calendar-alt" />
            Upcoming
          </Tab>
          <TabHighlight activeTab={activeTab} />
        </TabContainer>
        {renderCarousel("featured", "featured-carousel")}
      </Section>

      <Section>
        <SectionHeader>
          <Title>
            <Icon className="fas fa-tag" />
            Get Offers on Popular Cars
            <CategoryBadge>Sale</CategoryBadge>
          </Title>
          <ViewAllButton onClick={() => toggleExpandSection("popular")}>
            {expandedSections.popular ? "Show Less" : "View All"}{" "}
            <Icon
              className={
                expandedSections.popular
                  ? "fas fa-arrow-up"
                  : "fas fa-arrow-right"
              }
            />
          </ViewAllButton>
        </SectionHeader>
        {renderCarousel("popular", "popular-carousel")}
      </Section>

      <Section>
        <SectionHeader>
          <Title>
            <Icon className="fas fa-calendar-plus" />
            Upcoming Cars
            <CategoryBadge>New</CategoryBadge>
          </Title>
          <ViewAllButton onClick={() => toggleExpandSection("upcoming")}>
            {expandedSections.upcoming ? "Show Less" : "View All"}{" "}
            <Icon
              className={
                expandedSections.upcoming
                  ? "fas fa-arrow-up"
                  : "fas fa-arrow-right"
              }
            />
          </ViewAllButton>
        </SectionHeader>
        {renderCarousel("upcoming", "upcoming-carousel")}
      </Section>

      <Section>
        <SectionHeader>
          <Title>
            <Icon className="fas fa-car" />
            Popular Used Cars in India
          </Title>
          <ViewAllButton onClick={() => toggleExpandSection("newLaunches")}>
            {expandedSections.newLaunches ? "Show Less" : "View All"}{" "}
            <Icon
              className={
                expandedSections.newLaunches
                  ? "fas fa-arrow-up"
                  : "fas fa-arrow-right"
              }
            />
          </ViewAllButton>
        </SectionHeader>
        {renderCarousel("newLaunches", "used-cars-carousel")}
      </Section>
      <FAQSection />
      <InfoCards />
    </ExplorerContainer>
  );
};

export default CarExplorer;
