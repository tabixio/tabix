import ApiObj from 'libs/api';

let Api;

export const connect = connection => {
    Api = new ApiObj(connection);
    return Api;
};

export const disconnect = () => {
    Api = undefined;
};

export const connectedApi = () => Api;
