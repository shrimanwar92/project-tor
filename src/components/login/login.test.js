import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import LoginComponent from "./login.component";
import { cleanup } from '@testing-library/react'

describe("LoginComponent", () => {

    afterEach(cleanup);

    const setInputValueAndBlur = (label, val) => {
        const input = screen.getByLabelText(label);
        fireEvent.focus(input);
        fireEvent.change(input, { target:  { value: val } });
        expect(input.value).toBe(val);
        fireEvent.blur(input);
        return input;
    };

    it("should properly initialize the component", async () => {
        const component = render(<LoginComponent></LoginComponent>);
        expect(component).toBeDefined();
        expect(screen.queryByLabelText("email")).toBeVisible();
        expect(screen.queryByLabelText("password")).toBeVisible();
        expect(screen.queryByLabelText("login")).toBeDisabled();
    });

    it("should validate email", async () => {
        render(<LoginComponent></LoginComponent>);
        setInputValueAndBlur("email", "");
        expect(screen.queryByText("Please enter your email address")).toBeVisible();

        setInputValueAndBlur("email", "test12");
        expect(screen.queryByText("Please enter a valid email address")).toBeVisible();

        expect(screen.queryByLabelText("login")).toBeDisabled();
    });

    it("should validate password", async () => {
        render(<LoginComponent></LoginComponent>);

        setInputValueAndBlur("email", "abc@xyz.com");
        setInputValueAndBlur("password", "");
        expect(screen.queryByText("Please enter your password")).toBeVisible();

        // due to some limitations with react testing library we  could not test password min validation
        // so instead we test button disability
        expect(screen.queryByLabelText("login")).toBeDisabled();
    });

    it("should enable submit button if valid email and password are provided", async () => {
        render(<LoginComponent></LoginComponent>);
        setInputValueAndBlur("email", "admin@example.com");
        setInputValueAndBlur("password", "admin12345");
        expect(screen.queryByLabelText("login")).not.toBeDisabled();
    });

    it("should display password when show is clicked", async () => {
        const {container} = render(<LoginComponent></LoginComponent>);

        const showPasswordButton = container.querySelector(".tor-login__show-password");
        const password = container.querySelector(".tor-login__password");
        setInputValueAndBlur("password", "test123");

        fireEvent.click(showPasswordButton);
        expect(showPasswordButton.textContent).toBe("Hide");
        expect(password.getAttribute('type')).toBe("text");

        fireEvent.click(showPasswordButton);
        expect(showPasswordButton.textContent).toBe("Show");
        expect(password.getAttribute('type')).toBe("password");
    });

    it("should be able to toggel between login and forgot password screen", async () => {
        const {container} = render(<LoginComponent></LoginComponent>);
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
        expect(submit.textContent.toLowerCase()).toBe("log in");
    });
});