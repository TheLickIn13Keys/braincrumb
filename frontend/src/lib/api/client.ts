
import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { config, API_URL } from '../utils/config';

interface ApiClientConfig {
  onError?: (error: ApiError) => void;
  onUnauthorized?: () => void;
  baseURL?: string;
  timeout?: number;
}

export interface ApiErrorResponse {
  message: string;
  code?: string;
}

export interface ApiError {
  message: string;
  status: number;
  code?: string;
}

class ApiClient {
  private client: AxiosInstance;

  constructor(clientConfig: ApiClientConfig = {}) {
    this.client = axios.create({
      baseURL: clientConfig.baseURL || API_URL,
      withCredentials: true,
      timeout: clientConfig.timeout || config.api.timeout,
    });

    this.setupInterceptors(clientConfig);
  }

  private setupInterceptors(clientConfig: ApiClientConfig) {
    
    this.client.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    
    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError<ApiErrorResponse>) => {
        const apiError: ApiError = {
          message: error.response?.data?.message || 'An unexpected error occurred',
          status: error.response?.status || 500,
        };

        if (error.response?.data?.code) {
          apiError.code = error.response.data.code;
        }

        if (error.response?.status === 401) {
          clientConfig.onUnauthorized?.();
        }

        clientConfig.onError?.(apiError);
        return Promise.reject(apiError);
      }
    );
  }

  async get<T>(url: string): Promise<T> {
    const response: AxiosResponse<T> = await this.client.get(url);
    return response.data;
  }

  async post<T>(url: string, data?: any): Promise<T> {
    const response: AxiosResponse<T> = await this.client.post(url, data);
    return response.data;
  }

  async put<T>(url: string, data?: any): Promise<T> {
    const response: AxiosResponse<T> = await this.client.put(url, data);
    return response.data;
  }

  async delete<T>(url: string): Promise<T> {
    const response: AxiosResponse<T> = await this.client.delete(url);
    return response.data;
  }
}


export const apiClient = new ApiClient({
  baseURL: API_URL,
  timeout: config.api.timeout,
  onUnauthorized: () => {
    window.location.href = '/login';
  },
});


export const endpoints = config.api.endpoints;