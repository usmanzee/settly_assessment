import React, { useState, useContext } from "react";

import { GlobalContext } from "../context/Provider";
import { loginAction } from "../context/actions";

export const useRegister = () => {
    const [validated, setValidated] = useState(false);
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");

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
        name,
        setName,
        email,
        setEmail,
        password,
        setPassword,
        confirmPassword,
        setConfirmPassword,
        loading: authState.loading,
        handleSubmit,
    };
};
