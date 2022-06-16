import { memo, useCallback, useState } from 'react';

import { getOTP, login } from '../../services/auth';
import { Step1 } from './Step1';
import { Step2 } from './Step2';

interface Props {
  authApiUrl: string;
  contactUsComponent?: React.ReactElement;
  onSuccess?(payload: FetchTokenRespSuccess): void;
}

export const LoginForm = memo<Props>(({ authApiUrl, contactUsComponent, onSuccess }) => {
  const [loading, toggleLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');

  const resetState = useCallback(() => {
    setStep(1);
    setEmail('');
  }, []);

  const handleSubmitEmail = useCallback(
    async (email: string) => {
      toggleLoading(true);
      const resp = await getOTP(authApiUrl, email);

      toggleLoading(false);

      if (!resp) return;

      setEmail(email);
      setStep(2);
    },
    [authApiUrl]
  );

  const handleSubmitOtp = useCallback(
    async (otp: number) => {
      if (!email || !otp) return;

      toggleLoading(true);
      const resp = await login(authApiUrl, email, otp);

      toggleLoading(false);
      if (!resp) return;

      if (resp.jwt) {
        resetState();
        onSuccess?.(resp);
      }
    },
    [authApiUrl, email, onSuccess, resetState]
  );

  return (
    <>
      {step === 1 && (
        <Step1
          loading={loading}
          onSubmit={handleSubmitEmail}
          contactUsComponent={contactUsComponent}
        />
      )}
      {step === 2 && (
        <Step2 authApiUrl={authApiUrl} loading={loading} onSubmit={handleSubmitOtp} email={email} />
      )}
    </>
  );
});
