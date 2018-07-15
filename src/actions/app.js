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

export const loadStructure = structure => ({
    type: appConst.LOAD_STRUCETURE,
    payload: structure
});

export const expandStructure = (id, expand) => ({
    type: appConst.EXPAND_STRUCTURE,
    payload: {
        id: id.split(',').map(x => parseInt(x)),
        expand
    }
});
