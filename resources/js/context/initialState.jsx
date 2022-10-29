export default {
    auth: {
        loading: false,
        success: false,
        error: false,
    },
    profile: {
        loading: false,
        data: null,
    },
    clients: {
        loading: false,
        list: [],
        detail: {
            loading: true,
            data: null,
        },
        addClient: {
            loading: false,
            success: false,
            error: false,
        },
        deleteClient: {
            loading: false,
            success: false,
            error: false,
        },
        updateClient: {
            loading: false,
            success: false,
            error: false,
        },
    },
};
