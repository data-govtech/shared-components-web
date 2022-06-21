import { PopconfirmProps } from 'antd';
import { memo, useCallback, useMemo, useState } from 'react';

import { apiHelpers } from '../../services/api';
import { notify } from '../../utils/notification';
import { Button, ButtonProps, Popconfirm } from '../UIKits';

interface Props {
  btnLabel: string;
  disabled?: boolean;
  btnProps?: ButtonProps;
  apiURL: string;
  successMessage?: string;
  popConformProps?: Partial<PopconfirmProps>;
  onDone?(): void;
  method?: 'post' | 'put' | 'delete';
}

export const AsyncButton = memo<Props>(
  ({
    btnLabel,
    apiURL,
    disabled,
    btnProps,
    onDone,
    successMessage,
    popConformProps,
    method = 'post',
  }) => {
    const [loading, toggleLoading] = useState(false);

    const doAction = useCallback(async () => {
      toggleLoading(true);

      try {
        await apiHelpers[method](apiURL);
        notify.success({ message: successMessage });

        onDone?.();
      } catch (e: any) {
        notify.error(e.message);
      }

      toggleLoading(false);
    }, [apiURL, successMessage, method, onDone]);

    const button = useMemo(
      () => (
        <Button size="small" type="link" disabled={loading || disabled} {...btnProps}>
          {btnProps?.children || btnLabel}
        </Button>
      ),
      [btnProps, disabled, loading, btnLabel]
    );

    if (popConformProps?.title) {
      return (
        <Popconfirm onConfirm={doAction} {...popConformProps} title={popConformProps.title}>
          {button}
        </Popconfirm>
      );
    }

    return button;
  }
);
