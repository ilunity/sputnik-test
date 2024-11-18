import { AxiosResponse } from 'axios';
import { HttpError } from '~shared/lib/http';

export const detachDataInterceptor = (response: AxiosResponse) => {
  const data = response?.data;

  if (!data) {
    throw new HttpError('API Error. No data!');
  }
  return data;
};
