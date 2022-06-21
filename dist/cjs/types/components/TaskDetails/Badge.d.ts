/// <reference types="react" />
import { BadgeProps } from 'antd';
interface Props extends BadgeProps {
    color?: 'green' | 'red' | 'yellow' | string;
    dot?: boolean;
}
export declare const Badge: import("react").NamedExoticComponent<Props>;
export {};
