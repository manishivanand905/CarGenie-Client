import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faTimes,
  faGasPump,
  faRoad,
  faTachometerAlt,
  faPlus,
  faFilter,
  faChevronDown,
  faCar,
} from "@fortawesome/free-solid-svg-icons";
import { getCars } from "../../../services/user/api"; // Import the API function
import {
  PopupOverlay,
  PopupContainer,
  PopupHeader,
  PopupTitle,
  CloseButton,
  SearchBarContainer,
  SearchIcon,
  SearchInput,
  FilterButton,
  FilterDropdown,
  FilterOption,
  CarGrid,
  CarCard,
  CarImage,
  CarInfo,
  CarName,
  CarBrand,
  CarSpecsContainer,
  CarSpec,
  CarPrice,
  EmptyResults,
  AddCarButton,
  FilterContainer,
  SelectedFilters,
  FilterTag,
  FilterTagText,
  FilterTagClose,
  LoaderContainer,
} from "./carSearchModalStyles";

const CarSearchModal = ({
  isOpen,
  onClose,
  onSelectCar,
  currentSelectedIds = [],
}) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [searchQuery, setSearchQuery] = useState("");
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    fuelTypes: [],
    priceRange: null,
    brands: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const searchInputRef = useRef(null);
  const filterContainerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const data = await getCars();
        setCars(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching cars:", error);
        setIsLoading(false);
      }
    };

    if (isOpen) {
      setIsLoading(true);
      fetchCars();
    }
  }, [isOpen]);

  // Generate filter options from API data
  const filterOptions = {
    fuelTypes:
      cars.length > 0 ? [...new Set(cars.map((car) => car.fuelType))] : [],
    priceRanges: [
      { label: "Under ₹1.00 Crore", value: { min: 0, max: 10000000 } },
      { label: "₹1.00 - ₹2.00 Crore", value: { min: 10000000, max: 20000000 } },
      { label: "₹2.00 - ₹3.00 Crore", value: { min: 20000000, max: 30000000 } },
      { label: "Over ₹3.00 Crore", value: { min: 30000000, max: Infinity } },
    ],
    brands: cars.length > 0 ? [...new Set(cars.map((car) => car.brand))] : [],
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        filterContainerRef.current &&
        !filterContainerRef.current.contains(event.target)
      ) {
        setShowFilters(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current.focus();
      }, 100);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!cars.length) return;

    let results = [...cars].filter(
      (car) => !currentSelectedIds.includes(car._id)
    );

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(
        (car) =>
          car.name.toLowerCase().includes(query) ||
          car.brand.toLowerCase().includes(query) ||
          car.description.toLowerCase().includes(query)
      );
    }

    if (activeFilters.fuelTypes.length > 0) {
      results = results.filter((car) =>
        activeFilters.fuelTypes.includes(car.fuelType)
      );
    }

    if (activeFilters.brands.length > 0) {
      results = results.filter((car) =>
        activeFilters.brands.includes(car.brand)
      );
    }

    if (activeFilters.priceRange) {
      results = results.filter((car) => {
        // Extract numeric parts from price range string like "2.55 - 4.00 Crore"
        const priceRange = car.price.split("-");
        let minPrice =
          parseFloat(priceRange[0].trim().replace(/[^0-9.]/g, "")) * 10000000; // Convert Crore to numeric

        return (
          minPrice >= activeFilters.priceRange.min &&
          minPrice <= activeFilters.priceRange.max
        );
      });
    }

    setFilteredCars(results);
  }, [searchQuery, activeFilters, currentSelectedIds, cars]);

  const toggleFilter = (type, value) => {
    setActiveFilters((prev) => {
      if (type === "priceRange") {
        return {
          ...prev,
          priceRange: prev.priceRange === value ? null : value,
        };
      } else {
        const array = prev[type];
        return {
          ...prev,
          [type]: array.includes(value)
            ? array.filter((item) => item !== value)
            : [...array, value],
        };
      }
    });
  };

  const removeFilter = (type, value) => {
    if (type === "priceRange") {
      setActiveFilters((prev) => ({
        ...prev,
        priceRange: null,
      }));
    } else {
      setActiveFilters((prev) => ({
        ...prev,
        [type]: prev[type].filter((item) => item !== value),
      }));
    }
  };

  const formatPriceDisplay = (priceStr) => {
    return priceStr; // Price is already formatted in the API response
  };

  const handleSelectCar = (car) => {
    onSelectCar(car);
    onClose();
  };

  const viewCarDetails = (carId) => {
    navigate(`/user/trending/${carId}`);
    onClose();
  };

  if (!isOpen) return null;

  const activeFilterCount =
    activeFilters.fuelTypes.length +
    activeFilters.brands.length +
    (activeFilters.priceRange ? 1 : 0);

  return (
    <PopupOverlay>
      <PopupContainer>
        <PopupHeader>
          <PopupTitle>
            <FontAwesomeIcon icon={faCar} />
            <span>Select a Car to Compare</span>
          </PopupTitle>
          <CloseButton onClick={onClose}>
            <FontAwesomeIcon icon={faTimes} />
          </CloseButton>
        </PopupHeader>

        <SearchBarContainer>
          <SearchIcon>
            <FontAwesomeIcon icon={faSearch} />
          </SearchIcon>
          <SearchInput
            ref={searchInputRef}
            type="text"
            placeholder="Search by car name, brand, or features..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FilterContainer ref={filterContainerRef}>
            <FilterButton
              onClick={() => setShowFilters(!showFilters)}
              $isActive={activeFilterCount > 0}
            >
              <FontAwesomeIcon icon={faFilter} />
              {activeFilterCount > 0 && (
                <span className="count">{activeFilterCount}</span>
              )}
              <FontAwesomeIcon icon={faChevronDown} className="chevron" />
            </FilterButton>

            {showFilters && (
              <FilterDropdown>
                <h4>Fuel Type</h4>
                <div className="filter-options">
                  {filterOptions.fuelTypes.map((fuel) => (
                    <FilterOption
                      key={fuel}
                      $isSelected={activeFilters.fuelTypes.includes(fuel)}
                      onClick={() => toggleFilter("fuelTypes", fuel)}
                    >
                      {fuel}
                    </FilterOption>
                  ))}
                </div>

                <h4>Price Range</h4>
                <div className="filter-options">
                  {filterOptions.priceRanges.map((range, index) => (
                    <FilterOption
                      key={index}
                      $isSelected={activeFilters.priceRange === range.value}
                      onClick={() => toggleFilter("priceRange", range.value)}
                    >
                      {range.label}
                    </FilterOption>
                  ))}
                </div>

                <h4>Brand</h4>
                <div className="filter-options">
                  {filterOptions.brands.map((brand) => (
                    <FilterOption
                      key={brand}
                      $isSelected={activeFilters.brands.includes(brand)}
                      onClick={() => toggleFilter("brands", brand)}
                    >
                      {brand}
                    </FilterOption>
                  ))}
                </div>
              </FilterDropdown>
            )}
          </FilterContainer>
        </SearchBarContainer>

        {activeFilterCount > 0 && (
          <SelectedFilters>
            {activeFilters.fuelTypes.map((fuel) => (
              <FilterTag key={fuel}>
                <FilterTagText>{fuel}</FilterTagText>
                <FilterTagClose onClick={() => removeFilter("fuelTypes", fuel)}>
                  <FontAwesomeIcon icon={faTimes} />
                </FilterTagClose>
              </FilterTag>
            ))}

            {activeFilters.brands.map((brand) => (
              <FilterTag key={brand}>
                <FilterTagText>{brand}</FilterTagText>
                <FilterTagClose onClick={() => removeFilter("brands", brand)}>
                  <FontAwesomeIcon icon={faTimes} />
                </FilterTagClose>
              </FilterTag>
            ))}

            {activeFilters.priceRange && (
              <FilterTag>
                <FilterTagText>
                  {
                    filterOptions.priceRanges.find(
                      (r) => r.value === activeFilters.priceRange
                    )?.label
                  }
                </FilterTagText>
                <FilterTagClose onClick={() => removeFilter("priceRange")}>
                  <FontAwesomeIcon icon={faTimes} />
                </FilterTagClose>
              </FilterTag>
            )}
          </SelectedFilters>
        )}

        {isLoading ? (
          <LoaderContainer>
            <div className="spinner"></div>
            <p>Loading cars...</p>
          </LoaderContainer>
        ) : filteredCars.length > 0 ? (
          <CarGrid>
            {filteredCars.map((car, index) => (
              <CarCard key={car._id} $index={index}>
                <CarImage
                  src={car.image}
                  alt={car.name}
                  onClick={() => viewCarDetails(car._id)}
                />
                <CarInfo>
                  <CarName onClick={() => viewCarDetails(car._id)}>
                    {car.name}
                  </CarName>
                  <CarBrand>{car.brand}</CarBrand>
                  <CarSpecsContainer>
                    <CarSpec>
                      <FontAwesomeIcon icon={faGasPump} />
                      <span>{car.fuelType}</span>
                    </CarSpec>
                    <CarSpec>
                      <FontAwesomeIcon icon={faTachometerAlt} />
                      <span>
                        {car.horsepower
                          ? car.horsepower.split("@")[0].trim()
                          : "N/A"}
                      </span>
                    </CarSpec>
                    {!isMobile && (
                      <CarSpec>
                        <FontAwesomeIcon icon={faRoad} />
                        <span>{car.acceleration || "N/A"}</span>
                      </CarSpec>
                    )}
                  </CarSpecsContainer>
                  <CarPrice>{formatPriceDisplay(car.price)}</CarPrice>
                </CarInfo>
                <AddCarButton onClick={() => handleSelectCar(car)}>
                  <FontAwesomeIcon icon={faPlus} />
                  <span>Add to Compare</span>
                </AddCarButton>
              </CarCard>
            ))}
          </CarGrid>
        ) : (
          <EmptyResults>
            <FontAwesomeIcon icon={faCar} />
            <h3>No matching cars found</h3>
            <p>Try adjusting your search or filters</p>
          </EmptyResults>
        )}
      </PopupContainer>
    </PopupOverlay>
  );
};

export default CarSearchModal;
