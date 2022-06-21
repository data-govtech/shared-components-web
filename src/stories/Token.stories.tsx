import 'antd/dist/antd.css';

import { Button, Form, Input, Space } from 'antd';
import { memo, useCallback } from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { useForm } from '../components/UIKits';

const TokenCmp = memo<{}>(() => {
  const [form] = useForm();

  const handleSubmit = useCallback(
    (values: any) => {
      console.log('token', values.token);
      localStorage.setItem('access_token', values.token);
      form.resetFields();
    },
    [form]
  );

  const handleClearToken = useCallback(() => {
    localStorage.removeItem('access_token');
  }, []);

  return (
    <Form style={{ width: '50vw' }} form={form} layout="vertical" onFinish={handleSubmit}>
      <Form.Item label="Paste your token here" name="token" rules={[{ required: true }]}>
        <Input.TextArea rows={5} />
      </Form.Item>
      <Space>
        <Button htmlType="button" onClick={handleClearToken}>
          Clear Token
        </Button>
        <Button htmlType="submit" type="primary">
          Submit
        </Button>
      </Space>
    </Form>
  );
});

export default {
  title: 'Token Reset',
  component: TokenCmp,
  parameters: {
    layout: 'centered',
  },
} as ComponentMeta<typeof TokenCmp>;

const Template: ComponentStory<typeof TokenCmp> = (args) => <TokenCmp {...args} />;

export const TokenReset = Template.bind({});
TokenReset.args = {};
