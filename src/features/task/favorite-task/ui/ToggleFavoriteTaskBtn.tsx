import React from 'react';
import { StarFilled, StarOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import { useIsFavoriteTaskSelector } from '~entities/task/lib';
import { toggleFavoriteTaskAction } from '../actions';
import { IconWrapper } from './ToggleFavoriteTaskBtn.styles';
import { ToggleFavoriteTaskBtnProps } from './ToggleFavoriteTaskBtn.types';


export const ToggleFavoriteTaskBtn: React.FC<ToggleFavoriteTaskBtnProps> = ({ taskId }) => {
  const isFavorite = useIsFavoriteTaskSelector(taskId);

  const handleClick = () => toggleFavoriteTaskAction(taskId);

  return (
    <Tooltip title={isFavorite ? 'Удалить из избранного' : 'Добавить в избранное'}>
      <Button
        type="text"
        shape="circle"
        icon={(
          <IconWrapper>
            {isFavorite ? <StarFilled /> : <StarOutlined />}
          </IconWrapper>
        )}
        onClick={handleClick}
      />
    </Tooltip>
  );
};
