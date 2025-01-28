import { useState } from 'react';
import axiosInstance from '../api/axiosInstance';

export const usePatch = (endpoint) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const patch = async (payload) => {
    setLoading(true);
    setError(null);

    try {
      const { data } = await axiosInstance.patch(endpoint, payload);
      return data; // Return response data
    } catch (err) {
      setError(err.message || 'Unknown error');
      console.error("Error fetching data", err);
      throw err; // Rethrow the error for further handling
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, patch };
};
