/// <reference types="react" />
import { ButtonProps } from '../components/UIKits';
import { CampaignStatusEnum } from '../types/enums';
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
export declare function actionRenderer({ record, campaignStatus, btnProps, showDivider, showIcon, genRunTaskApi, genRemoveTaskApi, genCancelTaskApi, genAbortTaskApi, onRefresh, genDetailsNode, }: ActionsRendererParams): JSX.Element;
export {};
