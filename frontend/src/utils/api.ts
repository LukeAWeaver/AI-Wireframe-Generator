import { API_BASE_URL, debugLog, errorLog } from './config';

// Local copy of IPortfolioTechnology for type safety
interface IPortfolioTechnology {
  id: number;
  category: string;
  name: string;
  description: string;
}

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
  const token = getToken();
  debugLog('Creating user:', username);
  
  const response = await fetch(`${API_BASE_URL}/users/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({ username }),
  });

  if (!response.ok) {
    const error = await response.json() as IAPIError;
    errorLog(error, 'createUser');
    throw new Error(error.error || 'Failed to create user');
  }

  const user: IUserResponse = await response.json() as IUserResponse;
  return user;
};

export const generateWireframe = async (prompt: string) => {
  const token = getToken();
  debugLog('Generating wireframe for prompt:', prompt);
  
  const response = await fetch(`${API_BASE_URL}/features/analyze/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({
      feature: prompt,
      complexity: 'medium',
      priority: 'medium',
    }),
  });

  if (!response.ok) {
    const error: IAPIError = await response.json() as IAPIError;
    errorLog(error, 'generateWireframe');
    throw new Error(error.error || 'Failed to generate wireframe');
  }

  const result = await response.json() as IAPIError;
  return result;
};

export const fetchPortfolioTechnologies = async () => {
  debugLog('Fetching portfolio technologies');
  
  const response = await fetch(`${API_BASE_URL}/portfolio-technologies/`);
  if (!response.ok) {
    errorLog('Failed to fetch portfolio technologies', 'fetchPortfolioTechnologies');
    throw new Error('Failed to fetch portfolio technologies');
  }
  const technologies: IPortfolioTechnology[] = await response.json() as IPortfolioTechnology[];
  return technologies;
}; 