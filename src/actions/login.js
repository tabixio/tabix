import loginConst from '../constants/login';

export const switchMode = mode => ({
    type: loginConst.CHANGE_MODE,
    payload: mode
});
