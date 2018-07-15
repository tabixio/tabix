import { initialize, reset } from 'redux-form';
import {
    activateConnection,
    changeMode as changeModeAction,
    loadConnections,
    pushConnection,
    newConnection
} from '../actions/login';
import * as R from 'ramda';
import { getFromStorage, saveInStorage } from '../helpers/storage';
import appConst from '../constants/app';
import lsConst from '../constants/localStorage';
import loginConst from '../constants/login';

const forms = ['serverLogin', 'directLogin'];

const initializeForm = tuple => initialize(`${tuple[0]}Login`, tuple[1]);

const changeMode = tuple => tuple[0] |> changeModeAction;

/**
 * Get mode
 * @param {Object} item
 */
const getMode = item => {
    return [item?.server ? 'server' : 'direct', item];
};

export default store => next => action => {

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
            |> saveInStorage(lsConst.CONNECTIONS)
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
            |> initializeForm
            |> dispatch;
    }

    if (action.type === loginConst.DELETE_CONNECTION) {
        lsConst.CONNECTIONS
            |> getFromStorage('[]')
            |> JSON.parse
            |> R.filter(x => x.id !== action.payload)
            |> saveInStorage(lsConst.CONNECTIONS);

        const { connections } = store.getState().login;
        const { dispatch } = store;

        const activeItem = connections.length > 0 ? connections[0] : {};
        (Object.keys(activeItem).length
            ? activeItem.id |> activateConnection
            : newConnection) |> dispatch;
    }

    if (
        action.type === loginConst.LOGIN_COMPLETE ||
        action.type === appConst.USER_LOGOUT
    ) {
        lsConst.CONNECTIONS
            |> getFromStorage('[]')
            |> JSON.parse
            |> R.map(x =>
                R.assoc(
                    'authorized',
                    action.type === appConst.USER_LOGOUT
                        ? false
                        : x.id === action.payload,
                    x
                )
            )
            |> saveInStorage(lsConst.CONNECTIONS);
    }

    next(action);
};
