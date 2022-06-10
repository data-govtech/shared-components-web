/// <reference types="react" />
/// <reference types="types/global" />
import * as React$1 from 'react';
import React__default from 'react';

interface Props$1 {
    authApiUrl: string;
    contactUsComponent?: React__default.ReactElement;
    loginBtn?: React__default.ReactElement;
    onLoginSuccess?(payload: any): void;
}
declare const LoginModal: React__default.NamedExoticComponent<Props$1>;

interface HeaderProps {
    authApiUrl: string;
    children: React__default.ReactElement;
    userInfo: UserInfo | null;
    contactUsComponent?: React__default.ReactElement;
    onUserInfoLoaded?(payload: any): void;
    onError?(e: any): void;
    loginBtn?: React__default.ReactElement;
}
declare const Profile: React__default.NamedExoticComponent<HeaderProps>;

interface Props {
    authApiUrl: string;
    contactUsComponent?: React.ReactElement;
    onSuccess?(payload: FetchTokenRespSuccess): void;
}
declare const LoginForm: React$1.NamedExoticComponent<Props>;

declare const BetaTag: React$1.NamedExoticComponent<object>;

declare const notify: {
    error(message: string): void;
    success({ message, title }: {
        message: string;
        title?: string | undefined;
    }): void;
};

declare function getToken(): string | null;

declare const apiHelpers: {
    get: (url: string, options?: RequestInit | undefined) => Promise<any>;
    post: (url: string, options?: RequestInit | undefined) => Promise<any>;
    put: (url: string, options?: RequestInit | undefined) => Promise<any>;
    delete: (url: string, options?: RequestInit | undefined) => Promise<any>;
    authGet: (url: string, options?: RequestInit | undefined) => Promise<any>;
    authPost: (url: string, options?: RequestInit | undefined) => Promise<any>;
    clientGet: (url: string, options?: RequestInit | undefined) => Promise<any>;
};

declare function login(authApiUrl: string, email: string, otp: number): Promise<FetchTokenRespSuccess | null>;
declare function logout(): void;
declare function getUserInfo(authApiUrl: string, signalToAbort?: AbortSignal): Promise<any>;

export { BetaTag, LoginForm, LoginModal, Profile, apiHelpers, getToken, getUserInfo, login, logout, notify };
