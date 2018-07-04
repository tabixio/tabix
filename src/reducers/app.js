import appConst from '../constants/app';

const initialState = {
    darkTheme: true
};

export default (state = initialState, action) => {
    switch (action.type) {
    case appConst.ENABLE_DARK_THEME:
        return { ...state, darkTheme: action.payload };
    }
    return state;
};
