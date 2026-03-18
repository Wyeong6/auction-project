// src/api/axios.js
import axios from 'axios';

// 1. axios 인스턴스를 생성합니다.
const api = axios.create({
  baseURL: 'http://localhost:8080', // 서버 주소
});

// 2. 요청 인터셉터를 설정합니다.
api.interceptors.request.use(
  (config) => {
    // 요청이 나가기 직전에 localStorage에서 최신 토큰을 꺼내옵니다.
    const token = localStorage.getItem('token');
    
    if (token) {
      // 토큰이 있다면 헤더에 Bearer 토큰을 추가합니다.
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;