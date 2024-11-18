import { taskApiClient, TasksAPIMetaResponse, TasksAPIResponse } from '../api-client';
import { CreateTaskDto, TASK_STATUS, TaskDto, TaskQueryParamsDto, UpdateTaskStatusDto } from './task.contracts';

export abstract class TaskService {
  private static baseUrl = 'tasks/';

  static find = async (taskId: number): Promise<TasksAPIResponse<TaskDto>> => taskApiClient.get(this.baseUrl + taskId);

  static findAll = async (queryParams?: TaskQueryParamsDto): Promise<TasksAPIMetaResponse<TaskDto[]>> => {
    const params = queryParams || {};
    params.sort = params.sort ? params.sort : { createdAt: 'desc' };

    return taskApiClient.get(this.baseUrl, {
      params: queryParams,
    });
  };

  static create = async (dto: CreateTaskDto): Promise<TasksAPIResponse<TaskDto>> => taskApiClient.post(this.baseUrl, {
    ...dto,
    data: {
      ...dto.data,
      status: dto.data.status || TASK_STATUS.OPEN,
    },
  });

  static update = async (taskId: number, dto: UpdateTaskStatusDto): Promise<TasksAPIResponse<TaskDto>> => taskApiClient.put(this.baseUrl + taskId, dto);

  static remove = async (taskId: number): Promise<TasksAPIResponse<TaskDto>> => taskApiClient.delete(this.baseUrl + taskId);
}
