import { CampaignStatusEnum, TaskGroupStatusEnum } from '../types/enums';

export function isCancellable(taskGroupStatus: TaskGroupStatusEnum) {
  return [TaskGroupStatusEnum.Pending, TaskGroupStatusEnum.Scheduled].includes(taskGroupStatus);
}

export function isAbortable(taskGroupStatus: TaskGroupStatusEnum) {
  return [TaskGroupStatusEnum.InProgress].includes(taskGroupStatus);
}

export function isDeletable(taskGroupStatus: TaskGroupStatusEnum) {
  return [TaskGroupStatusEnum.Cancelled, TaskGroupStatusEnum.Error].includes(taskGroupStatus);
}

export function isRunnable(
  campaignStatus?: CampaignStatusEnum,
  taskGroupStatus?: TaskGroupStatusEnum
) {
  return (
    campaignStatus === CampaignStatusEnum.Active &&
    taskGroupStatus &&
    [TaskGroupStatusEnum.Pending, TaskGroupStatusEnum.Scheduled].includes(taskGroupStatus)
  );
}

export function isExportable(taskGroupStatus: TaskGroupStatusEnum) {
  return ![TaskGroupStatusEnum.Pending, TaskGroupStatusEnum.Scheduled].includes(taskGroupStatus);
}

export function isRefreshable(taskGroupStatus: TaskGroupStatusEnum) {
  return ![TaskGroupStatusEnum.Pending, TaskGroupStatusEnum.Scheduled].includes(taskGroupStatus);
}
