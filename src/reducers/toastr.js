import { createReducer, makeActionCreator } from '../libs/reduxActions';

const initialState = {
    id: '',
    message: '',
    intent: 'PRIMARY'
};

const SHOW_SUCCESS = 'SHOW_TOASTR_SUCCESS';
const SHOW_ERROR = 'SHOW_TOASTR_ERROR';

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
