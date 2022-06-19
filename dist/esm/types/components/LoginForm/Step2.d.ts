/// <reference types="react" />
interface StepProps {
    authApiUrl: string;
    loading?: boolean;
    email: string;
    onSubmit?(otp: number): void;
}
export declare const Step2: import("react").NamedExoticComponent<StepProps>;
export {};
