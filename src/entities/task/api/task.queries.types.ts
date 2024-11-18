import { TASK_STATUS } from '../model';

export type FilterTasksQuery = {
  initialPage?: number;
  pageSize?: number;
  status?: TASK_STATUS;
};
