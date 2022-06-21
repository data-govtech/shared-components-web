import { memo, useCallback } from 'react';
import styled from 'styled-components';

import { Button, Form, Input, Typography, useForm } from '../UIKits';

const ActionStyle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const RightAction = styled.div`
  text-align: right;
`;

interface StepProps {
  loading?: boolean;
  contactUsComponent?: React.ReactElement;
  onSubmit?(email: string): void;
}

type FormValues = {
  email: string;
};

const DEFAULT_VALUES = { email: '' };

export const Step1 = memo<StepProps>(({ loading, contactUsComponent, onSubmit }) => {
  const [form] = useForm<FormValues>();
  const handleSubmit = useCallback(
    (values: FormValues) => {
      onSubmit?.(values.email);
    },
    [onSubmit]
  );

  return (
    <Form form={form} onFinish={handleSubmit} layout="vertical" initialValues={DEFAULT_VALUES}>
      <Typography>
        Enter your Email Addess and we will send you One-Time Password (OTP) to enter below.
      </Typography>
      <Form.Item label="Email" name="email" rules={[{ required: true }]}>
        <Input typeof="email" placeholder="abc@example.com" type="email" />
      </Form.Item>
      <Form.Item
        shouldUpdate={(prevValues: FormValues, curValues: FormValues) =>
          prevValues.email !== curValues.email
        }
      >
        <ActionStyle>
          <Button type="primary" htmlType="submit" loading={loading}>
            Get OTP
          </Button>
          <RightAction>
            <Typography>Not a registered user yet?</Typography>
            {contactUsComponent}
          </RightAction>
        </ActionStyle>
      </Form.Item>
    </Form>
  );
});
