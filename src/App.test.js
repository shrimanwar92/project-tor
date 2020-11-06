import React from 'react';
import {render, screen} from '@testing-library/react';
import App from "App";
import {CurrentUser} from "shared/services/current-user/current-user.service";

describe("App", () => {
    it('should show authenticated route header on successful login', () => {
        const spy = jest.spyOn(CurrentUser, "getUser").mockReturnValueOnce({user: "test", token: "123axc"});
        render(<App />);
        expect(spy).toHaveBeenCalled();
        expect(screen.queryByTestId("authenticated-header")).toBeVisible();
        expect(screen.queryByTestId("unauthenticated-header")).toBeNull();
    });

    it('should show un-authenticated route header on failed login', () => {
        const spy = jest.spyOn(CurrentUser, "getUser").mockReturnValueOnce({user: "", token: ""});
        render(<App />);
        expect(spy).toHaveBeenCalled();
        expect(screen.queryByTestId("authenticated-header")).toBeNull();
        expect(screen.queryByTestId("unauthenticated-header")).toBeVisible();
    });
});