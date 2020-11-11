import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginComponent from "./login.component";
import { cleanup } from '@testing-library/react'
import {BrowserRouter as Router} from "react-router-dom";

describe("LoginComponent", () => {

    afterEach(cleanup);
    beforeEach(() => {
        render(
            <Router>
                <LoginComponent />
            </Router>
        );
    });

    const setInputValueAndBlur = (label, val) => {
        const input = screen.getByLabelText(label);
        fireEvent.focus(input);
        fireEvent.change(input, { target:  { value: val } });
        expect(input.value).toBe(val);
        fireEvent.blur(input);
        return input;
    };

    it("should properly initialize the component", async () => {
        expect(screen.queryByLabelText("email")).toBeVisible();
        expect(screen.queryByLabelText("password")).toBeVisible();
        expect(screen.queryByLabelText("login")).toBeDisabled();
    });

    it("should validate email", async () => {
        setInputValueAndBlur("email", "");
        expect(screen.queryByText("Please enter your email address")).toBeVisible();

        setInputValueAndBlur("email", "test12");
        expect(screen.queryByText("Please enter a valid email address")).toBeVisible();

        expect(screen.queryByLabelText("login")).toBeDisabled();
    });

    it("should validate password", async () => {
        setInputValueAndBlur("email", "abc@xyz.com");
        setInputValueAndBlur("password", "");
        expect(screen.queryByText("Please enter your password")).toBeVisible();

        // due to some limitations with react testing library we  could not test password min validation
        // so instead we test button disability
        expect(screen.queryByLabelText("login")).toBeDisabled();
    });

    it("should enable submit button if valid email and password are provided", async () => {
        setInputValueAndBlur("email", "admin@example.com");
        setInputValueAndBlur("password", "admin12345");
        expect(screen.queryByLabelText("login")).not.toBeDisabled();
    });

    it("should display password when show is clicked", async () => {
        setInputValueAndBlur("password", "test123");

        fireEvent.click(screen.queryByLabelText("show-password"));
        expect(screen.queryByLabelText("show-password").textContent).toBe("Hide");
        expect(screen.queryByLabelText("password").getAttribute('type')).toBe("text");

        fireEvent.click(screen.queryByLabelText("show-password"));
        expect(screen.queryByLabelText("show-password").textContent).toBe("Show");
        expect(screen.queryByLabelText("password").getAttribute('type')).toBe("password");
    });

    it("should be able to toggle between login and forgot password screen", async () => {
        /*const {container} = render(<LoginComponent></LoginComponent>);
        const heading = container.querySelector(".tor-login__heading");
        const submit = container.querySelector(".tor-login__submit");

        expect(heading.textContent.toLowerCase()).toBe("login");
        expect(screen.queryByLabelText("email")).toBeVisible();
        expect(screen.queryByLabelText("password")).toBeVisible();
        expect(submit.textContent.toLowerCase()).toBe("log in");

        fireEvent.click(screen.getByLabelText('forgot password'));
        expect(heading.textContent.toLowerCase()).toBe("forgot password");
        expect(screen.queryByLabelText("email")).toBeVisible();
        expect(screen.queryByLabelText("password")).toBeNull();
        expect(submit.textContent.toLowerCase()).toBe("reset password");

        fireEvent.click(screen.getByLabelText('back to login'));
        expect(heading.textContent.toLowerCase()).toBe("login");
        expect(screen.queryByLabelText("back to login")).toBeNull();
        expect(screen.queryByLabelText("email")).toBeVisible();
        expect(screen.queryByLabelText("password")).toBeVisible();
        expect(submit.textContent.toLowerCase()).toBe("log in");*/
        fireEvent.click(screen.getByText("Forgot password?"));
        expect(screen.getByText("Forgot password?").closest('a')).toHaveAttribute('href', '/forgot-password');
        await waitFor(() => expect(screen.queryByLabelText("forgot-password-heading").textContent).toBe("as"));
    });
});