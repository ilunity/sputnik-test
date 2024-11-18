import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { Layout, Section } from '~shared/ui';
import { CreateTaskForm } from '~features/task/create-task';
import { TaskFilterPanel } from '~features/task/filter-task';
import { TasksScroll } from '~widgets/tasks-scroll';
import { ContentContainer } from '~pages/tasks/ui/TasksPage.styles';
import { TasksPageProps } from './TasksPage.types';


export const TasksPage: React.FC<TasksPageProps> = () => {
  const [createTaskModal, setCreateTaskModal] = useState<boolean>(false);
  const openCreateTaskModal = () => setCreateTaskModal(true);
  const closeCreateTaskModal = () => setCreateTaskModal(false);

  return (
    <Layout>
      <Modal
        open={createTaskModal}
        title="Создать задачу"
        centered
        footer={() => undefined}
        onCancel={closeCreateTaskModal}
      >
        <CreateTaskForm onSuccess={closeCreateTaskModal} />
      </Modal>
      <Section
        title="Список задач"
        action={(
          <Button
            type="primary"
            onClick={openCreateTaskModal}
          >
            Создать задачу
          </Button>
        )}
      >
        <ContentContainer>
          <TaskFilterPanel />
          <TasksScroll />
        </ContentContainer>
      </Section>
    </Layout>
  );
};
