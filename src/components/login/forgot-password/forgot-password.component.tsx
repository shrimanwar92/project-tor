import React, {useState} from "react";
import InputWithValidator, {InputValidatorResponse} from "shared/components/input-validator/input-validator.component";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import {Link} from "react-router-dom";
import "./forgot-password.less";
import '../login.less';

export default function ForgotPasswordComponent() {
    const [disabled, setDisabled] = useState<boolean>(true); // forgot password button should be disabled by default
    const [email, setEmail] = useState<string>("");

    const onChangeInput = (data: InputValidatorResponse) => {
        setEmail(data.value);
        setDisabled(data.isError);
    };

    const submit = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        console.log(email);
        return false;
    };

    const getEmailInput = () => {
        return(
            <Grid item xs={12}>
                <InputWithValidator
                    inputProps={{ type: "email", "aria-label": "email", className: `tor-forgot-password__email`, name: "email", value: email }}
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

    const getSubmitButton = () => {
        return(
            <Grid item xs={12}>
                <Button
                    aria-label={'forgot password'}
                    color="secondary"
                    fullWidth
                    type="submit"
                    onClick={submit}
                    className={"tor-forgot-password__submit"}
                    variant="contained"
                    disabled={disabled}>
                    Forgot password
                </Button>
            </Grid>
        );
    };

    const getBackToLogin = () => {
        return(
            <Grid item xs={12} className={`tor-forgot-password__back-to-login`}>
                <Link to={'/login'}>
                    <Button aria-label={'back to login'} fullWidth variant="outlined" color="secondary">
                        Back to login
                    </Button>
                </Link>
            </Grid>
        );
    };

    return(
        <div className={'tor-login__main'}>
            <Container maxWidth={'sm'} className={'tor-login__container'}>
                <Box className={`tor-login__heading`}  aria-label={'forgot-password-heading'}>
                    <span><h2>Forgot password</h2></span>
                </Box>
                <form className={`tor-login__form`} noValidate>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Grid container spacing={3}>
                                {getEmailInput()}
                            </Grid>
                        </Grid>
                        {getSubmitButton()}
                        {getBackToLogin()}
                    </Grid>
                </form>
            </Container>
        </div>
    );
}