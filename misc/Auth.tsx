export const AUTH_SUCCESS: string =  "AUTH_SUCCESS";
export const AUTH_FAILURE: string = "AUTH_FAIL";
export const LOGOUT_SUCCESS: string =  "LOGOUT_SUCCESS";
export const LOGOUT_FAILURE: string = "LOGOUT_FAIL";
export const AUTH_SET: string = "AUTH_SET";

export interface AuthState {
    loggedIn?: boolean,
    userId?: number,
    firstName?: string,
    lastName?: string,
    email?: string
};

export interface AuthAction {
    type: string,
    data: AuthState
};
