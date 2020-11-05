import React, {useCallback, useContext, useEffect, useState} from 'react';
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import './login.less';
import InputWithValidator, {InputValidatorResponse} from "shared/components/input-validator/input-validator.component";
import Link from "@material-ui/core/Link";
import useMode, {Mode} from "./use-login-mode.hook";
import {AuthContext, UserAction} from "shared/services/auth/auth-context";


type FieldType = 'email' | 'password';
type LoginType = Record<FieldType, {
    value: string,
    isError: boolean
}>;

const initialState: LoginType = {
    email: {value: "", isError: true},
    password: {value: "", isError: true}
};

export default function LoginComponent() {
    const auth = useContext(AuthContext);
    const [formData, setFormData] = useState<LoginType>(initialState);
    const [disabled, setDisabled] = useState<boolean>(false);
    const [isShow, setIsShow] = useState<boolean>(false);
    const [state, dispatch] = useMode();

    const isDisabled = useCallback(() => {
        if(state.mode === Mode.LOGIN) {
            return formData.email.isError || formData.password.isError;
        }
        return formData.email.isError;
    }, [formData.email.isError, formData.password.isError, state.mode]);

    useEffect(() => {
        setDisabled(isDisabled);
    }, [isDisabled]);

    const onChangeInput = (data: InputValidatorResponse) => {
        setFormData({
            ...formData,
            [data.field]: {value: data.value, isError: data.isError}
        });
    };

    const showPassword = () => setIsShow((prevState) => !prevState);

    const forgotPasswordLinkClicked = () => {
        setFormData(initialState);
        dispatch({type: Mode.FORGOT_PASSWORD});
    };

    const backToLogin = () => {
        setFormData(initialState);
        dispatch({type: Mode.LOGIN});
    };

    const submit = (event: any) => {
        event.preventDefault();
        auth && auth.authDispatch({type: UserAction.LOGIN, data: {user: "lorena", token: "xxx"}});
        return false;
    };

    const getEmailInput = () => {
        return(
            <Grid item xs={12}>
                <InputWithValidator
                    inputProps={{ type: "email", "aria-label": "email", className: `tor-login__email`, name: "email", value: formData.email.value }}
                    label={"Email"}
                    checks={
                        {
                            typeMismatch: "Please enter a valid email address",
                            valueMissing: "Please enter your email address"
                        }
                    }
                    required={true}
                    onChange={onChangeInput}/>
            </Grid>
        );
    };

    const getForgotPassword = () => {
        return(
            <Grid item xs={12}>
                <Link aria-label={'forgot password'} className={`tor-login__forgot-password`} onClick={forgotPasswordLinkClicked}>Forgot password?</Link>
            </Grid>
        );
    };

    const getPasswordInput = () => {
        return(
            <Grid item xs={12} className={`tor-login__password-section`}>
                <InputWithValidator
                    inputProps={{ type: isShow ? "text" : "password", "aria-label": "password", className: `tor-login__password`, minLength: 8, name: "password" }}
                    label={"Password"}
                    checks={
                        {
                            tooShort: "Password should be at least 8 characters in length",
                            valueMissing: "Please enter your password"
                        }
                    }
                    required={true}
                    onChange={onChangeInput} />
                <div className={`tor-login__show-password`} onClick={showPassword}>
                    {isShow ? <span>Hide</span> : <span>Show</span>}
                </div>
            </Grid>
        );
    };

    const getBackToLogin = () => {
        return(
            <Grid item xs={12} className={`${state.className}__back-to-login`}>
                <Button aria-label={'back to login'} fullWidth variant="outlined" color="secondary" onClick={backToLogin}>
                    Back to login
                </Button>
            </Grid>
        );
    };

    const getSubmitButton = () => {
        return(
            <Grid item xs={12}>
                <Button
                    aria-label={'login'}
                    color="secondary"
                    fullWidth
                    type="submit"
                    onClick={submit}
                    className={`${state.className}__submit`}
                    variant="contained"
                    disabled={disabled}>
                    {state.buttonText}
                </Button>
            </Grid>
        );
    };

    const getForm = () => {
        return(
            <form className={`tor-login__form`} noValidate>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Grid container spacing={3}>
                            {getEmailInput()}
                            {state.mode === Mode.LOGIN ? getPasswordInput() : null}
                            {state.mode === Mode.LOGIN ? getForgotPassword() : null}
                        </Grid>
                    </Grid>
                    {getSubmitButton()}
                    {state.mode === Mode.FORGOT_PASSWORD ? getBackToLogin() : null}
                </Grid>
            </form>
        );
    }


    return(
        <div className={'tor-login__main'}>
            <Container maxWidth={'sm'} className={'tor-login__container'}>
                <Box className={`tor-login__heading`}>
                    <span><h2>{state.heading}</h2></span>
                </Box>
                {getForm()}
            </Container>
        </div>
    );
}

/*<Button onClick={onDialogOpen}>TEST</Button>
<CustomDialog
    isOpen={isOpen}
    onClose={onDialogClose}
    title={'XXX'}
    subtitle={'tdgdhhghg ftiiutiutiutiu fdgfdgfdgfdgf'}
    onSave={onSave}>
    <div>Hi there</div>
</CustomDialog>*/
