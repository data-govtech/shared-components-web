import { clientRequest, request } from './base-api';

export { request };

async function genGetRequest(rq: any, url: string, options?: RequestInit) {
  const resp = await rq(url, { method: 'GET', ...options });
  return Promise.resolve(resp);
}

async function getRequest(url: string, options?: RequestInit) {
  return genGetRequest(request, url, options);
}

async function clientGetRequest(url: string, options?: RequestInit) {
  return genGetRequest(clientRequest, url, options);
}

async function postRequest(url: string, method: string = 'POST', options?: RequestInit) {
  return await request(url, { method, ...options });
}

export const apiHelpers = {
  get: async (url: string, options?: RequestInit) => {
    return getRequest(url, options);
  },
  post: async (url: string, options?: RequestInit) => {
    return postRequest(url, 'POST', options);
  },
  put: async (url: string, options?: RequestInit) => {
    return postRequest(url, 'PUT', options);
  },
  delete: async (url: string, options?: RequestInit) => {
    return postRequest(url, 'DELETE', options);
  },
  authGet: async (url: string, options?: RequestInit) => {
    return getRequest(url, options);
  },
  authPost: async (url: string, options?: RequestInit) => {
    return postRequest(url, 'POST', options);
  },
  clientGet: async (url: string, options?: RequestInit) => {
    return clientGetRequest(url, options);
  },
};
