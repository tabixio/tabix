import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from 'reducers';
import { routerMiddleware } from 'react-router-redux';
import loginMiddleware from '../middlewares/loginMiddleware';
import routeMiddleware from '../middlewares/routeMiddleware';

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
                
                loginMiddleware,
                routeMiddleware
            )
        )
    );

    return store;
}
