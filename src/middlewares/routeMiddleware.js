import lsConst from '../constants/localStorage';
import { push } from 'react-router-redux';
import { loginApp, loadConnections } from '../actions/login';
import { init } from '../actions/app';
import { getFromStorage } from '../helpers/storage';

const paths = ['/', '/login'];

export default store => next => action => {
    if (action.type === '@@router/LOCATION_CHANGE') {
        const { dispatch } = store;
        const state = store.getState();

        if (!state.app.init) {
            lsConst.CONNECTIONS
                |> getFromStorage('[]')
                |> JSON.parse
                |> loadConnections
                |> dispatch;
            dispatch(init());
        }

        //on enter or login
        if (!state.app.init) {
            if (paths.find(x => x === action.payload.pathname)) {
                (state.app.autorized ? '/pages' : '/login') |> push |> dispatch;
            } else {
                !state.app.autorized &&
                    !state.login.fetching &&
                    store.getState().login.connections.find(x => x.authorized)
                    |> (_ => _ |> loginApp |> dispatch)
                    |> (async auth => {
                        const connected = await auth;
                        if (!connected) {
                            push('/login') |> dispatch;
                        }
                    });
            }
        }
        
    }

    next(action);
};
