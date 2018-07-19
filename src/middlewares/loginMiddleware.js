import { initialize, reset } from 'redux-form';
import {
    changeMode as changeModeAction,
    ACTIVATE_CONNECTION,
    LOGIN_COMPLETE
} from '../reducers/login';
import { userAuthorized } from '../reducers/app';
import { toTreeStructure } from '../helpers/sql';
import * as R from 'ramda';

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

export default ({ dispatch, getState }) => next => action => {
    //при активации подключения обновляем форму
    if (action.type === ACTIVATE_CONNECTION) {
        const { connections } = getState().login;
        const item = connections.find(x => x.id === action.id);

        forms.forEach(x => dispatch(reset(x)));

        item && item
            |> getMode
            |> R.tap(_ => _ |> changeMode |> dispatch)
            |> initializeForm
            |> dispatch;
    }

    if (action.type === LOGIN_COMPLETE) {
        next({ ...action, response: action.response |> toTreeStructure });
        dispatch(userAuthorized(true));

        return;
    }
    next(action);
};
