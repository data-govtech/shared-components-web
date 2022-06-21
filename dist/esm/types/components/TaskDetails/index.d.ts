import React from 'react';
import { CampaignStatusEnum } from '../../types/enums';
import { TaskApis } from '../../utils/task-actions-renderer';
interface TaskDetailsPageProps extends TaskApis {
    taskDetailsApi: string;
    campaignStatus?: CampaignStatusEnum;
    campaignName?: string;
}
export declare const TaskDetailsPage: React.NamedExoticComponent<TaskDetailsPageProps>;
export {};
