import { AxiosError } from 'axios';
import { HttpError } from '~shared/lib/http';
import { TaskApiErrorResponse } from '../task.api-client.types';

export const responseErrorInterceptor = (response: AxiosError<TaskApiErrorResponse>) => {
  const { message, status } = response.response?.data.error as TaskApiErrorResponse['error'];
  throw new HttpError(message, `${status}`);
};
