import appConst from '../constants/app.js';

export const enableDarkTheme = payload => ({
    type: appConst.ENABLE_DARK_THEME,
    payload
});

export const init = () => ({
    type: appConst.INIT_APP
});
