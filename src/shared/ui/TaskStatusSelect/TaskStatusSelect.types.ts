import { TASK_STATUS } from '~entities/task/model';

export interface TaskStatusSelectOption {
  value: TASK_STATUS;
  label: string;
}

export type TaskStatusSelectProps = {
  loading?: boolean;
  disabled?: boolean;
  onChange?: (newTaskStatus: TASK_STATUS) => void;
  value?: TASK_STATUS;
  allowClear?: boolean;
}
