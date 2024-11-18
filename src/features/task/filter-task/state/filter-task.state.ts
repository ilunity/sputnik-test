import { create } from 'zustand';
import { TASK_STATUS } from '~entities/task/model';

type State = {
  status?: TASK_STATUS;
  favorite?: boolean;
}

const initialState: State = {
  status: undefined,
  favorite: undefined,
};

export const useFilterTaskStore = create<State>(() => initialState);
