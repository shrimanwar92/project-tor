import React from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import './App.less';
import LoginComponent from "components/login/login.component";
import Header from "shared/components/header/header.component";
import LandingPageComponent from "components/landing-page/landing-page.component";
import RegisterUserComponent from "components/login/register-user/register-user.component";

function App() {
    return (
        <div className={'tor-app__container'}>
            <Router>
                <Header></Header>
                {/* A <Switch> looks through its children <Route>s and
                    renders the first one that matches the current URL. */}
                <Switch>
                    <Route
                        path={'/login'}
                        component={() => <LoginComponent></LoginComponent>}>
                    </Route>
                    <Route
                        path={'/register'}
                        component={() => <RegisterUserComponent></RegisterUserComponent>}>
                    </Route>
                    <Route
                        path={'/'}
                        component={() => <LandingPageComponent></LandingPageComponent>}>
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
