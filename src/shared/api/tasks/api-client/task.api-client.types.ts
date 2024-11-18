export type TasksApiRequestBody<D> = {
  data: D;
}

export type TasksAPIMeta = {
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
};

export type TasksAPIResponse<T> = {
  data: T | null,
  error?: TasksAPIError;
}

export type TasksAPIMetaResponse<T> = TasksAPIResponse<T> & {
  meta: TasksAPIMeta | undefined;
}

export type TaskApiErrorResponse = {
  data: null;
  error: TasksAPIError;
}

export type TasksAPIError = {
  status: number;
  name: string;
  message: string;
  details: object;
};
