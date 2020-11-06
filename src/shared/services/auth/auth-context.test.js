import {authReducer, initialState} from "shared/services/auth/auth-context";

describe("AuthContext", () => {
    it('should test login action', () => {
        const loginAction = {type: 'LOGIN', data: {user: "test", token: "xcdfgt2dr5"}};
        const updatedState = authReducer(initialState, loginAction);
        expect(updatedState).toMatchObject({"isAuthenticated": true, "token": "xcdfgt2dr5", "user": "test"});
    });

    it('should test logout action', () => {
        const logoutAction = {type: 'LOGOUT'};
        const updatedState = authReducer(initialState, logoutAction);
        expect(updatedState).toMatchObject({"isAuthenticated": false, "token": undefined, "user": undefined});
    });

    it('should test unknown action', () => {
        const action = {type: null};
        const updatedState = authReducer(initialState, action);
        expect(updatedState).toBe(initialState);
    });
});