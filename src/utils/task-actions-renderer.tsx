import {
  CloseCircleOutlined,
  DeleteOutlined,
  DoubleRightOutlined
} from '../components/Icons';
import { AsyncButton } from '../components/TaskListTable/AsyncButton';
import { ButtonProps, Divider } from '../components/UIKits';
import { CampaignStatusEnum } from '../types/enums';
import { isAbortable, isCancellable, isDeletable, isRunnable } from './actions';

export interface TaskApis {
  genRunTaskApi?(task: Task): string;
  genRemoveTaskApi?(task: Task): string;
  genCancelTaskApi?(task: Task): string;
  genAbortTaskApi?(task: Task): string;
}

interface ActionsRendererParams extends TaskApis {
  showIcon?: boolean;
  campaignStatus?: CampaignStatusEnum;
  record: Task;
  btnProps?: ButtonProps;
  showDivider?: boolean;
  onRefresh?(): void;
  genDetailsNode?(record: Task): React.ReactElement;
}
export function actionRenderer({
  record,
  campaignStatus,
  btnProps,
  showDivider = true,
  showIcon,
  genRunTaskApi,
  genRemoveTaskApi,
  genCancelTaskApi,
  genAbortTaskApi,
  onRefresh,
  genDetailsNode,
}: ActionsRendererParams) {
  return (
    <>
      {genDetailsNode?.(record)}

      {genRunTaskApi && isRunnable(campaignStatus, record.task_group_status) && (
        <>
          {showDivider && <Divider type="vertical" />}
          <AsyncButton
            btnLabel="Run"
            apiURL={genRunTaskApi(record)}
            key={record.task_group}
            onDone={onRefresh}
            popConformProps={{
              okButtonProps: { type: 'primary' },
              cancelButtonProps: { type: 'default' },
              title: 'Are you sure you want to run?',
            }}
            successMessage="Run task successfully."
            btnProps={{ ...(showIcon ? { icon: <DoubleRightOutlined /> } : {}), ...btnProps }}
          />
        </>
      )}

      {genCancelTaskApi && isCancellable(record.task_group_status) && (
        <>
          {showDivider && <Divider type="vertical" />}
          <AsyncButton
            apiURL={genCancelTaskApi(record)}
            btnLabel="Cancel"
            onDone={onRefresh}
            btnProps={{
              danger: true,
              ...(showIcon ? { icon: <CloseCircleOutlined /> } : {}),
              ...btnProps,
            }}
            popConformProps={{
              placement: 'topRight',
              title: 'Are you sure you want to Cancel this task?',
            }}
            method="put"
            successMessage="Cancel task successfully."
          />
        </>
      )}

      {genAbortTaskApi && isAbortable(record.task_group_status) && (
        <>
          {showDivider && <Divider type="vertical" />}
          <AsyncButton
            apiURL={genAbortTaskApi(record)}
            onDone={onRefresh}
            btnLabel="Abort"
            btnProps={{
              danger: true,
              ...(showIcon ? { icon: <CloseCircleOutlined /> } : {}),
              ...btnProps,
            }}
            popConformProps={{
              placement: 'topRight',
              title: 'Are you sure you want to Abort this task?',
            }}
            method="put"
            successMessage="Abort task successfully."
          />
        </>
      )}

      {genRemoveTaskApi && isDeletable(record.task_group_status) && (
        <>
          {showDivider && <Divider type="vertical" />}
          <AsyncButton
            apiURL={genRemoveTaskApi(record)}
            btnLabel="Delete"
            onDone={onRefresh}
            btnProps={{
              danger: true,
              ...(showIcon ? { icon: <DeleteOutlined /> } : {}),
              ...btnProps,
            }}
            popConformProps={{
              placement: 'topRight',
              title: 'Are you sure you want to Delete this task?',
            }}
            method="delete"
            successMessage="Delete task successfully."
          />
        </>
      )}
    </>
  );
}
