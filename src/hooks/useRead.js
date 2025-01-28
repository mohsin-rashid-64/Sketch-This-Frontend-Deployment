import { useState } from "react";
import axiosInstance from "../api/axiosInstance";

export const useRead = (endpoint) => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to trigger the API call manually with params
  const fetchData = async (options = {}) => {
    setLoading(true);
    setError(null); // Clear previous errors
  
    try {  
      const res = await axiosInstance.get(endpoint, {
        params: options // Pass options as query parameters
      });
  
      setResponse(res.data); // Store response data  
      return res.data; // Explicitly return the response data
    } catch (err) {
      setError(err.message || "Unknown error");
      console.error("Error fetching data", err);
      throw err; // Throw the error to allow the calling function to handle it
    } finally {
      setLoading(false);
    }
  };
  

  return { response, loading, error, fetchData };
};
