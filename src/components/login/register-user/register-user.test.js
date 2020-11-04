import React from 'react';
import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import RegisterUserComponent from "./register-user.component";
import userEvent from "@testing-library/user-event";

describe("RegisterUserComponent", () => {
    const setInputValueAndBlur = (label, val) => {
        const input = screen.getByLabelText(label);
        fireEvent.focus(input);
        fireEvent.change(input, { target:  { value: val } });
        expect(input.value).toBe(val);
        fireEvent.blur(input);
        return input;
    };

    it("should properly initialize the component", async () => {
        const {container} = render(<RegisterUserComponent></RegisterUserComponent>);
        expect(container.querySelector(".tor-register-user__heading").textContent).toBe("Register");
        expect(screen.queryByLabelText("firstName")).toBeVisible();
        expect(screen.queryByLabelText("lastName")).toBeVisible();
        expect(screen.queryByLabelText("mobileNumber")).toBeVisible();
        expect(screen.queryByLabelText("email")).toBeVisible();
        expect(screen.queryByLabelText("password")).toBeVisible();
        expect(screen.queryByLabelText("confirmPassword")).toBeDisabled();
        expect(screen.queryByLabelText("submit")).toBeDisabled();
    });

    it("should show validation messages for required fields", async () => {
        render(<RegisterUserComponent></RegisterUserComponent>);
        setInputValueAndBlur("firstName", "");
        setInputValueAndBlur("lastName", "");
        setInputValueAndBlur("mobileNumber", "");
        setInputValueAndBlur("email", "");
        setInputValueAndBlur("password", "");
        setInputValueAndBlur("confirmPassword", "");

        expect(screen.queryByText("Please enter your first name")).toBeVisible();
        expect(screen.queryByText("Please enter your last name")).toBeVisible();
        expect(screen.queryByText("Please enter your mobile number")).toBeVisible();
        expect(screen.queryByText("Please enter your email address")).toBeVisible();
        expect(screen.queryByText("Please enter your password")).toBeVisible();

        expect(screen.queryByLabelText("confirmPassword")).toBeDisabled();
        expect(screen.queryByLabelText("submit")).toBeDisabled();
    });

    it("should validate password and confirm password fields", async () => {
        render(<RegisterUserComponent></RegisterUserComponent>);
        setInputValueAndBlur("password", "");
        expect(screen.queryByText("Please enter your password")).toBeVisible();
        setInputValueAndBlur("password", "1234");
        expect(screen.queryByLabelText("confirmPassword")).not.toBeDisabled();
        setInputValueAndBlur("confirmPassword", "12");
        expect(screen.queryByText("Password and confirm password does not match")).toBeVisible();
        setInputValueAndBlur("confirmPassword", "1234");
        expect(screen.queryByText("Password and confirm password does not match")).toBeNull();
    });

    it("should enable submit button if all inputs are valid", async () => {
        render(<RegisterUserComponent></RegisterUserComponent>);
        setInputValueAndBlur("firstName", "abc");
        setInputValueAndBlur("lastName", "xyz");
        setInputValueAndBlur("mobileNumber", "1234567890");
        setInputValueAndBlur("email", "nhj@asd.com");
        setInputValueAndBlur("password", "12345678");
        setInputValueAndBlur("confirmPassword", "12345678");

        expect(screen.queryByLabelText("submit")).not.toBeDisabled();
    });

    it("should validate mobile number", async () => {
        const {container} = render(<RegisterUserComponent></RegisterUserComponent>);
        setInputValueAndBlur("mobileNumber", "");
        expect(screen.queryByText("Please enter your mobile number")).toBeVisible();
        setInputValueAndBlur("mobileNumber", "1234sdsd");
        expect(screen.queryByText("Please enter a valid mobile number")).toBeVisible();
    });
});