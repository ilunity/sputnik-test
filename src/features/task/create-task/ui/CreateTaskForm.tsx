import React from 'react';
import { Button, Form, FormProps, Input, message } from 'antd';
import { TaskStatusSelect } from '~shared/ui';
import { TASK_STATUS } from '~entities/task/model';
import { useCreateTaskMutation } from '../api';
import { CreateTaskFields, CreateTaskFormProps } from './CreateTaskForm.types';


const SM_LABEL_SPAN = 5;
const XS_LABEL_SPAN = 24;

export const CreateTaskForm: React.FC<CreateTaskFormProps> = ({ onSuccess }) => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const createTaskMutation = useCreateTaskMutation({
    onSuccess: () => {
      form.resetFields();
      onSuccess?.();
    },
    onError: (error) => messageApi.error(error.message),
  });

  const onFinish: FormProps<CreateTaskFields>['onFinish'] = async (values) => {
    createTaskMutation.mutate(values);
  };

  return (
    <>
      {contextHolder}
      <Form<CreateTaskFields>
        name="create-task"
        labelCol={{ xs: { span: XS_LABEL_SPAN }, sm: { span: SM_LABEL_SPAN } }}
        style={{ maxWidth: 800 }}
        onFinish={onFinish}
        autoComplete="off"
        form={form}
        initialValues={{ status: TASK_STATUS.OPEN }}
      >
        <Form.Item<CreateTaskFields>
          name="name"
          label="Название"
          rules={[{ required: true, message: 'Введите название задачи!' }]}
        >
          <Input
            maxLength={255}
            showCount
          />
        </Form.Item>
        <Form.Item<CreateTaskFields>
          label="Описание"
          name="description"
          rules={[{ required: true, message: 'Введите описание задачи!' }]}
        >
          <Input.TextArea
            autoSize={{ minRows: 6 }}
            maxLength={255}
            showCount
          />
        </Form.Item>
        <Form.Item<CreateTaskFields>
          label="Статус"
          name="status"
        >
          <TaskStatusSelect />
        </Form.Item>
        <Form.Item
          wrapperCol={{ xs: { offset: 0 }, sm: { offset: SM_LABEL_SPAN } }}
        >
          <Button
            type="primary"
            htmlType="submit"
            loading={createTaskMutation.isPending}
          >
            Подтвердить
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
