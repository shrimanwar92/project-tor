import React, {useEffect, useReducer} from 'react';
import './App.less';
import {AuthContext, UserAction as Action, authReducer, initialState} from "shared/services/auth/auth-context";
import AuthenticatedRoutes from "routes/authenticated-routes";
import UnauthenticatedRoutes from "routes/unauthenticated-routes";
import {CurrentUser} from "shared/services/current-user/current-user.service";

function App() {
    const [authState, authDispatch] = useReducer(authReducer, initialState);
    const {user, token} = CurrentUser.getUser();

    useEffect(() => {
        if(user && token) {
            authDispatch({type: Action.LOGIN, data: {user, token}});
        }
    }, [user, token]);

    return (
        <AuthContext.Provider value={{authState, authDispatch}}>
            <div className={'tor-app__container'}>
                {authState.isAuthenticated ? <AuthenticatedRoutes /> : <UnauthenticatedRoutes />}
            </div>
        </AuthContext.Provider>
    );
}

export default App;
