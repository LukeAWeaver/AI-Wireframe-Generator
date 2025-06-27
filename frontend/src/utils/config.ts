interface IImportMetaEnv {
  readonly VITE_API_URL?: string;
  readonly DEV: boolean;
  readonly PROD: boolean;
}

const env = (import.meta as unknown as { env: IImportMetaEnv }).env;
export const isDevelopment = env.DEV;
export const isProduction = env.PROD;

// API configuration
export const API_BASE_URL = isProduction 
  ? env.VITE_API_URL || 'https://your-production-api.com/api'
  : 'http://localhost:3001/api';

// App configuration
export const APP_CONFIG = {
  isDevelopment,
  isProduction,
  apiBaseUrl: API_BASE_URL,
  version: '0.1.30', // This could also come from import.meta.env.VITE_APP_VERSION
};

// Debug logging (only in development)
export const debugLog = (...args: unknown[]) => {
  if (isDevelopment) {
    console.log('[DEBUG]', ...args);
  }
};

// Error logging with environment context
export const errorLog = (error: unknown, context?: string) => {
  console.error(`[ERROR]${context ? ` [${context}]` : ''}`, error);
  if (isDevelopment) {
    console.trace();
  }
}; 