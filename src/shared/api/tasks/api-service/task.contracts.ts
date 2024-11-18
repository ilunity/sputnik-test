import { TasksApiRequestBody } from '../api-client';

export enum TASK_STATUS {
  OPEN = 'open',
  DONE = 'done',
  WORKING = 'working',
}

export type TaskDto = {
  id: number,
  attributes: {
    name?: string;
    description: string;
    status: TASK_STATUS;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  }
};

export type TaskQueryParamFiltersDto = {
  status?: TASK_STATUS;
}

export type TaskQueryParamsDto = {
  'pagination[page]'?: number;
  'pagination[pageSize]'?: number;
  sort?: keyof TaskDto['attributes'] | Partial<Record<keyof TaskDto['attributes'], 'asc' | 'desc'>>;
  filters?: TaskQueryParamFiltersDto;
}

export type CreateTaskDto = TasksApiRequestBody<
  Pick<TaskDto['attributes'], 'name' | 'description'> &
  Partial<Pick<TaskDto['attributes'], 'status'>>
>;

export type UpdateTaskStatusDto = TasksApiRequestBody<Partial<Pick<TaskDto['attributes'], 'name' | 'status' | 'description'>>>;
