import { API_BASE_URL, debugLog, errorLog } from './config';

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

export const createUser = async (username: string) => {
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
    const error = await response.json();
    errorLog(error, 'createUser');
    throw new Error(error.error || 'Failed to create user');
  }

  return response.json();
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
    const error = await response.json();
    errorLog(error, 'generateWireframe');
    throw new Error(error.error || 'Failed to generate wireframe');
  }

  return response.json();
};

export const fetchPortfolioTechnologies = async () => {
  debugLog('Fetching portfolio technologies');
  
  const response = await fetch(`${API_BASE_URL}/portfolio-technologies/`);
  if (!response.ok) {
    errorLog('Failed to fetch portfolio technologies', 'fetchPortfolioTechnologies');
    throw new Error('Failed to fetch portfolio technologies');
  }
  return response.json();
}; 