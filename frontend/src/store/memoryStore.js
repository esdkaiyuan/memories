import { create } from 'zustand';
import { memoryApi } from '../api/memoryApi';

const useMemoryStore = create((set, get) => ({
  // 状态
  memories: [],
  currentMemory: null,
  loading: false,
  error: null,
  filters: {
    category: '',
    mood: '',
    from: '',
    to: ''
  },

  // 获取所有回忆
  fetchMemories: async (params = {}) => {
    set({ loading: true, error: null });
    try {
      const response = await memoryApi.getAll(params);
      set({ memories: response.data.data.memories, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // 获取单个回忆
  fetchMemory: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await memoryApi.getById(id);
      set({ currentMemory: response.data.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // 创建回忆
  createMemory: async (data) => {
    set({ loading: true, error: null });
    try {
      const response = await memoryApi.create(data);
      const newMemory = response.data.data;
      set(state => ({
        memories: [...state.memories, newMemory],
        loading: false
      }));
      return newMemory;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  // 更新回忆
  updateMemory: async (id, data) => {
    set({ loading: true, error: null });
    try {
      const response = await memoryApi.update(id, data);
      const updatedMemory = response.data.data;
      set(state => ({
        memories: state.memories.map(m => m.id === id ? updatedMemory : m),
        currentMemory: updatedMemory,
        loading: false
      }));
      return updatedMemory;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  // 删除回忆
  deleteMemory: async (id) => {
    set({ loading: true, error: null });
    try {
      await memoryApi.delete(id);
      set(state => ({
        memories: state.memories.filter(m => m.id !== id),
        currentMemory: state.currentMemory?.id === id ? null : state.currentMemory,
        loading: false
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  // 设置筛选条件
  setFilters: (filters) => {
    set({ filters });
  },

  // 清除当前回忆
  clearCurrentMemory: () => {
    set({ currentMemory: null });
  },

  // 清除错误
  clearError: () => {
    set({ error: null });
  }
}));

export default useMemoryStore;