import { useState } from 'react';
import axiosInstance from '../api/axiosInstance';

export const useDelete = (endpoint) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const remove = async (id) => {
    setLoading(true);
    try {
      const response = await axiosInstance.delete(`${endpoint}/${id}`);
      return response.data;
    } catch (err) {
      setError((err).message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { remove, loading, error };
};