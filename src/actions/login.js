import loginConst from '../constants/login';
import Api from '../api';
import { showSuccess, showError } from './toastr';
import { push } from 'react-router-redux';

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
        dispatch({ type: loginConst.LOGIN_ERROR });
        dispatch(showError('Check error'));
        return false;
    }

    try {
        await api.init();
    } catch (e) {
        console.error(e);
        dispatch({ type: loginConst.LOGIN_ERROR });
        dispatch(showError('Init error'));
        return false;
    }

    dispatch({ type: loginConst.LOGIN_COMPLETE, payload: connection.id });
    dispatch(showSuccess('login OK'));
    dispatch(push('/sql'));
};

export const deleteConnetion = id => ({
    type: loginConst.DELETE_CONNECTION,
    payload: id
});
