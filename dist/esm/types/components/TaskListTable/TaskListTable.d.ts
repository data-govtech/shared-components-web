/// <reference types="react" />
import { ColumnType, TableProps } from 'antd/lib/table';
import { CampaignStatusEnum } from '../../types/enums';
import { TaskApis } from '../../utils/task-actions-renderer';
interface Props<T> extends TableProps<T>, TaskApis {
    columns?: ColumnType<T>[];
    campaignStatus?: CampaignStatusEnum;
    onRefresh?(): void;
    modifyColumn?(payload: ColumnType<T>): ColumnType<T>;
    genDetailsNode?(record: Task): React.ReactElement;
}
export declare const TaskListTable: import("react").NamedExoticComponent<Props<any>>;
export {};
