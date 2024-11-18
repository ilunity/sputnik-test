import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import { TaskDto, TaskService } from '~shared/api/tasks/api-service';
import { UseMutation } from '~shared/lib/react-query';
import { TaskQueries, TaskQueriesUpdater } from '~entities/task/api';
import { TaskMapper } from '~entities/task/lib';
import { Task } from '~entities/task/model';


export const useRemoveTaskMutation: UseMutation<
  ReturnType<typeof TaskService.remove>,
  number,
  { prevTasks: Task[] }
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
    mutationKey: [TaskQueries.keys.root, 'remove', ...mutationKey],

    mutationFn: TaskService.remove,

    onMutate: async (variables) => {
      await Promise.all([
        queryClient.cancelQueries({ queryKey: TaskQueries.keys.root }),
        onMutate?.(variables),
      ]);

      const prevTasks = queryClient.getQueryData(TaskQueries.keys.root) as Task[];

      return { prevTasks };
    },

    onSuccess: async (response, variables, context) => {
      const task = TaskMapper.taskDto2Task(response.data as TaskDto);

      taskUpdater.remove(task.id);

      await onSuccess?.(response, variables, context);
    },

    onError: (error, variables, context) => {
      message.error(String(error));
      queryClient.setQueryData(TaskQueries.keys.root, context?.prevTasks);
      onError?.(error, variables, context);
    },

    onSettled,
  });
};
