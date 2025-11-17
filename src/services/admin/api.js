import axios from "axios";

const BASE_URL = "https://cargenie-server-7i77.onrender.com";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
};

const setCookie = (name, value, days = 1) => {
  const expires = new Date(
    Date.now() + days * 24 * 60 * 60 * 1000
  ).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/; secure; samesite=strict`;
};

const deleteCookie = (name) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; secure; samesite=strict`;
};

api.interceptors.request.use(
  (config) => {
    const token = getCookie("adminToken");

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    if (config.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => {
    // If the response includes a token, update it
    if (response.data && response.data.token) {
      setCookie("adminToken", response.data.token);
      api.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.token}`;
    }
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      deleteCookie("adminToken");
      deleteCookie("adminUser");
      localStorage.removeItem("adminUser");
      delete api.defaults.headers.common["Authorization"];

      if (
        window.location.pathname.includes("/admin") &&
        !window.location.pathname.includes("/admin/login") &&
        !window.location.pathname.includes("/admin/register")
      ) {
        window.location.href = "/admin/login";
      }
    }
    return Promise.reject(error);
  }
);

export const initiateAdminRegistration = async (email) => {
  try {
    const response = await api.post("/api/admin/register/initiate", { email });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const verifyAdminOtp = async (email, otp, adminData) => {
  try {
    const response = await api.post("/api/admin/register/verify", {
      email,
      otp,
      adminData,
    });
    if (response.data.token) {
      setCookie("adminToken", response.data.token);
      setCookie("adminUser", JSON.stringify(response.data.user));
      api.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.token}`;
    }
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Admin OTP verification failed"
    );
  }
};

export const adminLogin = async (email, password) => {
  try {
    const response = await api.post("/api/admin/login", { email, password });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const verifyAdminLoginOtp = async (email, otp) => {
  try {
    const response = await api.post("/api/admin/login/verify", {
      email,
      otp,
    });

    if (response.data.token) {
      setCookie("adminToken", response.data.token);

      localStorage.setItem("adminToken", response.data.token);

      if (response.data.admin) {
        setCookie("adminUser", JSON.stringify(response.data.admin));
        localStorage.setItem("adminUser", JSON.stringify(response.data.admin));
      }

      api.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.token}`;
    }

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Admin login verification failed"
    );
  }
};

export const resendAdminOTP = async (email) => {
  try {
    const response = await api.post("/api/admin/resend-otp", { email });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const initiateAdminForgotPassword = async (email) => {
  try {
    const response = await api.post("/api/admin/forgot-password", { email });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const verifyAdminForgotPasswordOtp = async (email, otp) => {
  try {
    const response = await api.post("/api/admin/forgot-password/verify", {
      email,
      otp,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const resetAdminPassword = async (email, otp, newPassword) => {
  try {
    const response = await api.post("/api/admin/reset-password", {
      email,
      otp,
      newPassword,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const validateAdminToken = async () => {
  try {
    let token = getCookie("adminToken");

    if (!token) {
      token = localStorage.getItem("adminToken");
    }

    if (!token) {
      throw new Error("No admin token found");
    }

    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const response = await api.get("/api/admin/validate");

    if (response.data.success) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      setCookie("adminToken", token);
      localStorage.setItem("adminToken", token);

      if (response.data.admin) {
        localStorage.setItem("adminUser", JSON.stringify(response.data.admin));
      }
    }

    return response.data;
  } catch (error) {
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      deleteCookie("adminToken");
      deleteCookie("adminUser");
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminUser");
      delete api.defaults.headers.common["Authorization"];
    }
    throw new Error(
      error.response?.data?.message || "Admin token validation failed"
    );
  }
};
export const adminLogout = async () => {
  try {
    const response = await api.post("/api/admin/logout");
    if (response.data.success) {
      deleteCookie("adminToken");
    }
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createBrand = async (brandData) => {
  try {
    const response = await api.post("/api/brands", brandData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateBrand = async (id, brandData) => {
  try {
    const response = await api.put(`/api/brands/${id}`, brandData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteBrand = async (id) => {
  try {
    const response = await api.delete(`/api/brands/${id}`);
    return response.data;
  } catch (error) {
    throw error;
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

export const getAllBrands = async (page = 1, limit = 10) => {
  try {
    const response = await api.get(`/api/brands?page=${page}&limit=${limit}`);
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

export const getAllCars = async (page = 1, limit = 10, filters = {}) => {
  try {
    let queryString = `page=${page}&limit=${limit}`;

    if (filters.brand) queryString += `&brand=${filters.brand}`;
    if (filters.category) queryString += `&category=${filters.category}`;
    if (filters.fuelType) queryString += `&fuelType=${filters.fuelType}`;
    if (filters.transmission)
      queryString += `&transmission=${filters.transmission}`;

    const response = await api.get(`/api/cars?${queryString}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createCar = async (carData) => {
  try {
    const response = await api.post("/api/cars", carData);
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

export const updateCarBasicInfo = async (id, basicInfoData) => {
  try {
    const response = await api.put(`/api/cars/${id}/basic-info`, basicInfoData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateCarPerformance = async (id, performanceData) => {
  try {
    const response = await api.put(
      `/api/cars/${id}/performance`,
      performanceData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateCarDimensions = async (id, dimensionsData) => {
  try {
    const response = await api.put(
      `/api/cars/${id}/dimensions`,
      dimensionsData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateCarFeatures = async (id, featuresData) => {
  try {
    const response = await api.put(`/api/cars/${id}/features`, featuresData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addCarImages = async (id, imagesFormData) => {
  try {
    const response = await api.put(`/api/cars/${id}/images`, imagesFormData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteCarImage = async (id, imageUrl) => {
  try {
    const response = await api.delete(`/api/cars/${id}/image`, {
      data: { imageUrl },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getCarById = async (id) => {
  try {
    const response = await api.get(`/api/cars/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const prepareImagesFormData = (images) => {
  const formData = new FormData();

  if (Array.isArray(images)) {
    images.forEach((image) => {
      formData.append("images", image);
    });
  } else if (images) {
    formData.append("images", images);
  }

  return formData;
};

export const deleteCar = async (id) => {
  try {
    const response = await api.delete(`/api/cars/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default api;
