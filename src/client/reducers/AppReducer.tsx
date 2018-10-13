import { combineReducers } from "redux";
import { AuthState } from "../misc/Auth";
import { AuthReducer } from "./AuthReducer";

export const AppReducer = combineReducers({
  authState: AuthReducer
});

export interface AppState {
    authState: AuthState
}
