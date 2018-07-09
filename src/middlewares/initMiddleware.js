const R = require('ramda');

const LOCATION_CHANGE = '@@router/LOCATION_CHANGE';

export default store => next => action => {
    
    if (action.type === LOCATION_CHANGE) {

        const state = store.getState().app;

    }
    else {
        next(action);
    }
    
};

