import { AnyAction } from "redux";
import { AuthState, AUTH_SET } from "../misc/Auth";
import { AuthAction } from "../reducers/AuthReducer";

export const setUserState = (authSetting: AuthState): AuthAction => {
    return {
        type: AUTH_SET,
        authSetting
    }
};