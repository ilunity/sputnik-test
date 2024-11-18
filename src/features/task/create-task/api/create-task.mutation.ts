import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import { TaskDto, TaskService } from '~shared/api/tasks/api-service';
import { UseMutation } from '~shared/lib/react-query';
import { TaskQueries, TaskQueriesUpdater } from '~entities/task/api';
import { TaskMapper } from '~entities/task/lib';
import { Task } from '~entities/task/model';

export const useCreateTaskMutation: UseMutation<
  ReturnType<typeof TaskService.create>,
  Pick<Task, 'name' | 'description'> & Partial<Pick<Task, 'status'>>
> = (options) => {
  const {
    mutationKey = [],
    onMutate,
    onSuccess,
    onError,
    onSettled,
  } = options || {};

  const queryClient = useQueryClient();
  const taskUpdater = new TaskQueriesUpdater(queryClient);

  return useMutation({
    mutationKey: [TaskQueries.keys.root, 'create', ...mutationKey],

    mutationFn: (task) => TaskService.create({
      data: task,
    }),

    onMutate: async (variables) => {
      await Promise.all([
        queryClient.cancelQueries({ queryKey: TaskQueries.keys.root }),
        onMutate?.(variables),
      ]);
    },

    onSuccess: async (response, variables, context) => {
      const task = TaskMapper.taskDto2Task(response.data as TaskDto);

      taskUpdater.create(task);

      await onSuccess?.(response, variables, context);
    },

    onError: (error, variables, context) => {
      message.error(String(error));
      onError?.(error, variables, context);
    },

    onSettled,
  });
};
