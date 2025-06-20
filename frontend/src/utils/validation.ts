export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export const validateUsername = (username: string): ValidationResult => {
  // Check if empty
  if (!username || username.trim().length === 0) {
    return {
      isValid: false,
      error: 'Username cannot be empty',
    };
  }

  // Check length (3-20 characters)
  if (username.length < 3) {
    return {
      isValid: false,
      error: 'Username must be at least 3 characters long',
    };
  }

  if (username.length > 20) {
    return {
      isValid: false,
      error: 'Username must be no more than 20 characters long',
    };
  }

  // Check for valid characters (letters, numbers, underscores, and hyphens)
  const validUsernameRegex = /^[a-zA-Z0-9_-]+$/;
  if (!validUsernameRegex.test(username)) {
    return {
      isValid: false,
      error: 'Username can only contain letters, numbers, underscores, and hyphens',
    };
  }

  return { isValid: true };
}; 