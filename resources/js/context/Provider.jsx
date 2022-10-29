import React, { createContext, useReducer } from "react";
import AuthReducer from "./reducers/AuthReducer";
import initialState from "./initialState";
import ProfileReducer from "./reducers/ProfileReducer";
import ClientsReducer from "./reducers/ClientsReducer";

export const GlobalContext = createContext({});

export const GlobalProvider = ({ children }) => {
    const [authState, authDispatch] = useReducer(
        AuthReducer,
        initialState.auth
    );
    const [profileState, profileDispatch] = useReducer(
        ProfileReducer,
        initialState.profile
    );
    const [clientsState, clientsDispatch] = useReducer(
        ClientsReducer,
        initialState.clients
    );

    return (
        <GlobalContext.Provider
            value={{
                authState,
                authDispatch,
                profileState,
                profileDispatch,
                clientsState,
                clientsDispatch,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};
