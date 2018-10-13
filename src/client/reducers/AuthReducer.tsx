import { AnyAction } from "redux";
import { AuthState, AUTH_SET } from "../misc/Auth";

export interface AuthAction extends AnyAction {
    type: string,
    authSetting: AuthState
}

export const AuthReducer = (state: AuthState = {}, action: AuthAction) => {
    switch (action.type) {
        case AUTH_SET:
          return action.authSetting
        default:
          return state
      }
}
