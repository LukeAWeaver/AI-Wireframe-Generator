import { API_BASE_URL, debugLog, errorLog } from './config';

// Only keep used interfaces and variables
// If none are used, leave the file empty

interface FormField {
  type: 'text' | 'email' | 'number' | 'textarea' | 'checkbox' | 'select'
  label: string
  name: string
  required?: boolean
  options?: string[]
  placeholder?: string
}

interface FormSchema {
  fields: FormField[]
}

interface FeatureRequest {
  feature: string
  complexity: string
  priority: string
}

export const askGPT = async (data: FeatureRequest): Promise<string> => {
  try {
    debugLog('Calling AI service with data:', data);
    
    const response = await fetch(`${API_BASE_URL}/analyze`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const result = await response.json()
    return result.analysis
  } catch (error) {
    errorLog(error, 'askGPT');
    throw error
  }
}

export async function askGPTForm(prompt: string): Promise<FormSchema> {
  try {
    debugLog('Generating form schema for prompt:', prompt);
    
    const response = await fetch(`${API_BASE_URL}/generate-form`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate form schema');
    }

    const schema = await response.json();
    return schema;
  } catch (error) {
    errorLog(error, 'askGPTForm');
    throw error;
  }
} 