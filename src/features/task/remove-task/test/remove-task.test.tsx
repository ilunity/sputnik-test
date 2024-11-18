import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { TaskDto, TaskService } from '~shared/api/tasks/api-service';
import { TaskApiClientMock } from '~shared/api/tasks/lib';
import { renderWithQueryClient } from '~shared/lib/test';
import { TASK_STATUS } from '~entities/task/model';
import { RemoveTaskBtn } from '../ui';

const taskTestId = 1100;

const taskDto: TaskDto = {
  id: taskTestId,
  attributes: {
    name: 'Задание',
    description: 'Описание',
    status: TASK_STATUS.OPEN,
    createdAt: '2024-11-17T17:27:30.758Z',
    updatedAt: '2024-11-17T17:27:30.758Z',
    publishedAt: '2024-11-17T17:27:30.757Z',
  },
};


const renderRemoveTaskForm = () => {
  const user = userEvent.setup();
  const renderResult = renderWithQueryClient(<RemoveTaskBtn taskId={taskTestId} />);

  return { ...user, ...renderResult };
};

describe('RemoveTaskBtn', () => {
  it('should render the delete button', () => {
    renderRemoveTaskForm();

    const button = screen.getByRole('button', { name: 'close' });
    expect(
      button,
    ).toBeInTheDocument();
  });

  it('should show the spinner on mutation', async () => {
    const { click } = renderRemoveTaskForm();
    const button = screen.getByRole('button', { name: 'close' });
    await click(button);

    await waitFor(() => {
      expect(button).toHaveClass('ant-btn-loading');
    });
  });

  it('should call mutate when clicked', async () => {
    const removeTaskServiceSpy = vi
      .spyOn(TaskService, 'remove')
      .mockResolvedValue(TaskApiClientMock.mockResolvedAxiosResponse(taskDto));

    const { click } = renderRemoveTaskForm();
    const button = screen.getByRole('button', { name: 'close' });
    await click(button);

    await waitFor(() => {
      expect(removeTaskServiceSpy).toHaveBeenCalledWith(taskTestId);
    });
  });
});