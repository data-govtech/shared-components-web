/// <reference types="react" />
interface StepProps {
    loading?: boolean;
    contactUsComponent?: React.ReactElement;
    onSubmit?(email: string): void;
}
export declare const Step1: import("react").NamedExoticComponent<StepProps>;
export {};
