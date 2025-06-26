const API_URL = 'http://localhost:3001/api';

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
  const response = await fetch(`${API_URL}/users/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({ username }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to create user');
  }

  return response.json();
};

export const generateWireframe = async (prompt: string) => {
  const token = getToken();
  const response = await fetch(`${API_URL}/features/analyze/`, {
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
    throw new Error(error.error || 'Failed to generate wireframe');
  }

  return response.json();
};

export const fetchPortfolioTechnologies = async () => {
  const response = await fetch(`${API_URL}/portfolio-technologies/`);
  if (!response.ok) {
    throw new Error('Failed to fetch portfolio technologies');
  }
  return response.json();
}; 