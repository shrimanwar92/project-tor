import React, {useState, AllHTMLAttributes, createRef} from "react";
import TextField from "@material-ui/core/TextField";

/*
* ValidityState has following types. We have used the native javascript constraint validation to validate the input types.
* ValidityState = {
    badInput
    customError
    patternMismatch
    rangeOverflow
    rangeUnderflow
    stepMismatch
    tooLong
    tooShort
    typeMismatch
    valid
    valueMissing
}
* Usage example:
    <InputWithValidator
        inputProps={{ type: "email", required: true }}
        label={"Email"}
        checks={
            {
                typeMismatch: "Please enter a valid email address",
                valueMissing: "Please enter email address"
            }
        }
    />
*/

interface InputValidatorProps {
    inputProps: AllHTMLAttributes<HTMLInputElement>,
    label: string,
    checks: {
        [key: string]: string
    },
    required?: boolean, // we cannot add it to input props as adding it there will not show "*" on label for required field
    onChange?: (data: InputValidatorResponse) => void
    onBlur?: (data: any) => void
}

export interface InputValidatorResponse {
    field: string,
    value: string,
    isError: boolean
}

export default function InputWithValidator(props: InputValidatorProps) {
    const [isError, setIsError] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");

    const validateInput = (event: React.FocusEvent<HTMLInputElement>): string | undefined => {
        const {validity} = event.target;
        return Object.keys(props.checks).find((check) => validity[check as keyof ValidityState]);
    };

    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        const state = validateInput(event as React.FocusEvent<HTMLInputElement>);
        setIsError(!!state);
        setMessage((state && props.checks[state]) || "");
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const state = validateInput(event as React.FocusEvent<HTMLInputElement>);
        props.onChange && props.onChange({
            field: event.target.name,
            value: event.target.value,
            isError: !!state
        });
    };

    return(
        <TextField
            fullWidth
            required={!!props.required}
            label={props.label}
            variant={'outlined'}
            size={'small'}
            inputProps={props.inputProps}
            error={isError}
            helperText={message}
            onBlur={handleBlur}
            onChange={handleChange}>
        </TextField>
    );
}