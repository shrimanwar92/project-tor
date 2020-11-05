import {createContext, Dispatch} from "react";
import {CurrentUser, UserType} from "shared/services/current-user/current-user.service";

export enum UserAction {
    LOGIN = "LOGIN",
    LOGOUT = "LOGOUT"
}

export interface AuthState {
    isAuthenticated: boolean,
    user: UserType | undefined,
    token: string | undefined
}

type AuthAction =
    | { type: UserAction.LOGIN, data: {user: UserType, token: string} }
    | { type: UserAction.LOGOUT };

export const initialState: AuthState = {
    isAuthenticated: false,
    user: undefined,
    token: undefined
};

type AuthContextType = {
    authState: AuthState,
    authDispatch: Dispatch<AuthAction>
} | undefined;

export const AuthContext = createContext<AuthContextType>(undefined);

export function authReducer(state: AuthState, action: AuthAction): AuthState {
    switch (action.type) {
        case UserAction.LOGIN:
            CurrentUser.save(action.data.user, action.data.token);
            return {...initialState, isAuthenticated: true, user: action.data.user, token: action.data.token };
        case UserAction.LOGOUT:
            CurrentUser.deleteUser();
            return {...initialState, isAuthenticated: false, user: undefined, token: undefined };
        default:
            return state;
    }
}