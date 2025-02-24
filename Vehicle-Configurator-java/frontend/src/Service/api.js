import axios from 'axios';

const api = axios.create({
  baseURL: 'http://www.vconfig.site/api', 

  
});

api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
