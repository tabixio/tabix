import * as R from 'ramda';
import { createReducer, makeActionCreator } from '../libs/reduxActions';
import { LOGIN_COMPLETE } from './login';

const initialState = {
    /**
     * Переключатель тем
     */
    darkTheme: true,
    /**
     * Выполнена ли авторизация пользователя
     */
    userAutorized: false,
    /**
     * Структура сервера
     */
    structure: []
};

const ENABLE_DARK_THEME = 'ENABLE_DARK_THEME'; //включить/отключить темную тему
const USER_AUTHORIZED = 'USER_AUTHORIZED'; //прошел ли пользователь авторизацию
export const INIT_APP = 'INIT_APP'; //первая инициализация приложения
const LOAD_STRUCETURE = 'LOAD_STRUCETURE'; //загрузка структуры приложения в store
const EXPAND_STRUCTURE = 'EXPAND_STRUCTURE'; //свертка/разворачивание структуры сервера

/**
 *
 * @param {Array} structure
 * @param {Array} idArray - массив вложенности в дереве.
 * Например, [0,1,0]- первый элемент |> в первом элементе 2 элеент |> во втором элементе первый элемент
 * @param {Bool} expand
 */
export const expandStructureFromArray = (structure, idArray, expand) => {
    const newObj = R.clone(structure);
    const element = idArray.reduce(
        (el, index, ind) => (ind === 0 ? el[index] : el.childNodes[index]),
        newObj
    );
    element.isExpanded = expand;

    return newObj;
};

export const enableDarkTheme = makeActionCreator(ENABLE_DARK_THEME, 'enable');
export const userAuthorized = makeActionCreator(USER_AUTHORIZED, 'autorized');
export const init = makeActionCreator(INIT_APP);
export const expandStructure = makeActionCreator(
    EXPAND_STRUCTURE,
    'id',
    'expand'
);

export default createReducer(initialState, {
    [ENABLE_DARK_THEME]: (state, { enable }) => ({
        ...state,
        darkTheme: enable
    }),
    [USER_AUTHORIZED]: (state, { autorized }) => ({
        ...state,
        userAutorized: autorized
    }),
    [EXPAND_STRUCTURE]: (state, { id, expand }) => ({
        ...state,
        structure: expandStructureFromArray(state.structure, id, expand)
    }),
    [LOGIN_COMPLETE]: (state, { response }) => ({
        ...state,
        structure: response
    })
});
