import toastrConst from '../constants/toastr';
const R = require('ramda');
const initialState = {
    id: '',
    message: '',
    intent: 'PRIMARY'
};

export default (state = initialState, action) => {
    switch (action.type) {
    case toastrConst.SHOW:
        return R.merge(state, action.payload);
    }

    return state;
};
