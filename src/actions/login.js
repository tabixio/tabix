import loginConst from '../constants/login';
import Api from '../api';

export const switchMode = mode => ({
    type: loginConst.CHANGE_MODE,
    payload: mode
});

export const updateConnection = data => ({
    type: loginConst.UPDATE_CONNECTION,
    payload: data
});

export const newConnection = () => ({
    type: loginConst.NEW_CONNECTION
});

export const activateConnection = id => ({
    type: loginConst.ACTIVATE_CONNECTION,
    payload: id
});

export const changeMode = mode => ({
    type: loginConst.CHANGE_MODE,
    payload: mode
});

export const loadConnections = connections => ({
    type: loginConst.LOAD_CONNECTIONS,
    payload: connections
});

export const pushConnection = connection => ({
    type: loginConst.PUSH_CONNECTION,
    payload: connection
});

export const login = connection => async dispatch => {
    const api = new Api(connection);
    dispatch({ type: loginConst.LOGIN_REQUEST });

    try {
        await api.check();

    } catch (e) {
        console.error(e);
        dispatch({ type: loginConst.LOGIN_ERROR, payload: 'Check error' });
        return;
    }

    try {
        await api.init();
    } catch (e) {
        console.error(e);
        dispatch({ type: loginConst.LOGIN_ERROR, payload: 'Init error' });
        return;
    }
};

export const deleteConnetion = id => ({
    type: loginConst.DELETE_CONNECTION,
    payload: id
});