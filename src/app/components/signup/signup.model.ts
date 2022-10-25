export interface SignupModel {
    FirstName: string;
    LastName: string;
    UserName: string;
    Email: string;
    Password: string;
}

export interface AuthenticatedResponse {
    message: string;
}