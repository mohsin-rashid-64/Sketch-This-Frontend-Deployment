import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api.sketch-this.com/",
  // timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptors for requests and responses
axiosInstance.interceptors.request.use((config) => {
  // Add auth token if required
  const token = localStorage.getItem("jwt");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Check if the error is due to token expiration
      if (
        error.response.status === 401 &&
        error.response.data.msg === "Token has expired"
      ) {
        alert("Session expired. Please log in again."); // Show alert or set state for the message
        localStorage.removeItem("token"); // Remove expired token
        window.location.href = "/loginPage"; // Redirect to login page
      } else if (error.response.status === 403) {
        alert("You are not authorized to perform this task");
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
