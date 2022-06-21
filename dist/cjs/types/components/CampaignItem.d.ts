import React from 'react';
interface IProps {
    data: Campaign;
    editBtn?: React.ReactNode;
    deleteApiURL?: string;
    actions?: React.ReactNode[] | ((campaign: Campaign) => Array<React.ReactNode>);
    formatDate?(date: string): void;
    onRemoved?(): void;
    getStatusColor?(status: string): string;
}
export declare const CampaignItem: React.NamedExoticComponent<IProps>;
export {};
