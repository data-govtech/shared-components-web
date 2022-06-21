/// <reference path="./esm/src/types/global.d.ts" />
/// <reference types="react" />
import * as React$1 from 'react';
import React__default from 'react';
import { PopconfirmProps } from 'antd/lib/popconfirm';
import { TableProps, ColumnType } from 'antd/lib/table';

declare enum TaskGroupStatusEnum {
    Draft = "Draft",
    InProgress = "InProgress",
    Scheduled = "Scheduled",
    Completed = "Completed",
    Cancelled = "Cancelled",
    Pending = "Pending",
    Error = "Error",
    Aborted = "Aborted"
}
declare enum CampaignStatusEnum {
    Active = "Active",
    Ended = "Ended",
    Draft = "Draft"
}
declare enum TaskStatusEnum {
    RENDERING_FAILURE = "Rendering Failure",
    BOUNCE = "Bounce",
    COMPLAINT = "Complaint",
    DELIVERY = "Delivery",
    SEND = "Send",
    REJECT = "Reject",
    OPEN = "Open",
    CLICK = "Click",
    RENDER_FAILURE = "Rendering Failure",
    DELIVERY_DELAY = "DeliveryDelay",
    PENDING = "Pending",
    TRIGGER = "Trigger",
    INVALID = "Invalid",
    DEAD_LETTER = "Dead Letter"
}

declare function isCancellable(taskGroupStatus: TaskGroupStatusEnum): boolean;
declare function isAbortable(taskGroupStatus: TaskGroupStatusEnum): boolean;
declare function isDeletable(taskGroupStatus: TaskGroupStatusEnum): boolean;
declare function isRunnable(campaignStatus?: CampaignStatusEnum, taskGroupStatus?: TaskGroupStatusEnum): boolean | undefined;
declare function isExportable(taskGroupStatus: TaskGroupStatusEnum): boolean;
declare function isRefreshable(taskGroupStatus: TaskGroupStatusEnum): boolean;

declare const actions_d_isCancellable: typeof isCancellable;
declare const actions_d_isAbortable: typeof isAbortable;
declare const actions_d_isDeletable: typeof isDeletable;
declare const actions_d_isRunnable: typeof isRunnable;
declare const actions_d_isExportable: typeof isExportable;
declare const actions_d_isRefreshable: typeof isRefreshable;
declare namespace actions_d {
  export {
    actions_d_isCancellable as isCancellable,
    actions_d_isAbortable as isAbortable,
    actions_d_isDeletable as isDeletable,
    actions_d_isRunnable as isRunnable,
    actions_d_isExportable as isExportable,
    actions_d_isRefreshable as isRefreshable,
  };
}

interface Props$3 {
    authApiUrl: string;
    contactUsComponent?: React__default.ReactElement;
    loginBtn?: React__default.ReactElement;
    onLoginSuccess?(payload: any): void;
}
declare const LoginModal: React__default.NamedExoticComponent<Props$3>;

interface HeaderProps {
    authApiUrl: string;
    children: React__default.ReactElement;
    userInfo: UserInfo | null;
    contactUsComponent?: React__default.ReactElement;
    onUserInfoLoaded?(payload: any): void;
    onError?(e: any): void;
    loginBtn?: React__default.ReactElement;
}
declare const Profile: React__default.NamedExoticComponent<HeaderProps>;

interface Props$2 {
    authApiUrl: string;
    contactUsComponent?: React.ReactElement;
    onSuccess?(payload: FetchTokenRespSuccess): void;
}
declare const LoginForm: React$1.NamedExoticComponent<Props$2>;

declare const BetaTag: React$1.NamedExoticComponent<object>;

declare const notify: {
    error(message: React__default.ReactNode | string): void;
    success({ message, title, }: {
        message: React__default.ReactNode | string;
        title?: React__default.ReactNode;
    }): void;
};

declare function getToken(): string | null;

declare const apiHelpers: {
    get: (url: string, options?: RequestInit | undefined) => Promise<any>;
    post: (url: string, options?: RequestInit | undefined) => Promise<any>;
    put: (url: string, options?: RequestInit | undefined) => Promise<any>;
    delete: (url: string, options?: RequestInit | undefined) => Promise<any>;
    authGet: (url: string, options?: RequestInit | undefined) => Promise<any>;
    authPost: (url: string, options?: RequestInit | undefined) => Promise<any>;
    clientGet: (url: string, options?: RequestInit | undefined) => Promise<any>;
};

declare function login(authApiUrl: string, email: string, otp: number): Promise<FetchTokenRespSuccess | null>;
declare function logout(): void;
declare function getUserInfo(authApiUrl: string, signalToAbort?: AbortSignal): Promise<any>;

declare const Popconfirm: React$1.NamedExoticComponent<PopconfirmProps>;

interface IProps {
    data: Campaign;
    editBtn?: React__default.ReactNode;
    deleteApiURL?: string;
    actions?: React__default.ReactNode[] | ((campaign: Campaign) => Array<React__default.ReactNode>);
    formatDate?(date: string): void;
    onRemoved?(): void;
    getStatusColor?(status: string): string;
}
declare const CampaignItem: React__default.NamedExoticComponent<IProps>;

interface Props$1 {
    status: string;
    className?: string;
    getStatusColor?(str: string): string;
}
declare const Status: React$1.NamedExoticComponent<Props$1>;

interface TaskApis {
    genRunTaskApi?(task: Task): string;
    genRemoveTaskApi?(task: Task): string;
    genCancelTaskApi?(task: Task): string;
    genAbortTaskApi?(task: Task): string;
}

interface Props<T> extends TableProps<T>, TaskApis {
    columns?: ColumnType<T>[];
    campaignStatus?: CampaignStatusEnum;
    onRefresh?(): void;
    modifyColumn?(payload: ColumnType<T>): ColumnType<T>;
    genDetailsNode?(record: Task): React.ReactElement;
}
declare const TaskListTable: React$1.NamedExoticComponent<Props<any>>;

interface TaskDetailsPageProps extends TaskApis {
    taskDetailsApi: string;
    campaignStatus?: CampaignStatusEnum;
    campaignName?: string;
}
declare const TaskDetailsPage: React__default.NamedExoticComponent<TaskDetailsPageProps>;

declare const OverlayLoading: React$1.NamedExoticComponent<{
    absolute?: boolean | undefined;
}>;

declare function convertNameToText(str: string): string;
declare function genStatusColorMapping(mapping: Record<string, string>, defaultValue?: string): (status: string | string) => string;

declare function formatDate(dateStr?: Date | string, format?: string): string | Date;

interface Params {
    fileContent: string;
    type: string;
    filename: string;
}
declare function saveFile({ fileContent, type, filename }: Params): void;

export { BetaTag, CampaignItem, CampaignStatusEnum, LoginForm, LoginModal, OverlayLoading, Popconfirm, Profile, Status, TaskDetailsPage as TaskDetails, TaskGroupStatusEnum, TaskListTable, TaskStatusEnum, apiHelpers, convertNameToText, formatDate, genStatusColorMapping, getToken, getUserInfo, login, logout, notify, saveFile, actions_d as taskGroupChecking };
//# sourceMappingURL=index.d.ts.map
