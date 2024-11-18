import React from 'react';
import { Space } from 'antd';
import { TaskStatusSelect } from '~shared/ui';
import { TASK_STATUS } from '~entities/task/model';
import { setStatusFilter, useFilterTaskStore } from '../../state';
import { TaskStatusFilterProps } from './TaskStatusFilter.types';


export const TaskStatusFilter: React.FC<TaskStatusFilterProps> = () => {
  const statusFilter = useFilterTaskStore(state => state.status);

  return (
    <Space.Compact>
      <TaskStatusSelect
        allowClear
        value={statusFilter}
        onChange={(newTaskStatus) => setStatusFilter(newTaskStatus as TASK_STATUS)}
      />
    </Space.Compact>
  );
};
