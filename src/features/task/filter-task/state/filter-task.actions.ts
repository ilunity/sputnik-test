import { TASK_STATUS } from '~entities/task/model';
import { useFilterTaskStore } from '~features/task/filter-task';

export const setStatusFilter = (status: TASK_STATUS | undefined) => useFilterTaskStore.setState(() => ({ status }));

export const setFavoriteFilter = (favorite: boolean | undefined) => useFilterTaskStore.setState(() => ({ favorite }));
