import { CampaignStatusEnum, TaskGroupStatusEnum } from '../types/enums';
export declare function isCancellable(taskGroupStatus: TaskGroupStatusEnum): boolean;
export declare function isAbortable(taskGroupStatus: TaskGroupStatusEnum): boolean;
export declare function isDeletable(taskGroupStatus: TaskGroupStatusEnum): boolean;
export declare function isRunnable(campaignStatus?: CampaignStatusEnum, taskGroupStatus?: TaskGroupStatusEnum): boolean | undefined;
export declare function isExportable(taskGroupStatus: TaskGroupStatusEnum): boolean;
export declare function isRefreshable(taskGroupStatus: TaskGroupStatusEnum): boolean;
