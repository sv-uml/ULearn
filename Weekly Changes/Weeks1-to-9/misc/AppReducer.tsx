import { combineReducers } from "redux";
import { AuthState, AuthAction, AUTH_SET } from "./Auth";

const initial = {};

const AuthenticationReducer = (state: AuthState = initial, action: AuthAction) => {
    switch (action.type) {
        case AUTH_SET:
            console.log(action.data);
            return action.data;
        default:
            return state;
      }
};

export const AppReducer = combineReducers({
    auth: AuthenticationReducer
});
