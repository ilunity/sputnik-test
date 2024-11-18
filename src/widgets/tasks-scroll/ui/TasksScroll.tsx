import React from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Spin, Typography } from 'antd';
import { TasksList } from '~entities/task';
import { TaskQueries } from '~entities/task/api';
import { useFilterFavoriteTasksSelector } from '~entities/task/lib';
import { Task } from '~entities/task/model';
import { TaskCardAction } from '~entities/task/ui/TaskCard/TaskCard.types';
import { RemoveTaskBtn, SetTaskStatusSelect, ToggleFavoriteTaskBtn } from '~features/task';
import { useShallowFiltersSelector } from '~features/task/filter-task/state';
import { InViewTrigger, ScrollContainer, ScrollTrigger } from './TasksScroll.styles';
import { TasksScrollProps } from './TasksScroll.types';


const { Text } = Typography;

const setTaskStatusAction: TaskCardAction = (task) => (
  <SetTaskStatusSelect
    key={`setStatus/${task.id}`}
    taskId={task.id}
    taskStatus={task.status}
  />
);

const removeTaskAction: TaskCardAction = (task) => (
  <RemoveTaskBtn
    key={`removeTask/${task.id}`}
    taskId={task.id}
  />
);

const toggleFavoriteAction: TaskCardAction = (task) => (
  <ToggleFavoriteTaskBtn
    key={`toggleFavoriteTask/${task.id}`}
    taskId={task.id}
  />
);

const getTasksFromPages = (tasksPages: Task[][]) => {
  const tasks: Task[] = [];

  for (const pageTasks of tasksPages) {
    tasks.push(...pageTasks);
  }

  return tasks;
};

export const TasksScroll: React.FC<TasksScrollProps> = () => {
  const { status: statusFilter, favorite: favoriteFilter } = useShallowFiltersSelector();

  const {
    isLoading,
    error,
    data,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(TaskQueries.queryInfiniteScrollTasks({ status: statusFilter }));

  const filterFavoriteTasks = useFilterFavoriteTasksSelector();

  if (isLoading) {
    return <Text>Загрузка задач...</Text>;
  }

  if (error) {
    return <Text>Ошибка: {error.message}</Text>;
  }

  const tasksPages = data?.pages as Task[][];
  const tasks = getTasksFromPages(tasksPages);
  const favoriteTasks = favoriteFilter ? filterFavoriteTasks(tasks) : tasks;

  return (
    <ScrollContainer>
      <TasksList
        tasks={favoriteTasks}
        actions={[setTaskStatusAction, toggleFavoriteAction, removeTaskAction]}
      />
      <InViewTrigger
        onChange={(inView) => {
          if (inView) {
            fetchNextPage();
          }
        }}
      >
        <ScrollTrigger />
      </InViewTrigger>
      {isFetchingNextPage && <Spin />}
    </ScrollContainer>
  );
};
