import { useShallow } from 'zustand/react/shallow';
import { useFilterTaskStore } from './filter-task.state';

export const useShallowFiltersSelector = () => useFilterTaskStore(useShallow(
  ({ status, favorite }) => ({
    status,
    favorite,
  }),
));
