import axios from "axios";

const BASE_URL = "https://cargenie-server-4ftd.onrender.com";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

const setCookie = (name, value, days = 1) => {
  const expires = new Date(
    Date.now() + days * 24 * 60 * 60 * 1000
  ).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/; secure; samesite=strict`;
};

const deleteCookie = (name) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; secure; samesite=strict`;
};

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
};

api.interceptors.request.use(
  (config) => {
    const token = getCookie("carGenie_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      deleteCookie("carGenie_token");
      deleteCookie("carGenie_user");
      delete api.defaults.headers.common["Authorization"];
    }
    return Promise.reject(error);
  }
);

export const initiateRegistration = async (email) => {
  try {
    const response = await api.post("/api/auth/initiate-registration", {
      email,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Registration failed");
  }
};

export const verifyRegistrationOTP = async (email, otp, userData) => {
  try {
    const response = await api.post("/api/auth/verify-otp", {
      email,
      otp,
      userData,
    });
    if (response.data.token) {
      setCookie("carGenie_token", response.data.token);
      setCookie("carGenie_user", JSON.stringify(response.data.user));
      api.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.token}`;
    }
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "OTP verification failed");
  }
};

export const initiateLogin = async (email, password) => {
  try {
    const response = await api.post("/api/auth/login", { email, password });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Login failed");
  }
};

export const verifyLoginOTP = async (email, otp) => {
  try {
    const response = await api.post("/api/auth/verify-login-otp", {
      email,
      otp,
    });
    if (response.data.token) {
      setCookie("carGenie_token", response.data.token);
      setCookie("carGenie_user", JSON.stringify(response.data.user));
      api.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.token}`;
    }
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Login verification failed"
    );
  }
};

export const resendOTP = async (email) => {
  try {
    const response = await api.post("/api/auth/resend-otp", { email });
    return response.data;
  } catch (error) {
    if (error.response?.status === 429) {
      return {
        success: false,
        message: "Please wait 1 minute before requesting another OTP",
      };
    }
    return {
      success: false,
      message: error.response?.data?.message || "Failed to send OTP",
    };
  }
};

