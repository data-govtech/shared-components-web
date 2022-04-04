import React, { memo, useCallback, useEffect, useState } from 'react';

import { getUserInfo } from '../services/auth';
import { LoadingOutlined } from './Icons';
import { LoginModal } from './LoginModal';

interface HeaderProps {
  authApiUrl: string;
  children: React.ReactElement;
  userInfo: UserInfo | null;
  onUserInfoLoaded?(payload: any): void;
  onError?(e: any): void;
}

export const Profile = memo<HeaderProps>(
  ({ authApiUrl, children, userInfo, onUserInfoLoaded, onError }) => {
    const [loading, toggleLoading] = useState(false);

    const handleLoginSuccess = useCallback(
      (resp: any) => {
        onUserInfoLoaded?.(resp);
      },
      [onUserInfoLoaded]
    );

    useEffect(() => {
      const abort = new AbortController();

      async function fetchingUser() {
        toggleLoading(true);
        try {
          const resp: FetchDecodeJwtResp = await getUserInfo(authApiUrl, abort.signal);

          if (resp) {
            handleLoginSuccess(resp);
          }
        } catch (e) {
          onError?.(e);
        }

        toggleLoading(false);
      }

      if (!userInfo) fetchingUser();

      return () => {
        abort.abort();
      };
    }, [handleLoginSuccess, onError, userInfo, authApiUrl]);

    if (loading) return <LoadingOutlined spin />;

    return userInfo?.email ? (
      children
    ) : (
      <LoginModal authApiUrl={authApiUrl} onLoginSuccess={handleLoginSuccess} />
    );
  }
);
