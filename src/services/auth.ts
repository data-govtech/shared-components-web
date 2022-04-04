import { notify } from '../utils/notification';
import { apiHelpers } from './api';
import { removeToken, saveToken } from './api/base-api';

export async function getOTP(authApiUrl: string, email: string) {
  try {
    const resp: FetchOTPResp = await apiHelpers.authPost(`${authApiUrl}/email_otp`, {
      body: JSON.stringify({ email }),
    });

    return resp;
  } catch (err: any) {
    notify.error(err.message);
    console.debug(err);
  }

  return null;
}

export async function login(authApiUrl: string, email: string, otp: number) {
  try {
    const resp: FetchTokenRespSuccess = await apiHelpers.authPost(`${authApiUrl}/get_jwt_token`, {
      body: JSON.stringify({ email, otp }),
    });

    if (!resp) throw Error('Error');

    saveToken(resp.jwt);

    return resp;
  } catch (err: any) {
    console.debug(err);
    notify.error(err.message);
    removeToken();
  }

  return null;
}

export function logout() {
  removeToken();
}

export async function getUserInfo(authApiUrl: string, signalToAbort?: AbortSignal) {
  try {
    const resp = await apiHelpers.authGet(
      `${authApiUrl}/decode_jwt`,
      signalToAbort ? { signal: signalToAbort } : undefined
    );

    return resp;
  } catch (err: any) {
    notify.error(err.message);

    return null;
  }
}
