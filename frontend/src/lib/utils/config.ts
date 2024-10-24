
const getEnvVar = (key: string, defaultValue?: string): string => {
  const value = process.env[key] || defaultValue;
  if (!value) {
    throw new Error(`Environment variable ${key} is not set`);
  }
  return value;
};

export const API_URL = getEnvVar('NEXT_PUBLIC_API_URL', 'http://localhost:8000');

export const config = {
  api: {
    baseUrl: API_URL,
    timeout: 10000,
    endpoints: {
      auth: {
        login: '/api/v1/auth/login',
        signup: '/api/v1/auth/signup',
        logout: '/api/v1/auth/logout',
        me: '/api/v1/users/me',
      },
      users: {
        profile: '/api/v1/users/profile',
        academicInfo: '/api/v1/users/academic-info',
      },
    },
  },
  auth: {
    tokenKey: 'braincrumb_token',
    refreshTokenKey: 'braincrumb_refresh_token',
  },
  features: {
    enableAnalytics: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true',
    enableChat: process.env.NEXT_PUBLIC_ENABLE_CHAT === 'true',
  },
  environment: process.env.NODE_ENV || 'development',
  isProd: process.env.NODE_ENV === 'production',
  isDev: process.env.NODE_ENV === 'development',
} as const;

export type Config = typeof config;

export const validateConfig = () => {
  const requiredEnvVars = [
    'NEXT_PUBLIC_API_URL',
  ];

  const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

  if (missingEnvVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingEnvVars.join(', ')}`
    );
  }
};