import toastrConst from '../constants/toastr';

export const show = (message, intent = 'PRIMARY') => ({
    type: toastrConst.SHOW,
    payload: {
        message,
        intent,
        id: new Date().valueOf()
    }
});

export const showPrimary = (message) => ({
    type: toastrConst.SHOW,
    payload: {
        message,
        intent: toastrConst.INTENT.PRIMARY,
        id: new Date().valueOf()
    }
});

export const showSuccess = (message) => ({
    type: toastrConst.SHOW,
    payload: {
        message,
        intent: toastrConst.INTENT.SUCCESS,
        id: new Date().valueOf()
    }
});

export const showError = (message) => ({
    type: toastrConst.SHOW,
    payload: {
        message,
        intent: toastrConst.INTENT.DANGER,
        id: new Date().valueOf()
    }
});
