import React, { useState, useEffect, useRef, useCallback, memo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar as fasStar,
  faEdit,
  faTrash,
  faPlus,
  faTimes,
  faFilter,
  faUser,
  faCar,
} from "@fortawesome/free-solid-svg-icons";
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";
import Pagination from "../../../components/common/Pagination/pagination";
import {
  ReviewsPageContainer,
  TabsContainer,
  Tab,
  ReviewsContainer,
  ReviewCard,
  UserInfo,
  Avatar,
  UserName,
  CarModel,
  RatingContainer,
  ReviewContent,
  Timestamp,
  ActionButtons,
  EditButton,
  DeleteButton,
  ReviewFormContainer,
  ReviewFormOverlay,
  ReviewForm,
  FormHeader,
  CloseButton,
  FormGroup,
  Label,
  TextArea,
  SubmitButton,
  EmptyReviews,
  FilterContainer,
  FilterDropdown,
  FilterButton,
  AddReviewButton,
  ReviewCardHeader,
  ReviewCardContent,
  ExpandButton,
  Input,
} from "./reviewsStyles";
import { theme } from "../../../styles/theme";
import {
  getAllReviews,
  getMyReviews,
  createReview,
  updateReview,
  deleteReview,
} from "../../../services/user/api";

import ConfirmationModal from "../../../components/common/Confirmation/confirmation";
import Toast from "../../../components/common/Toast/toast";
import Spinner from "../../../components/common/Spinner/spinner";
import ErrorContainer from "../../../components/common/Error/error";

const StarRating = memo(({ rating, interactive = false, onRatingChange }) => {
  const handleClick = (selectedRating) => {
    if (interactive && onRatingChange) {
      onRatingChange(selectedRating);
    }
  };

  return Array(5)
    .fill(0)
    .map((_, index) => (
      <FontAwesomeIcon
        key={index}
        icon={index < rating ? fasStar : farStar}
        color={index < rating ? theme.colors.accent : "#ccc"}
        onClick={interactive ? () => handleClick(index + 1) : undefined}
        style={interactive ? { cursor: "pointer" } : {}}
      />
    ));
});

const ReviewActions = memo(({ review, onEdit, onDelete, activeTab }) => {
  if (activeTab !== "my") return null;

  return (
    <ActionButtons>
      <EditButton onClick={() => onEdit(true, review)}>
        <FontAwesomeIcon icon={faEdit} />
        Edit
      </EditButton>
      <DeleteButton onClick={() => onDelete(review)}>
        <FontAwesomeIcon icon={faTrash} />
        Delete
      </DeleteButton>
    </ActionButtons>
  );
});

