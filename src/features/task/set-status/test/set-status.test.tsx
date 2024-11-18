import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { TaskDto, TaskService, UpdateTaskStatusDto } from '~shared/api/tasks/api-service';
import { TaskApiClientMock } from '~shared/api/tasks/lib';
import { renderWithQueryClient } from '~shared/lib/test';
import { Task, TASK_STATUS } from '~entities/task/model';
import { SetTaskStatusSelect } from '../ui';


const testTaskId = 1100;

const taskDto: TaskDto = {
  id: testTaskId,
  attributes: {
    name: 'Задание',
    description: 'Описание',
    status: TASK_STATUS.OPEN,
    createdAt: '2024-11-17T17:27:30.758Z',
    updatedAt: '2024-11-17T17:27:30.758Z',
    publishedAt: '2024-11-17T17:27:30.757Z',
  },
};

const task: Task = {
  id: taskDto.id,
  status: taskDto.attributes.status,
  name: taskDto.attributes.name,
  description: taskDto.attributes.description,
};


const renderSetTaskStatusSelect = () => {
  const user = userEvent.setup();
  const renderResult = renderWithQueryClient(
    <SetTaskStatusSelect
      taskId={task.id}
      taskStatus={task.status}
    />,
  );

  return { ...user, ...renderResult };
};

describe('SetTaskStatusSelect', () => {
  it('should render the set status select', () => {
    const { container } = renderSetTaskStatusSelect();

    const select = screen.getByRole('combobox');
    expect(
      select,
    ).toBeInTheDocument();

    const selectItem = container.querySelector('.ant-select-selection-item');
    expect(
      selectItem,
    ).toBeInTheDocument();
  });

  it('should show the dropdown on click', async () => {
    const { click } = renderSetTaskStatusSelect();

    const select = screen.getByRole('combobox');
    await click(select);

    await waitFor(() => {
      const options = screen.getAllByRole('option');
      expect(options).toHaveLength(3);
    });
  });

  it('should show the spinner on mutation', async () => {
    const { click, container } = renderSetTaskStatusSelect();

    const select = screen.getByRole('combobox');
    await click(select);

    const doneOption = screen.getByTitle('Выполнена');
    doneOption.click();

    await waitFor(() => {
      expect(container.querySelector('.ant-select-arrow-loading')).toBeInTheDocument();
    });
  });

  it('should call mutate when clicked option', async () => {
    const updateDto: UpdateTaskStatusDto = {
      data: {
        status: TASK_STATUS.DONE,
      },
    };

    const updatedTaskDto: TaskDto = {
      id: taskDto.id,
      attributes: {
        ...taskDto.attributes,
        status: TASK_STATUS.DONE,
      },
    };

    const setTaskStatusServiceSpy = vi
      .spyOn(TaskService, 'update')
      .mockResolvedValue(TaskApiClientMock.mockResolvedAxiosResponse(updatedTaskDto));

    const { click } = renderSetTaskStatusSelect();

    const select = screen.getByRole('combobox');
    await click(select);

    const doneOption = screen.getByTitle('Выполнена');
    doneOption.click();

    await waitFor(() => {
      expect(setTaskStatusServiceSpy).toHaveBeenCalledWith(testTaskId, updateDto);
    });
  });

  it('should change selected status after mutation', async () => {
    const updatedTask: Task = {
      ...task,
      status: TASK_STATUS.DONE,
    };

    const { click, container, rerender } = renderSetTaskStatusSelect();

    const select = screen.getByRole('combobox');
    await click(select);

    const doneOption = screen.getByRole('option', { name: 'Выполнена' });
    await doneOption.click();

    rerender(
      <SetTaskStatusSelect
        taskId={updatedTask.id}
        taskStatus={updatedTask.status}
      />,
    );

    await waitFor(() => {
      const selectItem = container.querySelector('.ant-select-selection-item');
      expect(
        selectItem,
      ).toHaveTextContent('Выполнена');
    });
  });
});