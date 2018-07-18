import { createReducer, makeActionCreator } from '../libs/reduxActions';

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

export const changeMode = makeActionCreator(CHANGE_MODE, 'mode');
export const pushConnection = makeActionCreator(PUSH_CONNECTION, 'connection');
export const loadConnections = makeActionCreator(
    LOAD_CONNECTIONS,
    'connections'
);
export const activateConnection = makeActionCreator(ACTIVATE_CONNECTION, 'id');
export const deleteConnection = makeActionCreator(DELETE_CONNECTION, 'id');
export const logout = makeActionCreator(USER_LOGOUT);

export default createReducer(initialState, {
    [CHANGE_MODE]: (state, { mode }) => ({ ...state, mode }),
    [LOAD_CONNECTIONS]: (state, { connections }) => ({ ...state, connections }),
    [ACTIVATE_CONNECTION]: (state, { id }) => ({
        ...state,
        connections: state.connections.map(x => ({ ...x, active: x.id === id }))
    }),
    [PUSH_CONNECTION]: (state, { connection }) => ({
        ...state,
        connections: [...state.connections, connection]
    }),
    [DELETE_CONNECTION]: (state, { id }) => ({
        ...state,
        connections: state.connections.filter(x => x.id !== id)
    }),
    [LOGIN_REQUEST]: state => ({ ...state, fetching: true }),
    [LOGIN_ERROR]: state => ({ ...state, fetching: false }),
    [LOGIN_COMPLETE]: (state, { id }) => ({
        ...state,
        fetching: false,
        connections: state.connections.map(x => ({
            ...x,
            authorized: x.id === id
        }))
    })
});

// export default (state = initialState, action) => {
//     switch (action.type) {
//     case 'USER_LOGOUT':
//         return {
//             ...state,
//             connections: state.connections.map(x =>
//                 R.assoc('authorized', false, x)
//             )
//         };
//     case loginConst.CHANGE_MODE:
//         return { ...state, mode: action.payload };
//     case loginConst.PUSH_CONNECTION:
//         return {
//             ...state,
//             connections: R.append(action.payload, state.connections)
//         };
//     case loginConst.LOAD_CONNECTIONS:
//         return { ...state, connections: action.payload };
//     case loginConst.DISABLE_ACTIVE_CONNECTIONS:
//         return (
//             state.connections.map(x => R.assoc('active', false, x))
//                 |> R.assoc('connections', R.__, state)
//         );
//     case loginConst.ACTIVATE_CONNECTION:
//         return (
//             state.connections
//                 |> R.map(x => R.assoc('active', x.id === action.payload, x))
//                 |> R.assoc('connections', R.__, state)
//         );
//     case loginConst.DELETE_CONNECTION:
//         return {
//             ...state,
//             connections: state.connections.filter(
//                 x => x.id !== action.payload
//             )
//         };
//     case loginConst.LOGIN_REQUEST:
//         return R.assoc('fetching', true, state);
//     case loginConst.LOGIN_ERROR:
//         return R.assoc('fetching', false, state);
//     case loginConst.LOGIN_COMPLETE:
//         return (
//             R.assoc('fetching', false, state)
//                 |> R.assoc(
//                     'connections',
//                     state.connections.map(x =>
//                         R.assoc('authorized', x.id === action.payload, x)
//                     )
//                 )
//         );
//     }

//     return { ...state };
// };
