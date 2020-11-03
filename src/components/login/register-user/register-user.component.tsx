import React, {useCallback, useEffect, useState} from "react";
import {Box, Button, Container, Grid} from "@material-ui/core";
import InputWithValidator, {InputValidatorResponse} from "shared/components/input-validator/input-validator.component";
import './register-user.less';
import TextField from "@material-ui/core/TextField";

type FieldType = 'firstName' | 'lastName' | 'email' | 'password' | 'mobileNumber' | 'confirmPassword';
type FieldOption = {
    value: string,
    isError: boolean
};
type RegisterUserType = Record<FieldType, FieldOption>;

export default function RegisterUserComponent() {
    const initialState: RegisterUserType = {
        firstName: {value: "", isError: true},
        lastName: {value: "", isError: true},
        mobileNumber: {value: "", isError: true},
        email: {value: "", isError: true},
        password: {value: "", isError: true},
        confirmPassword: {value: "", isError: true}
    };

    const [formData, setFormData] = useState<RegisterUserType>(initialState);
    const [disabled, setDisabled] = useState<boolean>(false);

    const isDisabled = useCallback(() => {
        return Object.keys(formData).some((key) => (formData[key as keyof RegisterUserType]).isError);
    }, [formData]);

    useEffect(() => {
        setDisabled(isDisabled);
    }, [JSON.stringify(formData), isDisabled]);

    const onChangeInput = (data: InputValidatorResponse) => {
        setFormData({
            ...formData,
            [data.field]: {value: data.value, isError: data.isError}
        });
    };

    const onChangeConfirmPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChangeInput({
            field: "confirmPassword",
            value: event.target.value,
            isError: formData.password.value !== event.target.value
        } as InputValidatorResponse);
    };

    const saveUser = (event: React.MouseEvent) => {
        event.preventDefault();
        console.log('user saved');
        return false;
    };

    return(
        <div className={'tor-register-user__main'}>
            <Container maxWidth={'sm'} className={'tor-register-user__container'}>
                <Box className={`tor-register-user__heading`}>
                    <span><h2>Register</h2></span>
                </Box>
                <form className={`tor-register-user__form`} noValidate>
                    <Grid container spacing={4}>
                        <Grid item xs={12}>
                            <Grid container spacing={4}>
                                <Grid item xs={12} sm={6}>
                                    <InputWithValidator
                                        inputProps={
                                            {
                                                type: "text",
                                                "aria-label": "firstName",
                                                className: `tor-register-user__first-name`,
                                                name: "firstName",
                                                pattern: "[a-zA-Z]+",
                                                maxLength: 30
                                            }
                                        }
                                        label={"First name"}
                                        checks={
                                            {
                                                valueMissing: "Please enter your first name",
                                                patternMismatch: "Please enter a valid first name"
                                            }
                                        }
                                        required={true}
                                        onChange={onChangeInput}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <InputWithValidator
                                        inputProps={
                                            {
                                                type: "text",
                                                "aria-label": "lastName",
                                                className: `tor-register-user__last-name`,
                                                name: "lastName",
                                                pattern: "[a-zA-Z]+",
                                                maxLength: 30
                                            }
                                        }
                                        label={"Last name"}
                                        checks={
                                            {
                                                valueMissing: "Please enter your last name",
                                                patternMismatch: "Please enter a valid last name"
                                            }
                                        }
                                        required={true}
                                        onChange={onChangeInput}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <InputWithValidator
                                        inputProps={
                                            {
                                                type: "text",
                                                "aria-label": "mobileNumber",
                                                className: `tor-register-user__mobile-number`,
                                                name: "mobileNumber",
                                                minLength: 10,
                                                maxLength: 20,
                                                pattern: "^[0-9]*$"
                                            }
                                        }
                                        label={"Mobile number"}
                                        checks={
                                            {
                                                valueMissing: "Please enter your mobile number",
                                                patternMismatch: "Please enter a valid mobile number",
                                                tooShort: "Mobile number should be at least 10 digits"
                                            }
                                        }
                                        required={true}
                                        onChange={onChangeInput}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <InputWithValidator
                                        inputProps={
                                            {
                                                type: "email",
                                                "aria-label": "email",
                                                className: `tor-register-user__email`,
                                                name: "email"
                                            }
                                        }
                                        label={"Email"}
                                        checks={
                                            {
                                                typeMismatch: "Please enter a valid email address",
                                                valueMissing: "Please enter your email address"
                                            }
                                        }
                                        required={true}
                                        onChange={onChangeInput}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <InputWithValidator
                                        inputProps={
                                            {
                                                type: "password",
                                                "aria-label": "password",
                                                className: `tor-register-user__password`,
                                                minLength: 8,
                                                name: "password"
                                            }
                                        }
                                        label={"Password"}
                                        checks={
                                            {
                                                tooShort: "Password should be at least 8 characters in length",
                                                valueMissing: "Please enter your password"
                                            }
                                        }
                                        required={true}
                                        onChange={onChangeInput}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        required={true}
                                        label={'Confirm password'}
                                        variant={'outlined'}
                                        size={'small'}
                                        type={'password'}
                                        name={'confirmPassword'}
                                        className={'tor-register-user__confirm-password'}
                                        aria-label={'confirmPassword'}
                                        error={formData.password.value !== "" && formData.confirmPassword.isError}
                                        disabled={formData.password.value === ""}
                                        helperText={formData.password.value !== "" && formData.confirmPassword.isError ? "Password and confirm password does not match" : ""}
                                        onChange={onChangeConfirmPassword}>
                                    </TextField>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                aria-label={'login'}
                                color="secondary"
                                fullWidth
                                type="submit"
                                onClick={saveUser}
                                className={`tor-register-user__submit`}
                                variant="contained"
                                disabled={disabled}
                            >
                                Save
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Container>
        </div>
    );
}