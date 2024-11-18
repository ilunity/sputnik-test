import { useFavoriteTasksStore } from '~entities/task/model';

export const toggleFavoriteTaskAction = (taskId: number) =>
  useFavoriteTasksStore.setState(state => {
    const taskIndex = state.favoriteTasksIds.findIndex((id: number) => id === taskId);
    const isFavoriteTask = taskIndex !== -1;

    if (isFavoriteTask) {
      state.favoriteTasksIds.splice(taskIndex, 1);
    } else {
      state.favoriteTasksIds.push(taskId);
    }
  });

export const unfavoriteTaskAction = (taskId: number) =>
  useFavoriteTasksStore.setState(state => {
    const taskIndex = state.favoriteTasksIds.findIndex((id: number) => id === taskId);
    const isFavoriteTask = taskIndex !== -1;

    if (isFavoriteTask) {
      state.favoriteTasksIds.splice(taskIndex, 1);
    }
  });