const Reviews = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const filterRef = useRef(null);
  const ITEMS_PER_PAGE = 5;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [selectedRating, setSelectedRating] = useState(0);

  const handleRatingChange = useCallback((newRating) => {
    setSelectedRating(newRating);
  }, []);

  const [state, setState] = useState({
    activeTab: "all",
    reviews: [],
    currentPage: 1,
    isFormOpen: false,
    isEditMode: false,
    currentReview: null,
    expandedReviews: {},
    loading: true,
    currentFilter: "newest",
    showFilter: false,
    deleteConfirmation: false,
    reviewToDelete: null,
    isDeleting: false,
    error: null,
    toast: {
      message: "",
      type: "",
      visible: false,
    },
  });

  const {
    activeTab,
    reviews,
    currentPage,
    isFormOpen,
    isEditMode,
    currentReview,
    expandedReviews,
    loading,
    currentFilter,
    showFilter,
    deleteConfirmation,
    reviewToDelete,
    isDeleting,
    error,
    toast,
  } = state;

  const updateState = (newState) => {
    setState((prev) => ({ ...prev, ...newState }));
  };

  const showToast = useCallback((message, type = "info") => {
    updateState({
      toast: {
        message,
        type,
        visible: true,
      },
    });
  }, []);

  const hideToast = useCallback(() => {
    updateState({
      toast: {
        message: "",
        type: "",
        visible: false,
      },
    });
  }, []);

  const fetchReviews = useCallback(
    async (filter = currentFilter) => {
      try {
        updateState({ loading: true, error: null });

        let result;
        if (activeTab === "all") {
          result = await getAllReviews(filter);
        } else {
          result = await getMyReviews(filter);
        }

        if (result.success) {
          updateState({
            reviews: result.data,
            loading: false,
          });
        } else {
          console.error("Error fetching reviews:", result.message);
          updateState({
            loading: false,
            error: result.message || "Failed to load reviews",
          });
        }
      } catch (error) {
        console.error("Error loading reviews:", error);
        updateState({
          loading: false,
          error: "An unexpected error occurred while loading reviews",
        });
      }
    },
    [activeTab, currentFilter]
  );

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get("tab");
    if (tab) {
      updateState({ activeTab: tab });
    }
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        updateState({ showFilter: false });
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleTabChange = useCallback(
    (tab) => {
      updateState({ activeTab: tab, currentPage: 1 });
      navigate(`/user/reviews?tab=${tab}`, { replace: true });
    },
    [navigate]
  );

  const handlePageChange = useCallback((page) => {
    updateState({ currentPage: page });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const toggleExpand = useCallback(
    (reviewId) => {
      updateState({
        expandedReviews: {
          ...expandedReviews,
          [reviewId]: !expandedReviews[reviewId],
        },
      });
    },
    [expandedReviews]
  );

  const openReviewForm = useCallback(
    (edit = false, review = null) => {
      updateState({
        isFormOpen: true,
        isEditMode: edit,
        currentReview: review,
      });

      if (edit && review) {
        const ratingValue =
          typeof review.rating === "string"
            ? parseInt(review.rating, 10)
            : review.rating;

        setSelectedRating(ratingValue);

        reset({
          carModel: review.carModel,
          rating: ratingValue,
          reviewContent: review.content,
        });
      } else {
        setSelectedRating(0);
        reset({
          rating: 0,
        });
      }
    },
    [reset]
  );

  const closeReviewForm = useCallback(() => {
    updateState({
      isFormOpen: false,
      isEditMode: false,
      currentReview: null,
    });
    reset();
    setSelectedRating(0);
  }, [reset]);

  const handleFilterChange = useCallback(
    (filterValue) => {
      updateState({
        currentFilter: filterValue,
        showFilter: false,
        currentPage: 1,
      });

      fetchReviews(filterValue);
    },
    [fetchReviews]
  );

  const confirmDelete = useCallback((review) => {
    updateState({
      reviewToDelete: review,
      deleteConfirmation: true,
    });
  }, []);

  const handleDeleteReview = useCallback(async () => {
    try {
      updateState({ isDeleting: true });
      const result = await deleteReview(reviewToDelete.id);

      if (result.success) {
        updateState({
          reviews: reviews.filter((r) => r.id !== reviewToDelete.id),
          deleteConfirmation: false,
          reviewToDelete: null,
          isDeleting: false,
        });
        showToast("Review deleted successfully", "success");
      } else {
        console.error("Error deleting review:", result.message);
        updateState({
          isDeleting: false,
          deleteConfirmation: false,
          error: result.message || "Failed to delete review",
        });
      }
    } catch (error) {
      console.error("Failed to delete review:", error);
      updateState({
        isDeleting: false,
        deleteConfirmation: false,
        error: "An unexpected error occurred while deleting review",
      });
    }
  }, [reviews, reviewToDelete, showToast]);

  const handleCancelDelete = useCallback(() => {
    updateState({
      deleteConfirmation: false,
      reviewToDelete: null,
    });
  }, []);

  const onSubmitReview = useCallback(
    async (data) => {
      if (selectedRating === 0) {
        alert("Please select a rating");
        return;
      }

      try {
        updateState({ loading: true });

        if (isEditMode && currentReview) {
          const reviewData = {
            carModel: data.carModel,
            content: data.reviewContent,
            rating: selectedRating,
          };

          const result = await updateReview(currentReview.id, reviewData);

          if (result.success) {
            closeReviewForm();
            fetchReviews();
            showToast("Review updated successfully", "success");
          } else {
            updateState({ loading: false });
            console.error("Error updating review:", result.message);
            showToast(result.message || "Failed to update review", "error");
          }
        } else {
          const reviewData = {
            carModel: data.carModel,
            content: data.reviewContent,
            rating: selectedRating,
          };

          const result = await createReview(reviewData);

          if (result.success) {
            closeReviewForm();
            fetchReviews();
            showToast("Review submitted successfully", "success");
          } else {
            updateState({ loading: false });
            console.error("Error creating review:", result.message);
            showToast(result.message || "Failed to submit review", "error");
          }
        }
      } catch (error) {
        updateState({ loading: false });
        console.error("Review submission failed:", error);
        showToast("An unexpected error occurred", "error");
      }
    },
    [
      isEditMode,
      currentReview,
      closeReviewForm,
      fetchReviews,
      selectedRating,
      showToast,
    ]
  );

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getPaginatedReviews = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return reviews.slice(startIndex, endIndex);
  };

  const totalPages = Math.ceil(reviews.length / ITEMS_PER_PAGE);

  return (
    <ReviewsPageContainer>
      <h1>Car Reviews</h1>

      <TabsContainer>
        <Tab
          active={activeTab === "all"}
          onClick={() => handleTabChange("all")}
        >
          All Reviews
        </Tab>
        <Tab active={activeTab === "my"} onClick={() => handleTabChange("my")}>
          My Reviews
        </Tab>
      </TabsContainer>

      <FilterContainer ref={filterRef}>
        <FilterButton onClick={() => updateState({ showFilter: !showFilter })}>
          <FontAwesomeIcon icon={faFilter} />
          {currentFilter === "newest"
            ? "Newest First"
            : currentFilter === "oldest"
            ? "Oldest First"
            : currentFilter === "highest"
            ? "Highest Rated"
            : "Lowest Rated"}
        </FilterButton>

        {showFilter && (
          <FilterDropdown>
            <div onClick={() => handleFilterChange("newest")}>Newest First</div>
            <div onClick={() => handleFilterChange("oldest")}>Oldest First</div>
            <div onClick={() => handleFilterChange("highest")}>
              Highest Rated
            </div>
            <div onClick={() => handleFilterChange("lowest")}>Lowest Rated</div>
          </FilterDropdown>
        )}

        <AddReviewButton onClick={() => openReviewForm()}>
          <FontAwesomeIcon icon={faPlus} />
          Write a Review
        </AddReviewButton>
      </FilterContainer>

      {loading ? (
        <Spinner />
      ) : error ? (
        <ErrorContainer error={error} onRetry={fetchReviews} />
      ) : (
        <ReviewsContainer>
          {getPaginatedReviews().length > 0 ? (
            getPaginatedReviews().map((review) => (
              <ReviewCard key={review.id}>
                <ReviewCardHeader>
                  <UserInfo>
                    <Avatar>
                      {review.userAvatar ? (
                        <img src={review.userAvatar} alt={review.userName} />
                      ) : (
                        <FontAwesomeIcon icon={faUser} />
                      )}
                    </Avatar>
                    <div>
                      <UserName>{review.userName}</UserName>
                      <CarModel>
                        <FontAwesomeIcon icon={faCar} />
                        {review.carModel}
                      </CarModel>
                    </div>
                  </UserInfo>
                  <RatingContainer>
                    <StarRating rating={review.rating} />
                  </RatingContainer>
                </ReviewCardHeader>

                <ReviewCardContent>
                  <ReviewContent expanded={expandedReviews[review.id]}>
                    {review.content}
                  </ReviewContent>

                  {review.content.length > 200 && (
                    <ExpandButton onClick={() => toggleExpand(review.id)}>
                      {expandedReviews[review.id] ? "Show less" : "Read more"}
                    </ExpandButton>
                  )}

                  <Timestamp>
                    {review.updatedAt
                      ? `Updated: ${formatDate(review.updatedAt)}`
                      : `Posted: ${formatDate(review.createdAt)}`}
                  </Timestamp>

                  <ReviewActions
                    review={review}
                    onEdit={openReviewForm}
                    onDelete={confirmDelete}
                    activeTab={activeTab}
                  />
                </ReviewCardContent>
              </ReviewCard>
            ))
          ) : (
            <EmptyReviews>
              {activeTab === "all"
                ? "No reviews available yet. Be the first to share your experience!"
                : "You haven't written any reviews yet. Share your experience with other users!"}
            </EmptyReviews>
          )}

          {reviews.length > ITEMS_PER_PAGE && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              itemsPerPage={ITEMS_PER_PAGE}
              siblingCount={1}
            />
          )}
        </ReviewsContainer>
      )}

      {isFormOpen && (
        <ReviewFormOverlay>
          <ReviewFormContainer>
            <ReviewForm onSubmit={handleSubmit(onSubmitReview)}>
              <FormHeader>
                <h2>{isEditMode ? "Edit Your Review" : "Write a Review"}</h2>
                <CloseButton onClick={closeReviewForm}>
                  <FontAwesomeIcon icon={faTimes} />
                </CloseButton>
              </FormHeader>

              <FormGroup>
                <Label htmlFor="carModel">Car Model</Label>
                <Input
                  id="carModel"
                  type="text"
                  placeholder="Enter car model..."
                  {...register("carModel", {
                    required: "Car model is required",
                  })}
                />
                {errors.carModel && (
                  <span className="error">{errors.carModel.message}</span>
                )}
              </FormGroup>

              <FormGroup>
                <Label htmlFor="rating">Rating</Label>
                <RatingContainer>
                  <StarRating
                    rating={selectedRating}
                    interactive={true}
                    onRatingChange={handleRatingChange}
                  />
                  <input
                    type="hidden"
                    name="rating"
                    value={selectedRating}
                    {...register("rating")}
                  />
                </RatingContainer>
                {selectedRating === 0 && (
                  <span className="error">Please select a rating</span>
                )}
              </FormGroup>

              <FormGroup>
                <Label htmlFor="reviewContent">Your Review</Label>
                <TextArea
                  id="reviewContent"
                  rows="5"
                  placeholder="Share your experience with this car..."
                  {...register("reviewContent", {
                    required: "Review content is required",
                    minLength: {
                      value: 10,
                      message: "Review must be at least 10 characters",
                    },
                  })}
                />
                {errors.reviewContent && (
                  <span className="error">{errors.reviewContent.message}</span>
                )}
              </FormGroup>

              <SubmitButton type="submit">
                {isEditMode ? "Update Review" : "Submit Review"}
              </SubmitButton>
            </ReviewForm>
          </ReviewFormContainer>
        </ReviewFormOverlay>
      )}

      {deleteConfirmation && (
        <ConfirmationModal
          title="Delete Review"
          message="Are you sure you want to delete this review? This action cannot be undone."
          onConfirm={handleDeleteReview}
          onCancel={handleCancelDelete}
          isProcessing={isDeleting}
          confirmText="Delete"
          processingText="Deleting..."
        />
      )}

      {toast.visible && (
        <Toast
          message={toast.message}
          type={toast.type}
          duration={3000}
          onClose={hideToast}
        />
      )}
    </ReviewsPageContainer>
  );
};

export default Reviews;
