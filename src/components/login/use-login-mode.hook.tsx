import { useReducer, useEffect } from 'react';

export enum Mode {
    GOOGLE,
    FACEBOOK,
    NORMAL
}

export type State = {
    mode: Mode
};

export type Action = {type: Mode};

export default function useMode() {

    const initialState: State = {
        mode: Mode.NORMAL
    };

    const [state, dispatch] = useReducer((state: State, action: Action): State => {
        switch (action.type) {
            case Mode.GOOGLE:
                return { ...initialState, mode: Mode.GOOGLE };
            case Mode.FACEBOOK:
                return { ...initialState, mode: Mode.FACEBOOK };
            default:
                return state;
        }
    }, initialState);

    useEffect(() => {
        dispatch({type: Mode.NORMAL});
    }, []);

    return [state, dispatch] as const;
};