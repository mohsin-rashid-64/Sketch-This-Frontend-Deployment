import { useState } from 'react';
import axiosInstance from '../api/axiosInstance';

export const useCreate = (endpoint) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const create = async (payload) => {
    setLoading(true);
    setError(null);

    try {
      const { data } = await axiosInstance.post(endpoint, payload);
      return data; // Return response data
    } catch (err) {
      setError(err.message || 'Unknown error');
      console.error("Error fetching dataXXX", err);
      throw err; // Rethrow the error for further handling
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, create };
};
