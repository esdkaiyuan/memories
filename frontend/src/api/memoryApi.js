import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// 回忆 API
export const memoryApi = {
  // 获取所有回忆
  getAll: (params = {}) => api.get('/memories', { params }),

  // 获取单个回忆
  getById: (id) => api.get(`/memories/${id}`),

  // 创建回忆
  create: (data) => api.post('/memories', data),

  // 更新回忆
  update: (id, data) => api.put(`/memories/${id}`, data),

  // 删除回忆
  delete: (id) => api.delete(`/memories/${id}`)
};

// 上传 API
export const uploadApi = {
  // 上传文件
  upload: (memoryId, file) => {
    const formData = new FormData();
    formData.append('memory_id', memoryId);
    formData.append('file', file);
    return api.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },

  // 删除媒体文件
  delete: (id) => api.delete(`/upload/${id}`)
};

export default api;