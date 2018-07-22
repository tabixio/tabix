import ApiObj from 'libs/api';

let Api;

export const connect = connection => {
    Api = new ApiObj(connection);
    return Api;
};

export const disconnect = () => {
    Api = undefined;
};

export const connectedApi = () => {
    if (Api === undefined)
        console.warn('API not Connected!');
    //     throw 'API not Connected';
    return Api;
};
