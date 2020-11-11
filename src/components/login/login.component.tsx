import React, {useContext, useEffect, useState} from 'react';
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import './login.less';
import InputWithValidator, {InputValidatorResponse} from "shared/components/input-validator/input-validator.component";
import useMode from "./use-login-mode.hook";
import {AuthContext, UserAction} from "shared/services/auth/auth-context";
import GoogleLoginComponent from "components/login/google-login/google-login.component";
import {Link} from "react-router-dom";
import {useAlert, PageAlert, AlertType} from "shared/components/page-alert";

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
    const [disabled, setDisabled] = useState<boolean>(true); // Login button should be disabled by default
    const [isShow, setIsShow] = useState<boolean>(false);
    // const [state, dispatch] = useMode();
    const [errorState, errorDispatch] = useAlert();

    useEffect(() => {
        setDisabled(formData.email.isError || formData.password.isError);
    }, [formData.email.isError, formData.password.isError, errorState.errorMessage]);

    const onChangeInput = (data: InputValidatorResponse) => {
        setFormData({
            ...formData,
            [data.field]: {value: data.value, isError: data.isError}
        });
    };

    const showPassword = () => setIsShow((prevState) => !prevState);

    const googleLoginSuccess = () => {
        //TODO:: Handle google login success
    };

    const googleLoginFailure = () => {
        //TODO:: Handle google login failure
        errorDispatch({type: AlertType.WARNING, errorMessage: "Google login failure"});
    };

    const submit = (event: React.MouseEvent<HTMLButtonElement>) => {
        //TODO:: Handle submit
        event.preventDefault();
        /*auth && auth.authDispatch({type: UserAction.LOGIN, data: {user: "lorena", token: "xxx"}});
        return false;*/
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

    const getForgotPasswordLink = () => {
        return(
            <Grid item xs={12}>
                <Link to={'/forgot-password'} data-testid={'forgot password'} className={`tor-login__forgot-password`}>Forgot password?</Link>
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
                <div className={`tor-login__show-password`} onClick={showPassword} aria-label={'show-password'}>
                    {isShow ? <span>Hide</span> : <span>Show</span>}
                </div>
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
                    className={`tor-login__submit`}
                    variant="contained"
                    disabled={disabled}>
                    Login
                </Button>
            </Grid>
        );
    };

    const get3rdPartyAuthButtons = () => {
        return(
            <Grid item xs={12} className={'tor-login__3rd-party-auth-buttons'}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <GoogleLoginComponent
                            onFailure={googleLoginFailure}
                            onSuccess={googleLoginSuccess} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Button fullWidth variant="outlined" color="primary">Sign in with Facebook</Button>
                    </Grid>
                </Grid>
            </Grid>
        );
    };


    return(
        <PageAlert errorMessage={errorState.errorMessage} type={errorState.type}>
            <div className={'tor-login__main'}>
                <Container maxWidth={'sm'} className={'tor-login__container'}>
                    <Box className={`tor-login__heading`}>
                        <span><h2>Login</h2></span>
                    </Box>
                    <form className={`tor-login__form`} noValidate>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Grid container spacing={3}>
                                    {getEmailInput()}
                                    {getPasswordInput()}
                                    {getForgotPasswordLink()}
                                </Grid>
                            </Grid>
                            {getSubmitButton()}
                            {get3rdPartyAuthButtons() }
                        </Grid>
                    </form>
                </Container>
            </div>
        </PageAlert>
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
