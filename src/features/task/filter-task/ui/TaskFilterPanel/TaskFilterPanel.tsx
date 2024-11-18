import React from 'react';
import { Card } from 'antd';
import { TaskFavoriteFilter } from '../TaskFavoriteFilter';
import { TaskStatusFilter } from '../TaskStatusFilter';
import { FiltersContainer, PanelTitle } from './TaskFilterPanel.styles';
import { TaskFilterPanelProps } from './TaskFilterPanel.types';


export const TaskFilterPanel: React.FC<TaskFilterPanelProps> = () => (
  <Card size="small">
    <FiltersContainer wrap>
      <PanelTitle strong>Фильтры:</PanelTitle>
      <TaskStatusFilter />
      <TaskFavoriteFilter />
    </FiltersContainer>
  </Card>
);
