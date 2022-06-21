import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import styled, { css } from 'styled-components';

import { apiHelpers } from '../../services/api';
import { CampaignStatusEnum, TaskStatusEnum } from '../../types/enums';
import { isExportable, isRefreshable } from '../../utils/actions';
import { formatDate } from '../../utils/date';
import { saveFile } from '../../utils/file';
import { notify } from '../../utils/notification';
import { actionRenderer, TaskApis } from '../../utils/task-actions-renderer';
import { DownloadOutlined, ReloadOutlined } from '../Icons';
import { OverlayLoading } from '../OverlayLoading';
import { Status } from '../Status';
import { Badge, Button, Empty, Tabs, Typography } from '../UIKits';
import { EmailWithStatus } from './EmailWithStatus';
import { separateEmailsByStatus } from './helpers';

interface Props extends TaskApis {
  loading?: boolean;
  taskDetails: Task;
  campaignName?: string;
  campaignStatus?: CampaignStatusEnum;
  onReload?(): void;
}

const PaddingWrapper = styled.div`
  padding: 16px;
`;

const ColumnStyle = styled.div`
  padding: 0.5rem 1rem;
  flex: 0 0 33.33%;
  border-bottom: 1px solid #f0f0f0;
  word-break: break-word;
`;

const RowStyle = styled.div<{ $cols?: number }>`
  display: flex;
  flex-wrap: wrap;
  position: relative;

  &::after,
  &::before {
    content: '';
    border-left: 1px solid #f0f0f0;
    position: absolute;
    top: 0;
    height: 100%;
    display: block;
  }

  &::before {
    left: 33.33%;
  }

  &::after {
    left: 66.66%;
  }

  ${(p) =>
    p.$cols === 2 &&
    css`
      &::after {
        display: none;
      }

      &::before {
        left: 50%;
      }
      ${ColumnStyle} {
        flex-basis: 50%;
        padding: 0.5rem 1rem;
      }
    `}
`;

const BottomActions = styled.div`
  display: flex;
  width: 100%;
  margin-top: 0.5rem;
  position: sticky;
  bottom: 0;
  background: #fff;
  padding: 0.5rem 0;
  gap: 0.5rem;

  .right-section {
    margin-left: auto;
  }
`;

const ScrollContainer = styled.div`
  height: 100%;
  overflow-y: auto;
`;

const TabsStyle = styled(Tabs)`
  .ant-tabs-nav {
    margin-bottom: 0;
  }

  .ant-tabs-content-holder {
    border: 1px solid #f0f0f0;
    margin-top: -1px;
  }
`;

