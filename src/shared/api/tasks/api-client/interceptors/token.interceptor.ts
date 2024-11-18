import { InternalAxiosRequestConfig } from 'axios';

export const tokenInterceptor = async (config: InternalAxiosRequestConfig) => {
  const newConfig = config;

  if (config.authorization !== false) {
    const token = import.meta.env.VITE_SERVER_TOKEN;
    newConfig.headers.Authorization = token;
  }

  return newConfig;
};
