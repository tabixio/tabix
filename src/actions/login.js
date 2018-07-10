import loginConst from '../constants/login';

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

