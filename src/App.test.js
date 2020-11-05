import React, {useReducer} from 'react';
import {render, screen, fireEvent, cleanup} from '@testing-library/react';
import App from "App";
//import AuthenticatedRoutes from "routes/authenticated-routes";
import UnauthenticatedRoutes from "routes/unauthenticated-routes";
import { renderHook, act } from '@testing-library/react-hooks';
import {authReducer, initialState} from "shared/services/auth/auth-context";
import {CurrentUser} from "shared/services/current-user/current-user.service";

describe("App", () => {
    it('should show authenticated route header on successful login', () => {
        const spy = jest.spyOn(CurrentUser, "getUser").mockReturnValueOnce({user: "test", token: "123axc"});
        render(<App />);
        expect(spy).toHaveBeenCalled();
        expect(screen.queryByText("Login")).toBeNull();
        expect(screen.queryByText("Logout")).toBeVisible();
    });

    it('should show un-authenticated route header on failed login', () => {
        const spy = jest.spyOn(CurrentUser, "getUser").mockReturnValueOnce({user: "", token: ""});
        render(<App />);
        expect(spy).toHaveBeenCalled();
        expect(screen.queryByText("Login")).toBeVisible();
        expect(screen.queryByText("Logout")).toBeNull();
    });
});