type RouteConfig = {
  path: string;
  exact: boolean;
  component: any;
  auth?: boolean;
};

type RespErrorDetail = {
  msg: string;
  type: string;
};

type RespError = {
  detail: string | RespErrorDetail[];
};

type FetchOTPResp = {
  message: string;
};

type UserInfo = {
  email: string;
  role: string;
  permissions: string[];
  name: string;
};

type FetchTokenRespSuccess = UserInfo & {
  jwt: string;
  expires_in: number;
};

type FetchDecodeJwtResp = {
  sub: UserInfo;
  exp: number;
  iat: number;
  jti: string;
};

type Nullable<T> = T | null;
