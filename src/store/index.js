/*global process */

import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from 'reducers';
import { routerMiddleware } from 'react-router-redux';

const composeEnhancers = process.env.DEV
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    : compose;

export default function configureStore(history) {
    const store = createStore(
        rootReducer,
        composeEnhancers(
            applyMiddleware(thunkMiddleware, routerMiddleware(history))
        )
    );

    return store;
}
