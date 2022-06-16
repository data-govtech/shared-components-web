import { notification } from 'antd';
import React from 'react';

export const notify = {
  error(message: React.ReactNode | string) {
    notification.error({
      message: 'Error',
      description: message,
    });
  },
  success({
    message,
    title = 'Success',
  }: {
    message: React.ReactNode | string;
    title?: React.ReactNode;
  }) {
    notification.success({
      message: title,
      description: message,
    });
  },
};
