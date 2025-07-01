import axios from 'axios';
import { API_BASE_URL, debugLog, errorLog } from '@utils/config';

// Only keep used interfaces and variables
// If none are used, leave the file empty

interface IFormField {
  type: 'text' | 'email' | 'number' | 'textarea' | 'checkbox' | 'select'
  label: string
  name: string
  required?: boolean
  options?: string[]
  placeholder?: string
}

interface IFormSchema {
  fields: IFormField[]
}

interface IFeatureRequest {
  feature: string
  complexity: string
  priority: string
}

// Create Axios instance for AI endpoints
const aiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const askGPT = async (data: IFeatureRequest): Promise<string> => {
  try {
    debugLog('Calling AI service with data:', data);
    
    const response = await aiClient.post<{ analysis: string }>('/analyze', data);
    return response.data.analysis;
  } catch (error) {
    errorLog(error, 'askGPT');
    throw error;
  }
}

export async function askGPTForm(prompt: string): Promise<IFormSchema> {
  try {
    debugLog('Generating form schema for prompt:', prompt);
    
    const response = await aiClient.post<IFormSchema>('/generate-form', { prompt });
    return response.data;
  } catch (error) {
    errorLog(error, 'askGPTForm');
    throw error;
  }
} 