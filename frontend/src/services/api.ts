import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { API_BASE_URL, debugLog, errorLog } from '@utils/config';

// Local copy of IPortfolioTechnology for type safety
interface IPortfolioTechnology {
  id: number;
  category: string;
  name: string;
  description: string;
}

// Create Axios instance with default configuration
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    errorLog(error, 'API Request');
    return Promise.reject(error);
  }
);

// Token management helpers
export function setToken(token: string) {
  localStorage.setItem('access_token', token);
}

export function getToken(): string | null {
  return localStorage.getItem('access_token');
}

export function removeToken() {
  localStorage.removeItem('access_token');
}

interface IAPIError {
  error?: string;
  [key: string]: unknown;
}

export interface IUserResponse {
  username: string;
  uuid: string;
}

export const createUser = async (username: string): Promise<IUserResponse> => {
  debugLog('Creating user:', username);
  
  try {
    const response = await apiClient.post<IUserResponse>('/users/', { username });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data) {
      const errorData = error.response.data as IAPIError;
      errorLog(errorData, 'createUser');
      throw new Error(errorData.error || 'Failed to create user');
    }
    throw error;
  }
};

export const generateWireframe = async (prompt: string) => {
  debugLog('Generating wireframe for prompt:', prompt);
  
  try {
    const response = await apiClient.post('/features/analyze/', {
      feature: prompt,
      complexity: 'medium',
      priority: 'medium',
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data) {
      const errorData = error.response.data as IAPIError;
      errorLog(errorData, 'generateWireframe');
      throw new Error(errorData.error || 'Failed to generate wireframe');
    }
    throw error;
  }
};

export const fetchPortfolioTechnologies = async (): Promise<IPortfolioTechnology[]> => {
  debugLog('Fetching portfolio technologies');
  
  try {
    const response = await apiClient.get<IPortfolioTechnology[]>('/portfolio-technologies/');
    return response.data;
  } catch (error) {
    errorLog('Failed to fetch portfolio technologies', 'fetchPortfolioTechnologies');
    throw new Error('Failed to fetch portfolio technologies');
  }
}; 