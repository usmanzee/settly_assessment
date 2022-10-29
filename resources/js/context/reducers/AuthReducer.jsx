import types from "../types";

const AuthReducer = (state, { payload, type }) => {
    switch (type) {
        case types.LOGIN_FETCH:
            return {
                ...state,
                loading: true,
            };

        case types.LOGIN_SUCCESS:
            return {
                ...state,
                loggedIn: true,
                loading: false,
            };

        case types.LOGIN_ERROR:
            return {
                ...state,
                loading: false,
                error: true,
            };
        default:
            return state;
    }
};

export default AuthReducer;
