import { AuthAction, AuthState, AUTH_SET } from "./Auth";

export const setState = (state: AuthState): AuthAction => {
    return {
        type: AUTH_SET,
        data: state
    }
};
