import { TASK_STATUS } from '~entities/task/model';

export interface CreateTaskFields {
  name: string;
  description: string;
  status?: TASK_STATUS;
}

export interface CreateTaskFormProps {
  onSuccess?: () => void;
}
