// 环境配置类型定义
export interface EnvConfig {
  apiBaseUrl: string;
  authCookieName: string;
  authCookieMaxAge: number;
  appName: string;
  appUrl: string;
}

// 环境配置
export const env: EnvConfig = {
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api',
  authCookieName: process.env.NEXT_PUBLIC_AUTH_COOKIE_NAME || 'auth_token',
  authCookieMaxAge: Number(process.env.NEXT_PUBLIC_AUTH_COOKIE_MAX_AGE) || 7,
  appName: process.env.NEXT_PUBLIC_APP_NAME || 'XMox SaaS',
  appUrl: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
}; 