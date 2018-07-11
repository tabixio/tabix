import { initialize as initializeBase, reset } from 'redux-form';
import {
    activateConnection,
    changeMode as changeModeAction,
    loadConnections,
    pushConnection
} from '../actions/login';
import { push } from 'react-router-redux';
import appConst from '../constants/app';
import lsConst from '../constants/localStorage';
import loginConst from '../constants/login';
const R = require('ramda');

const forms = ['serverLogin', 'directLogin'];

/**
 * Curry function initialize
 */
const initialize = tuple => initializeBase(`${tuple[0]}Login`, tuple[1]);

const changeMode = tuple => tuple[0] |> changeModeAction;

/**
 * Get mode
 * @param {Object} item
 */
const getMode = item => {
    return [item && item.url ? 'server' : 'direct', item];
};

export default store => next => action => {
    //init local storage
    if (action.type === appConst.INIT_APP) {
        const { dispatch } = store;
        const connections =
            localStorage.getItem(lsConst.CONNECTIONS) || '[]' |> JSON.parse;

        connections |> loadConnections |> dispatch;

        const item = connections.find(x => x.active);

        item && item
            |> getMode
            |> R.tap(_ => _ |> changeMode |> dispatch)
            |> initialize
            |> dispatch;
    }

    //on update/create connection in login
    if (action.type === loginConst.UPDATE_CONNECTION) {
        const { dispatch } = store;
        const { connections } = store.getState().login;

        const index =
            connections.findIndex(x => x.active) ||
            (connections.length ? 0 : connections.length - 1);

        const item = {
            ...action.payload,
            active: true
        };

        connections
            |> R.filter(x => !x.active)
            |> R.insert(index, item)
            |> R.tap(_ =>
                localStorage.setItem(lsConst.CONNECTIONS, _ |> JSON.stringify)
            )
            |> loadConnections
            |> dispatch;
    }

    //on create new connection
    if (action.type === loginConst.NEW_CONNECTION) {
        const { dispatch } = store;

        forms.forEach(x => dispatch(reset(x)));

        const newItem = { name: 'New connection', id: new Date().valueOf() };
        newItem
            |> R.tap(_ => _ |> pushConnection |> dispatch)
            |> (_ => _.id)
            |> activateConnection
            |> dispatch;
    }

    //on change connection
    if (action.type === loginConst.ACTIVATE_CONNECTION) {
        const { dispatch } = store;
        const { connections } = store.getState().login;
        const item = connections.find(x => x.id === action.payload);

        forms.forEach(x => dispatch(reset(x)));

        item && item
            |> getMode
            |> R.tap(_ => _ |> changeMode |> dispatch)
            |> initialize
            |> dispatch;
    }

    next(action);
};
