import axios from 'axios';

const API_BASE_URL = 'bffapi.biztel.ai:8080/api/auth';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const signUp = async (userData) => {
  const response = await api.post('/signup', userData);
  return response.data;
};

export const login = async (credentials) => {
  const response = await api.post('/login', credentials);
  return response.data;
};