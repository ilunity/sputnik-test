export type Task = {
  id: number;
  name?: string;
  description: string;
  status: TASK_STATUS;
}

export enum TASK_STATUS {
  DONE = 'done',
  OPEN = 'open',
  WORKING = 'working',
}
