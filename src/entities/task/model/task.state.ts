import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

type State = {
  favoriteTasksIds: number[];
};

const initialState: State = {
  favoriteTasksIds: [],
};

export const useFavoriteTasksStore = create<State>()(
  devtools(
    persist(
      immer(() => initialState),
      { name: 'favorite-tasks' },
    ),
  ),
);
