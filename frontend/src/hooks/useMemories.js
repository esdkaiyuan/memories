import { useEffect } from 'react';
import useMemoryStore from '../store/memoryStore';

const useMemories = () => {
  const {
    memories,
    currentMemory,
    loading,
    error,
    filters,
    fetchMemories,
    fetchMemory,
    createMemory,
    updateMemory,
    deleteMemory,
    setFilters,
    clearCurrentMemory,
    clearError
  } = useMemoryStore();

  // 初始加载
  useEffect(() => {
    fetchMemories();
  }, [fetchMemories]);

  // 根据筛选条件重新获取
  useEffect(() => {
    const params = {};
    if (filters.category) params.category = filters.category;
    if (filters.mood) params.mood = filters.mood;
    if (filters.from) params.from = filters.from;
    if (filters.to) params.to = filters.to;
    fetchMemories(params);
  }, [filters, fetchMemories]);

  return {
    memories,
    currentMemory,
    loading,
    error,
    filters,
    fetchMemories,
    fetchMemory,
    createMemory,
    updateMemory,
    deleteMemory,
    setFilters,
    clearCurrentMemory,
    clearError
  };
};

export default useMemories;