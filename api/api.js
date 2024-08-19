import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigationContext } from '../context/NavigationContext';

const API_BASE_URL = "https://obbaramarket-backend.onrender.com/api/obbaramarket";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true 
});

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    const { navigate } = useNavigationContext();

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const response = await api.post('/refresh-token');
        const { token } = response.data;

        await AsyncStorage.setItem('token', token);
        originalRequest.headers['Authorization'] = `Bearer ${token}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.error('Error al renovar el token', refreshError);
        navigate('SignInForm'); 
      }
    }

    return Promise.reject(error);
  }
);

export default api;
