export declare function getOTP(authApiUrl: string, email: string): Promise<FetchOTPResp | null>;
export declare function login(authApiUrl: string, email: string, otp: number): Promise<FetchTokenRespSuccess | null>;
export declare function logout(): void;
export declare function getUserInfo(authApiUrl: string, signalToAbort?: AbortSignal): Promise<any>;
