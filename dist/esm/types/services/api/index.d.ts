import { request } from './base-api';
export { request };
export declare const apiHelpers: {
    get: (url: string, options?: RequestInit | undefined) => Promise<any>;
    post: (url: string, options?: RequestInit | undefined) => Promise<any>;
    put: (url: string, options?: RequestInit | undefined) => Promise<any>;
    delete: (url: string, options?: RequestInit | undefined) => Promise<any>;
    authGet: (url: string, options?: RequestInit | undefined) => Promise<any>;
    authPost: (url: string, options?: RequestInit | undefined) => Promise<any>;
    clientGet: (url: string, options?: RequestInit | undefined) => Promise<any>;
};
