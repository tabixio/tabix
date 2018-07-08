import { initialize, reset } from 'redux-form';
import appConst from '../constants/app';
import lsConst from '../constants/localStorage';
import loginConst from '../constants/login';
const R = require('ramda');

const getMode = item => (item.host ? 'direct' : 'server');

const init = store => next => action => {
    //init local storage
    if (action.type === appConst.INIT_APP) {
        const { dispatch } = store;
        const connections =
            localStorage.getItem(lsConst.CONNECTIONS) || '[]' |> JSON.parse;
        dispatch({
            type: loginConst.LOAD_CONNECTIONS,
            payload: connections
        });

        const item = connections.find(x => x.active);

        item &&
            dispatch({
                type: loginConst.CHANGE_MODE,
                payload: item |> getMode
            });

        item && (initialize(`${item |> getMode}Login`, item) |> dispatch);
    }

    //on update/create conenction in login
    if (action.type === loginConst.UPDATE_CONNECTION) {
        const { connections } = store.getState().login;

        const index =
            connections.findIndex(x => x.active) ||
            (connections.length ? 0 : connections.length - 1);
        const item = {
            ...action.payload,
            active: true
        };

        const updateConnections =
            connections |> R.filter(x => !x.active) |> R.insert(index, item);
        localStorage.setItem(
            lsConst.CONNECTIONS,
            updateConnections |> JSON.stringify
        );

        store.dispatch({
            type: loginConst.LOAD_CONNECTIONS,
            payload: updateConnections
        });
    }

    //on create new connection
    if (action.type === loginConst.NEW_CONNECTION) {
        const { dispatch } = store;

        'serverLogin' |> reset |> dispatch;
        'directLogin' |> reset |> dispatch;

        dispatch({
            type: loginConst.CHANGE_MODE,
            payload: 'direct'
        });

        dispatch({
            type: loginConst.DISABLE_ACTIVE_CONNECTIONS
        });

        initialize('directLogin', { name: 'New connection' }) |> dispatch;
    }

    //on change connection
    if (action.type === loginConst.ACTIVATE_CONNECTION) {
        const { dispatch } = store;
        const { connections } = store.getState().login;
        const item = connections.find(x => x.id === action.payload);

        dispatch({
            type: loginConst.CHANGE_MODE,
            payload: item |> getMode
        });

        'serverLogin' |> reset |> dispatch;
        'directLogin' |> reset |> dispatch;

        initialize(`${item |> getMode}Login`, item) |> dispatch;
    }

    next(action);
};

export default init;
