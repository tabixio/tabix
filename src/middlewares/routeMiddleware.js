import { push } from 'react-router-redux';
import { loginApp } from '../reducers/login';
import { INIT_APP } from '../reducers/app';
import { LOGIN_ERROR } from '../reducers/login';

export default ({ dispatch, getState }) => next => action => {
    if (action.type === INIT_APP) {
        const state = getState();

        if (['/', '/login'].indexOf(state.routing.location.pathname) >= 0) {
            //если root роут, то переключаем пользователя на /pages, если авторизован
            //или на login, если авторизации не было
            (state.app.autorized ? '/pages' : '/login') |> push |> dispatch;
        } else {
            getState().login.connections.find(x => x.authorized)
                |> loginApp
                |> dispatch;
        }
    }

    if (action.type === LOGIN_ERROR) {
        const state = getState();
        state.routing.location.pathname !== '/login' && '/login'
            |> push
            |> dispatch;
    }

    next(action);
};
