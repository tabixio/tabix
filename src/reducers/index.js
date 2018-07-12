import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import app from './app';
import login from './login';
import toastr from './toastr';

export default combineReducers({
    routing: routerReducer,
    form: formReducer,
    app,
    login,
    toastr
});
