import { memo } from 'react';

import { convertNameToText } from '../utils/helpers';
import { Tag } from './UIKits';

interface Props {
  status: string;
  className?: string;
  getStatusColor?(str: string): string;
}

export const Status = memo<Props>(({ className, status, getStatusColor }) => {
  return (
    <Tag className={className} color={getStatusColor?.(status)}>
      {convertNameToText(status)}
    </Tag>
  );
});
