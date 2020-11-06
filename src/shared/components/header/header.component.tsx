import React, {useContext} from "react";
import Box from "@material-ui/core/Box";
import './header.less';
import {AuthContext, UserAction} from "shared/services/auth/auth-context";
import UnauthenticatedHeader from "shared/components/header/unauthenticated-header";
import AuthenticatedHeader from "shared/components/header/authenticated-header";

export interface NavListType {
    url: string,
    title: string,
    isButton: boolean,
    className?: string
}

export default function Header() {
    const auth = useContext(AuthContext);

    const onLogoutClicked = () => {
        auth && auth.authDispatch({type: UserAction.LOGOUT});
    };

    return(
        <Box className={'tor-header__container'}>
            {auth && auth.authState.isAuthenticated ? <AuthenticatedHeader onLogout={onLogoutClicked} /> : <UnauthenticatedHeader />}
        </Box>
    );
}