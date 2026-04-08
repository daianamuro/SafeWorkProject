import axios from 'axios';
import { eliminarToken, getToken, guardarToken } from '../helpers/getToken';

// URL base de la API
const BASE_URL = 'https://save-work-utr-project.onrender.com';

// Instancia de axios
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json"
  }
});

// TOKEN FUNCTIONS

// Get token
const getStoredToken = async () => {
  try {
    const token = await getToken('JWTToken');
    return token;
  } catch (error) {
    console.log("Error getting token:", error);
    return null;
  }
};

// Save token
export const saveToken = async (token) => {
  try {
    await guardarToken('JWTToken', token);
    console.log("Token saved successfully");
  } catch (error) {
    console.log("Error saving token:", error);
  }
};

// Delete token
export const removeToken = async () => {
  try {
    await eliminarToken('JWTToken');
    console.log("Token deleted");
  } catch (error) {
    console.log("Error deleting token:", error);
  }
};

// INTERCEPTOR REQUEST

api.interceptors.request.use(
  async (config) => {
    try {
      const token = await getStoredToken();

      console.log("Token sent:", token);

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    } catch (error) {
      console.log("Request interceptor error:", error);
      return Promise.reject(error);
    }
  },
  (error) => Promise.reject(error)
);

// INTERCEPTOR RESPONSE

api.interceptors.response.use(
  (response) => response,
  async (error) => {

    console.log("STATUS:", error?.response?.status);
    console.log("DATA:", error?.response?.data);

    // Expired or invalid token
    if (error?.response?.status === 401) {
      console.log("Expired token -> logging out");

      await removeToken();

      // You could redirect to login here if needed
    }

    return Promise.reject(error);
  }
);

// ENDPOINTS

export const ENDPOINTS = {

  // AUTH
  register: '/api/usuario/register',
  login: '/api/usuario/login',

  // REPORTES
  getAllReports: '/api/getAllReports',
  getReportById: (id) => `/api/getReport/${id}`,
  createReport: '/api/createReports', // 
  updateReport: (id) => `/api/updateReport/${id}`,
  deleteReport: (id) => `/api/deleteReport/${id}`,
};

export default api;