export const initiateForgotPassword = async (email) => {
  try {
    const response = await api.post("/api/auth/initiate-forgot-password", {
      email,
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Password reset request failed"
    );
  }
};

export const verifyForgotPasswordOTP = async (email, otp) => {
  try {
    const response = await api.post("/api/auth/verify-forgot-password-otp", {
      email,
      otp,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "OTP verification failed");
  }
};

export const logout = async () => {
  try {
    const response = await api.post("/api/auth/logout");

    // Clear auth cookies
    deleteCookie("carGenie_token");
    deleteCookie("carGenie_user");

    // Also remove Authorization header from future requests
    delete api.defaults.headers.common["Authorization"];

    return response.data;
  } catch (error) {
    // Even if the server request fails, still clear cookies
    deleteCookie("carGenie_token");
    deleteCookie("carGenie_user");
    delete api.defaults.headers.common["Authorization"];

    throw (
      error.response?.data || {
        success: false,
        message: "Network error while logging out",
      }
    );
  }
};

// Function to check if user is authenticated
export const isAuthenticated = () => {
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return null;
  };

  const token = getCookie("carGenie_token");
  return !!token; // Returns true if token exists, false otherwise
};

export const resetPassword = async (email, otp, newPassword) => {
  try {
    const response = await api.post("/api/auth/reset-password", {
      email,
      otp,
      newPassword,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Password reset failed");
  }
};

export const getUserProfile = async () => {
  try {
    const response = await api.get("/api/user/profile");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateProfile = async (username, bio) => {
  try {
    const response = await api.put("/api/user/profile", { username, bio });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateProfileWithImage = async (formData) => {
  try {
    const response = await api.put("/api/user/profile", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const initiatePasswordChange = async (currentPassword) => {
  try {
    const response = await api.post("/api/user/password/initiate", {
      currentPassword,
    });
    return response.data;
  } catch (error) {
    return {
      success: false,
      message:
        error.response?.data?.message || "Failed to initiate password change",
    };
  }
};

export const verifyAndChangePassword = async (otp, newPassword) => {
  try {
    const response = await api.post("/api/user/password/verify", {
      otp,
      newPassword,
    });
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Failed to verify OTP",
    };
  }
};

export const initiateAccountDeletion = async (password) => {
  try {
    const response = await api.post("/api/user/account/delete/initiate", {
      password,
    });
    return response.data;
  } catch (error) {
    return {
      success: false,
      message:
        error.response?.data?.message || "Failed to initiate account deletion",
    };
  }
};

export const verifyAndDeleteAccount = async (otp) => {
  try {
    const response = await api.post("/api/user/account/delete/verify", {
      otp,
    });
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Failed to delete account",
    };
  }
};

export const resendAuthenticatedOTP = async (actionType) => {
  try {
    const response = await api.post("/api/user/otp/resend", {
      actionType,
    });
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Failed to resend OTP";
    return {
      success: false,
      message: errorMessage,
    };
  }
};

export const updateEmail = async (email) => {
  try {
    const response = await api.post("/api/user/email/update", { email });
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Failed to update email",
    };
  }
};

export const verifyEmailOTP = async (otp) => {
  try {
    const response = await api.post("/api/user/email/verify", { otp });
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Failed to verify email",
    };
  }
};

export const resendEmailOTP = async () => {
  try {
    const response = await api.post("/api/user/email/resend-otp");
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Failed to resend code";
    return {
      success: false,
      message: errorMessage,
    };
  }
};

export const validateToken = async () => {
  try {
    const token = getCookie("carGenie_token");
    if (!token) {
      throw new Error("No token found");
    }

    const response = await api.get("/api/auth/validate-token");
    return response.data;
  } catch (error) {
    deleteCookie("carGenie_token");
    deleteCookie("carGenie_user");
    delete api.defaults.headers.common["Authorization"];
    throw new Error(error.response?.data?.message || "Token validation failed");
  }
};

export const getBrandNames = async () => {
  try {
    const response = await api.get("/api/brands/names");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getBrandDetails = async (id) => {
  try {
    const response = await api.get(`/api/brands/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getCars = async () => {
  try {
    const response = await api.get("/api/cars/all");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getCarDetails = async (id) => {
  try {
    const response = await api.get(`/api/cars/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserFavourites = async () => {
  const response = await api.get("/api/favourites");
  return response.data;
};

export const addToFavourites = async (carData) => {
  const response = await api.post("/api/favourites", {
    carId: carData.carId,
    carModel: carData.carModel,
    brand: carData.brand,
    year: carData.year,
    price: carData.price,
    image: carData.image,
    description: carData.description,
  });
  return response.data;
};

export const removeFromFavourites = async (favoriteId) => {
  const response = await api.delete(`/api/favourites/${favoriteId}`);
  return response.data;
};

export const removeFromFavouritesByCarId = async (carId) => {
  const response = await api.delete(`/api/favourites/car/${carId}`);
  return response.data;
};

export const checkFavouritestatus = async (carId) => {
  const response = await api.get(`/api/favourites/check/${carId}`);
  return response.data;
};

export const getAllReviews = async () => {
  try {
    const response = await api.get("/api/reviews");
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, message: "Network error" };
  }
};

export const getUserReviews = async (userId) => {
  try {
    const response = await api.get(`/api/reviews/user/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, message: "Network error" };
  }
};

export const getMyReviews = async () => {
  try {
    const response = await api.get("/api/reviews/my-reviews");
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, message: "Network error" };
  }
};

export const createReview = async (reviewData) => {
  try {
    const response = await api.post("/api/reviews", reviewData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, message: "Network error" };
  }
};

export const updateReview = async (reviewId, reviewData) => {
  try {
    const response = await api.put(`/api/reviews/${reviewId}`, reviewData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, message: "Network error" };
  }
};

export const deleteReview = async (reviewId) => {
  try {
    const response = await api.delete(`/api/reviews/${reviewId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, message: "Network error" };
  }
};

export const searchBrands = async (query) => {
  try {
    const response = await api.get(
      `/api/search/brands?query=${encodeURIComponent(query)}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const searchCars = async (query) => {
  try {
    const response = await api.get(
      `/api/search/cars?query=${encodeURIComponent(query)}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const combinedSearch = async (query) => {
  try {
    const response = await api.get(
      `/api/search/combined?query=${encodeURIComponent(query)}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const advancedSearch = async (params) => {
  try {
    const queryParams = new URLSearchParams();

    if (params.query) queryParams.append("query", params.query);
    if (params.brand) queryParams.append("brand", params.brand);
    if (params.category) queryParams.append("category", params.category);
    if (params.minPrice) queryParams.append("minPrice", params.minPrice);
    if (params.maxPrice) queryParams.append("maxPrice", params.maxPrice);
    if (params.fuelType) queryParams.append("fuelType", params.fuelType);
    if (params.transmission)
      queryParams.append("transmission", params.transmission);
    if (params.sortBy) queryParams.append("sortBy", params.sortBy);

    const response = await api.get(
      `/api/search/advanced?${queryParams.toString()}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
