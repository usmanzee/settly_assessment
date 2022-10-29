import types from "../types";

const ClientsReducer = (state, { payload, type }) => {
    switch (type) {
        case types.CLIENTS_FETCH: {
            return {
                ...state,
                loading: true,
            };
        }

        case types.CLIENTS_DATA: {
            return {
                ...state,
                loading: false,
                list: payload,
                filteredList: payload,
            };
        }
        case types.CLIENTS_ERROR: {
            return {
                ...state,
                loading: false,
                error: payload,
            };
        }
        case types.CLIENTS_RESET: {
            return {
                ...state,
                loading: false,
                list: [],
                error: false,
                detail: {
                    ...state.detail,
                    loading: false,
                    data: null,
                },
            };
        }

        case types.ADD_CLIENT_FETCH: {
            return {
                ...state,
                addClient: {
                    ...state.addClient,
                    loading: true,
                },
            };
        }

        case types.ADD_CLIENT_SUCCESS: {
            return {
                ...state,
                addClient: {
                    ...state.addClient,
                    loading: false,
                    success: true,
                },
                list: [payload, ...state.list],
                filteredList: [payload, ...state.list],
            };
        }

        case types.ADD_CLIENT_ERROR: {
            return {
                ...state,
                addClient: {
                    ...state.addClient,
                    loading: false,
                },
            };
        }
        case types.CLIENT_DETAIL_FETCH: {
            return {
                ...state,
                detail: {
                    ...state.detail,
                    loading: true,
                },
            };
        }

        case types.CLIENT_DETAIL_DATA: {
            return {
                ...state,
                detail: {
                    ...state.detail,
                    loading: false,
                    data: payload,
                },
            };
        }

        case types.CLIENT_DETAIL_ERROR: {
            return {
                ...state,
                detail: {
                    ...state.detail,
                    loading: false,
                },
            };
        }
        case types.DELETE_CLIENT_FETCH: {
            return {
                ...state,
                deleteClient: {
                    ...state.deleteClient,
                    loading: true,
                    success: false,
                    error: false,
                },
            };
        }

        case types.DELETE_CLIENT_SUCCESS: {
            return {
                ...state,
                deleteClient: {
                    ...state.deleteClient,
                    loading: false,
                    success: true,
                    error: false,
                },
                list: state.list.filter((element) => element.id !== payload),
            };
        }

        case types.DELETE_CLIENT_ERROR: {
            return {
                ...state,
                deleteClient: {
                    ...state.deleteClient,
                    loading: false,
                    success: false,
                    error: true,
                },
            };
        }
        case types.UPDATE_CLIENT_FETCH: {
            return {
                ...state,
                updateClient: {
                    ...state.updateClient,
                    loading: true,
                    success: false,
                    error: false,
                },
            };
        }

        case types.UPDATE_CLIENT_SUCCESS: {
            const index = state.list.findIndex(
                (item) => item.id === payload.id
            );
            let clients = [...state.list];
            clients[index] = payload;
            return {
                ...state,
                list: clients,
                detail: {
                    ...state.detail,
                    data: payload,
                },
                updateClient: {
                    ...state.updateClient,
                    loading: false,
                    success: true,
                    error: false,
                },
            };
        }

        case types.UPDATE_CLIENT_ERROR: {
            return {
                ...state,
                updateClient: {
                    ...state.updateClient,
                    loading: false,
                    success: false,
                    error: true,
                },
            };
        }
        default:
            return state;
    }
};

export default ClientsReducer;
