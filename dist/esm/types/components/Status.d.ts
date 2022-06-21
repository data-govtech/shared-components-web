/// <reference types="react" />
interface Props {
    status: string;
    className?: string;
    getStatusColor?(str: string): string;
}
export declare const Status: import("react").NamedExoticComponent<Props>;
export {};
