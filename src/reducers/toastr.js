import toastrConst from '../constants/toastr';
import { merge } from 'ramda';

const initialState = {
    id: '',
    message: '',
    intent: 'PRIMARY'
};

export default (state = initialState, action) => {
    switch (action.type) {
    case toastrConst.SHOW:
        return merge(state, action.payload);
    }

    return state;
};
