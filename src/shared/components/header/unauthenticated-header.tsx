import React from "react";
import {NavListType} from "shared/components/header/header.component";
import Box from "@material-ui/core/Box";
import {Link} from "react-router-dom";
import logo from "logo.svg";
import Button from "@material-ui/core/Button";

export default function UnauthenticatedHeader() {
    const navs: NavListType[] = [
        {url: '/login', title: 'Log in', isButton: false, className: "tor-header__login"},
        {url: '/register', title: 'Get started', isButton: true, className: "tor-header__register"}
    ];

    return(
        <Box className={'tor-header__sub-container'} data-testid={"unauthenticated-header"}>
            <Box className={'tor-header__left'}>
                <Link to="/">
                    <img src={logo} className="tor-header__logo-image" alt="logo" />
                </Link>
            </Box>
            <Box className={'tor-header__right'}>
                {navs.map(nav => (
                    nav.isButton
                        ?
                        (<Link className={nav.className || ""} key={nav.title} to={nav.url}>
                            <Button size="medium" variant="contained" color="secondary">
                                {nav.title}
                            </Button>
                        </Link>)
                        :
                        (<span className={nav.className || ""} key={nav.title}>
                            <Link to={nav.url}>{nav.title}</Link>
                        </span>)
                ))}
            </Box>
        </Box>
    );
}