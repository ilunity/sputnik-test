import { TaskDto } from '../api';
import { Task } from '../model';

export abstract class TaskMapper {
  static taskDto2Task = (dto: TaskDto): Task => ({
    id: dto.id,
    ...dto.attributes,
  });

  static tasksDto2Task = (dto: TaskDto[]): Task[] => dto.map(this.taskDto2Task);
}
