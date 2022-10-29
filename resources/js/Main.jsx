import React, { useState, useEffect, useContext } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import ProtectedRoutes from "./components/ProtectedRoutes";
import { getToken } from "./utils/LocalStorage";
/**
 * Pages Import
 * */
import { Layout } from "./components";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/Home";
import AddClient from "./pages/Client/add";
import UpdateClient from "./pages/Client/update";

import { GlobalContext } from "./context/Provider";
import { getProfileAction } from "./context/actions";

/**
 * Pages Import End
 * */

const Main = (props) => {
    const navigate = useNavigate();
    const { profileState, profileDispatch } = useContext(GlobalContext);
    const profile = profileState.profile;

    const authenticated = getToken() ? true : false;

    useEffect(() => {
        if (authenticated && !profile) {
            //   dispatch(getProfileAction(navigate));
            getProfileAction()(profileDispatch);
        }
    }, [authenticated, profile]);

    return (
        <>
            <Routes>
                <Route
                    path="/login"
                    element={authenticated ? <Navigate to="/" /> : <Login />}
                />
                <Route
                    path="/register"
                    element={authenticated ? <Navigate to="/" /> : <Register />}
                />
                <Route element={<ProtectedRoutes auth={authenticated} />}>
                    <Route element={<Layout />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/client/add" element={<AddClient />} />
                        <Route
                            path="/client/update/:id"
                            element={<UpdateClient />}
                        />
                    </Route>
                </Route>
                <Route path="*" element={<>Not Found Route</>} />
            </Routes>
            <ToastContainer />
        </>
    );
};

export default Main;
