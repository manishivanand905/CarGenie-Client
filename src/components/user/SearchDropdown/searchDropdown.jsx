import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faCar, faTags } from "@fortawesome/free-solid-svg-icons";
import { combinedSearch } from "../../../services/user/api";
import styled from "styled-components";

// Styled components
const SearchContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 600px;
`;

const SearchInputWrapper = styled.form`
  display: flex;
  width: 100%;
  position: relative;
`;

const SearchInputField = styled.input`
  width: 100%;
  padding: 12px 20px;
  padding-right: 50px;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  font-size: 14px;
  transition: all 0.3s ease;
  background-color: #f8f9fa;

  &:focus {
    outline: none;
    border-color: #2196f3;
    box-shadow: 0 0 0 2px rgba(33, 150, 243, 0.2);
    background-color: #fff;
  }
`;

const SearchButton = styled.button`
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  width: 50px;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #757575;
  transition: color 0.3s;

  &:hover {
    color: #2196f3;
  }
`;

const DropdownContainer = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  width: 100%;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  max-height: 600px;
  overflow-y: auto;
  padding: 8px 0;
`;

const ResultCategory = styled.div`
  padding: 8px 0;

  h4 {
    font-size: 14px;
    color: #757575;
    margin: 0;
    padding: 8px 16px;
    display: flex;
    align-items: center;
    gap: 8px;

    svg {
      font-size: 12px;
    }
  }

  &:not(:last-of-type) {
    border-bottom: 1px solid #f0f0f0;
  }
`;

const ResultItem = styled.div`
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 16px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const ResultImage = styled.div`
  width: 48px;
  height: 48px;
  overflow: hidden;
  border-radius: 6px;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ResultInfo = styled.div`
  flex: 1;
`;

const ResultName = styled.h5`
  margin: 0 0 4px;
  font-size: 15px;
  color: #333;
`;

const ResultMeta = styled.p`
  margin: 0;
  font-size: 13px;
  color: #757575;
`;

const NoResults = styled.div`
  padding: 20px 16px;
  text-align: center;
  color: #757575;
  font-size: 14px;
`;

const LoadingIndicator = styled.div`
  padding: 20px 16px;
  text-align: center;
  color: #757575;
  font-size: 14px;
`;

const SearchDropdown = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState({ brands: [], cars: [] });
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const searchRef = useRef(null);
  const debounceTimeout = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    if (query.length >= 2) {
      setLoading(true);
      debounceTimeout.current = setTimeout(async () => {
        try {
          const data = await combinedSearch(query);
          setResults(data.results);
          setShowDropdown(true);
        } catch (error) {
          console.error("Search error:", error);
        } finally {
          setLoading(false);
        }
      }, 300);
    } else {
      setResults({ brands: [], cars: [] });
      setShowDropdown(false);
    }

    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Just prevent default form submission, no navigation
  };

  const handleBrandClick = (brandId) => {
    navigate(`/user/brands/${brandId}`);
    setShowDropdown(false);
    setQuery("");
  };

  const handleCarClick = (carId) => {
    navigate(`/user/cars/${carId}`);
    setShowDropdown(false);
    setQuery("");
  };

  const hasResults = results.brands?.length > 0 || results.cars?.length > 0;

  return (
    <SearchContainer ref={searchRef}>
      <SearchInputWrapper onSubmit={handleSubmit}>
        <SearchInputField
          type="text"
          placeholder="Search cars, brands..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.length >= 2 && setShowDropdown(true)}
        />
        <SearchButton type="submit">
          <FontAwesomeIcon icon={faSearch} />
        </SearchButton>
      </SearchInputWrapper>

      {showDropdown && (
        <DropdownContainer>
          {loading ? (
            <LoadingIndicator>Searching...</LoadingIndicator>
          ) : !hasResults ? (
            <NoResults>No results found</NoResults>
          ) : (
            <>
              {results.brands && results.brands.length > 0 && (
                <ResultCategory>
                  <h4>
                    <FontAwesomeIcon icon={faTags} /> Brands
                  </h4>
                  {results.brands.map((brand) => (
                    <ResultItem
                      key={brand._id}
                      onClick={() => handleBrandClick(brand._id)}
                    >
                      <ResultImage>
                        <img src={brand.logo} alt={brand.name} />
                      </ResultImage>
                      <ResultInfo>
                        <ResultName>{brand.name}</ResultName>
                      </ResultInfo>
                    </ResultItem>
                  ))}
                </ResultCategory>
              )}

              {results.cars && results.cars.length > 0 && (
                <ResultCategory>
                  <h4>
                    <FontAwesomeIcon icon={faCar} /> Cars
                  </h4>
                  {results.cars.map((car) => (
                    <ResultItem
                      key={car._id}
                      onClick={() => handleCarClick(car._id)}
                    >
                      <ResultImage>
                        <img src={car.image} alt={car.name} />
                      </ResultImage>
                      <ResultInfo>
                        <ResultName>{car.name}</ResultName>
                        <ResultMeta>
                          {car.brand} • {car.category} • {car.price}
                        </ResultMeta>
                      </ResultInfo>
                    </ResultItem>
                  ))}
                </ResultCategory>
              )}
            </>
          )}
        </DropdownContainer>
      )}
    </SearchContainer>
  );
};

export default SearchDropdown;
