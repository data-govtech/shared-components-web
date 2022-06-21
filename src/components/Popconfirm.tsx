import AntPopconfirm, { PopconfirmProps } from 'antd/lib/popconfirm';
import { memo } from 'react';

export const Popconfirm = memo<PopconfirmProps>((props) => {
  return (
    <AntPopconfirm
      okType="default"
      cancelButtonProps={{ danger: true, type: 'primary', ...props.cancelButtonProps }}
      cancelText="No"
      okText="Yes"
      placement="top"
      overlayClassName={props.overlayClassName || 'ant-popover-small-overlay'}
      {...props}
    >
      {props.children}
    </AntPopconfirm>
  );
});
