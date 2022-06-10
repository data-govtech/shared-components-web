import React from 'react';
interface Props {
    authApiUrl: string;
    contactUsComponent?: React.ReactElement;
    loginBtn?: React.ReactElement;
    onLoginSuccess?(payload: any): void;
}
export declare const LoginModal: React.NamedExoticComponent<Props>;
export {};
