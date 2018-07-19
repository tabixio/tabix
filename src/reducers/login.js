import { createReducer, makeActionCreator } from '../libs/reduxActions';
import { tap } from 'ramda';
import Api from '../api';
import lsConst from '../constants/localStorage';
import { saveInStorage } from '../helpers/storage';
import { showError } from './toastr';
import { push } from 'react-router-redux';
const saveConnections = saveInStorage(lsConst.CONNECTIONS);

const initialState = {
    /**
     * Активная таба
     */
    mode: 'direct',
    /**
     * Список подключений
     */
    connections: [],
    /**
     * Запрос на подключение
     */
    fetching: false
};

export const CHANGE_MODE = 'CHANGE_MODE'; //переключение таба (Diret/Server)
export const PUSH_CONNECTION = 'PUSH_CONNECTION'; //добавление нового подключения
export const LOAD_CONNECTIONS = 'LOAD_CONNECTIONS'; //загрузка подключение в стор из localStorage через mw
export const DELETE_CONNECTION = 'DELETE_CONNECTION'; //удаление подключения по id
export const ACTIVATE_CONNECTION = 'ACTIVATE_CONNECTION'; //активация соединения по id
export const LOGIN_REQUEST = 'LOGIN_REQUEST'; //запрос на соединение
export const LOGIN_ERROR = 'LOGIN_ERROR'; // ошибка подключения
export const LOGIN_COMPLETE = 'LOGIN_COMPLETE'; // подключение прошло успешно
export const USER_LOGOUT = 'USER_LOGOUT'; //запрос на logout
export const UPDATE_CONNECTION = 'UPDATE_CONNECTION'; //обновление соединения

export const changeMode = makeActionCreator(CHANGE_MODE, 'mode');
export const pushConnection = makeActionCreator(PUSH_CONNECTION, 'connection');
export const updateConnection = makeActionCreator(
    UPDATE_CONNECTION,
    'connection'
);
export const loadConnections = makeActionCreator(
    LOAD_CONNECTIONS,
    'connections'
);
export const activateConnection = makeActionCreator(ACTIVATE_CONNECTION, 'id');
export const deleteConnection = makeActionCreator(DELETE_CONNECTION, 'id');
export const logout = makeActionCreator(USER_LOGOUT);

export const loginApp = (connection, route) => ({
    types: [LOGIN_REQUEST, LOGIN_COMPLETE, LOGIN_ERROR],
    callAPI: async () => {
        const api = new Api(connection);
        await api.check();
        await api.init();
        //обработка структуры происходит в loginMiddleware
        return api.getDatabaseStructure();
    },
    //перекидываем на роут
    successAction: () => push(route),
    //информационный toastr
    errorAction: () => showError('connection failed'),
    payload: { connection, route }
});

export default createReducer(initialState, {
    [CHANGE_MODE]: (state, { mode }) => ({ ...state, mode }),
    [LOAD_CONNECTIONS]: (state, { connections }) => ({ ...state, connections }),
    [ACTIVATE_CONNECTION]: (state, { id }) => ({
        ...state,
        connections: state.connections.map(x => ({ ...x, active: x.id === id }))
    }),
    [UPDATE_CONNECTION]: (state, { connection }) => ({
        ...state,
        connections:
            state.connections.map(
                x =>
                    x.id === connection.id ? { ...connection, active: true } : x
            ) |> tap(saveConnections)
    }),
    [PUSH_CONNECTION]: (state, { connection }) => ({
        ...state,
        connections: [...state.connections, connection]
    }),
    [DELETE_CONNECTION]: (state, { id }) => ({
        ...state,
        connections:
            state.connections.filter(x => x.id !== id) |> tap(saveConnections)
    }),
    [LOGIN_REQUEST]: state => ({ ...state, fetching: true }),
    [LOGIN_ERROR]: state => ({ ...state, fetching: false }),
    [LOGIN_COMPLETE]: (state, { connection: { id } }) => ({
        ...state,
        fetching: false,
        connections:
            state.connections.map(x => ({
                ...x,
                authorized: x.id === id
            })) |> tap(saveConnections)
    })
});
