import { ReactNode } from 'react';
import { Task } from '~entities/task/model';

export type TaskCardAction = (task: Task) => ReactNode;

export interface TaskCardProps {
  task: Task;
  actions?: TaskCardAction[];
}
