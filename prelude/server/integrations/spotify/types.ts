import Service from './service';

export type Service = ReturnType<typeof Service>;
export interface Repository {
  accessTokenExpiry: Date | undefined;
  loadAccessToken: () => Promise<void>;
}

export const endpoints = {
  token: '/api/token',
};

export interface AuthResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}
