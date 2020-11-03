import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import InputWithValidator from "shared/components/input-validator/input-validator.component";

describe("InputWithValidator", () => {

    const setInputValueAndBlur = (component, val) => {
        const input = component.container.querySelector('.test-class');
        fireEvent.change(input, { target:  { value: val } });
        expect(input.value).toBe(val);
        fireEvent.blur(input);
    };

    it("should properly initialize the component", async () => {
        const options = {
            inputProps: { type: "text", className: "test-class", name: "test" },
            label: "Test",
            checks: {
                valueMissing: "error message"
            }
        };
        const component = render(<InputWithValidator {...options}></InputWithValidator>);
        expect(component).toBeDefined();
        expect(component.container.querySelector(".test-class")).toBeVisible();

    });

    it("should show error message on blur when input is empty", async () => {
        const options = {
            inputProps: { type: "text", className: "test-class", name: "test" },
            label: "Test",
            checks: {
                valueMissing: "error message"
            },
            required: true
        };
        const component = render(<InputWithValidator {...options}></InputWithValidator>);
        setInputValueAndBlur(component, "");
        expect(screen.getByText('error message')).toBeVisible();
        setInputValueAndBlur(component, "xyz");
        expect(screen.queryByText('error message')).toBeNull();
    });

    it("should call onChange when input changes", async () => {
        const options = {
            inputProps: { type: "text", className: "test-class", name: "test" },
            label: "Test",
            checks: {
                valueMissing: "error message"
            },
            required: true,
            onChange: jest.fn()
        };
        const component = render(<InputWithValidator {...options}></InputWithValidator>);
        setInputValueAndBlur(component, "123test");
        expect(screen.queryByText('error message')).toBeNull();
        expect(options.onChange).toHaveBeenCalledTimes(1);
    });
});