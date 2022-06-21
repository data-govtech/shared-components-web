import { memo } from 'react';

import { CampaignStatusEnum, TaskGroupStatusEnum } from '../types/enums';
import { convertNameToText, genStatusColorMapping } from '../utils/helpers';
import { Tag } from './UIKits';

interface Props {
  status: string;
  className?: string;
  getStatusColor?(str: string): string;
}

const STATUS_COLOR_MAPPING: Record<string, string> = {
  [TaskGroupStatusEnum.Completed]: 'green',
  [TaskGroupStatusEnum.Cancelled]: 'red',
  [TaskGroupStatusEnum.InProgress]: 'processing',
  [TaskGroupStatusEnum.Pending]: 'gold',
  [TaskGroupStatusEnum.Scheduled]: 'gold',
  [TaskGroupStatusEnum.Error]: 'red',
  [TaskGroupStatusEnum.Aborted]: 'red',
  [CampaignStatusEnum.Active]: 'green',
  [CampaignStatusEnum.Ended]: 'blue',
};

const defaultGetStatusColor = genStatusColorMapping(STATUS_COLOR_MAPPING);

export const Status = memo<Props>(
  ({ className, status, getStatusColor = defaultGetStatusColor }) => {
    return (
      <Tag className={className} color={getStatusColor?.(status) as string}>
        {convertNameToText(status)}
      </Tag>
    );
  }
);
