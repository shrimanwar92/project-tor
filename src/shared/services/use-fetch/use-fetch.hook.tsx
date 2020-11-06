import { useEffect, useReducer } from 'react';
import axios from 'axios';

export enum FetchState {
    FETCHING,
    FETCHED,
    FETCH_ERROR
}

type State<T> = {
    data?: T[];
    isLoading: boolean;
    error?: string;
}

type Action<T> =
    | { type: FetchState.FETCHING }
    | { type: FetchState.FETCHED, data: T[] }
    | { type: FetchState.FETCH_ERROR, error: string };

export default function useFetch<T>(url: string) {
    const initialState: State<T> = {
        isLoading: false,
        data: [],
        error: undefined
    };

    const [state, dispatch] = useReducer((state: State<T>, action: Action<T>): State<T> => {
        switch (action.type) {
            case FetchState.FETCHING:
                return { ...initialState, isLoading: true };
            case FetchState.FETCHED:
                return { ...initialState, isLoading: false, data: action.data };
            case FetchState.FETCH_ERROR:
                return { ...initialState, isLoading: false, error: action.error };
        }
    }, initialState);

    useEffect(() => {
        if(!url) {
            dispatch({ type: FetchState.FETCH_ERROR, error: "Please provide a valid url" });
        }

        let cancelRequest = false;

        const fetchData = async () => {
            dispatch({ type: FetchState.FETCHING });
            try {
                const response = await axios.get(url);
                if (cancelRequest) return;
                dispatch({ type: FetchState.FETCHED, data: response.data });
            } catch (error) {
                if (cancelRequest) return;
                dispatch({ type: FetchState.FETCH_ERROR, error: error.message });
            }
        };

        url && fetchData();

        return function cleanup() {
            cancelRequest = true;
        };
    }, [url]);

    return state;
};