import appConst from '../constants/app.js';

export const enableDarkTheme = payload => ({
    type: appConst.ENABLE_DARK_THEME,
    payload
});
