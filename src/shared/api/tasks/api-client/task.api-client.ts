import axios from 'axios';
import { detachDataInterceptor, responseErrorInterceptor, tokenInterceptor } from './interceptors';

const taskApiClient = axios.create({
  baseURL: import.meta.env.VITE_SERVER_HOST,
  headers: {
    'Content-type': 'application/json',
  },
  authorization: true,
});

taskApiClient.interceptors.request.use(tokenInterceptor);
taskApiClient.interceptors.response.use(detachDataInterceptor, responseErrorInterceptor);


export { taskApiClient };
