import { TASK_STATUS } from '~entities/task/model';
import { StyledSelect } from './TaskStatusSelect.styles';
import { TaskStatusSelectOption, TaskStatusSelectProps } from './TaskStatusSelect.types';

const taskStatusSelectOptions: TaskStatusSelectOption[] = [
  { value: TASK_STATUS.DONE, label: 'Выполнена' },
  { value: TASK_STATUS.OPEN, label: 'Не выполнена' },
  { value: TASK_STATUS.WORKING, label: 'В процессе' },
];

export const TaskStatusSelect: React.FC<TaskStatusSelectProps> = (
  {
    loading = false,
    disabled = false,
    value,
    onChange,
    allowClear = false,
  },
) => (
  <StyledSelect
    allowClear={allowClear}
    placeholder="Статус"
    loading={loading}
    disabled={disabled}
    value={value}
    options={taskStatusSelectOptions}
    onChange={(value) => onChange?.(value as TASK_STATUS)}
  />
);
