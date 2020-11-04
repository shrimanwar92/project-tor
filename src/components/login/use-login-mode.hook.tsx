import { useReducer, useEffect } from 'react';

export enum Mode {
    LOGIN,
    FORGOT_PASSWORD
}

export type State = {
    mode: Mode,
    heading: string,
    buttonText: string,
    className?: string
};

export type Action = {type: Mode};

export default function useMode() {

    const initialState: State = {
        mode: Mode.LOGIN,
        heading: "Login",
        buttonText: "Log in",
        className: 'tor-login'
    };

    const [state, dispatch] = useReducer((state: State, action: Action): State => {
        switch (action.type) {
            case Mode.LOGIN:
                return { ...initialState };
            case Mode.FORGOT_PASSWORD:
                return { ...initialState, mode: Mode.FORGOT_PASSWORD, heading: "Forgot password", buttonText: "Reset password", className: 'tor-forgot-password' };
            default:
                return state;
        }
    }, initialState);

    useEffect(() => {
        dispatch({type: Mode.LOGIN});
    }, []);

    return [state, dispatch] as const;
};