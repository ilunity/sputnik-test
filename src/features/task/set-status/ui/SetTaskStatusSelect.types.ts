import { TASK_STATUS } from '~entities/task/model';


export interface SetTaskStatusSelectProps {
  taskId: number;
  taskStatus: TASK_STATUS;
}
