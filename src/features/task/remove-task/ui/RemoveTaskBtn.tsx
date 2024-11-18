import React from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import { unfavoriteTaskAction } from '~features/task/favorite-task/actions';
import { useRemoveTaskMutation } from '../api';
import { RemoveTaskBtnProps } from './RemoveTaskBtn.types';


export const RemoveTaskBtn: React.FC<RemoveTaskBtnProps> = ({ taskId }) => {
  const removeTaskMutation = useRemoveTaskMutation();
  const removeTask = () => removeTaskMutation.mutate(taskId, {
    onSuccess: () => unfavoriteTaskAction(taskId),
  });

  return (
    <Tooltip title="Удалить задание">
      <Button
        name="remove-task-btn"
        loading={removeTaskMutation.isPending}
        type="text"
        shape="circle"
        danger
        icon={<CloseOutlined />}
        onClick={removeTask}
      />
    </Tooltip>
  );
};
