import { ColumnType, TableProps } from 'antd/lib/table';
import { memo, useMemo } from 'react';
import styled from 'styled-components';

import {
  CampaignStatusEnum,
  TaskGroupStatusEnum,
  TaskStatusEnum
} from '../../types/enums';
import { formatDate } from '../../utils/date';
import { actionRenderer, TaskApis } from '../../utils/task-actions-renderer';
import { Status } from '../Status';
import { Progress, Table } from '../UIKits';

const TableStyle = styled(Table)`
  .ant-table-tbody > tr > td,
  .ant-table-thead > tr > th,
  .ant-table tfoot > tr > td,
  .ant-table tfoot > tr > th {
    padding-top: 8px;
    padding-bottom: 8px;
  }
`;

interface Props<T> extends TableProps<T>, TaskApis {
  columns?: ColumnType<T>[];
  campaignStatus?: CampaignStatusEnum;
  onRefresh?(): void;
  modifyColumn?(payload: ColumnType<T>): ColumnType<T>;
  genDetailsNode?(record: Task): React.ReactElement;
}

export const TaskListTable = memo<Props<any>>(
  ({
    onRefresh,
    modifyColumn,
    genDetailsNode,
    campaignStatus,
    genRunTaskApi,
    genRemoveTaskApi,
    genCancelTaskApi,
    genAbortTaskApi,
    ...props
  }) => {
    const baseColumns = useMemo(
      () => [
        {
          title: 'Task Date',
          dataIndex: 'mail_date',
          key: 'mail_date',
          render: dateRenderer,
        },
        {
          title: 'Status',
          dataIndex: 'task_group_status',
          key: 'task_group_status',
          render: statusRenderer,
        },
        {
          title: 'Completed',
          dataIndex: 'updated_at',
          key: 'updated_at',
          render: completedTimeRenderer,
        },
        {
          title: 'Progress',
          dataIndex: 'email_count',
          key: 'email_count',
          render: progressRenderer,
        },
        {
          title: 'Triggered',
          dataIndex: 'triggered_at',
          key: 'triggered_at',
          render: dateRenderer,
        },
        {
          title: 'Actions',
          render: (_: any, record: Task) => {
            return actionRenderer({
              record,
              onRefresh,
              genDetailsNode,
              campaignStatus,
              genRunTaskApi,
              genRemoveTaskApi,
              genCancelTaskApi,
              genAbortTaskApi,
            });
          },
        },
      ],
      [
        campaignStatus,
        genDetailsNode,
        onRefresh,
        genRunTaskApi,
        genRemoveTaskApi,
        genCancelTaskApi,
        genAbortTaskApi,
      ]
    );

    const columns = useMemo(() => {
      if (props.columns) return props.columns;

      return typeof modifyColumn === 'function' ? baseColumns.map(modifyColumn) : baseColumns;
    }, [props.columns, modifyColumn, baseColumns]);

    return <TableStyle bordered rowKey="task_group" {...props} columns={columns as any} />;
  }
);

// Rendering

function progressRenderer(emailCount: number, record: Task) {
  switch (record.task_group_status) {
    case TaskGroupStatusEnum.Pending:
      return '--';

    case TaskGroupStatusEnum.Completed:
      return <Progress percent={100} size="small" />;

    case TaskGroupStatusEnum.InProgress:
      const sentRate = (emailCount - record.emails_in_queue.length) / emailCount;
      return <Progress percent={Math.round(sentRate * 100)} size="small" />;
  }

  return '--';
}

function completedTimeRenderer(date: string, record: Task) {
  return record.task_group_status === TaskGroupStatusEnum.Completed ? formatDate(date) : '--';
}

function statusRenderer(text: TaskStatusEnum) {
  return <Status status={text} />;
}

function dateRenderer(date: string) {
  return formatDate(date);
}
