import React from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Header from "shared/components/header/header.component";
import LoginComponent from "components/login/login.component";
import RegisterUserComponent from "components/login/register-user/register-user.component";
import ForgotPasswordComponent from "components/login/forgot-password/forgot-password.component";

export default function UnauthenticatedRoutes() {
    return(
        <Router>
            <Header></Header>
            {/* A <Switch> looks through its children <Route>s and renders the first one that matches the current URL. */}
            <Switch>
                <Route
                    path={'/login'}
                    component={() => <LoginComponent></LoginComponent>}>
                </Route>
                <Route
                    path={'/forgot-password'}
                    component={() => <ForgotPasswordComponent></ForgotPasswordComponent>}>
                </Route>
                <Route
                    path={'/register'}
                    component={() => <RegisterUserComponent></RegisterUserComponent>}>
                </Route>
                <Route path="*" component={LoginComponent} />
            </Switch>
        </Router>
    );
}