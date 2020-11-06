import React from "react";
import {NavListType} from "shared/components/header/header.component";
import Box from "@material-ui/core/Box";
import {Link} from "react-router-dom";
import logo from "logo.svg";
import Button from "@material-ui/core/Button";

interface AuthenticatedHeaderProps {
    onLogout: () => void;
}

export default function AuthenticatedHeader(props: AuthenticatedHeaderProps) {
    const navs: NavListType[] = [
        {url: '/test', title: 'xxx', isButton: false}
    ];

    return(
        <Box className={'tor-header__sub-container'} data-testid={"authenticated-header"}>
            <Box className={'tor-header__left'}>
                <Link to="/">
                    <img src={logo} className="tor-header__logo-image" alt="logo" />
                </Link>
            </Box>
            <Box className={'tor-header__right'}>
                {navs.map(nav => (
                    nav.isButton
                        ?
                        (<Link key={nav.title} to={nav.url}>
                            <Button size="medium" variant="contained" color="secondary">
                                {nav.title}
                            </Button>
                        </Link>)
                        :
                        (<span key={nav.title}>
                            <Link to={nav.url}>{nav.title}</Link>
                        </span>)
                ))}
                <Link to={'#'}>
                    <Button data-testid={"logout"} onClick={props.onLogout} size="medium" variant="contained" color="secondary" className={"tor-header__logout"}>
                        Logout
                    </Button>
                </Link>
            </Box>
        </Box>
    );
}