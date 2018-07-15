import { assoc } from 'ramda';

export default (props, items) =>
    items.reduce((accum, key) => {
        const clearKey = key.trim();
        return props[clearKey] !== undefined
            ? assoc(clearKey, props[clearKey], accum)
            : accum;
    }, {});
