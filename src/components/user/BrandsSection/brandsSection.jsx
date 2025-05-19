import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import {
  BrandsContainer,
  BrandsGrid,
  BrandCard,
  ViewMoreButton,
  BrandLogo,
  BrandName,
} from "./brandsSectionStyles";
import { getBrandNames } from "./../../../services/user/api";

const BrandsSection = () => {
  const [showAllBrands, setShowAllBrands] = useState(false);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const data = await getBrandNames();
        setBrands(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching brands:", error);
        setLoading(false);
      }
    };

    fetchBrands();
  }, []);

  const displayedBrands = showAllBrands ? brands : brands.slice(0, 12);

  const handleBrandClick = (brandId) => {
    navigate(`/user/brands/${brandId}`);
  };

  if (loading) {
    return (
      <BrandsContainer>
        <h2>All Brands</h2>
        <div>Loading brands...</div>
      </BrandsContainer>
    );
  }

  return (
    <BrandsContainer>
      <h2>All Brands</h2>
      <BrandsGrid>
        {displayedBrands.map((brand) => (
          <BrandCard
            key={brand._id}
            onClick={() => handleBrandClick(brand._id)}
            tabIndex={0}
            role="button"
            onKeyPress={(e) => e.key === "Enter" && handleBrandClick(brand._id)}
          >
            <BrandLogo src={brand.logo} alt={brand.name} loading="lazy" />
            <BrandName>{brand.name}</BrandName>
          </BrandCard>
        ))}
      </BrandsGrid>

      {brands.length > 12 && (
        <ViewMoreButton
          onClick={() => setShowAllBrands(!showAllBrands)}
          aria-expanded={showAllBrands}
        >
          {showAllBrands ? (
            <>
              View Less <FontAwesomeIcon icon={faChevronUp} />
            </>
          ) : (
            <>
              View More Brands <FontAwesomeIcon icon={faChevronDown} />
            </>
          )}
        </ViewMoreButton>
      )}
    </BrandsContainer>
  );
};

export default BrandsSection;
