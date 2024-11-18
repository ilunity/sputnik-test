import { TasksAPIResponse } from '../api-client';

export abstract class TaskApiClientMock {
  static mockResolvedAxiosResponse<D>(data: D): TasksAPIResponse<D> {
    return {
      data,
      error: undefined,
    };
  }
}
