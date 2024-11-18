import React from 'react';
import { Typography } from 'antd';
import { ActionContainer, StyledCard } from './TaskCard.styles';
import { TaskCardProps } from './TaskCard.types';


const { Text, Title } = Typography;

export const TaskCard: React.FC<TaskCardProps> = ({ task, actions = [] }) => (
  <StyledCard
    size="small"
    title={
      <Title
        level={3}
        ellipsis={{ tooltip: task.name }}
      >
        {task.name || 'Задача'}
      </Title>
    }
    actions={[
      <ActionContainer>
        {actions.map(action => action(task))}
      </ActionContainer>,
    ]}
  >
    <Text>
      {task.description}
    </Text>
  </StyledCard>
);
