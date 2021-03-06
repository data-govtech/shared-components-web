import React, { memo, useCallback, useState } from 'react';

import { LoginOutlined } from './Icons';
import { LoginForm } from './LoginForm';
import { Button, Modal } from './UIKits';

interface Props {
  authApiUrl: string;
  contactUsComponent?: React.ReactElement;
  loginBtn?: React.ReactElement;
  onLoginSuccess?(payload: any): void;
}

export const LoginModal = memo<Props>(
  ({
    authApiUrl,
    contactUsComponent,
    loginBtn = <Button icon={<LoginOutlined />}>Login</Button>,
    onLoginSuccess,
  }) => {
    const [isModalVisible, toggleModalVisible] = useState(false);

    const handleOk = useCallback(() => {
      toggleModalVisible(true);
    }, []);

    const handleCancel = useCallback(() => {
      toggleModalVisible(false);
    }, []);

    const handleOpenModal = useCallback(() => {
      toggleModalVisible(true);
    }, []);

    const handleLoginSuccess = useCallback(
      (resp: any) => {
        toggleModalVisible(false);
        onLoginSuccess?.(resp);
      },
      [onLoginSuccess]
    );

    return (
      <>
        {React.cloneElement(loginBtn, {
          onClick: handleOpenModal,
        })}

        <Modal
          footer={null}
          title="Login"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          destroyOnClose
        >
          <LoginForm
            authApiUrl={authApiUrl}
            onSuccess={handleLoginSuccess}
            contactUsComponent={contactUsComponent}
          />
        </Modal>
      </>
    );
  }
);
