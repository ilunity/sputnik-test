import {
  GetNextPageParamFunction,
  GetPreviousPageParamFunction,
  InfiniteData,
  infiniteQueryOptions,
  QueryClient,
  queryOptions,
} from '@tanstack/react-query';
import { TasksAPIError, TasksAPIMeta, TasksAPIResponse } from '~shared/api/tasks/api-client';
import { TaskService } from '~shared/api/tasks/api-service';
import { HttpError } from '~shared/lib/http';
import { FilterTasksQuery } from '~entities/task/api/task.queries.types';
import { TaskMapper } from '~entities/task/lib';
import { Task } from '../model';

export abstract class TaskQueries {
  static readonly keys = {
    root: ['tasks'],
    rootById: ['tasks', 'by-id'],
    rootInfinity: ['tasks', 'infinite'],
  };

  static queryTasks = () => queryOptions({
    queryKey: [...this.keys.root],
    queryFn: async () => {
      const response = await TaskService.findAll();

      const responseData = this.extractApiData(response);

      return TaskMapper.tasksDto2Task(responseData);
    },
  });

  static queryInfiniteScrollTasks = (filters?: FilterTasksQuery) => {
    const { initialPage = 1, pageSize = 10, status } = filters || {};
    let pageCount = 2;

    const queryKey = [
      ...this.keys.rootInfinity,
      { status },
    ].filter(Boolean) as string[];

    return infiniteQueryOptions({
      queryKey,
      queryFn: async ({ pageParam }) => {
        const response = await TaskService.findAll({
          'pagination[page]': pageParam,
          'pagination[pageSize]': pageSize,
          filters: { status },
        });

        const responseData = this.extractApiData(response);
        const { pagination: { pageCount: newPageCount } } = response.meta as TasksAPIMeta;
        pageCount = newPageCount;

        return TaskMapper.tasksDto2Task(responseData);
      },
      getNextPageParam: this.getNextPageParam(pageCount),
      getPreviousPageParam: this.getPreviousPageParam(),
      initialPageParam: initialPage,
      staleTime: Infinity,
    });
  };

  private static getNextPageParam = (pageCount: number): GetNextPageParamFunction<number, Task[]> =>
    (_lastPage, _allPages, lastPageParam) => lastPageParam >= pageCount ? undefined : lastPageParam + 1;

  private static getPreviousPageParam = (): GetPreviousPageParamFunction<number, Task[]> =>
    (_firstPage, _allPages, firstPageParam) => firstPageParam <= 0 ? undefined : firstPageParam - 1;

  static queryTask = (taskId: number) => queryOptions({
    queryKey: [...this.keys.rootById, taskId],
    queryFn: async () => {
      const response = await TaskService.find(taskId);

      const responseData = this.extractApiData(response);

      return TaskMapper.taskDto2Task(responseData);
    },
  });

  private static extractApiData = <T>(response: TasksAPIResponse<T>) => {
    if (response.error) {
      return this.handleAPIError(response.error);
    }

    return response.data as T;
  };

  private static handleAPIError = (error: TasksAPIError) => {
    throw new HttpError(error.message);
  };
}

export class TaskQueriesUpdater {
  private queryClient: QueryClient;

  constructor(queryClient: QueryClient) {
    this.queryClient = queryClient;
  }

  create = (task: Task) => {
    this.queryClient.setQueryData(
      TaskQueries.queryTasks().queryKey,
      oldTasks => oldTasks ? [...oldTasks, task] : [task],
    );

    this.queryClient.invalidateQueries({
      queryKey: TaskQueries.queryInfiniteScrollTasks().queryKey,
    });
  };

  update = (task: Task) => {
    this.queryClient.setQueryData(
      TaskQueries.queryTasks().queryKey,
      oldTasks => oldTasks?.map(
        oldTask => oldTask.id === task.id ? task : oldTask,
      ),
    );

    this.queryClient.setQueryData(
      TaskQueries.queryInfiniteScrollTasks().queryKey,
      (infiniteData?: InfiniteData<Task[]>): InfiniteData<Task[]> | undefined => {
        if (!infiniteData) {
          return {
            pages: [],
            pageParams: [],
          };
        }

        return {
          pages: infiniteData.pages.map(
            oldPageTasks => oldPageTasks.map(
              oldTask => oldTask.id === task.id ? task : oldTask,
            ),
          ),
          pageParams: infiniteData.pageParams,
        };
      },
    );

    this.queryClient.setQueryData(
      TaskQueries.queryTask(task.id).queryKey,
      task,
    );
  };

  remove = (taskId: number) => {
    this.queryClient.setQueryData(
      TaskQueries.queryTasks().queryKey,
      oldTasks => oldTasks?.filter(
        oldTask => oldTask.id !== taskId,
      ),
    );

    this.queryClient.invalidateQueries({
      queryKey: TaskQueries.queryInfiniteScrollTasks().queryKey,
    });

    this.queryClient.invalidateQueries({ queryKey: [...TaskQueries.keys.rootById, taskId] });
  };
}
