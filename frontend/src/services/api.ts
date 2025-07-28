import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { API_BASE_URL, debugLog, errorLog } from '@utils/config';
import { WireframeNode } from 'features/WireframeGenerator/components/WireframeRenderer';

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

// Public API client (no auth interceptor)
const publicApiClient: AxiosInstance = axios.create({
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
  build_count?: number;
}

export interface IRegistrationResponse {
  access_token: string;
  refresh_token: string;
  user: {
    id: number;
    username: string;
    email: string;
  };
}

export const createUser = async (username: string): Promise<IUserResponse> => {
  debugLog('Creating user:', username);
  
  try {
    const response = await publicApiClient.post<IRegistrationResponse>('/auth/register/', { 
      username,
      email: `${username}@example.com`, // Generate a placeholder email
      password: 'tempPassword123!' // Generate a temporary password
    });
    
    // Store the access token if provided
    if (response.data.access_token) {
      setToken(response.data.access_token);
    }
    
    return {
      username: response.data.user.username,
      uuid: response.data.user.id.toString()
    };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data) {
      const errorData = error.response.data as IAPIError;
      errorLog(errorData, 'createUser');
      throw new Error(errorData.error || 'Failed to create user');
    }
    throw error;
  }
};

type WireframeComponentProps =
  | { type: 'Layout'; props?: { direction?: 'row' | 'column' } }
  | { type: 'AppBar'; props: { title: string; actions?: string[] } }
  | { type: 'Sidebar'; props: { items: string[] } }
  | { type: 'Main'; props?: undefined }
  | { type: 'Card'; props: { title: string } }
  | { type: 'Table'; props: { title: string; columns: string[] } }
  | { type: 'FloatingActionButton'; props: { icon: string; label?: string } };

export type IWireframeResponse = WireframeComponentProps & {
  children?: IWireframeResponse[];
};



export const generateWireframe = async (prompt: string): Promise<WireframeNode> => {
  debugLog('Generating wireframe for prompt:', prompt);
  
  try {
    const response = await apiClient.post<WireframeNode>('/features/analyze/', {
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

export const incrementBuildCount = async (username: string): Promise<IUserResponse> => {
  debugLog('Incrementing build count for user:', username);
  
  try {
    const response = await apiClient.post<IUserResponse>('/users/increment_build_count/', { 
      username 
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data) {
      const errorData = error.response.data as IAPIError;
      errorLog(errorData, 'incrementBuildCount');
      throw new Error(errorData.error || 'Failed to increment build count');
    }
    throw error;
  }
};

export const fetchPortfolioTechnologies = async (): Promise<IPortfolioTechnology[]> => {
  debugLog('Fetching portfolio technologies');
  
  try {
    const response = await publicApiClient.get<IPortfolioTechnology[]>('/portfolio-technologies/');
    return response.data;
  } catch (error) {
    errorLog('Failed to fetch portfolio technologies', 'fetchPortfolioTechnologies');
    throw new Error('Failed to fetch portfolio technologies');
  }
}; 