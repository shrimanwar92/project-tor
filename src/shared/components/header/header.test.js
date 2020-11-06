import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import Header from "shared/components/header/header.component";
import {AuthContext} from "shared/services/auth/auth-context";
import {BrowserRouter as Router} from "react-router-dom";
import AuthenticatedHeader from "shared/components/header/authenticated-header";
import UnauthenticatedHeader from "shared/components/header/unauthenticated-header";
import userEvent from "@testing-library/user-event";

describe("HeaderComponent", () => {
    it('should render authenticated header if user is authenticated', () => {
        const state = {authState: {isAuthenticated: true}};
        render(
            <AuthContext.Provider value={state}>
                <Router>
                    <Header />
                </Router>
            </AuthContext.Provider>
        );
        expect(screen.queryByTestId("authenticated-header")).toBeVisible();
        expect(screen.queryByTestId("unauthenticated-header")).toBeNull();
    });

    it('should render un-authenticated header if user is not authenticated', () => {
        const state = {authState: {isAuthenticated: false}};
        render(
            <AuthContext.Provider value={state}>
                <Router>
                    <Header />
                </Router>
            </AuthContext.Provider>
        );
        expect(screen.queryByTestId("authenticated-header")).toBeNull();
        expect(screen.queryByTestId("unauthenticated-header")).toBeVisible();
    });

    it('should dispatch logout event on clicking logout', () => {
        const state = {authState: {isAuthenticated: true}, authDispatch: jest.fn()};
        const {container} = render(
            <AuthContext.Provider value={state}>
                <Router>
                    <Header />
                </Router>
            </AuthContext.Provider>
        );
        fireEvent.click(container.querySelector(".tor-header__logout"));
        expect(state.authDispatch).toHaveBeenCalledWith({"type": "LOGOUT"});
    });
});

describe("AuthenticatedHeader", () => {
    it('should logout when logout button is clicked', () => {
        const state = {authState: {isAuthenticated: true}};
        const onLogout = jest.fn();
        render(
            <AuthContext.Provider value={state}>
                <Router>
                    <AuthenticatedHeader onLogout={onLogout} />
                </Router>
            </AuthContext.Provider>
        );
        userEvent.click(screen.getByTestId("logout"));
        expect(onLogout).toHaveBeenCalled();
    });
});

describe("UnauthenticatedHeader", () => {
    it('should redirect to login screen when login button is clicked', () => {
        const {container} = render(
            <Router>
                <UnauthenticatedHeader />
            </Router>
        );
        fireEvent.click(container.querySelector(".tor-header__login"));
        expect(screen.getByText('Log in').closest('a')).toHaveAttribute('href', '/login');
    });

    it('should redirect to register user screen when register button is clicked', () => {
        const {container} = render(
            <Router>
                <UnauthenticatedHeader />
            </Router>
        );
        fireEvent.click(container.querySelector(".tor-header__register"));
        expect(screen.getByText('Get started').closest('a')).toHaveAttribute('href', '/register');
    });
});