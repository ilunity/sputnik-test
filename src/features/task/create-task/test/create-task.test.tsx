import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { CreateTaskDto, TaskDto, TaskService } from '~shared/api/tasks/api-service';
import { TaskApiClientMock } from '~shared/api/tasks/lib';
import { renderWithQueryClient } from '~shared/lib/test';
import { TASK_STATUS } from '~entities/task/model';
import { CreateTaskForm } from '../ui';

const taskDto: TaskDto = {
  id: 1,
  attributes: {
    name: 'Задание',
    description: 'Описание',
    status: TASK_STATUS.OPEN,
    createdAt: '2024-11-17T17:27:30.758Z',
    updatedAt: '2024-11-17T17:27:30.758Z',
    publishedAt: '2024-11-17T17:27:30.757Z',
  },
};

const createTaskDto: CreateTaskDto = {
  data: {
    name: 'Задание',
    description: 'Описание',
    status: TASK_STATUS.OPEN,
  },
};

const renderCreateTaskForm = () => {
  const user = userEvent.setup();
  const renderResult = renderWithQueryClient(<CreateTaskForm />);

  return { ...user, ...renderResult };
};

describe('CreateTaskForm', () => {
  it('should render the form with all input fields', () => {
    const { container } = renderCreateTaskForm();

    expect(container.querySelector('#create-task_name')).toBeInTheDocument();
    expect(container.querySelector('#create-task_description')).toBeInTheDocument();
    expect(container.querySelector('.ant-select-selection-item')).toBeInTheDocument();
  });

  it('should display validation errors when required fields are empty', async () => {
    const { type, click, container } = renderCreateTaskForm();

    await type(
      container.querySelector('#create-task_name') as Element,
      '[Tab]',
    );
    await type(
      container.querySelector('#create-task_description') as Element,
      '[Tab]',
    );

    await click(
      screen.getByRole('button', { name: /Подтвердить/i }),
    );

    await waitFor(() => {
      expect(container.querySelectorAll('.ant-form-item-explain-error')).toHaveLength(2);
    });
  });

  it('should call mutate when the form is valid and submitted', async () => {
    const createTaskServiceSpy = vi
      .spyOn(TaskService, 'create')
      .mockResolvedValue(TaskApiClientMock.mockResolvedAxiosResponse(taskDto));

    const { click, type, container } = renderCreateTaskForm();

    await type(
      container.querySelector('#create-task_name') as Element,
      createTaskDto.data.name || '',
    );
    await type(
      container.querySelector('#create-task_description') as Element,
      createTaskDto.data.description,
    );
    await type(
      container.querySelector('.ant-select-selection-item') as Element,
      createTaskDto.data.status as TASK_STATUS,
    );

    await click(
      screen.getByRole('button', { name: /Подтвердить/i }),
    );

    await waitFor(() => {
      expect(createTaskServiceSpy).toHaveBeenCalledWith(createTaskDto);
    });
  });
});
