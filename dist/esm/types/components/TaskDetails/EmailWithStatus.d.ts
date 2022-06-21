import React from 'react';
interface Props {
    data: any[];
    renderItem(payload: any, index: number): React.ReactNode;
    getScrollContainer(): Nullable<HTMLDivElement>;
}
export declare const EmailWithStatus: React.NamedExoticComponent<Props>;
export {};
