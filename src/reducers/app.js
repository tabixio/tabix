import appConst from '../constants/app';

const initialState = {
    darkTheme: true,
    userConnection: {},
    autorized: false
};

export default (state = initialState, action) => {
    switch (action.type) {
    case appConst.ENABLE_DARK_THEME:
        return { ...state, darkTheme: action.payload };
    case appConst.SET_USER_CONNECTION:
        return { ...state, userConnection: action.payload };
    }
    return state;
};
