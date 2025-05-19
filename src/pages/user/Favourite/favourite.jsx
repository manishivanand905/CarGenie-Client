import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import {
  getUserFavourites,
  removeFromFavourites,
} from "./../../../services/user/api";
import {
  FavoritesPageContainer,
  PageHeader,
  PageTitle,
  CardsGrid,
  EmptyStateContainer,
  EmptyStateText,
  EmptyStateIcon,
  EmptyStateButton,
} from "./favouriteStyles";
import { FavoriteCarCard } from "./../../../components/user/FavoriteCard/favoriteCard";

const Favorites = () => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Load favorites from API
    const loadFavorites = async () => {
      try {
        setLoading(true);
        const response = await getUserFavourites();

        if (response && response.success) {
          setFavorites(response.data || []);
        } else {
          throw new Error(response?.message || "Failed to load favorites");
        }
      } catch (error) {
        console.error("Error loading favorites:", error);
        setError(error.message || "Failed to load favorites");
      } finally {
        setLoading(false);
      }
    };

    loadFavorites();
  }, []);

  const handleRemoveFavorite = async (favoriteId) => {
    try {
      const response = await removeFromFavourites(favoriteId);

      if (response && response.success) {
        // Remove from state
        const updatedFavorites = favorites.filter(
          (fav) => fav._id !== favoriteId
        );
        setFavorites(updatedFavorites);
      } else {
        throw new Error(response?.message || "Failed to remove from favorites");
      }
    } catch (error) {
      console.error("Error removing favorite:", error);
      // Could add notification here
    }
  };

  const handleCardClick = (carId) => {
    navigate(`/user/cars/${carId}`);
  };

  const handleBrowseCars = () => {
    navigate("/user/cars");
  };

  if (loading) {
    return (
      <FavoritesPageContainer>
        <PageHeader>
          <PageTitle>My Favorite Cars</PageTitle>
        </PageHeader>
        <div>Loading your favorites...</div>
      </FavoritesPageContainer>
    );
  }

  if (error) {
    return (
      <FavoritesPageContainer>
        <PageHeader>
          <PageTitle>My Favorite Cars</PageTitle>
        </PageHeader>
        <EmptyStateContainer>
          <EmptyStateText>Error: {error}</EmptyStateText>
          <EmptyStateButton onClick={handleBrowseCars}>
            Browse Cars
          </EmptyStateButton>
        </EmptyStateContainer>
      </FavoritesPageContainer>
    );
  }

  return (
    <FavoritesPageContainer>
      <PageHeader>
        <PageTitle>My Favorite Cars</PageTitle>
      </PageHeader>

      {favorites.length > 0 ? (
        <CardsGrid>
          {favorites.map((favorite) => (
            <FavoriteCarCard
              key={favorite._id}
              car={{
                id: favorite.itemId,
                name: favorite.carModel,
                brand: favorite.brand,
                price: favorite.price,
                image: favorite.image,
                year: favorite.year,
                rating: "4.5", // Default value as it's not in the favorite data
                reviews: "10", // Default value as it's not in the favorite data
                showroomLocation: "Delhi", // Default value as it's not in the favorite data
                description: favorite.description,
                _id: favorite._id, // Pass the favorite document ID for removal
              }}
              onCardClick={() => handleCardClick(favorite.itemId)}
              onRemove={() => handleRemoveFavorite(favorite._id)}
            />
          ))}
        </CardsGrid>
      ) : (
        <EmptyStateContainer>
          <EmptyStateIcon>
            <FontAwesomeIcon icon={faHeart} size="3x" />
          </EmptyStateIcon>
          <EmptyStateText>
            You haven't added any cars to your favorites yet.
          </EmptyStateText>
          <EmptyStateButton onClick={handleBrowseCars}>
            Browse Cars
          </EmptyStateButton>
        </EmptyStateContainer>
      )}
    </FavoritesPageContainer>
  );
};

export default Favorites;
