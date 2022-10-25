export interface LoginModel {
  UserName: string;
  Password: string;
}

export interface AuthenticatedResponse {
  token: string;
}