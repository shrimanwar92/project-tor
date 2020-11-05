import React from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import LandingPageComponent from "components/landing-page/landing-page.component";
import Header from "shared/components/header/header.component";

export default function AuthenticatedRoutes() {
    return(
        <Router>
            <Header></Header>
            {/* A <Switch> looks through its children <Route>s and renders the first one that matches the current URL. */}
            <Switch>
                <Route
                    path={'/'}
                    component={() => <LandingPageComponent></LandingPageComponent>}>
                </Route>
                <Route path="*" component={LandingPageComponent} />
            </Switch>
        </Router>
    );
}