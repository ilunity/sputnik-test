import React from 'react';
import { TaskCard } from '../TaskCard';
import { StyledFlex } from './TasksList.styles';
import { TasksListProps } from './TasksList.types';


export const TasksList: React.FC<TasksListProps> = ({ tasks, actions }) => (
  <StyledFlex>
    {tasks.map(task => (
      <TaskCard
        key={task.id}
        task={task}
        actions={actions}
      />
    ))}
  </StyledFlex>
);
