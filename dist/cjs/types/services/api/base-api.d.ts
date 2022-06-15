export declare function removeToken(): void;
export declare function saveToken(token: string): void;
export declare function getToken(): string | null;
export declare function request(url: string, options?: RequestInit): Promise<any>;
export declare function clientRequest(url: string, options?: RequestInit): Promise<any>;
