import * as R from 'ramda';
import { createReducer, makeActionCreator } from '../libs/reduxActions';

const initialState = {
    darkTheme: true,
    userConnection: {},
    init: false,
    autorized: false,
    structure: []
};

export const expandStructureFromArray = (structure, idArray, expand) => {
    const newObj = R.clone(structure);
    const element = idArray.reduce(
        (el, index, ind) => (ind === 0 ? el[index] : el.childNodes[index]),
        newObj
    );
    element.isExpanded = expand;

    return newObj;
};

export const enableDarkTheme = makeActionCreator('ENABLE_DARK_THEME', 'enable');

export const userAuthorized = makeActionCreator('USER_AUTHORIZED', 'auth');

export const logout = makeActionCreator('USER_LOGOUT');

export const init = makeActionCreator('INIT_APP');

export const loadStructure = makeActionCreator('LOAD_STRUCETURE', 'structure');

export const expandStructure = makeActionCreator(
    'EXPAND_STRUCTURE',
    'id',
    'expand'
);

export default createReducer(initialState, {
    ENABLE_DARK_THEME: (state, { enable }) => ({ ...state, darkTheme: enable }),
    USER_AUTHORIZED: (state, { auth }) => ({ ...state, autorized: auth }),
    LOAD_STRUCETURE: (state, { structure }) => ({
        ...state,
        structure: structure
    }),
    EXPAND_STRUCTURE: (state, { id, expand }) => ({
        ...state,
        structure: expandStructureFromArray(state.structure, id, expand)
    }),
    SET_USER_CONNECTION: (state, { payload }) => ({
        ...state,
        userConnection: payload
    })
});
