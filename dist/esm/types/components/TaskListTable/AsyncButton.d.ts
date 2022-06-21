/// <reference types="react" />
import { PopconfirmProps } from 'antd';
import { ButtonProps } from '../UIKits';
interface Props {
    btnLabel: string;
    disabled?: boolean;
    btnProps?: ButtonProps;
    apiURL: string;
    successMessage?: string;
    popConformProps?: Partial<PopconfirmProps>;
    onDone?(): void;
    method?: 'post' | 'put' | 'delete';
}
export declare const AsyncButton: import("react").NamedExoticComponent<Props>;
export {};
