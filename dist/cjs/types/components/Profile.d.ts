import React from 'react';
interface HeaderProps {
    authApiUrl: string;
    children: React.ReactElement;
    userInfo: UserInfo | null;
    contactUsComponent?: React.ReactElement;
    onUserInfoLoaded?(payload: any): void;
    onError?(e: any): void;
    loginBtn?: React.ReactElement;
}
export declare const Profile: React.NamedExoticComponent<HeaderProps>;
export {};
