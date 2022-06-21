import React, { memo, useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';

import { apiHelpers } from '../services/api';
import { notify } from '../utils/notification';
import { DeleteOutlined } from './Icons';
import { Status } from './Status';
import {
  Button,
  Card,
  Popconfirm,
  Popover,
  Tag,
  Tooltip,
  Typography
} from './UIKits';

const CardStyle = styled(Card)`
  .ant-card-body {
    padding: 0;
  }

  .ant-card-actions > li {
    margin: 6px 0;
  }
`;

const Paragraph = styled(Typography.Paragraph)`
  && {
    &,
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const Heading = styled(Typography.Title)`
  && {
    font-weight: 500;
  }
`;

const Body = styled.div`
  padding: 1.5rem;
`;

interface IProps {
  data: Campaign;
  editBtn?: React.ReactNode;
  deleteApiURL?: string;
  actions?: React.ReactNode[] | ((campaign: Campaign) => Array<React.ReactNode>);
  formatDate?(date: string): void;
  onRemoved?(): void;
  getStatusColor?(status: string): string;
}

export const CampaignItem = memo<IProps>(
  ({ data, editBtn, deleteApiURL, formatDate, onRemoved, actions, getStatusColor }) => {
    const [loading, toggleLoading] = useState(false);

    const scheduleList = useMemo(() => {
      return (
        <>
          {data.schedule_dates?.map((date) => (
            <p key={date}>{formatDate?.(date) ?? date}</p>
          ))}
        </>
      );
    }, [data.schedule_dates, formatDate]);

    const removeCampaign = useCallback(
      async (e: React.MouseEvent<HTMLElement>) => {
        if (!deleteApiURL) return;

        e.stopPropagation();
        e.preventDefault();

        toggleLoading(true);
        try {
          await apiHelpers.delete(deleteApiURL);

          onRemoved?.();
        } catch (e: any) {
          notify.error(e.message);
        }
        toggleLoading(false);
      },
      [deleteApiURL, onRemoved]
    );

    return (
      <CardStyle
        hoverable
        actions={[
          ...(editBtn
            ? [
                <Tooltip key="edit" title="Edit">
                  {editBtn}
                </Tooltip>,
              ]
            : []),
          ...(Boolean(deleteApiURL)
            ? [
                <Popconfirm
                  key="delete"
                  title="Are you sure you want to remove this campaign?"
                  onConfirm={removeCampaign as any}
                  onCancel={preventUpload as any}
                  overlayClassName="ant-popover-small-overlay"
                >
                  <Button
                    size="small"
                    danger
                    type="text"
                    icon={<DeleteOutlined />}
                    loading={loading}
                    disabled={loading}
                  />
                </Popconfirm>,
              ]
            : []),
          ...(typeof actions === 'function' ? actions(data) : actions ?? []),
        ]}
      >
        <Body>
          <Heading level={4} ellipsis={{ tooltip: true }}>
            {data.campaign_name || 'Untitled'}
          </Heading>
          <Paragraph type="secondary">{`Created: ${
            data.created_at ? formatDate?.(data.created_at) ?? data.created_at : ''
          }`}</Paragraph>
          <Paragraph>
            <span>Status: </span>
            <Status status={data.campaign_status} getStatusColor={getStatusColor} />
          </Paragraph>
          <Paragraph>
            <span>Scheduled Dates:</span>{' '}
            {data.schedule_dates?.[0] ? (
              <Tag>{formatDate?.(data.schedule_dates[0]) ?? data.schedule_dates[0]}</Tag>
            ) : (
              <Tag>No scheduled date</Tag>
            )}
            {data.schedule_dates?.[1] && (
              <Popover content={scheduleList} title="Schedule Dates">
                <Tag>...</Tag>
              </Popover>
            )}
          </Paragraph>
        </Body>
      </CardStyle>
    );
  }
);

function preventUpload() {
  return false;
}
