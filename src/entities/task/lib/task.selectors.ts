import { Task, useFavoriteTasksStore } from '../model';

export const useIsFavoriteTaskSelector = (taskId: number) => {
  const favoriteTasksIds = useFavoriteTasksStore(state => state.favoriteTasksIds);
  return favoriteTasksIds.findIndex(id => id === taskId) !== -1;
};

export const useFilterFavoriteTasksSelector = () => {
  const favoriteTasksIds = useFavoriteTasksStore(state => state.favoriteTasksIds);
  return (tasks: Task[]) => tasks.filter(task => favoriteTasksIds.includes(task.id));
};
