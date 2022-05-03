import axios, { AxiosRequestConfig } from 'axios';
import { AuthResponce } from '../models/response/AuthResponce';

export const API_URL = 'http://localhost:5000/api';

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

$api.interceptors.request.use((config : AxiosRequestConfig) : AxiosRequestConfig => {
  (config.headers ??= {}).Authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
});

$api.interceptors.response.use(
  (confirm) => { return confirm },
  async (error) => {
    const originRequest = error.config
    try {
      if (error.response.status === 401) {
        const responce = await axios.get<AuthResponce>(`${API_URL}/refresh`, {
            withCredentials: true,
            });
          localStorage.setItem('token', responce.data.accessToken);
          return $api.request(originRequest)
        }
    } catch (error : any) {
      console.log('error', error?.responce?.data?.message);
    }
  }
);

export default $api;
