import React, { useState, useContext } from "react";

import { GlobalContext } from "../context/Provider";
import { loginAction } from "../context/actions";

export const useLogin = () => {
    const [validated, setValidated] = useState(false);
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const { authState, authDispatch } = useContext(GlobalContext);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        setValidated(true);
        if (form.checkValidity() === false) return false;

        const data = {
            email: email,
            password: password,
        };

        loginAction(data)(authDispatch);
    };

    return {
        validated,
        email,
        setEmail,
        password,
        setPassword,
        loading: authState.loading,
        handleSubmit,
    };
};
