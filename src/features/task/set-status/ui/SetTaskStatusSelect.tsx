import React from 'react';
import { TaskStatusSelect } from '~shared/ui';
import { TASK_STATUS } from '~entities/task/model';
import { useSetTaskStatusMutation } from '../api';
import { SetTaskStatusSelectProps } from './SetTaskStatusSelect.types';


export const SetTaskStatusSelect: React.FC<SetTaskStatusSelectProps> = ({ taskId, taskStatus }) => {
  const setTaskStatusMutation = useSetTaskStatusMutation();
  const setTaskStatus = (newStatus: TASK_STATUS) =>
    setTaskStatusMutation.mutate({
      id: taskId,
      status: newStatus,
    });

  return (
    <TaskStatusSelect
      loading={setTaskStatusMutation.isPending}
      disabled={setTaskStatusMutation.isPending}
      value={taskStatus}
      onChange={(selectedStatuses) => setTaskStatus(selectedStatuses as TASK_STATUS)}
    />
  );
};
