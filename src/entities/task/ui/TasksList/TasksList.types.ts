import { Task } from '~entities/task/model';
import { TaskCardAction } from '../TaskCard/TaskCard.types';

export interface TasksListProps {
  tasks: Task[];
  actions: TaskCardAction[];
}
