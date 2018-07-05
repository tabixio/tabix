import loginConst from '../constants/login';

const initialState = {
    mode: 'direct',
    server: {},
    direct: {}
};

export default (state = initialState, action) => {
    switch (action.type) {
    case loginConst.CHANGE_MODE:
        return { ...state, mode: action.payload };
    }
    return { ...state };
};
