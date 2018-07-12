import loginConst from '../constants/login';
import appConst from '../constants/app';
const R = require('ramda');

const initialState = {
    mode: 'direct',
    connections: [],
    fetching: false
};

export default (state = initialState, action) => {
    switch (action.type) {
    case appConst.USER_LOGOUT:
        return {
            ...state,
            connections: state.connections.map(x =>
                R.assoc('authorized', false, x)
            )
        };
    case loginConst.CHANGE_MODE:
        return { ...state, mode: action.payload };
    case loginConst.PUSH_CONNECTION:
        return {
            ...state,
            connections: R.append(action.payload, state.connections)
        };
    case loginConst.LOAD_CONNECTIONS:
        return { ...state, connections: action.payload };
    case loginConst.DISABLE_ACTIVE_CONNECTIONS:
        return (
            state.connections.map(x => R.assoc('active', false, x))
                |> R.assoc('connections', R.__, state)
        );
    case loginConst.ACTIVATE_CONNECTION:
        return (
            state.connections
                |> R.map(x => R.assoc('active', x.id === action.payload, x))
                |> R.assoc('connections', R.__, state)
        );
    case loginConst.DELETE_CONNECTION:
        return {
            ...state,
            connections: state.connections.filter(
                x => x.id !== action.payload
            )
        };
    case loginConst.LOGIN_REQUEST:
        return R.assoc('fetching', true, state);
    case loginConst.LOGIN_ERROR:
        return R.assoc('fetching', false, state);
    case loginConst.LOGIN_COMPLETE:
        return (
            R.assoc('fetching', false, state)
                |> R.assoc(
                    'connections',
                    state.connections.map(x =>
                        R.assoc('authorized', x.id === action.payload, x)
                    )
                )
        );
    }

    return { ...state };
};
