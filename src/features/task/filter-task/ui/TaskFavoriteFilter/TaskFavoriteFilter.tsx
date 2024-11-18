import React from 'react';
import { Checkbox, CheckboxProps } from 'antd';
import { setFavoriteFilter, useFilterTaskStore } from '../../state';
import { TaskFavoriteFilterProps } from './TaskFavoriteFilter.types';


export const TaskFavoriteFilter: React.FC<TaskFavoriteFilterProps> = () => {
  const favoriteFilter = useFilterTaskStore(state => state.favorite);

  const handleChange: CheckboxProps['onChange'] = (event) => {
    setFavoriteFilter(event.target.checked);
  };

  return (
    <Checkbox
      checked={favoriteFilter}
      onChange={handleChange}
    >
      В избранном
    </Checkbox>
  );
};
