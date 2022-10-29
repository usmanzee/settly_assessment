import { API } from "../../api";
import types from "../types";
import { ToastContainer, toast } from "react-toastify";

import { setToken, removeToken, getToken } from "../../utils/LocalStorage";

export const handleError = (error, dispatch) => {
    if (error.code === 401 && getToken() != null) {
        removeToken();
        //   navigate("/login");
    }
    console.log(error);
    toast.error(error.message);
};

export const loginAction = (requestData) => async (dispatch) => {
    try {
        dispatch({
            type: types.LOGIN_FETCH,
        });
        const config = {
            apiVersion: "baseUrl",
        };
        const response = await API.post(config)("/api/login", requestData);
        setToken(response.token);
        dispatch({
            type: types.LOGIN_SUCCESS,
        });
        toast.success("LoggedIn");
    } catch (error) {
        dispatch({
            type: types.LOGIN_ERROR,
        });
        handleError(error, dispatch);
    }
};

export const registerAction = (requestData) => async (dispatch) => {
    try {
        dispatch({
            type: types.LOGIN_FETCH,
        });
        const config = {
            apiVersion: "baseUrl",
        };
        const response = await API.post(config)("/api/register", requestData);
        setToken(response.token);
        dispatch({
            type: types.LOGIN_SUCCESS,
        });
        toast.success("Registered Successfull, LoggedIn");
    } catch (error) {
        dispatch({
            type: types.LOGIN_ERROR,
        });
        handleError(error, dispatch);
    }
};

export const logoutAction = () => async (profileDispatch, clientsDispatch) => {
    profileDispatch({
        type: types.PROFILE_RESET,
    });
    clientsDispatch({
        type: types.CLIENTS_RESET,
    });
    removeToken();
};

export const getProfileAction = () => async (dispatch) => {
    try {
        dispatch({
            type: types.PROFILE_FETCH,
        });
        const token = getToken();
        const config = {
            apiVersion: "baseUrl",
            headers: { Authorization: "Bearer " + token },
        };
        const response = await API.get(config)("/api/profile");
        dispatch({
            type: types.PROFILE_DATA,
            payload: response.data,
        });
    } catch (error) {
        handleError(error, dispatch);
        dispatch({
            type: types.PROFILE_ERROR,
        });
    }
};

export const getClientsAction = () => async (dispatch) => {
    try {
        dispatch({
            type: types.CLIENTS_FETCH,
        });
        const token = getToken();
        const config = {
            apiVersion: "baseUrl",
            headers: { Authorization: "Bearer " + token },
        };
        const response = await API.get(config)("/api/clients");
        dispatch({
            type: types.CLIENTS_DATA,
            payload: response.data,
        });
    } catch (error) {
        handleError(error, dispatch);
        dispatch({
            type: types.CLIENTS_ERROR,
        });
    }
};

export const getClientDetailAction =
    (navigate, clientId) => async (dispatch) => {
        try {
            dispatch({
                type: types.CLIENT_DETAIL_FETCH,
            });
            const token = getToken();
            const config = {
                apiVersion: "baseUrl",
                headers: { Authorization: "Bearer " + token },
            };
            const response = await API.get(config)(`/api/clients/${clientId}`);
            dispatch({
                type: types.CLIENT_DETAIL_DATA,
                payload: response.data,
            });
        } catch (error) {
            handleError(error, dispatch);
            dispatch({
                type: types.CLIENT_DETAIL_ERROR,
            });
        }
    };

export const addClientAction = (navigate, requestData) => async (dispatch) => {
    try {
        dispatch({
            type: types.ADD_CLIENT_FETCH,
        });
        const config = {
            apiVersion: "baseUrl",
            headers: {
                Authorization: "Bearer " + getToken(),
                "Content-Type": "multipart/form-data",
            },
        };
        const response = await API.post(config)("/api/clients", requestData);
        dispatch({
            type: types.ADD_CLIENT_SUCCESS,
            payload: response.data,
        });
        toast.success("Client Added Successfully");
        navigate("/");
    } catch (error) {
        dispatch({
            type: types.ADD_CLIENT_ERROR,
        });
        handleError(error, dispatch);
    }
};

export const deleteClientAction = (navigate, clientId) => async (dispatch) => {
    try {
        dispatch({
            type: types.DELETE_CLIENT_FETCH,
        });
        const config = {
            apiVersion: "baseUrl",
            headers: {
                Authorization: "Bearer " + getToken(),
            },
        };
        await API.delete(config)(`/api/clients/${clientId}`);
        dispatch({
            type: types.DELETE_CLIENT_SUCCESS,
            payload: clientId,
        });
        toast.success("Client deleted Successfully");
    } catch (error) {
        dispatch({
            type: types.DELETE_CLIENT_ERROR,
        });
        handleError(error, dispatch);
    }
};

export const updateClientAction =
    (navigate, id, requestData) => async (dispatch) => {
        try {
            dispatch({
                type: types.UPDATE_CLIENT_FETCH,
            });
            const config = {
                apiVersion: "baseUrl",
                headers: {
                    Authorization: "Bearer " + getToken(),
                    "Content-Type": "multipart/form-data",
                },
            };
            const response = await API.post(config)(
                `/api/clients/${id}`,
                requestData
            );
            dispatch({
                type: types.UPDATE_CLIENT_SUCCESS,
                payload: response.data,
            });
            toast.success("Client Updated Successfully");
            navigate("/");
        } catch (error) {
            dispatch({
                type: types.UPDATE_CLIENT_ERROR,
            });
            handleError(error, dispatch);
        }
    };
