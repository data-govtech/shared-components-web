/// <reference types="react" />
interface Props {
    authApiUrl: string;
    contactUsComponent?: React.ReactElement;
    onSuccess?(payload: FetchTokenRespSuccess): void;
}
export declare const LoginForm: import("react").NamedExoticComponent<Props>;
export {};
