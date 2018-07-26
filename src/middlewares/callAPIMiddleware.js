export default function callAPIMiddleware({ dispatch, getState }) {
    return next => async action => {
        const {
            types,
            callAPI,
            shouldCallAPI = () => true,
            payload = {},
            errorAction,
            successAction
        } = action;

        if (!types) {
            // Normal action: pass it on
            return next(action);
        }

        if (
            !Array.isArray(types) ||
            types.length !== 3 ||
            !types.every(type => typeof type === 'string')
        ) {
            throw new Error('Expected an array of three string types.');
        }
        if (typeof callAPI !== 'function') {
            throw new Error('Expected callAPI to be a function.');
        }

        if (!shouldCallAPI(getState())) {
            return;
        }

        const [requestType, successType, failureType] = types;

        dispatch(
            Object.assign({}, payload, {
                type: requestType
            })
        );

        try {
            const response = await callAPI();
            dispatch(
                Object.assign({}, payload, {
                    response,
                    type: successType
                })
            );

            successAction && dispatch(successAction());
        } catch (error) {
            console.error('error',error);
            dispatch(
                Object.assign({}, payload, {
                    error,
                    type: failureType
                })
            );
            errorAction && dispatch(errorAction(error));
        }
    };
}
