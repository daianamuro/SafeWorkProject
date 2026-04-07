import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

// URL base de la API
const BASE_URL = 'https://save-work-utr-project.onrender.com';

const api = axios.create({
  baseURL: BASE_URL,
});


// Obtener token
const getToken = async () => {
  return await AsyncStorage.getItem('token');
};

// Eliminar token
const removeToken = async () => {
  await AsyncStorage.removeItem('token');
};


// REQUEST: agrega token automáticamente
api.interceptors.request.use(
  async (config) => {
    try {
      const token = await getToken();

      if (token) {
        config.headers.Authorization = `Bearer ${token}`; 
      }

      return config;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  (error) => Promise.reject(error)
);


// RESPONSE: detectar token expirado
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error?.response?.status === 401) {
      console.log("Token expirado → cerrando sesión");

      await removeToken();
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
  createReport: '/api/createReports',
  updateReport: (id) => `/api/updateReport/${id}`,
  deleteReport: (id) => `/api/deleteReport/${id}`,

};

export default api;