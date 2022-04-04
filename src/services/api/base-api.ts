const TOKEN_KEY = 'access_token';

export function removeToken() {
  localStorage.removeItem(TOKEN_KEY);
}

export function saveToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

const doRequest = async (url: string, options?: RequestInit) => {
  const token = getToken();
  let { headers: optHeaders, ...restOpts } = options || {};
  const fullUrl = url; //url.startsWith('http') ? url : url;

  const headers: Record<string, any> = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...optHeaders,
  };

  if (headers['Content-Type'] === 'remove') {
    delete headers['Content-Type'];
  }

  const resp = await fetch(fullUrl, {
    method: 'GET',
    headers,
    ...restOpts,
  });

  // Error
  if (resp.status < 200 || resp.status >= 300) {
    const error: RespError = await resp.clone().json();

    let message: string = '';
    if (typeof error.detail === 'string') {
      message = error.detail;
    } else if (error.detail?.length > 0) {
      message = error.detail.map((i) => i.msg).join('\n');
    }

    throw Error(message);
  }

  const customHeader = (headers as any)?.['Content-Type'];

  if (customHeader && customHeader.startsWith('text')) return resp.clone().text();
  if (customHeader && customHeader === 'application/json') return resp.clone().json();

  // Success
  return resp;
};

export async function request(url: string, options?: RequestInit) {
  try {
    return await doRequest(url, options);
  } catch (err: any) {
    return Promise.reject(err);
  }
}

export async function clientRequest(url: string, options?: RequestInit) {
  try {
    return await doRequest(url, options);
  } catch (err: any) {
    return Promise.reject(err);
  }
}
