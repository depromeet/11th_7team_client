export interface AuthTokenResponseInterface {
  accessToken: string;
  refreshToken: string;
  accessTokenExpireDate: string;
}

export interface CheckSignupResponseInterface {
  message: string;
  data: boolean;
}

export interface CheckEmailCerificateResponseInterface {
  message: string;
  data: boolean;
}
