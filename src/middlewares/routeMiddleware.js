import lsConst from '../constants/localStorage';
import { push } from 'react-router-redux';
import { loginApp, loadConnections } from '../reducers/login';
import { init } from '../reducers/app';
import { getFromStorage } from '../helpers/storage';

export default ({ dispatch, getState}) => next => action => {
    if (action.type === '@@router/LOCATION_CHANGE') {
        const state = getState();

        
        if (!state.app.init) {
            //для первой инициализации приложения прочитаем подключения из localStorage
            lsConst.CONNECTIONS
                |> getFromStorage('[]')
                |> JSON.parse
                //загрузим их в стор
                |> loadConnections
                |> dispatch;
            //подтверждаем инициализацию
            dispatch(init());
        }

        //on enter or login
        if (!state.app.init) {
            if (['/','/login'].indexOf(action.payload.pathname) >= 0) {
                //если root роут, то переключаем пользователя на /pages, если авторизован
                //или на login, если авторизации не было
                (state.app.autorized ? '/pages' : '/login') |> push |> dispatch;
            } else {
                !state.app.autorized &&
                    !state.login.fetching &&
                    //если на данный момент не авторизован пользователь и не происходит проверка на подключеие
                    //то получаем ранее авторизованное подключение
                    store.getState().login.connections.find(x => x.authorized)
                    //диспатчим его в экшн залогинивания
                    |> (_ => _ |> loginApp |> dispatch)
                    |> (async auth => {
                        //ожидаем результат подклюения
                        const connected = await auth;
                        //если подключения не произошло, то диспатчим роут на login
                        !connected && (push('/login') |> dispatch);
                    });
            }
        }
    }

    next(action);
};
