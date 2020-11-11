import React from "react";
import {useGoogleLogin, useGoogleLogout, GoogleLoginResponse, GoogleLoginResponseOffline} from "react-google-login";
import Button from "@material-ui/core/Button";
import './google-login.less';

const clientId = '707788443358-u05p46nssla3l8tmn58tpo9r5sommgks.apps.googleusercontent.com';

interface GoogleLoginErrorResponse {
    error: string,
    details: string
}

type GoogleLoginSuccessResponse = GoogleLoginResponse | GoogleLoginResponseOffline;

interface GoogleLoginProps {
    onSuccess: (response: GoogleLoginSuccessResponse) => void,
    onFailure: (response: GoogleLoginErrorResponse) => void
}

export default function GoogleLoginComponent(props: GoogleLoginProps) {

    const onSuccess = (res: GoogleLoginSuccessResponse) => {
        const successResponse = res as GoogleLoginResponse;
        if(successResponse && successResponse.profileObj) {
            props && props.onSuccess(successResponse);
        }
        //refreshTokenSetup(res);
    };

    const onFailure = (response: GoogleLoginErrorResponse) => {
        props && props.onFailure(response);
    };

    const { signIn } = useGoogleLogin({
        onSuccess,
        onFailure,
        clientId,
        isSignedIn: true,
        accessType: 'offline'
    });

    return (
        <Button
            startIcon={
                <img className={'tor-google-login__image'} src="icons/google.svg" alt="Google login"></img>
            }
            fullWidth
            variant="outlined"
            color="primary"
            onClick={signIn}
            className={'tor-google-login__button'}>
            Sign in with Google
        </Button>
    );

}