const TaskDetails = memo<Props>(
  ({
    loading: isLoading,
    taskDetails,
    campaignName,
    campaignStatus,
    onReload,
    genAbortTaskApi,
    genCancelTaskApi,
    genRemoveTaskApi,
    genRunTaskApi,
  }) => {
    const failEmailsScrollContainerRef = useRef<Nullable<HTMLDivElement>>(null);
    const successEmailListRef = useRef<Nullable<HTMLDivElement>>(null);
    const pendingEmailListRef = useRef<Nullable<HTMLDivElement>>(null);

    const [pendingEmails, successfulEmails, failedEmails] = useMemo(() => {
      const emailList = taskDetails?.email_list_status || [];

      return separateEmailsByStatus(emailList, taskDetails.emails_in_queue);
    }, [taskDetails]);

    const handleExport = useCallback(() => {
      const emailList = [...successfulEmails, ...failedEmails];

      let csv = `email,status,remark\n`;
      csv += pendingEmails.map((email) => [email, TaskStatusEnum.PENDING, ''].join(',')).join('\n');
      csv += '\n';
      csv += emailList
        .map((i) => [i.email, i.task_status_name, i.task_status_remark].join(','))
        .join('\n');

      saveFile({
        fileContent: csv,
        type: 'text/csv',
        filename: `${campaignName}_${taskDetails.mail_date}.csv`,
      });
    }, [campaignName, failedEmails, pendingEmails, successfulEmails, taskDetails.mail_date]);

    const getFailedEmailContainer = useCallback(() => {
      return failEmailsScrollContainerRef.current;
    }, []);

    const getSuccessEmailListRef = useCallback(() => {
      return successEmailListRef.current;
    }, []);

    const getPendingEmailListRef = useCallback(() => {
      return pendingEmailListRef.current;
    }, []);

    if (!taskDetails) return <Empty />;

    return (
      <>
        <Typography.Paragraph style={{ marginBottom: 4 }}>
          Scheduled Date: <strong>{formatDate(taskDetails?.mail_date)}</strong>
        </Typography.Paragraph>

        {taskDetails?.triggered_at && (
          <Typography.Paragraph style={{ marginBottom: 4 }}>
            Triggered At: <strong>{formatDate(taskDetails?.triggered_at)}</strong>
          </Typography.Paragraph>
        )}

        <Typography.Paragraph>
          Task Status: <Status status={taskDetails?.task_group_status} />
          {taskDetails && `(${successfulEmails?.length}/${taskDetails.email_count} Sent)`}
        </Typography.Paragraph>

        {taskDetails?.task_status_remark && (
          <Typography.Paragraph italic>{taskDetails.task_status_remark}</Typography.Paragraph>
        )}

        <TabsStyle
          className="tab-content-has-border"
          defaultActiveKey="pending"
          type="card"
          size="small"
        >
          <Tabs.TabPane
            tab={
              <>
                Pending <Badge count={pendingEmails.length} color="yellow" size="small" />
              </>
            }
            key="pending"
            disabled={pendingEmails.length === 0}
          >
            <ScrollContainer ref={pendingEmailListRef}>
              {pendingEmails.length > 0 && (
                <EmailWithStatus
                  data={pendingEmails}
                  renderItem={(email, index) => (
                    <ColumnStyle key={`${email}-${index}`}>
                      <span>{email}</span>
                    </ColumnStyle>
                  )}
                  getScrollContainer={getPendingEmailListRef}
                />
              )}

              {pendingEmails.length === 0 && (
                <PaddingWrapper>
                  <Empty />
                </PaddingWrapper>
              )}
            </ScrollContainer>
          </Tabs.TabPane>

          <Tabs.TabPane
            tab={
              <>
                Successful <Badge count={successfulEmails.length} color="green" size="small" />
              </>
            }
            key="successful"
            disabled={successfulEmails.length === 0}
          >
            <ScrollContainer ref={successEmailListRef}>
              {successfulEmails.length > 0 && (
                <EmailWithStatus
                  data={successfulEmails}
                  renderItem={(item, index) => (
                    <RowStyle $cols={2} key={`${item.email}-${index}`}>
                      <ColumnStyle>
                        <span>{item.email}</span>
                      </ColumnStyle>
                      <ColumnStyle>
                        <span>{item.task_status_remark}</span>
                      </ColumnStyle>
                    </RowStyle>
                  )}
                  getScrollContainer={getSuccessEmailListRef}
                />
              )}

              {successfulEmails.length === 0 && (
                <PaddingWrapper>
                  <Empty />
                </PaddingWrapper>
              )}
            </ScrollContainer>
          </Tabs.TabPane>

          <Tabs.TabPane
            tab={
              <>
                Failed <Badge count={failedEmails.length} color="red" size="small" />
              </>
            }
            key="failed"
            disabled={failedEmails.length === 0}
          >
            <ScrollContainer ref={failEmailsScrollContainerRef}>
              {failedEmails.length > 0 && (
                <EmailWithStatus
                  data={failedEmails}
                  renderItem={(item, index) => (
                    <RowStyle $cols={2} key={`${item.email}-${index}`}>
                      <ColumnStyle>
                        <span>{item.email}</span>
                      </ColumnStyle>
                      <ColumnStyle>
                        <span>{item.task_status_remark}</span>
                      </ColumnStyle>
                    </RowStyle>
                  )}
                  getScrollContainer={getFailedEmailContainer}
                />
              )}

              {failedEmails.length === 0 && (
                <PaddingWrapper>
                  <Empty />
                </PaddingWrapper>
              )}
            </ScrollContainer>
          </Tabs.TabPane>
        </TabsStyle>

        <BottomActions>
          {actionRenderer({
            record: taskDetails,
            campaignStatus,
            showDivider: false,
            showIcon: true,
            btnProps: { size: 'middle', type: 'primary', ghost: true },
            genAbortTaskApi,
            genCancelTaskApi,
            genRemoveTaskApi,
          })}
          <span className="right-section" />

          {isExportable(taskDetails.task_group_status) && (
            <Button onClick={handleExport} icon={<DownloadOutlined />}>
              Export
            </Button>
          )}

          {isRefreshable(taskDetails.task_group_status) && (
            <Button
              type="primary"
              ghost
              disabled={isLoading}
              onClick={onReload}
              icon={<ReloadOutlined spin={isLoading} />}
            >
              {isLoading ? 'Refreshing' : 'Refresh'}
            </Button>
          )}

          {actionRenderer({
            showDivider: false,
            record: taskDetails,
            campaignStatus,
            showIcon: true,
            genRunTaskApi,
          })}
        </BottomActions>
      </>
    );
  }
);

interface TaskDetailsPageProps extends TaskApis {
  taskDetailsApi: string;
  campaignStatus?: CampaignStatusEnum;
  campaignName?: string;
}
export const TaskDetailsPage = memo<TaskDetailsPageProps>(({ taskDetailsApi, ...props }) => {
  const [taskDetails, setTaskDetails] = useState<Nullable<Task>>(null);
  const [loading, toggleLoading] = useState(false);

  const fetchStatus = useCallback(async () => {
    toggleLoading(true);

    try {
      const resp: Task = await apiHelpers.get(taskDetailsApi);

      setTaskDetails(resp);
    } catch (err: any) {
      notify.error(err.message);
    }

    toggleLoading(false);
  }, [taskDetailsApi]);

  useEffect(() => {
    if (taskDetailsApi) {
      fetchStatus();
    }

    return () => void setTaskDetails(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [taskDetailsApi]);

  if (!taskDetails) {
    if (loading) return <OverlayLoading absolute />;

    return <Empty description="Task not found" />;
  }

  return (
    <TaskDetails taskDetails={taskDetails} loading={loading} onReload={fetchStatus} {...props} />
  );
});
