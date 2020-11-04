import React from "react";
import { renderHook, act } from '@testing-library/react-hooks';
import useFetch from "shared/hooks/use-fetch.hook";
import axios from 'axios';

jest.mock('axios');

describe("UseFetchHook", () => {

    it("should give successful response", async () => {
        const data = {
            data: [{
                item: "1",
                success: true
            }]
        };
        axios.get.mockImplementation(() => Promise.resolve(data));
        const { result, waitForNextUpdate } = renderHook(() => useFetch("test url"));
        expect(result.current).toMatchObject({"data": [], "error": undefined, "isLoading": true});
        await waitForNextUpdate();
        expect(result.current).toMatchObject({"data": data.data, "isLoading": false});
    });

    it("should handle error", async () => {
        const error = {
            message: "some error"
        };
        axios.get.mockImplementation(() => Promise.reject(error));
        const { result, waitForNextUpdate } = renderHook(() => useFetch("test url"));
        expect(result.current).toMatchObject({"data": [], "error": undefined, "isLoading": true});
        await waitForNextUpdate();
        expect(result.current).toMatchObject({"isLoading": false, error: "some error"});
    });
});