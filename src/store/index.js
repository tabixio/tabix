import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from 'reducers';
import { routerMiddleware } from 'react-router-redux';
import {
    loginMiddleware,
    callAPIMiddleware,
    routeMiddleware
} from '../middlewares';

const composeEnhancers = process.env.DEV
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    : compose;

export default function configureStore(history) {
    const store = createStore(
        rootReducer,
        composeEnhancers(
            applyMiddleware(
                thunkMiddleware,
                routerMiddleware(history),
                callAPIMiddleware,
                loginMiddleware,
                routeMiddleware
            )
        )
    );

    return store;
}
