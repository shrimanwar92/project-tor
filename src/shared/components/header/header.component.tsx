import React from "react";
import Box from "@material-ui/core/Box";
import './header.less';
import logo from '../../../logo.svg';
import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';

interface NavListType {
    url: string,
    title: string,
    isButton: boolean
}

export default function Header() {
    const navs: NavListType[] = [
        {url: '/login', title: 'Log in', isButton: false},
        {url: '/register', title: 'Get started', isButton: true}
    ];

    return(
        <Box className={'tor-header__container'}>
            <Box className={'tor-header__sub-container'}>
                <Box className={'tor-header__left'}>
                    <Link to="/">
                        <img src={logo} className="tor-header__logo-image" alt="logo" />
                    </Link>
                </Box>
                <Box className={'tor-header__right'}>
                    {navs.map(nav => (
                        nav.isButton
                                ? (<Link to={nav.url}>
                                        <Button size="medium" variant="contained" color="secondary">
                                            {nav.title}
                                        </Button>
                                    </Link>)
                                :   (<span>
                                        <Link to={nav.url}>{nav.title}</Link>
                                    </span>)
                    ))}
                </Box>
            </Box>
        </Box>
    );
}