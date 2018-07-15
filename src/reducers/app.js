import appConst from '../constants/app';
import * as R from 'ramda';

const initialState = {
    darkTheme: true,
    userConnection: {},
    init: false,
    autorized: false,
    structure: []
};

export const expandStructure = (structure, idArray, expand) => {
    const newObj = R.clone(structure);
    const element = idArray.reduce(
        (el, index, ind) =>
            ind === 0 ? el[index] : el.childNodes[index],
        newObj
    );
    element.isExpanded = expand;

    return newObj;
};

export default (state = initialState, action) => {
    switch (action.type) {
    case appConst.ENABLE_DARK_THEME:
        return { ...state, darkTheme: action.payload };
    case appConst.SET_USER_CONNECTION:
        return { ...state, userConnection: action.payload };
    case appConst.USER_AUTHORIZED:
        return { ...state, autorized: action.payload };
    case appConst.USER_LOGOUT:
        return { ...state, autorized: false, structure: [] };
    case appConst.LOAD_STRUCETURE:
        return { ...state, structure: action.payload };
    case appConst.INIT_APP:
        return { ...state, init: true };
    case appConst.EXPAND_STRUCTURE:
        return {
            ...state,
            structure: expandStructure(
                state.structure,
                action.payload.id,
                action.payload.expand
            )
        };
    }
    return state;
};
