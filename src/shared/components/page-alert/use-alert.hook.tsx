import {useReducer} from "react";

interface AlertState {
    errorMessage: string,
    type: AlertType | undefined
}

export enum AlertType {
    ERROR = "error",
    INFO = "info",
    WARNING = "warning",
    SUCCESS = "success"
}

type ErrorAction = {type: AlertType, errorMessage: string};

export function useAlert() {
    const errorInitialState: AlertState = {
        errorMessage: "",
        type: undefined
    };

    const [errorState, errorDispatch] = useReducer((state: AlertState, action: ErrorAction): AlertState => {
        switch (action.type) {
            case AlertType.ERROR:
                return { ...state, errorMessage: action.errorMessage, type: AlertType.ERROR };
            case AlertType.INFO:
                return { ...state, errorMessage: action.errorMessage, type: AlertType.INFO };
            case AlertType.WARNING:
                return { ...state, errorMessage: action.errorMessage, type: AlertType.WARNING };
            case AlertType.SUCCESS:
                return { ...state, errorMessage: action.errorMessage, type: AlertType.SUCCESS };
            default:
                return state;
        }
    }, errorInitialState);

    return [errorState, errorDispatch] as const;
}