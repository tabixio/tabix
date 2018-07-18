import { createReducer, makeActionCreator } from '../libs/reduxActions';

const initialState = {
    /**
     * ID тостера
     */
    id: 0,
    /**
     * Его сообщение
     */
    message: '',
    /**
     * Тип сообщения
     */
    intent: 'PRIMARY'
};

const SHOW_SUCCESS = 'SHOW_TOASTR_SUCCESS'; //toastr на зеленом фоне
const SHOW_ERROR = 'SHOW_TOASTR_ERROR'; //toastr на красном фоне

/**
 * Установка id к экшену объекта
 * @param {Object} obj 
 */
const setId = obj => ({ ...obj, id: new Date().valueOf() });

export const showSuccess = makeActionCreator(SHOW_SUCCESS, 'message');

export const showError = makeActionCreator(SHOW_ERROR, 'message');

export default createReducer(initialState, {
    [SHOW_SUCCESS]: (state, { message }) =>
        ({
            ...state,
            intent: 'SUCCESS',
            message
        } |> setId),
    [SHOW_ERROR]: (state, { message }) =>
        ({
            ...state,
            intent: 'DANGER',
            message
        } |> setId)
});
