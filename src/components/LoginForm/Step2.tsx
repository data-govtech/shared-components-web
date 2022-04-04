import { FormInstance } from 'antd/lib/form';
import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';

import { getOTP } from '../../services/auth';
import { Button, Form, Input, Space, Typography } from '../UIKits';

interface StepProps {
  authApiUrl: string;
  loading?: boolean;
  email: string;
  onSubmit?(otp: number): void;
}

type FormValues = {
  otp: number;
};

const DEFAULT_VALUES = {
  otp: '',
};

export const Step2 = memo<StepProps>(({ authApiUrl, loading, email, onSubmit }) => {
  const [resending, toggleResend] = useState(false);
  const [resendStatus, setResendStatus] = useState('');

  const resendTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(
    () => () => {
      if (resendTimeoutRef.current) clearTimeout(resendTimeoutRef.current);
    },
    []
  );

  const handleSubmit = useCallback(
    (values: FormValues) => {
      if (values.otp) onSubmit?.(values.otp);
    },
    [onSubmit]
  );

  const handleResend = useCallback(async () => {
    toggleResend(true);
    const resp = await getOTP(authApiUrl, email);
    if (resp?.message) setResendStatus(resp?.message);
    resendTimeoutRef.current = setTimeout(() => void setResendStatus(''), 5000);

    toggleResend(false);
  }, [authApiUrl, email]);

  const resendBtnLabel = useMemo(() => {
    if (resending) return 'Resending...';
    if (resendStatus) return resendStatus;

    return 'Resend OTP';
  }, [resending, resendStatus]);

  return (
    <Form onFinish={handleSubmit} layout="vertical" initialValues={DEFAULT_VALUES}>
      <Typography.Text type="secondary">
        An OTP has been emailed to you. Enter OTP below.
      </Typography.Text>

      <Form.Item label="One-Time Password" name="otp">
        <Input placeholder="OTP" type="number" />
      </Form.Item>

      <Space>
        <Form.Item
          style={{ margin: 0 }}
          shouldUpdate={(prevValues: FormValues, curValues: FormValues) =>
            prevValues.otp !== curValues.otp
          }
        >
          {(form: FormInstance<FormValues>) => (
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              disabled={!form.getFieldValue('otp')}
            >
              Login
            </Button>
          )}
        </Form.Item>
        {resendStatus ? (
          <Typography.Text type="success">{resendStatus}</Typography.Text>
        ) : (
          <Button htmlType="button" type="link" onClick={handleResend}>
            {resendBtnLabel}
          </Button>
        )}
      </Space>
    </Form>
  );
});
