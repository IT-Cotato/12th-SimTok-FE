export type AuthToken = {
  accessToken: AccessToken;
  refreshToken: {
    refreshToken: string;
    refreshTokenExpiresAtrefreshTokenExpiresAt: string;
  };
};

export type AccessToken = {
  accessToken: string;
  accessTokenExpiresAt: string;
};
