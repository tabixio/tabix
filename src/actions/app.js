import appConst from '../constants/app.js';

export const enableDarkTheme = payload => ({
    type: appConst.ENABLE_DARK_THEME,
    payload
});

export const userAuthorized = auth => ({
    type: appConst.USER_AUTHORIZED,
    payload: auth
});

export const logout = () => ({
    type: appConst.USER_LOGOUT
});

export const init = () => ({
    type: appConst.INIT_APP
});
