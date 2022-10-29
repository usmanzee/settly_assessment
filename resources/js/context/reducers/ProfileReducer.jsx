import types from "../types";

const ProfileReducer = (state, { payload, type }) => {
    switch (type) {
        case types.PROFILE_FETCH: {
            return {
                ...state,
                loading: true,
            };
        }

        case types.PROFILE_DATA: {
            return {
                ...state,
                loading: false,
                data: payload,
            };
        }
        case types.PROFILE_ERROR: {
            return {
                ...state,
                loading: false,
                data: null,
            };
        }
        case types.PROFILE_RESET: {
            return {
                ...state,
                loading: false,
                data: null,
            };
        }
        default:
            return state;
    }
};

export default ProfileReducer;
