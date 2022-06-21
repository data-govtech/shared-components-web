/// <reference types="react" />
interface Props {
    data: any[];
    itemPerPage?: number;
    className?: string;
    getContainer(): Nullable<HTMLDivElement>;
    itemRenderer(item: any, index: number): React.ReactNode;
}
export declare const VirtualList: import("react").NamedExoticComponent<Props>;
export {};
